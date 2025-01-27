import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constans'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignupForm from '@/app/(auth)/sign-up/signup-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Sign up',
}

async function Page(props) {
	const session = await auth()

	if (session?.user) {
		redirect('/')
	}

	return (
		<div className={'mx-auto w-full max-w-md'}>
			<Card>
				<CardHeader className={'space-y-4'}>
					<Link href={'/'} className={'flex-center'}>
						<Image src={'/images/logo.svg'} alt={`${APP_NAME}`} width={50} height={50} priority={true} />
					</Link>
					<CardTitle className={'text-center'}>Sign up</CardTitle>
					<CardDescription className={'text-center'}>Sing up to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
