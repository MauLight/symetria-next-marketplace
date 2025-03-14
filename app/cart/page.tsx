import React from 'react'
import CartList from './components/cart-list'

export default function Page() {

    return (
        <div className='w-full h-screen flex justify-center items-start mt-[60px]'>
            <div className="w-full max-w-[1440px] flex flex-col gap-y-20 py-10">
                <div>
                    <h1 className='text-[2.5rem] leading-10'>Your Cart</h1>
                    <p className='text-[1.5rem] text-[#080808]'>Your products are not reserved until payment is complete.</p>
                </div>
                <div className="grid grid-cols-3 gap-x-5">

                    <CartList />

                    <div className="col-span-1 flex flex-col gap-y-5 border border-[#dfdfdf] shadow-xl shadow-gray-50 rounded-[6px] p-5">
                        <h1 className='text-[1.5rem]'>Summary</h1>
                        <div>
                            <div className='flex justify-between'>
                                <p>0 Products</p>
                                <p>$0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Total amount</p>
                                <p>$0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Includes</p>
                                <p>$0.00 VAT</p>
                            </div>
                        </div>
                        <button className="text-[#ededed] w-full py-2 mt-5 rounded-[6px] border border-[#080808] hover:bg-transparent bg-black hover:text-[#080808] transition-all duration-300">Checkout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
