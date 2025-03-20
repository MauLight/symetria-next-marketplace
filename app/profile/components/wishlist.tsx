'use client'

import { ProductProps } from '@/app/types/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import WishlistButtons from './wishlist-buttons'
import { getPercentage } from '@/app/functions/functions'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://symetria-next-marketplace.vercel.app'

export default function Wishlist({ userId }: { userId: string }) {

    const [wishlist, setWishlist] = useState<ProductProps[]>([])

    useEffect(() => {
        async function getUser() {
            try {
                const { data } = await axios.get(`${url}/api/user`)
                setWishlist(data.wishlist)
            } catch (error) {
                console.error(error)
            }
        }

        getUser()
    }, [])

    return (
        <div className="col-span-2 flex flex-col gap-y-8 py-5 max-lg:px-5 lg:pr-5 lg:pl-10 text-[#ededed] border-l border-[#292929]">
            <h1 className="text-[1.5rem]">Wishlist</h1>
            <>
                {
                    wishlist.length > 0 ? (
                        <>
                            {
                                wishlist.map((product: ProductProps) => (
                                    <div key={product.id} className="w-full h-[120px] flex items-center justify-between py-2 px-2 sm:px-5 border border-[#292929] rounded-[6px]">
                                        <div className="flex gap-x-5">
                                            <div className="hidden sm:block w-[100px] h-[100px] border border-[#292929]">
                                                <Image width={100} height={100} src={product.images[0].image} alt={product.title} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h1 className="text-[1rem] sm:text-[1.2rem] max-sm:truncate max-[350px]:w-[150px]">{product.title}</h1>
                                                <p className="text-[#a1a1a1] max-sm:text-[0.8rem]">${getPercentage(product.discount as number, product.price)}</p>
                                            </div>
                                        </div>
                                        <WishlistButtons
                                            userId={userId}
                                            title={product.title}
                                            discount={product.discount as number}
                                            price={product.price}
                                            image={product.images[0].image}
                                            productId={product.id}
                                            setWishlist={setWishlist}
                                        />
                                    </div>
                                ))
                            }
                        </>
                    )
                        :
                        (
                            <div className="w-full flex flex-col gap-y-4 p-10 justify-center items-center border border-[#292929] rounded-[6px]">
                                <PlusCircleIcon className="w-[50px] h-[50px] text-[#292929]" />
                                <h2 className="text-[#ededed]">Add Items to your Wishlist.</h2>
                            </div>
                        )
                }
            </>
        </div>
    )
}
