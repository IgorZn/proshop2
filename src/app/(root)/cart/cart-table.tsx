'use client'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { Cart } from '@/types'
import { ArrowRight, Minus, Plus, Loader } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
					<div className="overflow-x-auto md:col-span-3">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="">Product</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Total</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cart.items.map(item => (
									<TableRow key={item.productId}>
										{/* Product */}
										<TableCell>
											<Link href={`/product/${item.slug}`} className={'flex items-center'}>
												<Image src={item.image} alt={item.name} width={100} height={100} />
												<span className={'px-2'}>{item.name}</span>
											</Link>
										</TableCell>

										{/*	Price */}
										<TableCell className={''}>
											<Button
												disabled={isPending}
												variant="link"
												onClick={() =>
													startTransition(async () => {
														const res = await removeItemFromCart(item.productId)
														// console.log('removeItemFromCart>>>', res)
														if (!res.success) {
															toast({
																variant: 'destructive',
																description: res.message,
															})
														}
													})
												}>
												{isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
											</Button>
											<span className={'mb-2 py-2'}>{item.qty}</span>
											<Button
												disabled={isPending}
												variant="link"
												onClick={() =>
													startTransition(async () => {
														const res = await addItemToCart(item)
														// console.log('removeItemFromCart>>>', res)
														if (!res.success) {
															toast({
																variant: 'destructive',
																description: res.message,
															})
														}
													})
												}>
												{isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
											</Button>
										</TableCell>
										<TableCell>${item.price}</TableCell>
										<TableCell>${item.price * item.qty}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					<Card>
						<CardContent className={'gap-4 p-4'}>
							<div className={'flex flex-col pb-3 text-xl'}>
								<div className={'flex justify-between'}>
									<div>Subtotal:</div>
									<span className={'font-semibold'}>${cart.totalPrice}</span>
								</div>
								<div className={'flex justify-between'}>
									<div>Qty:</div>
									<span className={'font-semibold'}>{cart.items.reduce((a, c) => a + c.qty, 0)}</span>
								</div>
							</div>
							<Button
								className={'w-full'}
								disabled={isPending}
								onClick={() => {
									startTransition(async () => {
										router.push('/shipping-address')
									})
								}}>
								{isPending ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Proceed
								to checkout
							</Button>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	)
}

export default CartTable
