'use client'
import React, { useTransition } from 'react'
import { ShippingAddress } from '@/types'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { shippingAddressValidator } from '@/lib/validator'
import { shippingAddressDefaults } from '@/lib/constans'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ArrowRight, Loader } from 'lucide-react'

function ShippingAddressForm({ address }: { address: ShippingAddress }) {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<z.infer<typeof shippingAddressValidator>>({
		resolver: zodResolver(shippingAddressValidator),
		defaultValues: address || shippingAddressDefaults,
	})

	const [isPending, startTransition] = useTransition()

	const onSubmit = async (values: z.infer<typeof shippingAddressValidator>) => {
		console.log('onSubmit>>>', values)
		return console.log(values)
	}

	const onError = (errors: any) => {
		console.log('Validation errors:', errors)
	}

	return (
		<>
			<div className="mx-auto max-w-md space-y-4">
				<h1 className={'h2-bold mt-4'}>Shipping Address</h1>
				<p className="text-sm text-muted-foreground">
					PLease enter your shipping address. If you have any questions about your order, do not hesitate to contact our
					support team.
				</p>
				<Form {...form}>
					<form method={'post'} onSubmit={form.handleSubmit(onSubmit, onError)} className={'flex flex-col gap-5'}>
						{/* Full name */}
						<FormField
							control={form.control}
							name="fullName"
							render={({
								field,
							}: {
								field: ControllerRenderProps<z.infer<typeof shippingAddressValidator>, 'fullName'>
							}) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your full name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Address */}
						<FormField
							control={form.control}
							name="streetAddress"
							render={({
								field,
							}: {
								field: ControllerRenderProps<z.infer<typeof shippingAddressValidator>, 'streetAddress'>
							}) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input placeholder="Enter address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Country */}
						<FormField
							control={form.control}
							name="country"
							render={({
								field,
							}: {
								field: ControllerRenderProps<z.infer<typeof shippingAddressValidator>, 'country'>
							}) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input placeholder="Enter address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* City */}
						<FormField
							control={form.control}
							name="city"
							render={({
								field,
							}: {
								field: ControllerRenderProps<z.infer<typeof shippingAddressValidator>, 'city'>
							}) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="Enter city" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* City */}
						<FormField
							control={form.control}
							name="postalCode"
							render={({
								field,
							}: {
								field: ControllerRenderProps<z.infer<typeof shippingAddressValidator>, 'postalCode'>
							}) => (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input placeholder="Enter postal code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className={'mt-2 w-1/2'}>
							{isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
							Continue
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}

export default ShippingAddressForm
