import User from "@/api/models/User";
import dbConnect from "@/api/mongoose";
import { auth } from "@/auth";
import mongoose from "mongoose";

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
        <div className='w-[1440px] border border-white min-h-screen flex flex-col pt-[100px]'>
            {
                user && (
                    <>
                        <div>
                            <h1 className='text-[2.5rem] leading-10 text-[#ededed]'>Profile</h1>
                            <p className='text-[1.5rem] text-[#a1a1a1]'>Edit your personal information and wishlist.</p>
                        </div>
                    </>
                )
            }
        </div>
    )
}
