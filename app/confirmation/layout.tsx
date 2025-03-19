import User from "@/api/models/User"
import dbConnect from "@/api/mongoose"
import { auth } from "@/auth"
import mongoose from "mongoose"
import Confirmation from "./components/confirmation"

export default async function Layout({ children }: { children: React.ReactNode }) {

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
        <div className="w-full min-h-screen flex flex-col items-center bg-black pb-20">

            <Confirmation userId={user.id} />
            {children}

        </div>
    )
}