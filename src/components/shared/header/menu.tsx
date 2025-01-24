import React from 'react'
import ThemeSwitcher from '@/components/shared/header/theme-switcher'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import UserButton from '@/components/shared/header/user-button'

function Menu() {
	return (
		<div className={'flex justify-end gap-3'}>
			<nav className={'hidden w-full max-w-xs gap-1 md:flex'}>
				<ThemeSwitcher />

				<Button asChild variant="ghost">
					<Link href={'/cart'}>
						<ShoppingCart />
						Cart
					</Link>
				</Button>

				<UserButton />
			</nav>

			<nav className={'md:hidden'}>
				<Sheet>
					<SheetTrigger asChild>
						<EllipsisVertical />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader className={'mt-5 flex flex-row items-center justify-between'}>
							<SheetTitle>Menu</SheetTitle>
							<SheetDescription>
								<ThemeSwitcher />
							</SheetDescription>
						</SheetHeader>
						<div className="mt-5 flex w-1/2 flex-col justify-start space-y-3">
							<Button asChild variant="ghost">
								<Link href={'/cart'}>
									<ShoppingCart />
									Cart
								</Link>
							</Button>
							<UserButton />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}

export default Menu
