import { NextResponse } from "next/server"
import Order from "@/api/models/Order"
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'
import mongoose from "mongoose"

export async function POST(request: Request) {
    const { sessionId, amount } = await request.json()
    const returnUrl = 'http://localhost:3000/confirmation'

    if (!sessionId || !amount) {
        return NextResponse.json(
            { error: 'You have to provide the required parameters for this transaction; buyOrder, sessionId, amount and returnUrl.' },
            { status: 401 }
        )
    }

    try {
        // Create order and obtain the buyOrder from the created order
        const order = await (Order as mongoose.Model<InstanceType<typeof Order>>).create({ sessionId, amount })
        const buyOrder = order.id

        // Instantiate the transaction with your WebpayPlus configuration
        const tx = new WebpayPlus.Transaction(
            new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
        )

        // Create the transaction
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl)

        return NextResponse.json({ ...response, buyOrder }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 })
    }
}
