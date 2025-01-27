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
		async session({ session, user, token }) {
			// Set user ID from token
			session.user.id = token.sub
			return session
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
