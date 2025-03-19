'use client'

import { useCart } from "@/app/context/cartContext"
import { getPercentage } from '@/app/functions/functions'
import CartButton from "./cart-button"

export default function CartSummary() {

    const { cart } = useCart()
    const prices = cart.map((product) => product.price)
    const discountedPrices = cart.map((product) => getPercentage(product.discount, product.price))

    const total = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)
    const totalWithDiscount = discountedPrices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)

    const vat = Math.floor(((totalWithDiscount / 100) * 19))
    const totalWithVat = totalWithDiscount + vat

    return (
        <div className="col-span-1 flex flex-col gap-y-5 border border-[#dfdfdf] shadow-xl shadow-gray-50 rounded-[6px] p-5">
            <h1 className='text-[1.5rem]'>Summary</h1>
            <div className="flex flex-col gap-y-2">
                <div className='flex justify-between text-gray-600'>
                    <p>{`${cart.length} Products`}</p>
                    <p className="line-through">{`$${total}`}</p>
                </div>
                <div className='flex justify-between'>
                    <p>With discounts</p>
                    <p>{`$${totalWithDiscount}`}</p>
                </div>
                <div className="border-b border-gray-300 my-2"></div>
                <div>
                    <div className='flex justify-between text-[1.5rem]'>
                        <p>Total amount</p>
                        <p>{`$${totalWithVat}(*)`}</p>
                    </div>
                    <p className="text-end text-gray-800 text-[0.8rem]">{`(*) Includes19% VAT`}</p>
                </div>
            </div>
            <CartButton total={totalWithVat} />
        </div>
    )
}
