import { Router } from 'express'
import { signUp, signIn, googleSignIn, requestPasswordReset, resetPassword } from '../controllers/authController'

const router = Router()

// [회원 가입] POST - /api/v1/auth/signup
router.post('/signup', signUp)

// [로그인] POST - /api/v1/auth/signin
router.post('/signin', signIn)

// [구글 로그인] POST - /api/v1/auth/google-signin
router.post('/google-signin', googleSignIn)

// [비밀번호 찾기] POST - /api/v1/auth/forgot-password
router.post('/forgot-password', requestPasswordReset)

// [비밀번호 재설정] POST - /api/v1/auth/reset-password
router.post('/reset-password', resetPassword);

export default router