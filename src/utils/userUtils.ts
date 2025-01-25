import { createHash } from 'crypto'

export const comparePassword = (password: string, hashedPassword: string) => {
	const hashedPwd = createHash('sha256').update(password).digest('hex')
	console.group('comparePassword')
	console.log(hashedPwd === hashedPassword)
	console.groupEnd()
	return hashedPwd === hashedPassword
}

export const hashPassword = (password: string) => createHash('sha256').update(password).digest('hex')
