import { ProductProps } from "@/app/types/types"
import Image from "next/image"
import Link from "next/link"
import ProductDescription from "./product-description"

export default async function ProductCard({ product }: { product: ProductProps }) {
    return (
        <div key={product.id} className="group relative h-[450px] col-span-1 overflow-hidden rounded-[6px]">

            <div className='h-full w-full overflow-hidden'>
                <Image width={1200} height={1200} key={product.id} src={product.images[0].image} alt="product" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out" />
            </div>

            <ProductDescription
                id={product.id}
                title={product.title}
                discount={product.discount as number}
                price={product.price}
                image={product.images[0].image}
            />

            <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black via-transparent via-50% to-transparent opacity-50'>
            </div>

            <Link href={`/product/${product.id}`} className="absolute top-0 left-0 w-full sm:h-full flex justify-center items-center bg-[#10100e] opacity-0 group-hover:opacity-80 z-0 transition-color duration-500 ease-out">
                <p className="text-[#fff] text-[1.2rem] px-10">{product.description}</p>
            </Link>

        </div>
    )
}