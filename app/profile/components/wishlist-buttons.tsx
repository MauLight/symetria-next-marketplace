'use client'

import { ProductProps } from '@/app/types/types'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { Dispatch, SetStateAction } from 'react'

interface WishlistButtonProps { userId: string, productId: string, setWishlist: Dispatch<SetStateAction<ProductProps[]>> }

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://symetria-next-marketplace.vercel.app'

export default function WishlistButtons({ userId, productId, setWishlist }: WishlistButtonProps) {

    async function handleDeleteProduct() {

        try {
            const { data } = await axios.delete(`${url}/api/wishlist`, {
                data: { userId, productId }
            })
            console.log(data)
            setWishlist(data.wishlist)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="flex gap-x-10">
            <button className="flex flex-col items-center text-[#a1a1a1] hover:text-green-500 transition-color duration-300">
                <ShoppingCartIcon className="w-6 h-6" />
                <small>Add to Cart</small>
            </button>
            <button onClick={handleDeleteProduct} className="flex flex-col items-center text-[#a1a1a1] hover:text-red-500 transition-color duration-300">
                <TrashIcon className="w-6 h-6" />
                <small>Delete</small>
            </button>
        </div>
    )
}
