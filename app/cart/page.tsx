import Image from 'next/image'
import React from 'react'

export default function Page() {
    return (
        <div className='w-full h-screen flex justify-center items-start mt-[60px]'>
            <div className="w-full max-w-[1440px] flex flex-col gap-y-20 py-10">
                <div>
                    <h1 className='text-[2.5rem] leading-10'>Your Cart</h1>
                    <p className='text-[1.5rem] text-[#080808]'>Your products are not reserved until payment is complete.</p>
                </div>
                <div className="grid grid-cols-3 gap-x-5">

                    <div className='col-span-2 flex flex-col gap-y-5 border border-[#dfdfdf] shadow-xl shadow-gray-50 rounded-[6px] p-5'>
                        <div className="grid grid-cols-4 gap-x-5">
                            <div className="col-span-1 border">
                                <Image src={'https://placehold.co/600x400/000000/FFFFFF.png'} width={600} height={400} alt='placeholder' />
                            </div>
                            <div className="col-span-3 flex justify-between border border-[#dfdfdf] rounded-[6px] p-2">
                                <div className="flex flex-col">
                                    <h1 className='text-[1.4rem]'>Product Title</h1>
                                    <p>$1000000</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <p>Quantity</p>
                                    <div className='w-[80px]  border border-[#dfdfdf] rounded-[6px] flex items-center justify-between px-2'>
                                        <p className='text-[1.5rem]'>1</p>
                                        <div className='flex flex-col text-[1.5rem]'>
                                            <button>+</button>
                                            <button>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
