'use client'
import { Cart, CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus, Minus, Loader } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { useTransition } from 'react'

import React from 'react'

function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
	const { toast } = useToast()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const handleAddToCart = async () => {
		startTransition(async () => {
			// console.log('handleAddToCart>>>', item)
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
		})
	}

	const handleRemoveFromCart = async () => {
		startTransition(async () => {
			const res = await removeItemFromCart(item.productId)
			console.log('handleRemoveFromCart>>>', res)
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
			} else {
				toast({
					title: 'Success',
					description: `${res.message}, ${item.name} removed from cart`,
				})

				return
			}
		})
	}

	// Check if item exist in cart
	const existItem = cart && (cart?.items as CartItem[]).find(x => x.productId === item.productId)
	if (existItem) {
		return existItem ? (
			<div className={'mt-5 flex justify-between text-center'}>
				<Button className={'m-auto'} variant={'outline'} disabled={existItem.qty === 0} onClick={handleRemoveFromCart}>
					{isPending ? <Loader className="mr-2 animate-spin" /> : <Minus />}
				</Button>
				<span className="m-auto px-2">
					{existItem.qty} {existItem.qty > 1 ? 'in cart' : ''}
				</span>
				<Button className={'m-auto'} onClick={handleAddToCart}>
					{isPending ? <Loader className="mr-2 animate-spin" /> : <Plus />}
				</Button>
			</div>
		) : (
			<Button className={'mt-1 w-full'} onClick={handleAddToCart}>
				{isPending ? <Loader className="mr-2 animate-spin" /> : <Plus />} Add to Cart
			</Button>
		)
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
