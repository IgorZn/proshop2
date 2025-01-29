import { z } from 'zod'
import { crtItemValidator, insertCrtValidator, insertProductSchema } from '@/lib/validator'

export type Product = z.infer<typeof insertProductSchema> & {
	id: string
	rating: string
	createdAt: Date
}

export type Cart = z.infer<typeof insertCrtValidator>
export type CartItem = z.infer<typeof crtItemValidator>
