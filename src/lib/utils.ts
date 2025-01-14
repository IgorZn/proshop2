import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const validateFormatPrice = (price: number, currency: string = 'USD') =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	})
		.format(price)
		.replace('$', '')

// console.log(validateFormatPrice(49.000009))
