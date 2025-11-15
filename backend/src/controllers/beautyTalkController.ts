import { Request, Response } from 'express';
import { prisma } from '../db/prisma'; // Prisma 클라이언트 경로
import { PostType, PostCategory } from '@prisma/client'; // Enum 타입 임포트

// interface AuthenticatedRequest extends Request {
//   user: {
//     id: string;
//   };
// }

/**
 * --------------------------------
 * 커뮤니티 글 작성
 * --------------------------------
 */
export const createPost = async (req: Request, res: Response) => {
  // 인증된 사용자 ID
  // const userId 
  const { 
    title, 
    content, 
    type, // 'MyReview' | 'ProductQA'
    category, // 'SkinCare' | 'Makeup' | 'Hair'
    imageUrls, // string[] (최대 5개)
    hashtags // string[] (예: ["여드름", "수분"])
  } = req.body;

  // 유효성 검사 (이미지 5개, 글자수 1500자)
  if (imageUrls && imageUrls.length > 5) {
    return res.status(400).json({ message: 'Images cannot exceed 5.' });
  }

  try {
    const newPost = await prisma.beautyTalkPost.create({
      data: {
        title,
        content,
        type: type as PostType,
        category: category as PostCategory,
        authorId: userId,
        // 이미지 생성
        images: {
          createMany: {
            data: imageUrls.map((url: string) => ({ url })),
          },
        },
        // 해시태그 생성 또는 연결
        hashtags: {
          connectOrCreate: hashtags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create post.', error: error.message });
  }
};

/**
 * --------------------------------
 * 커뮤니티 글 목록 조회 (정렬, 필터링, 검색, 페이지네이션)
 * --------------------------------
 */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'latest', // 'latest' | 'popular'
      type, // 'MyReview' | 'ProductQA'
      category, // 'SkinCare' | 'Makeup' | 'Hair'
      search, // 키워드
      hashtag // 해시태그 이름
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // 필터링
    const where: any = {};
    if (type) where.type = type as PostType;
    if (category) where.category = category as PostCategory;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (hashtag) {
      where.hashtags = {
        some: { name: hashtag as string }
      };
    }

    // 정렬
    const orderBy: any = {};
    if (sortBy === 'popular') {
      orderBy.likeCount = 'desc'; // 인기순 (좋아요 개수 기준)
    } else {
      orderBy.createdAt = 'desc'; // 최신순 (기본)
    }

    // 데이터 조회
    const posts = await prisma.beautyTalkPost.findMany({
      where,
      orderBy,
      skip,
      take: Number(limit),
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true /*, profilePic */ }
        },
        _count: { // 좋아요, 댓글 수 카운트
          select: { likes: true, comments: true }
        }
      }
    });

    // 총 개수 (페이지네이션)
    const totalCount = await prisma.beautyTalkPost.count({ where });

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalCount / Number(limit)),
      currentPage: Number(page),
      totalCount,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get posts.', error: error.message });
  }
};


/**
 * --------------------------------
 * 글 상세 보기
 * --------------------------------
 */
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. 조회수 증가 및 데이터 조회
    const post = await prisma.$transaction(async (tx) => {
      await tx.beautyTalkPost.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });

      return tx.beautyTalkPost.findUniqueOrThrow({
        where: { id },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true /*, profilePic */ }
          },
          images: true, 
          hashtags: { 
            select: { name: true }
          },
          comments: { 
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true /*, profilePic */ }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
          _count: {
            select: { likes: true, comments: true, bookmarks: true }
          }
        }
      });
    });

    res.status(200).json(post);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(500).json({ message: 'Failed to get post details.', error: error.message });
  }
};

/**
 * --------------------------------
 * 댓글 작성
 * --------------------------------
 */
export const createComment = async (req: Request, res: Response) => {
//   const userId = '...'; req.user.id (인증된 사용자 ID)
  const { id: postId } = req.params;
  const { content } = req.body;

  try {
    // 1. Product Q&A 게시물인지 확인 (My Review는 댓글 X)
    const post = await prisma.beautyTalkPost.findUnique({
      where: { id: postId },
      select: { type: true }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (post.type !== 'ProductQA') {
      return res.status(403).json({ message: 'Comments are not allowed for this post type.' });
    }

    // 2. 댓글 생성
    const newComment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId: postId,
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true /*, profilePic */ }
        }
      }
    });

    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create comment.', error: error.message });
  }
};

/**
 * --------------------------------
 * 좋아요
 * --------------------------------
 */
export const toggleLike = async (req: Request, res: Response) => {
//   const userId = '...';
  const { id: postId } = req.params;

  try {
    const likeId = { userId, postId };
    const existingLike = await prisma.like.findUnique({
      where: { postId_userId: likeId }
    });

    // $transaction으로 좋아요/취소와 게시물 likeCount 업데이트를 동시 처리
    await prisma.$transaction(async (tx) => {
      if (existingLike) {
        // 좋아요 취소
        await tx.like.delete({ where: { postId_userId: likeId } });
        await tx.beautyTalkPost.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } }
        });
      } else {
        // 좋아요
        await tx.like.create({ data: likeId });
        await tx.beautyTalkPost.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } }
        });
      }
    });

    res.status(200).json({ 
      message: existingLike ? 'Unliked successfully' : 'Liked successfully' 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to toggle like.', error: error.message });
  }
};


/**
 * --------------------------------
 * 북마크
 * --------------------------------
 */
export const toggleBookmark = async (req: Request, res: Response) => {
//   const userId = '...';
  const { id: postId } = req.params;

  try {
    const bookmarkId = { userId, postId };
    const existingBookmark = await prisma.bookmark.findUnique({
      where: { postId_userId: bookmarkId }
    });

    if (existingBookmark) {
      // 북마크 취소
      await prisma.bookmark.delete({ where: { postId_userId: bookmarkId } });
    } else {
      // 북마크
      await prisma.bookmark.create({ data: bookmarkId });
    }

    res.status(200).json({ 
      message: existingBookmark ? 'Removed from bookmarks' : 'Added to bookmarks' 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to toggle bookmark.', error: error.message });
  }
};