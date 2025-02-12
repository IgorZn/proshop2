import { z } from 'zod'
import { crtItemValidator, insertCrtValidator, insertProductSchema, shippingAddressValidator } from '@/lib/validator'

export type Product = z.infer<typeof insertProductSchema> & {
	id: string
	rating: string
	createdAt: Date
}

export type Cart = z.infer<typeof insertCrtValidator>
export type CartItem = z.infer<typeof crtItemValidator>
export type ShippingAddress = z.infer<typeof shippingAddressValidator>
