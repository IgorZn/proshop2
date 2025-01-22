'use client'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { signInDefaults } from '@/lib/constans'
import Link from 'next/link'

function CredentialSignInForm(props) {
	return (
		<form>
			<div className="space-y-6">
				{/* Email */}
				<div>
					<Label htmlFor={'email'}>Email</Label>
					<Input
						id={'email'}
						name={'email'}
						type={'email'}
						autoComplete={'email'}
						autoCorrect={'off'}
						autoCapitalize={'off'}
						required={true}
						defaultValue={signInDefaults.email}
					/>
				</div>

				{/* Password */}
				<div>
					<Label htmlFor={'email'}>Password</Label>
					<Input
						id={'password'}
						name={'password'}
						type={'password'}
						autoComplete={'password'}
						autoCorrect={'off'}
						autoCapitalize={'off'}
						required={true}
						defaultValue={signInDefaults.password}
					/>
				</div>

				{/*	Button */}
				<div>
					<button type={'submit'} className={'w-full rounded bg-emerald-200 p-2 text-lg hover:bg-emerald-500'}>
						Sign in
					</button>
				</div>

				{/*	Don't have an account? */}
				<div className={'text-center text-sm text-muted-foreground'}>
					Don&apos;t have an account?{' '}
					<Link
						href={'/sign-up'}
						target={'_self'}
						className={'link text-sm underline underline-offset-4 hover:text-primary'}>
						Sign Up
					</Link>
				</div>
			</div>
		</form>
	)
}

export default CredentialSignInForm
