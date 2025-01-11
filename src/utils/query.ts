'use server'
import { PrismaClient } from '@prisma/client'
import { LATEST_PRODUCT_LIMIT } from '@/lib/constans'

export const getProducts = async () => {
	return new PrismaClient().product.findMany({
		take: LATEST_PRODUCT_LIMIT,
		orderBy: {
			createdAt: 'desc',
		},
	})
}
