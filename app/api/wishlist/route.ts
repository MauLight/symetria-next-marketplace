import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import Product from '@/api/models/Product'
import User from '@/api/models/User'
import mongoose from 'mongoose'
import { WishlistItem, wishListProduct } from '@/app/types/types'

export async function POST(request: Request) {
    // Parse JSON from the request body
    const { userId, productId } = await request.json()

    // Validate required parameters
    if (!userId || !productId) {
        return NextResponse.json(
            { error: 'Please provide the parameters needed for this operation.' },
            { status: 400 }
        )
    }

    try {
        // Find the product by its id
        const product = await (Product as mongoose.Model<InstanceType<typeof Product>>).findById(productId)
        if (!product) {
            return NextResponse.json(
                { error: 'Product does not exist.' },
                { status: 404 }
            )
        }

        // Find the user by its id
        const user = await (User as mongoose.Model<InstanceType<typeof User>>).findById(userId)
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist.' },
                { status: 404 }
            )
        }

        // Check if the product is already in the wishlist
        const wasAdded = user.wishlist.filter((elem: WishlistItem) => elem.toString() === productId)
        if (wasAdded.length > 0) {
            return NextResponse.json(
                { error: 'Item is already in wishlist.' },
                { status: 400 }
            )
        }

        // Add productId to user's wishlist and save
        user.wishlist.push(productId)
        await user.save()

        // Optionally, populate the wishlist in the updated user
        const updatedUser = await (User as mongoose.Model<InstanceType<typeof User>>).findById(userId).populate('wishlist')
        return NextResponse.json(
            { wishlist: updatedUser.wishlist, message: 'Item added to wishlist successfully.' },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request) {
    // Parse the JSON body containing userId and productId
    const { userId, productId } = await request.json()

    if (!userId || !productId) {
        return NextResponse.json(
            { error: 'Please provide the parameters needed for this operation.' },
            { status: 400 }
        )
    }

    try {
        // Check if the product exists
        const product = await (Product as mongoose.Model<InstanceType<typeof Product>>).findById(productId)
        if (!product) {
            return NextResponse.json(
                { error: 'Product does not exist.' },
                { status: 404 }
            )
        }

        // Find the user and populate the wishlist field
        const user = await (User as mongoose.Model<InstanceType<typeof User>>).findById(userId).populate('wishlist')
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist.' },
                { status: 404 }
            )
        }

        // Check if the product is in the user's wishlist
        const inWishlist = user.wishlist.find((elem: wishListProduct) => elem.id === productId)
        if (!inWishlist) {
            return NextResponse.json(
                { error: 'Item not found in wishlist.' },
                { status: 404 }
            )
        }

        // Remove the product from the wishlist
        user.wishlist = user.wishlist.filter((elem: wishListProduct) => elem.id !== productId)
        await user.save()

        revalidatePath('/profile')
        const updatedUser = await (User as mongoose.Model<InstanceType<typeof User>>).findById(userId).populate('wishlist')
        return NextResponse.json(
            { wishlist: updatedUser.wishlist, message: 'Item removed from wishlist successfully.' },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}