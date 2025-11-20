import { Router } from 'express';
import { 
  createPost, 
  getAllPosts, 
  getPostById, 
  createComment, 
  toggleLike, 
  toggleBookmark 
} from '../controllers/beautyTalkController';

const router = Router();

// [게시물 목록 조회] GET /api/v1/beauty
router.get('/', getAllPosts);

// [게시물 상세 조회] GET /api/v1/beauty/:id
router.get('/:id', getPostById);

// [게시물 작성] POST /api/v1/beauty
router.post('/', createPost);

// [댓글 작성] POST /api/v1/beauty/:id/comments
router.post('/:id/comments', createComment);

// [좋아요 토글] POST /api/v1/beauty/:id/like
router.post('/:id/like', toggleLike);

// [북마크 토글] POST /api/v1/beauty/:id/bookmark
router.post('/:id/bookmark', toggleBookmark);

export default router;