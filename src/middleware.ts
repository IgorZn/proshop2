import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Получаем значение cookie 'sessionCrtId'
	const sessionCrtId = request.cookies.get('sessionCrtId')?.value

	// Если cookie 'sessionCrtId' отсутствует, создаем его
	if (!sessionCrtId) {
		const newSessionCrtId = crypto.randomUUID() // Генерируем UUID

		// Создаем ответ и устанавливаем cookie
		const response = NextResponse.next()
		response.cookies.set('sessionCrtId', newSessionCrtId, {
			httpOnly: true, // Защищает cookie от доступа через JavaScript
			secure: process.env.NODE_ENV === 'production', // Используется только HTTPS в production
			maxAge: 60 * 60 * 24 * 7, // Срок действия cookie (например, 7 дней)
			path: '/', // Путь, для которого доступна cookie
		})

		return response
	}

	// Если cookie уже существует, просто продолжаем
	return NextResponse.next()
}

// Применяем middleware к определенным маршрутам
// export const config = {
// 	matcher: ['/protected/:path*'], // Защищенные маршруты
// }
