'use client'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { Cart } from '@/types'
import { ArrowRight, Minus, Plus, Loader } from 'lucide-react'
import Link from 'next/link'

function CartTable({ cart }: { cart?: Cart }) {
	const router = useRouter()
	const { toast } = useToast()

	const [isPending, startTransition] = useTransition()
	const noQty = item => item.qty === 0

	return (
		<>
			<h1 className="h2-bold py-2">Shopping Cart</h1>
			{!cart || cart.items.every(noQty) || cart.items.length === 0 ? (
				<div className="flex flex-col items-center justify-center">
					<h1 className="h1-bold">Your cart is empty</h1>
					<p className="py-2">Add items to your cart to get started</p>
					<Link href={'/'} className="mt-5 rounded bg-emerald-200 p-2 text-lg hover:bg-emerald-500">
						Go to Shopping
					</Link>
				</div>
			) : (
				<div className={'grid md:grid-cols-4 md:gap-5'}>
					<div className="overflow-x-auto md:col-span-3">Table</div>
				</div>
			)}
		</>
	)
}

export default CartTable
