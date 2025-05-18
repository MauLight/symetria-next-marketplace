

import Link from 'next/link'
import Image from 'next/image'
import { ProductProps } from '@/app/types/types'

export default function ProductsHub({ products }: { products: ProductProps[] }) {
    return (
        <div className="w-full flex flex-wrap justify-center items-center gap-x-5 rounded-md overflow-hidden z-auto">
            {
                products?.slice(0, 5).map((product: ProductProps) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={`id-${product.id}`}
                        className="relative group w-[120px] sm:w-[180px] h-[120px] sm:h-[180px] cursor-pointer rounded-[6px] overflow-hidden glass border border-sym-border-light dark:border-sym-border">
                        <Image width={180} height={180} className="h-full scale-90 object-cover z-0 rounded-[4px] group-hover:scale-105 transition-all duration-500" src={product.images[0].image} alt={product.title} />
                        <div className="absolute hidden dark:flex top-0 left-0 w-full h-full bg-radial from-20% from-transparent to-[#10100e] opacity-20"></div>
                        <div
                            className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-transparent group-hover:bg-[#10100e] opacity-60 transition-all duration-200 rounded-[4px]">
                        </div>
                        <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 text-transparent text-center group-hover:text-[#fff] transition-all duration-300">{product.title}</p>
                    </Link>
                ))
            }
        </div>
    )
}
