export async function errorFormatter(error) {
	switch (error) {
		case error.name === 'ZodError':
			return {}
	}
	return {
		success: false,
		message: error.message,
	}
}
