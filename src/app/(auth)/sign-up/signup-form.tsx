'use client'

import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { signUpDefaults } from '@/lib/constans'
import { useFormState, useFormStatus } from 'react-dom'
import { signUpAction } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SignupForm(props) {
	const router = useRouter()
	const { pending } = useFormStatus()
	const [data, action] = useFormState(signUpAction, {
		success: false,
		message: '',
	})

	useEffect(() => {
		console.log(data.success)
		if (data.success) {
			router.push('/sign-in')
		}
	}, [data])

	const SignUpButton = () => {
		return (
			<div>
				<Button
					disabled={pending}
					variant="default"
					type="submit"
					className="w-full rounded bg-emerald-200 p-2 text-lg font-light text-black hover:bg-emerald-500">
					{pending ? 'Submitting...' : 'Sign Up'}
				</Button>
			</div>
		)
	}

	return (
		<form action={action}>
			<div className={'space-y-6'}>
				{/* Name */}
				<div>
					<Label htmlFor={'name'}>Name</Label>
					<Input
						id={'name'}
						name={'name'}
						type={'text'}
						autoComplete={'name'}
						autoCorrect={'off'}
						autoCapitalize={'off'}
						required={true}
						defaultValue={signUpDefaults.name}
					/>
				</div>

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
					/>
				</div>

				{/* Password */}
				<div>
					<Label htmlFor={'password'}>Password</Label>
					<Input
						id={'password'}
						name={'password'}
						type={'password'}
						autoComplete={'password'}
						autoCorrect={'off'}
						autoCapitalize={'off'}
						required={true}
						defaultValue={signUpDefaults.password}
					/>
				</div>

				{/* Confirm Password */}
				<div>
					<Label htmlFor={'confirmPassword'}>Confirm Password</Label>
					<Input
						id={'confirmPassword'}
						name={'confirmPassword'}
						type={'password'}
						autoComplete={'confirmPassword'}
						autoCorrect={'off'}
						autoCapitalize={'off'}
						required={true}
						defaultValue={signUpDefaults.confirmPassword}
					/>
				</div>

				{/*	Button */}
				<div>
					<SignUpButton />
				</div>

				{data && !data.success && <p className={'text-center text-destructive'}>{data.message}</p>}

				{/* Already have an account */}
				<div className={'text-center text-sm text-muted-foreground'}>
					Already have an account?{' '}
					<Link
						href={'/sign-in'}
						target={'_self'}
						className={'link text-sm underline underline-offset-4 hover:text-primary'}>
						Sign in
					</Link>
				</div>
			</div>
		</form>
	)
}

export default SignupForm
