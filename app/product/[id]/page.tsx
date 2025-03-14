import dbConnect from "@/api/mongoose"
import Product from "@/api/models/Product"
import mongoose from "mongoose"
import Image from "next/image"
import { getPercentage } from "@/app/functions/functions"
import CartButtons from "../components/cart-buttons"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    const urlParams = await params
    const id = urlParams.id
    await dbConnect()
    const product = await (Product as mongoose.Model<InstanceType<typeof Product>>).findById(id)

    if (!product) {
        return <div>Product not found.</div>
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-[1440px] grid grid-cols-2 gap-x-10 border border-[#292929] bg-[#080808] rounded-[8px] overflow-hidden">

                <div className="h-full w-full">
                    <Image className="w-full h-full object-cover" width={500} height={500} src={product.images[0].image} alt={product.title} />
                </div>

                <div className="flex flex-col justify-between px-10 py-20">

                    <div className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-[2rem] text-[#ededed]">{product.title}</h1>
                            <div className="w-full border-b border-[#292929]"></div>
                            <div className="relative">
                                <p className="text-[#ededed] text-[1.3rem]">{`$${getPercentage(product.discount, product.price)}`}</p>
                                <div className="absolute top-0 left-24 py-1 px-2 animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[0.9rem] rounded-[6px]">{`${product.discount}% OFF`}</div>
                            </div>
                        </div>

                        <p className="text-[#eaeaea] text-balance">{product.description}</p>

                    </div>
                    <CartButtons
                        id={product.id}
                        title={product.title}
                        discount={product.discount as number}
                        price={product.price}
                        image={product.images[0].image}
                    />
                </div>

            </div>
        </div>
    )
}