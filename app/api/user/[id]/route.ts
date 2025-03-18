import { NextResponse } from "next/server"
import dbConnect from "@/api/mongoose"
import mongoose from "mongoose"
import User from "@/api/models/User"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // get the id from the URL params
    const urlParams = await params
    const id = urlParams.id

    // parse the request body
    const {
        firstname,
        lastname,
        email,
        phone,
        street,
        street_number,
        house_number,
        city,
        state,
        country,
        zipcode,
    } = await request.json()

    // Validate required parameters
    if (!id || !firstname || !lastname || !email || !phone) {
        return NextResponse.json(
            { error: "Please provide all the required parameters." },
            { status: 400 }
        )
    }

    try {
        await dbConnect()

        // Look for the user by id
        const user = await (User as mongoose.Model<InstanceType<typeof User>>).findById(id)
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 })
        }

        // Update user properties
        user.firstname = firstname
        user.lastname = lastname
        user.email = email
        user.phone = phone
        user.street = street || ""
        user.street_number = street_number || ""
        user.house_number = house_number || ""
        user.city = city || ""
        user.state = state || ""
        user.country = country || ""
        user.zipcode = zipcode || ""

        // Save the updated document
        await user.save()

        // Optionally, fetch the updated user
        const updatedUser = await (User as mongoose.Model<InstanceType<typeof User>>).findById(id)
        return NextResponse.json({ updatedUser }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "An error occurred" }, { status: 500 })
    }
}