import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '@/utils/userUtils'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login',
		signOut: '/logout',
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

				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				})

				// Check if the user has a password
				if (user && user.password) {
					const isMatch = comparePassword(credentials.password as string, user.password)

					// Check if the password matches
					if (isMatch)
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							image: user.image,
							role: user.role,
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
