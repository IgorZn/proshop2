'use server'
import { prisma } from '@/db/prisma'
import { LATEST_PRODUCT_LIMIT } from '@/lib/constans'

export const getProducts = async () => {
	const data = await prisma.product.findMany({
		take: LATEST_PRODUCT_LIMIT,
		orderBy: {
			createdAt: 'desc',
		},
	})

	return JSON.parse(JSON.stringify(data))
}
