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
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

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

            <section className="w-full max-w-[1440px] grid grid-cols-4 h-[500px]">
                <Newsletter />
                <div className="col-span-1 flex items-center justify-center">
                    <Links data={socials} />
                </div>
                <div className="col-span-1 text-white flex justify-center items-center">
                    <div className="flex flex-col">
                        <h2>© 2022 - 2025</h2>
                        <h2>CTLST CREATIVE CO.</h2>
                        <div className="h-10"></div>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Links
                        justify="justify-end"
                        data={contracts}
                    />
                </div>
            </section>
        </div>
    )
}

function Newsletter() {
    return (
        <div className="col-span-1 flex flex-col justify-center gap-y-5">
            <div className="h-4"></div>
            <h2 className="text-white text-balance uppercase">
                Sign up for the latest products,
                news & insights
            </h2>
            <div className="relative flex flex-col gap-y-2">
                <input
                    placeholder="EMAIL ADDRESS"
                    type="text"
                    className="h-10 outline-0 text-white"
                />
                <div className="border-b w-full border-white" />
                <ArrowLongRightIcon className="absolute right-0 top-[13px] w-4 h-4 text-white" />
            </div>
        </div>
    )
}

function Links({ data, justify }: { data: Array<{ id: string, label: string, url: string }>, justify?: string }) {
    return (
        <div className={`col-span-1 flex ${justify ? justify : 'justify-center'}`}>
            <div className="flex flex-col items-start gap-y-2 text-white">
                {
                    data.map((elem) => (
                        <Link
                            key={elem.id}
                            href={elem.url}
                            className="flex gap-x-2 items-center uppercase"
                        >
                            {elem.label}
                            <ArrowLongRightIcon className="w-4 h-4 text-white" />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

const socials = [
    {
        id: '1',
        label: 'Tik Tok',
        url: ''
    },
    {
        id: '2',
        label: 'Instagram',
        url: ''
    },
    {
        id: '3',
        label: 'Facebook',
        url: ''
    },
]

const contracts = [
    {
        id: '1',
        label: 'Terms & Conditions',
        url: ''
    },
    {
        id: '2',
        label: 'Privacy Policy',
        url: ''
    },
    {
        id: '3',
        label: 'Cookies Policy',
        url: ''
    },
]