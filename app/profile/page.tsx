import User from "@/api/models/User"
import dbConnect from "@/api/mongoose"
import { auth } from "@/auth"
import mongoose from "mongoose"
import UserInformation from "./components/user-information"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default async function Page() {

    const session = await auth()

    //* Connect to the database and list all products
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
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="w-full h-[120px] flex items-center justify-between py-2 px-5 border border-[#292929] rounded-[6px]">
                                        <div className="flex gap-x-5">
                                            <div className="w-[100px] h-[100px] border border-[#292929]"></div>
                                            <div className="flex flex-col justify-center">
                                                <h1 className="text-[1.2rem]">Title</h1>
                                                <p className="text-[#a1a1a1]">Price</p>
                                            </div>
                                        </div>
                                        <button className="flex flex-col items-center text-[#a1a1a1] hover:text-green-500 transition-color duration-300">
                                            <ShoppingCartIcon className="w-6 h-6" />
                                            <small>Add to Cart</small>
                                        </button>
                                    </div>
                                ))
                            }
                        </>
                    </div>
                </div>
            </section>

        </div>
    )
}
