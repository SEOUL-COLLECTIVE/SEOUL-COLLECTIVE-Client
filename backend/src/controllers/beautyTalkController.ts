import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { PostType, PostCategory, Prisma } from '@prisma/client';

const mapPostType = (slug: string): PostType | undefined => {
  const map: Record<string, PostType> = {
    'my-review': PostType.MyReview,
    'product-qa': PostType.ProductQA,
  };
  return map[slug]
};

const mapCategory = (slug: string): PostCategory | undefined => {
  const map: Record<string, PostCategory> = {
    'skincare': PostCategory.SkinCare,
    'makeup': PostCategory.Makeup,
    'hair': PostCategory.Hair,
  };
  return map[slug]
};

/**
 * --------------------------------
 * 커뮤니티 글 작성
 * --------------------------------
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    // [TO-DO] 실제 인증 미들웨어 연결 시 req.user.id 사용
    // const userId = req.user?.id
    
    // DB에 있는 첫 번째 유저를 작성자로 사용
    const mockUser = await prisma.user.findFirst()
    if (!mockUser) return res.status(400).json({ message: 'No users found in DB for testing.' })
    const userId = mockUser.id

    const { 
      title, 
      postType, // 'my-review' | 'product-qa'
      category, // 'skincare' | 'makeup' | 'hair'
      content,  // Tiptap JSON Object
      hashtags  // string[] (Example: ["mytag", "kbeauty"])
    } = req.body

    const dbType = mapPostType(postType)
    const dbCategory = mapCategory(category)

    if (!dbType || !dbCategory) {
      return res.status(400).json({ message: 'Invalid post type or category.' })
    }

    const newPost = await prisma.beautyTalkPost.create({
      data: {
        title,
        content: content as Prisma.InputJsonObject,
        type: dbType,
        category: dbCategory,
        authorId: userId,
        // 해시태그 연결 또는 생성
        hashtags: {
          connectOrCreate: (hashtags || []).map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    res.status(201).json(newPost)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create post.', error: error.message })
  }
};

/**
 * --------------------------------
 * 커뮤니티 글 목록 조회
 * --------------------------------
 */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { 
      type,      // 'my-review', 'product-qa', 'all'
      category,  // 'skincare', 'makeup', 'all'
      tag,       // tag name, 'all'
      sort = 'recent', // 'recent', 'popular'
      page = 1, 
      limit = 20
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    // 1. 필터링 조건 구성
    const where: any = {}

    // Type 필터
    if (type && type !== 'all') {
      const dbType = mapPostType(String(type))
      if (dbType) where.type = dbType;
    }

    // Category 필터
    if (category && category !== 'all') {
      const dbCategory = mapCategory(String(category))
      if (dbCategory) where.category = dbCategory;
    }

    // Tag 필터
    if (tag && tag !== 'all') {
      where.hashtags = {
        some: { name: String(tag) }
      };
    }

    // 2. 정렬 조건 구성
    let orderBy: any = { createdAt: 'desc' }; // 기본: 최신순
    if (sort === 'popular') {
      orderBy = { likeCount: 'desc' }
    }

    // 3. 데이터 조회
    const [posts, totalCount] = await prisma.$transaction([
      prisma.beautyTalkPost.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true }
          },
          hashtags: true,
          _count: {
            select: { likes: true, comments: true }
          }
        }
      }),
      prisma.beautyTalkPost.count({ where })
    ]);

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalCount / Number(limit)),
      currentPage: Number(page),
      totalCount,
    });

  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get posts.', error: error.message })
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

    // 조회수 증가 및 데이터 조회
    const post = await prisma.$transaction(async (tx) => {
      // 게시글이 존재하는지 확인하며 조회수 증가
      try {
        await tx.beautyTalkPost.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
        });
      } catch (e) {
        // 게시글이 없으면 update에서 에러 발생
        throw new Error('PostNotFound')
      }

      return tx.beautyTalkPost.findUniqueOrThrow({
        where: { id },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true }
          },
          hashtags: { 
            select: { name: true }
          },
          images: true,
          comments: { 
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
          _count: {
            select: { likes: true, comments: true, bookmarks: true }
          }
        }
      })
    })

    res.status(200).json(post)

  } catch (error: any) {
    if (error.message === 'PostNotFound' || error.code === 'P2025') {
      return res.status(404).json({ message: 'Post not found.' })
    }
    res.status(500).json({ message: 'Failed to get post details.', error: error.message })
  }
};

/**
 * --------------------------------
 * 댓글 작성
 * --------------------------------
 */
export const createComment = async (req: Request, res: Response) => {
  // [TO-DO] 실제 인증 미들웨어 사용 시 교체
  // const userId = req.user?.id
  const mockUser = await prisma.user.findFirst()
  if (!mockUser) return res.status(400).json({ message: 'No users found.' })
  const userId = mockUser.id

  const { id: postId } = req.params
  const { content } = req.body

  try {
    // 댓글 작성 가능한 게시글 타입인지 확인 (ProductQA만 가능 등 규칙이 있다면)
    const post = await prisma.beautyTalkPost.findUnique({
      where: { id: postId },
      select: { type: true }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' })
    }
    // ProductQA에만 댓글을 달 수 있다면 주석 해제
    // if (post.type !== 'ProductQA') {
    //   return res.status(403).json({ message: 'Comments are not allowed.' });
    // }

    const newComment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId: postId,
      },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true }
        }
      }
    })

    res.status(201).json(newComment)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create comment.', error: error.message })
  }
};

/**
 * --------------------------------
 * 좋아요 토글
 * --------------------------------
 */
export const toggleLike = async (req: Request, res: Response) => {
  // [TO-DO]: 실제 인증 미들웨어 사용 시 교체
  const mockUser = await prisma.user.findFirst()
  if (!mockUser) return res.status(400).json({ message: 'No users found.' })
  const userId = mockUser.id

  const { id: postId } = req.params

  try {
    const likeId = { userId, postId }
    const existingLike = await prisma.like.findUnique({
      where: { postId_userId: likeId }
    });

    await prisma.$transaction(async (tx) => {
      if (existingLike) {
        await tx.like.delete({ where: { postId_userId: likeId } })
        await tx.beautyTalkPost.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } }
        })
      } else {
        await tx.like.create({ data: likeId })
        await tx.beautyTalkPost.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } }
        })
      }
    });

    res.status(200).json({ 
      message: existingLike ? 'Unliked successfully' : 'Liked successfully',
      liked: !existingLike 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to toggle like.', error: error.message })
  }
};

/**
 * --------------------------------
 * 북마크 토글
 * --------------------------------
 */
export const toggleBookmark = async (req: Request, res: Response) => {
  // [TO-DO]: 실제 인증 미들웨어 사용 시 교체
  const mockUser = await prisma.user.findFirst()
  if (!mockUser) return res.status(400).json({ message: 'No users found.' })
  const userId = mockUser.id

  const { id: postId } = req.params

  try {
    const bookmarkId = { userId, postId }
    const existingBookmark = await prisma.bookmark.findUnique({
      where: { postId_userId: bookmarkId }
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({ where: { postId_userId: bookmarkId } })
    } else {
      await prisma.bookmark.create({ data: bookmarkId })
    }

    res.status(200).json({ 
      message: existingBookmark ? 'Removed from bookmarks' : 'Added to bookmarks',
      bookmarked: !existingBookmark
    })
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to toggle bookmark.', error: error.message })
  }
};