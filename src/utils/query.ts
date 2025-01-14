'use server'
import { prisma } from '@/db/prisma'
import { LATEST_PRODUCT_LIMIT } from '@/lib/constans'

export const getProducts = async () => {
	return prisma.product.findMany({
		take: LATEST_PRODUCT_LIMIT,
		orderBy: {
			createdAt: 'desc',
		},
	})
}
