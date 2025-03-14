'use client'

import { useCart } from "@/app/context/cartContext";
import { getPercentage } from "@/app/functions/functions"
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface DescriptionProps {
    id: string;
    title: string;
    discount: number;
    price: number;
    image: string;
}

export default function ProductDescription({ id, title, discount, price, image }: DescriptionProps) {

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
        <div className={"w-full absolute bottom-5 flex justify-between px-5 z-10 transition-all duration-300"}>
            <Link href={`/product/${id}`} className="flex flex-col">

                <h1 aria-label={title} className='text-[1rem] min-[400px]:text-[1.2rem] uppercase antialiazed text-[#fff] leading-tight'>{title}</h1>

                <div className="flex gap-x-2">
                    <p className='text-[16px] text-[#fff] uppercase antialiazed'>{`${getPercentage(discount, price)}$`}</p>
                    {
                        discount !== undefined && discount > 0 && (
                            <p className='text-[12px] uppercase antialiazed text-gray-100 line-through'>{`${price}$`}</p>
                        )
                    }
                </div>

            </Link>
            <div className="flex items-center gap-x-5">
                <button aria-label='wishlist'>
                    <HeartIcon className='w-5 h-5 text-[#fff]' />
                </button>
                <button onClick={handleAddToCart} aria-label='add to cart' className='h-[50px] w-[50px] antialiased rounded-full bg-black border-t border-sym_gray-300 shadow-sm shadow-sym_gray-800 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 flex justify-center items-center cursor-pointer text-[#ffffff] hover:text-indigo-500'>
                    <ShoppingCartIcon className='w-5 h-5 text-[#fff]' />
                </button>
            </div>
        </div>
    )
}
