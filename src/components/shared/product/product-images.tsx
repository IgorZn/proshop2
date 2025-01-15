'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

function ProductImages({ images }: { images: string[] }) {
	const [current, setCurrent] = React.useState(0)

	return (
		<div className={'space-y-4'}>
			<Image
				src={images[current]}
				alt={'Image'}
				width={500}
				height={500}
				priority={true}
				className={'min-h-[300px] object-cover object-center'}
			/>
			<div className="flex">
				{images.map((image, index) => (
					<div
						key={index}
						className={cn('mr-2 border hover:border-orange-200', current === index && 'border-orange-500')}>
						<Image
							src={image}
							alt={'Image'}
							width={100}
							height={100}
							priority={true}
							className={'min-h-[100px] cursor-pointer object-cover object-center'}
							onClick={() => setCurrent(index)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductImages
