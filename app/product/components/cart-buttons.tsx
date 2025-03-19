'use client'

import { useCart } from "@/app/context/cartContext"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface DescriptionProps {
    userId: string
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
}

export default function CartButtons({ userId, id, title, discount, price, image }: DescriptionProps) {

    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            discount,
            price,
            image
        })
    }

    const [disabled, setDisabled] = useState<boolean>(false)
    async function handleWishlistProduct() {
        try {

            await axios.post(`http://localhost:3000/api/wishlist`, { userId, productId: id })
            toast.success('Product added to wishlist.')

        } catch (error) {
            setDisabled(true)
            console.error(error)
        }
    }

    return (

        <div className="flex gap-x-5">
            <button disabled={disabled} onClick={handleWishlistProduct} className={`text-[#ededed] w-[200px] py-2 mt-5 rounded-[6px] border border-[#ededed]bg-transparent hover:bg-[#ededed] hover:text-[#080808] transition-all duration-300 ${disabled ? 'cursor-not-allowed' : ''}`}>Wishlist</button>
            <button onClick={handleAddToCart} className="text-[#ededed] w-[200px] py-2 mt-5 rounded-[6px] border border-[#ededed]bg-transparent hover:bg-[#ededed] hover:text-[#080808] transition-all duration-300">Add to cart</button>
        </div>
    )
}
