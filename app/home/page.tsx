import mongoose from "mongoose"
import dbConnect from "@/api/mongoose"
import Product from "@/api/models/Product"
import { ProductProps } from "../types/types"

import HeroMatrix from "./components/hero-matrix-bg"
import ProductCard from "./components/product-card"
import ProductsHub from "./components/products-hub"
import Carousel from "./components/carousel"
import Hero from "./components/hero"
import DoubleHero from "./components/double-hero"

//* Connect to the database and list all products
async function listProducts() {
    try {
        await dbConnect()
        const products = await (Product as mongoose.Model<InstanceType<typeof Product>>).find({})
        return products
    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {

    const products = await listProducts()

    return (
        <div className="flex flex-col items-center gap-y-20">

            <DoubleHero />

            <section className="relative h-[950px] w-screen flex justify-center items-center overflow-hidden">

                <HeroMatrix />

                {/* The hero section renders a list of 5 recommended products  */}
                <div className="w-full max-w-[1440px]">
                    {
                        products && products.length > 0 && (
                            <Hero>
                                <ProductsHub products={products} />
                            </Hero>
                        )
                    }
                </div>
            </section>

            <section className="border-y border-sym-border-light dark:border-sym-border py-10 w-screen flex justify-center items-center overflow-hidden">
                <Carousel />
            </section>

            <section className="w-full max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                {
                    products?.map((product: ProductProps) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </section>
        </div>
    )
}