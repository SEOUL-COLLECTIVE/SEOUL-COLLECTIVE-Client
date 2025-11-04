import { z } from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { OAuth2Client } from 'google-auth-library';
import { signUpSchema, signInSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
 *                 type: number
 *                 description: 국가 코드
 *               gender:
 *                 type: number
 *                 description: 성별 코드
 *               age:
 *                 type: number
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

    // 4. 새 유저 생성
    const newUser = await prisma.user.create({
      data: {
        // 유저 정보
        email,
        password: hashedPassword,
        firstName,
        lastName,
        country: country,
        gender: gender,
        age: age,
        
        // 약관 동의 정보
        termsOfUse,
        personalInfoRequired,
        personalInfoOptional,
        marketingOptional,
        emailMarketing,
      },
    })

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
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: '[ERROR] ID token is required.' });
    }

    // 1. 구글 토큰 검증
    const ticket = await GOOGLE_CLIENT_ID.verifyIdToken({
      idToken,
      audience: String(GOOGLE_CLIENT_ID),
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: '[ERROR] Invalid Google token.' });
    }

    const { email, given_name, family_name, picture } = payload;

    // 2. DB에서 유저 조회
    let user = await prisma.user.findUnique({ where: { email } });

    // 3. 유저가 없으면 새로 생성
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName: given_name || '',
          lastName: family_name || '',
          // 랜덤 문자열로 비밀번호 저장
          password: Math.random().toString(36).slice(-10),
          termsOfUse: true,
          personalInfoRequired: true,
          marketingOptional: false,
          emailMarketing: false,
        },
      });
    }

    // 4. JWT 생성
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('[ERROR] JWT_SECRET is not defined.');

    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName: user.firstName },
      jwtSecret,
      { expiresIn: '7d' } // 구글 로그인은 기본 7일
    );

    // 5. 성공 응답 (토큰 및 유저 정보)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: '[SYSTEM] Signed in with Google.', token, user: userWithoutPassword });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: '[ERROR] Internal server error.' });
  }
};