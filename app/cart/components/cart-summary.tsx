'use client'

import { useCart } from "@/app/context/cartContext"
import { getPercentage } from '@/app/functions/functions'

export default function CartSummary() {

    const { cart } = useCart()
    const prices = cart.map((product) => product.price)
    const discountedPrices = cart.map((product) => getPercentage(product.discount, product.price))

    const vat = cart.reduce((accumulator, currProduct) => currProduct.discount > accumulator ? currProduct.discount : accumulator, 0)

    const total = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)
    const totalWithDiscount = discountedPrices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)

    return (
        <div className="col-span-1 flex flex-col gap-y-5 border border-[#dfdfdf] shadow-xl shadow-gray-50 rounded-[6px] p-5">
            <h1 className='text-[1.5rem]'>Summary</h1>
            <div className="flex flex-col gap-y-2">
                <div className='flex justify-between text-gray-600'>
                    <p>{`${cart.length} Products`}</p>
                    <p className="line-through">{`$${total}`}</p>
                </div>
                <div className='flex justify-between text-[1.2rem]'>
                    <p>Total amount</p>
                    <p>{`$${totalWithDiscount}`}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Includes</p>
                    <p>{`${vat}% VAT`}</p>
                </div>
            </div>
            <button className="text-[#ededed] w-full py-2 mt-5 rounded-[6px] border border-[#080808] hover:bg-transparent bg-black hover:text-[#080808] transition-all duration-300">Checkout</button>
        </div>
    )
}
