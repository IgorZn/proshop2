import Link from 'next/link'
import Image from 'next/image'
import '@/app/globals.css'

export default function NotFound() {
	return (
		<div className={'flex min-h-screen flex-col items-center justify-center'}>
			<h2 className={'text-3xl font-bold'}>Not Found</h2>
			<p>Could not find requested resource</p>
			<Image src={'/images/logo.svg'} alt={'logo'} width={50} height={50} priority={true} />
			<Link href="/" className={'mt-5 rounded bg-emerald-200 p-2 text-lg hover:bg-emerald-500'}>
				Return Home
			</Link>
		</div>
	)
}
