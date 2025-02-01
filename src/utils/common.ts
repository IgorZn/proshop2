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

// Round number to 2 decimal places
export function roundTo2Decimals(num: number | string) {
	console.log('roundTo2Decimals>>>', num, typeof num)
	console.log('roundTo2Decimals>>>', (Math.round((Number(num) + Number.EPSILON) * 100) / 100).toFixed(2))
	switch (typeof num) {
		case 'number':
			return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
		case 'string':
			return (Math.round((Number(num) + Number.EPSILON) * 100) / 100).toFixed(2)
		default:
			throw new Error(`Invalid input: ${num}`)
	}
}
