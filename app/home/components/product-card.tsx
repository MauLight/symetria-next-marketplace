import { ProductProps } from "@/app/types/types"
import Image from "next/image"
import Link from "next/link"
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"

export default async function ProductCard({ product }: { product: ProductProps }) {

    function getPercentage() {
        const percentage = product.discount
        const price = product.price
        const discount = percentage ? (percentage / 100) * price : 0
        return (price - discount)
    }

    return (
        <div key={product.id} className="group relative h-[450px] col-span-1 overflow-hidden rounded-[6px]">

            <div className='h-full w-full overflow-hidden'>
                <Image width={1200} height={1200} key={product.id} src={product.images[0].image} alt="product" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out" />
            </div>

            <div className={"w-full absolute bottom-5 flex justify-between px-5 z-10 transition-all duration-300"}>
                <Link href={`/product/${product.id}`} className="flex flex-col">
                    <h1 aria-label={product.title} className='text-[1rem] min-[400px]:text-[1.2rem] uppercase antialiazed text-[#fff] leading-tight'>{product.title}</h1>
                    <div className="flex gap-x-2">
                        <p className='text-[16px] text-[#fff] uppercase antialiazed'>{`${getPercentage()}$`}</p>
                        {
                            product.discount !== undefined && product.discount > 0 && (
                                <p className='text-[12px] uppercase antialiazed text-gray-100 line-through'>{`${product.price}$`}</p>
                            )
                        }
                    </div>
                </Link>
                <div className="flex items-center gap-x-5">
                    <button aria-label='wishlist'>
                        <HeartIcon className='w-5 h-5 text-[#fff]' />
                    </button>
                    <button aria-label='add to cart' className='h-[50px] w-[50px] antialiased rounded-full bg-black border-t border-sym_gray-300 shadow-sm shadow-sym_gray-800 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 flex justify-center items-center cursor-pointer text-[#ffffff] hover:text-indigo-500'>
                        <ShoppingCartIcon className='w-5 h-5 text-[#fff]' />
                    </button>
                </div>
            </div>

            <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black via-transparent via-50% to-transparent opacity-50'>
            </div>

            <Link href={`/product/${product.id}`} className="absolute top-0 left-0 w-full sm:h-full flex justify-center items-center bg-[#10100e] opacity-0 group-hover:opacity-80 z-0 transition-color duration-500 ease-out">
                <p className="text-[#fff] text-[1.2rem] px-10">{product.description}</p>
            </Link>

        </div>
    )
}