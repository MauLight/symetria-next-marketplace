import { NextResponse } from "next/server"
import Order from "@/api/models/Order"
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'
import mongoose from "mongoose"
import User from "@/api/models/User"
import dbConnect from "@/api/mongoose"

export async function POST(request: Request) {
    const { userId, token, buyOrder } = await request.json()

    if (!userId || !token || !buyOrder) {
        return NextResponse.json(
            { error: 'One or more parameters are missing.' },
            { status: 404 }
        )
    }

    try {
        await dbConnect()

        const order = await (Order as mongoose.Model<InstanceType<typeof Order>>).findById(buyOrder)
        if (!order) {
            return NextResponse.json({ error: 'Buy order does not exist.' }, { status: 400 })
        }

        const user = await (User as mongoose.Model<InstanceType<typeof User>>).findById(userId)
        if (!user) {
            return NextResponse.json({ error: 'User does not exist.' }, { status: 400 })
        }

        const tx = new WebpayPlus.Transaction(
            new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
        )

        const response = await tx.commit(token)

        console.log(response, 'THE RESPONSE')

        if (response.status === 'AUTHORIZED') {
            order.status = 'completed'
            await order.save()

            // Assuming purchaseHistory is an array; adjust as needed
            user.purchaseHistory.push(order.id)
            await user.save()
        } else {
            order.status = 'failed'
            await order.save()
        }

        // Here is where the call to SII would take place if needed.

        return NextResponse.json({ ...response }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 })
    }
}