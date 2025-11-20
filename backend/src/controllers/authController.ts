import { z } from 'zod'
import { Request, Response } from 'express'
import axios from 'axios'
import { prisma } from '../db/prisma'
import { OAuth2Client } from 'google-auth-library'
import { signUpSchema, signInSchema } from '../utils/validation'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'
import { sendVerificationEmail } from '../utils/emailService'

// Google Client ID
const GOOGLE_CLIENT_ID = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/**
 * ------------------------------
 * 회원가입 (Sign Up)
 * ------------------------------
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    // 1. Zod 스키마를 사용한 데이터 유효성 검사
    const validatedData = signUpSchema.parse(req.body)

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
    } = validatedData;

    // 2. 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: '[ERROR] Email already in use.' })
    }

    // 3. 비밀번호 암호화 (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. 새 유저 및 약관 동의 정보 트랜잭션 [User 생성 + Terms 생성]
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 4-1. User 생성
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          country: country || null,
          gender: gender || null,
          age: age,
        },
      })

      // 4-2. Terms 생성 및 User와 연결
      const newTerms = await tx.terms.create({
        data: {
          userId: newUser.id,
          termsOfUse,
          personalInfoRequired,
          personalInfoOptional: personalInfoOptional || false,
          marketingOptional: marketingOptional || false,
          emailMarketing: emailMarketing || false,
        },
      })
      
      return { newUser, newTerms };
    })
    
    const { newUser } = result;

    // 5. 성공 응답
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    console.error('[ERROR - SignUp]', error)
    res.status(500).json({ message: '[ERROR] Internal server error.' })
  }
}

/**
 * ------------------------------
 * 로그인 (Sign In)
 * ------------------------------
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    // 1. 전송 받은 데이터의 유효성 검사
    const { email, password, keepSignedIn } = signInSchema.parse(req.body)

    // 2. 유저 확인
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) { // 존재하지 않는 유저일 경우
      return res.status(401).json({ message: '[ERROR] Invalid email or password.' })
    }

    if (!user.password) { // 비밀번호가 존재하지 않는 경우 (소셜 로그인)
      return res.status(400).json({ message: '[ERROR] This account uses Google Sign-In. Please use Google Login.' })
    }

    // 3. 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) { // 비밀번호가 잘못되었을 경우
      return res.status(401).json({ message: '[ERROR] Invalid email or password.' })
    }

    // 4. JWT 토큰 생성
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
    console.error('[ERROR - SignIn]', error)
    res.status(500).json({ message: '[ERROR] Internal server error.' })
  }
}

/**
 * ------------------------------
 * 구글 로그인 (Google Sign In)
 * ------------------------------
 */
