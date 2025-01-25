'use client'

import { signInFormValidator, signUpFormValidator } from '@/lib/validator'
import { signIn, signOut } from 'next-auth/react'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { prisma } from '@/db/prisma'
import { hashPassword } from '@/utils/userUtils'

export async function signInAction(prevState: unknown, formData: FormData) {
	try {
		const user = signInFormValidator.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		})
		console.log('signInAction')
		await signIn('credentials', user)
		return { success: true, message: 'Signed in successfully' }
	} catch (e) {
		console.log(e.message)
		if (isRedirectError(e)) throw e
		return { success: false, message: 'Invalid credentials' }
	}
}

export async function signOutAction() {
	await signOut()
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
		const plainPassword = status.data.password
		await prisma.user.create({
			data: {
				name: status.data.name,
				email: status.data.email,
				password,
			},
		})
		await signIn('credentials', { email: status.data.email, plainPassword })
		return { success: true, message: 'Signed up successfully' }
	} else {
		if (isRedirectError(status.error)) throw status.error
		return { success: false, message: 'Invalid credentials' }
	}
}
