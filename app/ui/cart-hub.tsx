'use client'

import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useCart } from "../context/cartContext"

export default function CartHub() {

    const { cart } = useCart()

    return (
        <div className="w-full max-w-[90px]">
            <Link className='relative flex gap-x-2 items-center text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300' href='/cart'>
                {
                    cart.length > 0 && (
                        <div className="absolute flex justify-center items-center -top-2 -right-5 w-5 h-5 rounded-full bg-green-500">
                            <p className="text-black">{cart.length}</p>
                        </div>
                    )
                }
                <ShoppingCartIcon className="w-4 h-4" />
                Your Cart
            </Link>
        </div>
    )
}
