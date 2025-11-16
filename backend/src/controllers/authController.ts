import { z } from 'zod';
import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '../db/prisma';
import { OAuth2Client } from 'google-auth-library';
import { signUpSchema, signInSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Prisma } from '@prisma/client';

// Google Client ID
const GOOGLE_CLIENT_ID = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * ------------------------------
 * 회원가입 (Sign Up)
 * ------------------------------
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: 회원 가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - age
 *               - termsOfUse
 *               - personalInfoRequired
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 이메일
 *               password:
 *                 type: string
 *                 description: 암호화된 비밀번호
 *               firstName:
 *                 type: string
 *                 description: 이름
 *               lastName:
 *                 type: string
 *                 description: 성
 *               country:
 *                 type: string
 *                 description: 국가 코드
 *               gender:
 *                 type: string
 *                 description: 성별 코드
 *               age:
 *                 type: string
 *                 description: 연령대 코드
 *               termsOfUse:
 *                 type: boolean
 *                 description: 이용 약관 동의
 *               personalInfoRequired:
 *                 type: boolean
 *                 description: 개인 정보 수집 동의 (필수)
 *               personalInfoOptional:
 *                 type: boolean
 *                 description: 개인 정보 수집 동의 (선택)
 *               marketingOptional:
 *                 type: boolean
 *                 description: 마케팅 정보 동의
 *               emailMarketing:
 *                 type: boolean
 *                 description: 이메일 마케팅 동의
 *     responses:
 *       201:
 *         description: 회원 가입 성공
 *       409:
 *         description: 이메일 중복
 *       400:
 *         description: 유효성 검사 실패
 */

export const signUp = async (req: Request, res: Response) => {
  try {
    // 1. 전송 받은 데이터의 유효성 검사
    const {
      email,
      password,
      firstName,
      lastName,
      country,
      gender,
      age,
      termsOfUse,
      personalInfoRequired,
      personalInfoOptional,
      marketingOptional,
      emailMarketing,
    } = signUpSchema.parse(req.body)

    // 2. 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: '[ERROR] Email already in use.' })
    }

    // 3. 비밀번호 암호화 (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. 새 유저 및 약관 동의 정보 트랜잭션
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 4-1. User 생성
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          country: country,
          gender: gender,
          age: age,
        },
      })

      // 4-2. Terms 생성 및 User와 연결
      const newTerms = await tx.terms.create({
        data: {
          userId: newUser.id,
          termsOfUse,
          personalInfoRequired,
          personalInfoOptional,
          marketingOptional,
          emailMarketing,
        },
      })
      
      return { newUser, newTerms };
    })
    
    const { newUser } = result;

    // 5. 성공 응답
    const { password: _, ...userWithoutPassword } = newUser
    res.status(201).json({
      message: '[SYSTEM] User created.',
      user: userWithoutPassword,
    })
  } catch (error: any) {
    // 유효성 검사 실패 시
    if (error instanceof z.ZodError) {
      // @ts-ignore
      return res.status(400).json({ message: '[ERROR] Invalid input.', errors: error.errors }) }
    // 기타 서버 오류
    console.error(error)
    res.status(500).json({ message: '[ERROR] Internal server error.' })
  }
}

/**
 * ------------------------------
 * 로그인 (Sign In)
 * ------------------------------
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: 로그인 및 JWT 발급
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - keepSignedIn
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 이메일
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               keepSignedIn:
 *                 type: boolean
 *                 description: 로그인 유지 여부
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 및 사용자 정보 반환
 *       401:
 *         description: 잘못된 이메일 또는 비밀번호
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    // 1. 전송 받은 데이터의 유효성 검사
    const { email, password, keepSignedIn } = signInSchema.parse(req.body)

    // 2. 유저 확인
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ message: '[ERROR] Invalid email or password.' })
    }

    if (!user.password) {
        return res.status(500).json({ message: '[ERROR] User password hash is missing.' })
    }

    // 3. 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: '[ERROR] Invalid email or password.' })
    }

    // 4. JWT 생성
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('[ERROR] JWT_SECRET is not defined in .env file.')
    }

    // "로그인 유지" 체크 시 만료 기간 7일, 아니면 1일
    const expiresIn = keepSignedIn ? '7d' : '1d'

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      jwtSecret,
      { expiresIn },
    )

    // 5. 성공 응답 (토큰 및 유저 정보)
    const { password: _, ...userWithoutPassword } = user
    res.status(200).json({
      message: '[SYSTEM] Signed in.',
      token,
      user: userWithoutPassword,
    })
  } catch (error: any) {
    // 유효성 검사 실패 시
    if (error instanceof z.ZodError) {
      // @ts-ignore
      return res.status(400).json({ message: '[ERROR] Invalid input.', errors: error.errors }) }
    // 기타 서버 오류
    console.error(error)
    res.status(500).json({ message: '[ERROR] Internal server error.' })
  }
}

/**
 * ------------------------------
 * 구글 로그인 (Google Sign In)
 * ------------------------------
 */
/**
 * @swagger
 * /api/v1/auth/google-signin:
 *   post:
 *     summary: 구글 로그인 및 JWT 발급
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: 구글에서 발급받은 ID 토큰
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 및 사용자 정보 반환
 *       400:
 *         description: 유효하지 않은 토큰
 *       500:
 *         description: 서버 오류
 */
