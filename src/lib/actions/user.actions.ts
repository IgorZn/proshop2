'use server'

import { shippingAddressValidator, signInFormValidator, signUpFormValidator } from '@/lib/validator'
// import { signOut } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { prisma } from '@/db/prisma'
import { hashPassword } from '@/utils/userUtils'
import { date } from 'zod'
import { auth } from '@/auth'
import { ShippingAddress } from '@/types'

export async function signInAction(prevState: unknown, formData: FormData) {
	try {
		const user = signInFormValidator.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		})
		console.log('signInAction')
		// await signIn('credentials', user)
		return { success: true, message: 'Signed in successfully', user }
	} catch (e) {
		console.log(e.message)
		if (isRedirectError(e)) throw e
		return { success: false, message: 'Invalid credentials' }
	}
}

export async function signOutAction() {
	// await signOut()
}

export async function signUpAction(prevState: unknown, formData: FormData) {
	const status = signUpFormValidator.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	})

	if (status.success) {
		const password = hashPassword(status.data.password)
		// const plainPassword = status.data.password
		try {
			const newUser = await prisma.user.create({
				data: {
					name: status.data.name,
					email: status.data.email,
					password,
				},
			})
		} catch (e) {
			if (isRedirectError(e.error)) throw e.error
			const errMsg = {
				email: 'Email already exists',
			}
			return { success: false, message: errMsg[e.meta.target] }
		}

		// await signIn('credentials', { email: status.data.email, plainPassword })
		return { success: true, message: 'Signed up successfully' }
	} else {
		// console.log('status.error>>>', status.error)
		if (isRedirectError(status.error)) throw status.error
		const set = new Set()
		Object.entries(status.error.flatten().fieldErrors).map(obj => set.add(obj[1][0]))
		return { success: false, message: Array.from(set).join('. ') }
	}
}

export async function getUserById(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		})
		return user
	} catch (e) {
		if (isRedirectError(e)) throw e
	}
	return null
}

export async function updateUserAddress(data: ShippingAddress) {
	try {
		const session = await auth()
		const currentUser = await prisma.user.findFirst({
			where: {
				id: session?.user?.id,
			},
		})

		if (!currentUser) throw new Error('User not found')
		const address = shippingAddressValidator.parse(data)
		console.log('updateUserAddress>>>', address)
		console.log('updateUserAddress__currentUser>>>', currentUser)
		await prisma.user
			.update({
				where: {
					id: currentUser.id,
				},
				data: {
					address,
				},
			})
			.then(data => console.log('prisma.user.update>>>', data))

		return { success: true, message: 'Address updated successfully' }
	} catch (e) {
		console.log(e.message)
		return { success: false, message: 'User not found' }
	}
}