export const googleSignIn = async (req: Request, res: Response) => {

  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: '[ERROR] Code is required.' })
  }

  try {
    // 프론트엔드에서 받은 idToken 추출
    const { idToken } = req.body
    
    if (!idToken) {
      return res.status(400).json({ message: '[ERROR] ID token is required.' })
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

    const accessToken = tokenResponse.data.access_token

    // 2. People API로 사용자 정보 가져오기
    const profileResponse = await axios.get(
      'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,photos',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const profile = profileResponse.data
    const googleId = profile.resourceName?.replace('people/', '') || null
    const email = profile.emailAddresses?.[0]?.value
    const firstName = profile.names?.[0]?.givenName || ''
    const lastName = profile.names?.[0]?.familyName || ''
    // const picture = profile.photos?.[0]?.url || null // 프로필 사진

    const AGE_GROUPS = [
      { value: '16-24', min: 16, max: 24 },
      { value: '25-34', min: 25, max: 34 },
      { value: '35-44', min: 35, max: 44 },
      { value: '45+', min: 45, max: 120 },
    ] as const

    // * 전달 받은 생일 데이터를 연령대 값에 맞게 수정
    const birthdayData = profile.birthdays?.[0]?.date
    let ageGroup: string | null = null
    let birthday: Date | null = null

    if (birthdayData && birthdayData.year) {
      birthday = new Date(`${birthdayData.year}-${birthdayData.month}-${birthdayData.day}`)
      const age = new Date().getFullYear() - birthdayData.year
      const group = AGE_GROUPS.find(g => age >= g.min && age <= g.max)
      ageGroup = group ? group.value : null
    }

    if (!email) return res.status(400).json({ message: '[ERROR] Email not found in Google profile.' }) // 존재하지 않는 이메일일 시

    // 3. DB에서 유저 조회
    let user = await prisma.user.findUnique({ where: { email } })

  // 4. 유저가 없으면 새로 생성 (트랜잭션 사용)
  if (!user) {
    // 트랜잭션 시작
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 4-1. User 생성
      const newUser = await tx.user.create({
        data: {
          email,
          firstName: firstName || 'Google',
          lastName: lastName || 'User',
          password: null, // 소셜 로그인은 비밀번호 없음
          age: ageGroup || 'UNKNOWN',
          googleId: googleId,
        },
      })

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
      })

      return newUser
    })

    user = result
  }

    // 5. JWT 토큰 생성
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw new Error('[ERROR] JWT_SECRET is not defined.')

    const token = jwt.sign(
      { userId: user.id, email: user.email, firstName: user.firstName },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // 6. 성공 응답 (토큰 및 유저 정보)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: '[SYSTEM] Signed in with Google OAuth.', token, user: userWithoutPassword })
    
    // 기타 서버 오류
  } catch (error: any) {
    console.error('[ERROR - GoogleSignIn]', error)
    res.status(500).json({ message: '[ERROR] Internal server error.' })
  }
};

/**
 * ------------------------------
 * 비밀번호 찾기 (Forgot Password)
 * ------------------------------
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // 1. 유저 존재 확인
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: '[ERROR] User not found.' })
    }

    // 2. 인증 코드 생성 및 DB 저장 (1시간 만료)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000)

    await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: verificationCode,
                resetTokenExpires: expirationTime,
            },
    });

    // 인증 코드를 콘솔에 출력 (실제 서비스에서는 이메일로 전송)
    console.log(`[PASSWORD RESET]: Verification Code for ${email}: ${verificationCode}`)
    
    // 3. 이메일 전송 로직
    await sendVerificationEmail(email, verificationCode)

    res.status(200).json({
      message: '[SYSTEM] Password reset code sent to email.',
      // 개발 편의를 위해 코드를 응답에 포함
      __dev_code: verificationCode, 
    });

  } catch (error: any) {
    console.error('[ERROR - ForgotPassword]', error)
    res.status(500).json({ message: '[ERROR] Internal server error - email sending failed.' })
  }
};

/**
 * ------------------------------
 * 비밀번호 초기화 (Password Reset)
 * ------------------------------
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body;

    // 1. 유저 및 코드 확인 ([TO-DO]: DB에서 코드 및 만료 시간 확인)
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: '[ERROR] User not found.' })
    }

    // DB에 저장된 코드 및 만료 시간 확인
    if (
      user.resetToken !== code ||
      user.resetTokenExpires === null ||
      user.resetTokenExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: '[ERROR] Invalid or expired verification code.' })
    }

    // 2. 새 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 3. 비밀번호 업데이트 및 토큰 필드 초기화
    await prisma.user.update({
      where: { email },
      data: { 
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.status(200).json({ message: '[SYSTEM] Password successfully reset.' })

  } catch (error: any) {
    // 유효성 검사 실패 시
    if (error instanceof z.ZodError) {
      // @ts-ignore
      return res.status(400).json({ message: '[ERROR] Invalid password format.', errors: error.errors })
    }
    console.error('[ERROR - PasswordReset]', error)
    res.status(500).json({ message: '[ERROR] Internal server error.' });
  }
};