export const googleSignIn = async (req: Request, res: Response) => {

  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: '[ERROR] Code is required.' });
  }

  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: '[ERROR] ID token is required.' });
    }

    // 1. 구글 토큰 검증
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.FRONTEND_URL}/auth/google/callback`,
      grant_type: 'authorization_code',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const accessToken = tokenResponse.data.access_token;

    // 2. People API로 사용자 정보 가져오기
    const profileResponse = await axios.get(
      'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,photos',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const profile = profileResponse.data;
    const email = profile.emailAddresses?.[0]?.value;
    const firstName = profile.names?.[0]?.givenName || '';
    const lastName = profile.names?.[0]?.familyName || '';
    const picture = profile.photos?.[0]?.url || null;

    const AGE_GROUPS = [
      { value: '16-24', min: 16, max: 24 },
      { value: '25-34', min: 25, max: 34 },
      { value: '35-44', min: 35, max: 44 },
      { value: '45+', min: 45, max: 120 },
    ] as const;

    // * 전달 받은 생일 데이터를 연령대 값에 맞게 수정
    const birthdayData = profile.birthdays?.[0]?.date;
    let ageGroup: string | null = null;
    let birthday: Date | null = null;

    if (birthdayData && birthdayData.year) {
      birthday = new Date(`${birthdayData.year}-${birthdayData.month}-${birthdayData.day}`);
      const age = new Date().getFullYear() - birthdayData.year;
      const group = AGE_GROUPS.find(g => age >= g.min && age <= g.max);
      ageGroup = group ? group.value : null;
    }

    if (!email) return res.status(400).json({ message: '[ERROR] Email not found in Google profile.' }); // 존재하지 않는 이메일일 시

    // 3. DB에서 유저 조회
    let user = await prisma.user.findUnique({ where: { email } });

  // 4. 유저가 없으면 새로 생성 (트랜잭션 사용)
  if (!user) {
    
    // 트랜잭션 시작
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 4-1. User 생성
      const newUser = await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: Math.random().toString(36).slice(-10), // 랜덤 패스워드
          age: ageGroup || 'UNKNOWN',
        },
      });

      // 4-2. Terms 생성 및 User와 연결
      await tx.terms.create({
        data: {
          userId: newUser.id,
          termsOfUse: true,
          personalInfoRequired: true,
          personalInfoOptional: false,
          marketingOptional: false,
          emailMarketing: false,
        },
      });

      return newUser;
    });

    user = result;
  }

    // 5. JWT 생성
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('[ERROR] JWT_SECRET is not defined.');

    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName: user.firstName },
      jwtSecret,
      { expiresIn: '7d' } // 구글 로그인은 기본 7일
    );

    // 6. 성공 응답 (토큰 및 유저 정보)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: '[SYSTEM] Signed in with Google OAuth.', token, user: userWithoutPassword });
    
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: '[ERROR] Internal server error.' });
  }
};

/**
 * ------------------------------
 * 비밀번호 찾기 (Forgot Password)
 * ------------------------------
 */
/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: 비밀번호 재설정을 위한 인증 코드 이메일 전송
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: 재설정할 계정의 이메일
 *       responses:
 *         200:
 *           description: 인증 코드 전송 성공 메시지
 *         404:
 *           description: 해당 이메일로 등록된 사용자가 없음
 *         500:
 *           description: 서버 오류 또는 이메일 전송 오류
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // 1. 유저 존재 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: '[ERROR] User not found.' });
    }

    // 2. 인증 코드 생성 및 저장
    // [TO-DO]: 6자리 랜덤 숫자 생성 후 DB에 user.id와 함께 TTL(만료 시간)을 설정하여 저장
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 인증 코드를 콘솔에 출력 (실제 서비스에서는 이메일로 전송)
    console.log(`[PASSWORD RESET]: Verification Code for ${email}: ${verificationCode}`);
    
    // 3. 이메일 전송 로직
    /*
    await sendVerificationEmail(email, verificationCode);
    */

    res.status(200).json({
      message: '[SYSTEM] Password reset code sent to email.',
      // 개발 편의를 위해 코드를 응답에 포함
      __dev_code: verificationCode, 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: '[ERROR] Internal server error.' });
  }
};

/**
 * ------------------------------
 * 비밀번호 초기화 (Password Reset)
 * ------------------------------
 */
/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: 인증 코드를 사용하여 비밀번호 재설정
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: 재설정할 계정의 이메일
 *                code:
 *                  type: string
 *                  description: 이메일로 받은 6자리 인증 코드
 *                newPassword:
 *                  type: string
 *                  description: 새 비밀번호 (암호화될 값)
 *       responses:
 *         200:
 *           description: 비밀번호 재설정 성공
 *         400:
 *           description: 유효하지 않은 코드 또는 유효성 검사 실패
 *         500:
 *           description: 서버 오류
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body;

    // 1. 유저 및 코드 확인 ([TO-DO]: DB에서 코드 및 만료 시간 확인)
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: '[ERROR] User not found.' });
    }

    // [TO-DO] DB에 저장된 코드와 비교해야
    if (code !== '000000' && code !== '123456') {
        return res.status(400).json({ message: '[ERROR] Invalid or expired verification code.' });
    }

    // 2. 새 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. 비밀번호 업데이트
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: '[SYSTEM] Password successfully reset.' });

  } catch (error: any) {
    // 유효성 검사 실패 시
    if (error instanceof z.ZodError) {
      // @ts-ignore
      return res.status(400).json({ message: '[ERROR] Invalid password format.', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: '[ERROR] Internal server error.' });
  }
};