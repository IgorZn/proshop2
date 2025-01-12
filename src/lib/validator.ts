import { z } from 'zod'
import { validateFormatPrice } from '@/lib/utils'

const currency = z
	.string()
	.refine(value => /^\d+(\.\d{2})?$/.test(validateFormatPrice(Number(value))), { message: 'Invalid price' })

export const insertProductSchema = z.object({
	name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
	slug: z.string().min(3, { message: 'Product slug must be at least 3 characters' }),
	category: z.string().min(3, { message: 'Product category must be at least 3 characters' }),
	description: z.string().min(3, { message: 'Product description must be at least 3 characters' }),
	images: z.array(z.string()).min(1, { message: 'Product images must be at least 1 image' }),
	price: currency,
	brand: z.string(),
	numReviews: z.coerce.number(),
	stock: z.coerce.number(),
	isFeatured: z.boolean(),
	banner: z.string(),
})
