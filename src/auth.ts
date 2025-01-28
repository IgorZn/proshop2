import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '@/utils/userUtils'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth'
// import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/sign-in',
		signOut: '/sign-out',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				if (credentials == null) return null
				// console.log('authorize>>>', credentials)

				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				})
				// console.log('authorize>>>', user)

				// Check if the user has a password
				if (user && user.password) {
					const isMatch = comparePassword(credentials.password as string, user.password)

					// Check if the password matches
					if (isMatch) {
						console.group('isMatch>>>')
						console.log(isMatch)
						console.log(credentials.password, user.password)
						console.log(user)
						console.groupEnd()
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							image: user.image,
							role: user.role,
						}
					}
				}

				// Return null if the user does not exist or has no password
				return null
			},
		}),
	],

	callbacks: {
		async session({ session, user, trigger, token }) {
			// console.log('session', token)
			// Set user ID from token
			session.user.id = token.sub
			session.user.role = token.role
			session.user.name = token.name

			// If there is an update, set username
			if (trigger === 'update') {
				session.user.id = user.name
			}
			return session
		},

		async jwt({ token, user, account, profile }) {
			token.booba = 'booba'
			// console.log('jwt_token, account, profile>>>', token, account, profile)
			// console.log('jwt_user>>>', user)

			if (user) {
				token.role = user.role

				if (user.name === 'NO_NAME') {
					token.name = user.email.split('@')[0]

					// 	Update DB
					await prisma.user.update({
						where: {
							id: user.id,
						},
						data: {
							name: token.name,
						},
					})
				}

				return token
			}
			// Persist the OAuth access_token and or the user id to the token right after signin
			// if (account) {
			// 	token.accessToken = account.access_token
			// 	token.id = profile.id
			// }
			return token
		},
	},
} satisfies NextAuthOptions

export default NextAuth(authOptions)

// export const { signIn, signOut } = NextAuth(authOptions)

export function auth(
	...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
	return getServerSession(...args, authOptions)
}
