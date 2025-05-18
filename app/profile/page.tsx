export const revalidate = 60;

import User from "@/api/models/User"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Product from "@/api/models/Product";
import dbConnect from "@/api/mongoose"
import { auth } from "@/auth"
import mongoose from "mongoose"
import UserInformation from "./components/user-information"
import Wishlist from "./components/wishlist";

export default async function Page() {

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
        <div className='w-full max-w-[1440px] h-full flex flex-col pt-[150px]'>

            <section className="flex flex-col gap-y-10">
                <div>
                    <h1 className='text-[2.5rem] leading-12 text-sym-text-light-focus dark:text-sym-text-primary'>Profile</h1>
                    <p className='text-[1rem] text-sym-text-light dark:text-sym-text-secondary'>Edit your personal information and wishlist.</p>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-3">
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
                    <Wishlist userId={user.id} />
                </div>
            </section>

        </div>
    )
}
