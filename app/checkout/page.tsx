import ShippingOptions from "./components/ShippingOptions"
import dbConnect from "@/api/mongoose"
import User from "@/api/models/User"
import mongoose from "mongoose"
import { auth } from "@/auth"

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
        <>
            <div className="w-full h-full min-h-screen flex justify-center items-start pt-10 bg-black">
                <div className="w-full max-w-[1440px]">
                    <ShippingOptions
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
                </div>
            </div>
        </>
    )
}
