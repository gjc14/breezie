import { prisma } from './_db.server'
import { PostStatus } from '~/schema/database'

export const getPosts = async (props?: {
	n?: number
	status?: PostStatus
}): Promise<{
	posts: typeof posts
}> => {
	const { n, status } = props || {}

	const posts = await prisma.post.findMany({
		where: { status },
		take: n,
		orderBy: { createdAt: 'desc' },
		include: {
			seo: {
				select: { title: true, description: true },
			},
			author: {
				select: { email: true, name: true },
			},
		},
	})
	return { posts }
}

export const getPost = async (
	id: string
): Promise<{
	post: typeof post
}> => {
	const post = await prisma.post.findFirst({
		where: { id },
		include: {
			seo: {
				select: { title: true, description: true },
			},
		},
	})

	return { post }
}

export const getPostBySlug = async (
	slug: string
): Promise<{
	post: typeof post
}> => {
	const post = await prisma.post.findFirst({
		where: { slug },
		include: {
			seo: {
				select: { title: true, description: true },
			},
			author: {
				select: {
					name: true,
					imageUri: true,
				},
			},
		},
	})

	return { post }
}

interface CreatePostProps {
	title: string
	content: string
	excerpt: string
	slug: string
	status: PostStatus
	authorId: string
	seo: {
		metaTitle?: string
		metaDescription?: string
	}
}

export const createPost = async (props: CreatePostProps): Promise<{ post: typeof post }> => {
	const { title, content, excerpt, status, authorId, seo, slug } = props

	const post = await prisma.$transaction(async tx => {
		const seoCreated = await tx.seo.create({
			data: {
				title: seo.metaTitle || title, // Title h1 matches metaTitle is best for SEO, page structure, and accessibility
				description: seo.metaDescription ?? '',
				autoGenerated: true,
			},
			select: { id: true },
		})
		return await tx.post.create({
			data: {
				title,
				content,
				excerpt,
				slug,
				seoId: seoCreated.id,
				status,
				authorId,
			},
		})
	})
	return { post }
}

interface UpdatePostProps {
	id: string
	title: string
	content: string
	excerpt: string
	slug: string
	status: string
	seo: {
		metaTitle?: string
		metaDescription?: string
	}
}

export const updatePost = async (props: UpdatePostProps): Promise<{ post: typeof post }> => {
	const { id, title, content, excerpt, status, seo, slug } = props

	const post = await prisma.$transaction(async tx => {
		return await tx.post.update({
			where: { id },
			data: {
				title,
				content,
				excerpt,
				slug,
				status,
				seo: {
					update: {
						title: seo.metaTitle ?? '',
						description: seo.metaDescription ?? '',
					},
				},
			},
		})
	})
	return { post }
}

export const deletePost = async (id: string): Promise<{ post: typeof post }> => {
	const post = await prisma.post.delete({
		where: { id },
	})
	return { post }
}
