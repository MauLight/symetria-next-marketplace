import Product from "@/api/models/Product"
import dbConnect from "@/api/mongoose"
import mongoose from "mongoose"

export const dynamic = 'force-static'

async function listProducts() {
    await dbConnect()
    const products = await (Product as mongoose.Model<InstanceType<typeof Product>>).find({})

    return products
}

export async function GET() {
    try {
        return Response.json(await listProducts())
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}