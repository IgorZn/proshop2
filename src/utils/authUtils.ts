import { authOptions } from '@/app/api/auth/[...nextauth].js'
import { getServerSession } from 'next-auth'

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions)

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			session,
		},
	}
}
