import { NextResponse } from "next/server"
import dbConnect from "@/api/mongoose"
import mongoose from "mongoose"
import User from "@/api/models/User"
import Product from "@/api/models/Product"

import { auth } from '@/auth'

export async function GET() {
    try {
        // Here, auth() retrieves the session. Adjust if your auth function requires request headers/cookies.
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        await dbConnect()
        await (Product as mongoose.Model<InstanceType<typeof Product>>).find({})

        const user = await (User as mongoose.Model<InstanceType<typeof User>>)
            .findOne({ email: session.user.email })
            .populate('wishlist')

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}