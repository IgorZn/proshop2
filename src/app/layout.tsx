import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constans'
import { ThemeProvider } from '@/components/theme-provider'
import '@/app/globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
