'use server'
import { prisma } from '@/db/prisma'

export const getBySlug = async (slug: string) => {
	const product = await prisma.product.findUnique({
		where: {
			slug,
		},
	})
	return product
}
