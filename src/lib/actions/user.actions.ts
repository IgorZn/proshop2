'use client'

import { signInFormValidator } from '@/lib/validator'
import { signIn, signOut } from 'next-auth/react'
import { isRedirectError } from 'next/dist/client/components/redirect'

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
