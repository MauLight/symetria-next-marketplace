import React from 'react'
import CartList from './components/cart-list'
import CartSummary from './components/cart-summary'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Page() {

    return (
        <div className='w-full h-full flex justify-center items-start mt-[60px]'>
            <div className="w-full max-w-[1440px] flex flex-col gap-y-20 py-10">
                <div>
                    <div className="flex justify-between">
                        <h1 className='text-[2.5rem] leading-10'>Your Cart</h1>
                        <Link href={'/'}>
                            <XMarkIcon className='w-6 h-6 hover:rotate-45 transition-all duration-300 ease-in-out hover:text-red-500' />
                        </Link>
                    </div>
                    <p className='text-[1.5rem] text-[#080808]'>Your products are not reserved until payment is complete.</p>
                </div>
                <div className="grid grid-cols-3 gap-x-5">

                    <CartList />
                    <CartSummary />

                </div>
            </div>
        </div>
    )
}
