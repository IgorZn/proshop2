export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'E-Shop'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern example app (e-shop)'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCT_LIMIT = Number(process.env.NEXT_PUBLIC_LATEST_PRODUCT_LIMIT) || 4
export const signInDefaults = { email: '', password: '' }
export const signUpDefaults = { name: '', email: '', password: '', confirmPassword: '' }
export const shippingAddressDefaults = {
	fullName: '',
	streetAddress: '',
	city: '',
	postalCode: '',
	country: '',
	lat: 0,
	lng: 0,
}
