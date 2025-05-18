'use client'

import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useCart } from "../context/cartContext"

export default function CartHub() {

    const { cart } = useCart()

    return (
        <Link className='relative flex gap-x-1 items-center text-sym-text-light dark:text-sym-text-secondary hover:text-sym-text-light-focus dark:hover:text-sym-text-primary transition-color duration-300' href='/cart'>
            {
                cart.length > 0 && (
                    <div className="absolute flex justify-center items-center -top-2 -right-2 w-5 h-5 rounded-full bg-green-500">
                        <p className="text-black">{cart.length}</p>
                    </div>
                )
            }
            <ShoppingCartIcon className="w-4 h-4" />
            Your Cart
        </Link>
    )
}
