'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { signInDefaults } from '@/lib/constans'
import Link from 'next/link'
import { signInAction } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'

function CredentialSignInForm(props) {
	const [data, action] = useFormState(signInAction, {
		success: false,
		message: '',
	})

	const SignInButton = () => {
		const { pending } = useFormStatus()
		return (
			<div>
				<Button
					disabled={pending}
					variant="default"
					type="submit"
					className="w-full rounded bg-emerald-200 p-2 text-lg font-light text-black hover:bg-emerald-500">
					{pending ? 'Signing in...' : 'Sign in'}
				</Button>
			</div>
		)
	}

	return (
		<form action={action}>
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
					<SignInButton />
				</div>

				{data && !data.success && <p className={'text-center text-destructive'}>{data.message}</p>}

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
