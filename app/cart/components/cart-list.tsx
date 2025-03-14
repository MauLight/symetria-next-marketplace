'use client'

import { useCart } from '@/app/context/cartContext';
import { getPercentage } from '@/app/functions/functions';
import Image from 'next/image'
import React from 'react'

interface DescriptionProps {
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
    quantity: number;
}

export default function CartList() {

    const { cart, addToCart, subtractFromCart } = useCart()

    return (
        <div className='col-span-2 flex flex-col gap-y-5 border border-[#dfdfdf] shadow-xl shadow-gray-50 rounded-[6px] p-5'>
            {
                cart && cart.length > 0 ? cart.map((product: DescriptionProps) => (
                    <div key={product.id} className="grid grid-cols-4 gap-x-3">
                        <div className="col-span-1 border border-[#dfdfdf] rounded-[6px]">
                            <Image src={product.image} width={600} height={400} alt='placeholder' />
                        </div>
                        <div className="col-span-3 flex justify-between border border-[#dfdfdf] rounded-[6px] py-2 px-5">
                            <div className="flex flex-col">
                                <h1 className='text-[1.4rem]'>{product.title}</h1>
                                <p>{`$${getPercentage(product.discount, product.price)}`}</p>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <p>Quantity</p>
                                <div className='w-[80px]  border border-[#dfdfdf] rounded-[6px] flex items-center justify-between px-2'>
                                    <p className='text-[1.5rem]'>{product.quantity}</p>
                                    <div className='flex flex-col text-[1.5rem]'>
                                        <button onClick={() => { addToCart(product) }}>+</button>
                                        <button onClick={() => { subtractFromCart(product) }}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                    :
                    (
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
                    )
            }
        </div>
    )
}
