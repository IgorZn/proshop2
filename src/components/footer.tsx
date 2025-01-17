import React from 'react'
import { APP_NAME } from '@/lib/constans'

function Footer() {
	return (
		<footer className={'border-t'}>
			<div className="flex-center p-5">
				&copy; {new Date().getFullYear()} {APP_NAME} | All rights reserved
			</div>
		</footer>
	)
}

export default Footer
