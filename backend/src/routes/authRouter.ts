import { Router } from 'express'
import { signUp, signIn } from '../controllers/authController'

const router = Router()

// [회원 가입] POST - /api/auth/signup
router.post('/signup', signUp)

// [로그인] POST - /api/auth/signin
router.post('/signin', signIn)

export default router