export const revalidate = 60;

import User from "@/api/models/User"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Product from "@/api/models/Product";
import dbConnect from "@/api/mongoose"
import { auth } from "@/auth"
import mongoose from "mongoose"
import UserInformation from "./components/user-information"
import { ProductProps } from "../types/types"
import { getPercentage } from "../functions/functions"
import Image from "next/image"
import WishlistButtons from "./components/wishlist-buttons"
import { PlusCircleIcon } from "@heroicons/react/24/outline"

export default async function Page() {

    const session = await auth()

    async function getUser() {
        try {
            await dbConnect()

            const user = await (User as mongoose.Model<InstanceType<typeof User>>).findOne({ email: session?.user?.email }).populate('wishlist')
            return user
        } catch (error) {
            console.log(error)
        }
    }

    const user = await getUser()

    return (
        <div className='w-[1440px] h-full flex flex-col pt-[150px]'>

            <section className="flex flex-col gap-y-10">
                <div>
                    <h1 className='text-[2.5rem] leading-12 text-[#ededed]'>Profile</h1>
                    <p className='text-[1rem] text-[#a1a1a1]'>Edit your personal information and wishlist.</p>
                </div>
                <div className="w-full grid grid-cols-3">
                    <UserInformation
                        id={user.id}
                        firstname={user.firstname}
                        lastname={user.lastname}
                        email={user.email}
                        phone={user.phone}
                        street={user.street}
                        street_number={user.street_number}
                        house_number={user.house_number}
                        state={user.state}
                        city={user.city}
                        country={user.country}
                        zipcode={user.zipcode}
                    />
                    <div className="col-span-2 flex flex-col gap-y-8 py-5 pr-5 pl-10 text-[#ededed] border-l border-[#292929]">
                        <h1 className="text-[1.5rem]">Wishlist</h1>
                        <>
                            {
                                user.wishlist.length > 0 ? (
                                    <>
                                        {
                                            user.wishlist.map((product: ProductProps) => (
                                                <div key={product.id} className="w-full h-[120px] flex items-center justify-between py-2 px-5 border border-[#292929] rounded-[6px]">
                                                    <div className="flex gap-x-5">
                                                        <div className="w-[100px] h-[100px] border border-[#292929]">
                                                            <Image width={100} height={100} src={product.images[0].image} alt={product.title} />
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <h1 className="text-[1.2rem]">{product.title}</h1>
                                                            <p className="text-[#a1a1a1]">${getPercentage(product.discount as number, product.price)}</p>
                                                        </div>
                                                    </div>
                                                    <WishlistButtons
                                                        userId={user.id}
                                                        productId={product.id}
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
                </div>
            </section>

        </div>
    )
}
