'use client'
import { CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { addItemToCart } from '@/lib/actions/cart.actions'

import React from 'react'

function AddToCart({ item }: { item: CartItem }) {
	const { toast } = useToast()
	const router = useRouter()

	const handleAddToCart = async () => {
		console.log(item)
		const res = await addItemToCart(item)
		if (!res.success) {
			toast({
				title: 'Error',
				description: res.message,
				variant: 'destructive',
				action: (
					<ToastAction altText="Try again" onClick={() => router.refresh()}>
						Try again
					</ToastAction>
				),
			})
			return
		}

		toast({
			title: 'Success',
			description: `${res.message}, ${item.name} added to cart`,
			action: (
				<ToastAction
					altText="Go to cart"
					className={'bg-primary text-white hover:bg-gray-600'}
					onClick={() => router.push('/cart')}>
					Go to cart
				</ToastAction>
			),
		})
	}

	return (
		<div>
			<Button className={'mt-1 w-full'} onClick={handleAddToCart}>
				<Plus /> Add to Cart
			</Button>
		</div>
	)
}

export default AddToCart
