import { Router } from 'express'
import { signUp, signIn, googleSignIn, requestPasswordReset, resetPassword } from '../controllers/authController'
import { createPost, getAllPosts, getPostById, createComment, toggleLike, toggleBookmark } from '../controllers/beautyTalkController'

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

// [게시물 작성] POST - /api/v1/beauty/create-post
router.post('/create-post', createPost);

// [게시물 목록] POST - /api/v1/beauty/list
router.post('/list', getAllPosts);

// [게시물 검색] POST - /api/v1/beauty/search
router.post('/search', getPostById);

// [댓글 작성] POST - /api/v1/beauty/create-comment
router.post('/create-comment', createComment);

// [좋아요] POST - /api/v1/beauty/toggle-like
router.post('/toggle-like', toggleLike);

// [북마크] POST - /api/v1/beauty/toggle-bookmark
router.post('/toggle-bookmark', toggleBookmark);

export default router