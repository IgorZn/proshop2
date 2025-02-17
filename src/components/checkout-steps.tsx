import React from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

function CheckoutSteps({ currentStep = 0 }: { currentStep: number }) {
	return (
		<div className={'flex-between mb-10 flex-col space-x-2 space-y-2 md:flex-row'}>
			{['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
				<div key={step} className={'flex-between flex'}>
					<div
						className={cn(
							'w-56 rounded-full p-2 text-center text-sm',
							index === currentStep ? 'bg-orange-500 text-white' : 'bg-gray-50'
						)}>
						{step}
					</div>
					{step !== 'Place Order' && (
						<div className={'mx-2'}>
							<ArrowRight />
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default CheckoutSteps
