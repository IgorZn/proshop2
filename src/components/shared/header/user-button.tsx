import React from 'react'
import { auth } from '@/auth'
import { signOutAction } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { UserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

async function UserButton(props) {
	const session = await auth()

	if (!session?.user) {
		return (
			<Button asChild>
				<Link href={'/sign-in'}>
					<UserIcon /> Sign In
				</Link>
			</Button>
		)
	}

	const firstInitial: string = session.user.name.split(' ')[0][0].toUpperCase()
	console.log('firstInitial', firstInitial)
	return (
		<div className={'flex items-center gap-2'}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center">
						<Button
							variant="ghost"
							className={'relative ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200'}>
							{firstInitial}
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className={'w-56'} forceMount>
					<DropdownMenuLabel className={'font-normal'}>
						<div className="flex flex-col space-y-1">
							<div className="text-sm font-medium leading-none">{session.user.name}</div>
							<div className="text-sm leading-none text-muted-foreground">{session.user.email}</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem className={'mb-1 p-0'}>
						<form className={'w-full'}>
							{/* TODO: sign out */}
							<Button className={'h-4 w-full justify-start px-2 py-4'} variant={'ghost'}>
								Sign Out
							</Button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserButton
