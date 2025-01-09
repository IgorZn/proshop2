import React from 'react'
import { ShoppingCart, UserIcon, Moon, MoonIcon, Sun } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constans'
import { Button } from '@/components/ui/button'
import ThemeSwitcher from '@/components/shared/header/theme-switcher'

function Header(props) {
	return (
		<header className={'w-full border-b'}>
			<div className="wrapper flex-between">
				<div className="flex-start">
					<Link href={'/'} className={'flex-start'}>
						<Image src={'/images/logo.svg'} alt={'logo'} width={50} height={50} priority={true} />
						<span className={'ml-3 hidden text-2xl font-medium md:inline'}>{APP_NAME}</span>
					</Link>
				</div>

				<div className="space-x-3">
					<ThemeSwitcher />

					<Button asChild variant="ghost">
						<Link href={'/cart'}>
							<ShoppingCart />
							Cart
						</Link>
					</Button>

					<Button asChild>
						<Link href={'/sign-in'}>
							<UserIcon /> Sign In
						</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
