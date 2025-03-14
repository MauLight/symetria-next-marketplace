import Image from "next/image"
import Hero from "./components/hero"
import dbConnect from "@/api/mongoose"
import Product from "@/api/models/Product"
import mongoose from "mongoose"
import { ProductProps } from "../types/types"
import ProductCard from "./components/product-card"

//* Connect to the database and list all products
async function listProducts() {
    try {
        await dbConnect()
        const products = await (Product as mongoose.Model<InstanceType<typeof Product>>).find({})

        console.log(products)
        return products
    } catch (error) {
        console.log(error)
    }
}



export default async function Page() {

    const products = await listProducts()

    return (
        <div className="flex flex-col gap-y-20">
            <section className="relative h-[950px] w-full flex justify-center items-center overflow-hidden">

                {/* Render a list of blocks colored in gradient, covered in gradients */}
                <div className="absolute top-0 left-0 w-screen h-full flex flex-wrap overflow-hidden">
                    <div className="absolute top-0 left-0 w-screen h-full bg-black opacity-60"></div>
                    <div className="absolute top-0 left-0 w-screen h-full bg-radial from-0% from-transparent
                via-black via-80% to-black overflow-hidden"></div>
                    {
                        Array.from({ length: 200 }).map((_, i) => (
                            <div key={i} className="w-[calc(100%/15)] h-[calc(100%/9)] animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                <div className="w-full h-full bg-black scale-[99.2%]"></div>
                            </div>
                        ))
                    }
                </div>

                {/* The hero section renders a list of 5 recommended products  */}
                <div className="w-[1440px]">
                    {
                        products && products.length > 0 && (
                            <Hero>
                                <div className="w-full flex justify-center items-center gap-x-5 rounded-md overflow-hidden z-auto">
                                    {
                                        products?.slice(0, 5).map((product: ProductProps) => (
                                            <button
                                                key={`id-${product.id}`} className="relative group w-[180px] h-[180px] cursor-pointer rounded-[6px] overflow-hidden glass border border-[#292929]">
                                                <Image width={180} height={180} className="h-full scale-90 object-cover z-0 rounded-[4px] group-hover:scale-105 transition-all duration-500" src={product.images[0].image} alt={product.title} />
                                                <div className="absolute top-0 left-0 w-full h-full bg-radial from-20% from-transparent to-[#10100e] opacity-20"></div>
                                                <div
                                                    className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-transparent group-hover:bg-[#10100e] opacity-60 transition-all duration-200 rounded-[4px]">
                                                </div>
                                                <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 text-transparent group-hover:text-[#fff] transition-all duration-300">{product.title}</p>
                                            </button>
                                        ))
                                    }
                                </div>
                            </Hero>
                        )
                    }
                </div>
            </section>
            <section className="w-[1440px] grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                {
                    products?.map((product: ProductProps) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </section>
        </div>
    )
}