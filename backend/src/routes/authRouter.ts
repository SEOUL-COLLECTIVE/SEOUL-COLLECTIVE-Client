import { Router } from 'express'
import { signUp, signIn, googleSignIn } from '../controllers/authController'

const router = Router()

// [회원 가입] POST - /api/v1/auth/signup
router.post('/signup', signUp)

// [로그인] POST - /api/v1/auth/signin
router.post('/signin', signIn)

// [구글 로그인] POST - /api/v1/auth/google-signin
router.post('/google-signin', googleSignIn)

export default router