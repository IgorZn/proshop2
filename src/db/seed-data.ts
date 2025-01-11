import { PrismaClient } from '@prisma/client'
import sampleData from '@/db/sample-data'

import { createHash } from 'crypto'

const prisma = new PrismaClient()

type User = {
	name: string
	email: string
	password: string
	role: string
}

// async function addUsers(users: Array<User>) {
// 	const users = []
// 	for (let i = 0; i < sampleData.users.length; i++) {
// 		users.push({
// 			...sampleData.users[i],
// 			password: createHash('sha256').update(sampleData.users[i].password).digest('hex'),
// 		})
// 	}
// 	await prisma.user.createMany({ skipDuplicates: true, data: users })
// }

async function main() {
	console.time('Seeding complete 🌱')

	console.log('Loading sample product data...')
	await prisma.product.createMany({ skipDuplicates: true, data: sampleData.products })

	// console.log('Loading sample user data...')
	// await addUsers(sampleData.users)

	console.timeEnd('Seeding complete 🌱')
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
