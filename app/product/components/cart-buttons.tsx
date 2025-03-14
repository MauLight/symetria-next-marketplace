'use client'

import { useCart } from "@/app/context/cartContext"

interface DescriptionProps {
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
}

export default function CartButtons({ id, title, discount, price, image }: DescriptionProps) {

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

    return (

        <div className="flex gap-x-5">
            <button className="text-[#ededed] w-[200px] py-2 mt-5 rounded-[6px] border border-[#ededed]bg-transparent hover:bg-[#ededed] hover:text-[#080808] transition-all duration-300">Wishlist</button>
            <button onClick={handleAddToCart} className="text-[#ededed] w-[200px] py-2 mt-5 rounded-[6px] border border-[#ededed]bg-transparent hover:bg-[#ededed] hover:text-[#080808] transition-all duration-300">Add to cart</button>
        </div>
    )
}
