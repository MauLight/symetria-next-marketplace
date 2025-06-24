import dbConnect from "@/api/mongoose"
import Product from "@/api/models/Product"
import mongoose from "mongoose"
import Image from "next/image"
import { getPercentage } from "@/app/functions/functions"
import CartButtons from "../components/cart-buttons"
import { auth } from "@/auth"
import User from "@/api/models/User"
import { ArrowLongLeftIcon, NoSymbolIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    const urlParams = await params
    const id = urlParams.id

    await dbConnect()

    async function getProduct() {
        try {
            const product = await (Product as mongoose.Model<InstanceType<typeof Product>>).findById(id)
            return product
        } catch (error) {
            console.log('here')
            console.error(error)
        }
        return null
    }

    const product = await getProduct()

    if (!product) {
        return <div className="text-white w-full h-screen flex flex-col justify-center items-center gap-y-5">
            <div className="flex gap-x-2 items-center text-[1.2rem]">
                <NoSymbolIcon className="w-8 h-8" />
                Product not found.
            </div>
            <Link href={'/'} className="flex items-center gap-x-2 text-sym-text-secondary hover:text-sym-text-primary transition-color duration-300">
                <ArrowLongLeftIcon className="w-6 h-6" />
                Return
            </Link>
        </div>
    }

    const session = await auth()

    async function getUser() {
        try {
            await dbConnect()
            const user = await (User as mongoose.Model<InstanceType<typeof User>>).findOne({ email: session?.user?.email })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    const user = await getUser()

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-x-10 max-lg:pt-[60px] border border-sym-border-light dark:border-sym-border rounded-[8px] overflow-hidden">

                <div className="h-full w-full">
                    <Image className="w-full h-full object-cover" width={500} height={500} src={product.images[0].image} alt={product.title} />
                </div>

                <div className="flex flex-col justify-between px-5 sm:px-10 py-20">

                    <div className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-[1.5rem] sm:text-[2rem] text-sym-text-light-focus dark:text-sym-text-primary">{product.title}</h1>
                            <div className="w-full border-b border-sym-border-light dark:border-sym-border"></div>
                            <div className="relative">
                                <p className="text-sym-text-light-focus dark:text-sym-text-primary text-[1rem] sm:text-[1.3rem]">{`$${getPercentage(product.discount, product.price)}`}</p>
                                <div className="absolute top-0 left-24 py-1 px-4 animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[0.8rem] sm:text-[0.9rem] rounded-[6px] font-bold text-white">{`${product.discount}% OFF`}</div>
                            </div>
                        </div>

                        <p className="text-sym-text-light dark:text-sym-text-primary max-sm:text-[0.9rem] text-balance">{product.description}</p>

                    </div>
                    <CartButtons
                        userId={user ? user.id : undefined}
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