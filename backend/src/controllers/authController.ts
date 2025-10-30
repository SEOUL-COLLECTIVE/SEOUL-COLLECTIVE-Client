import { z } from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { signUpSchema, signInSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * ------------------------------
 * 회원가입 (Sign Up)
 * ------------------------------
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

    // 3. 비밀번호 해싱 (bcrypt)
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