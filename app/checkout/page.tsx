'use client'

import { useCart } from "../context/cartContext"

export default function Page() {

    const { cart } = useCart()
    console.log(cart)

    return (
        <div className="w-full min-h-screen text-black">page</div>
    )
}
