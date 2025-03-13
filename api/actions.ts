'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import dbConnect from "./mongoose"
import User from "./models/User"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export async function register(formData: FormData) {
    const firstname = formData.get('firstname')
    const lastname = formData.get('lastname')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const password = formData.get('password')

    const isPasswordInvalid = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password as string)
    if (isPasswordInvalid) {
        toast.error('Invalid password.')
        return { error: 'Invalid password.' }
    }

    try {
        await dbConnect()
        const phoneExists = await (User as mongoose.Model<InstanceType<typeof User>>).findOne({ phone })
        const emailExists = await (User as mongoose.Model<InstanceType<typeof User>>).findOne({ email })
        if (phoneExists) {
            toast.error('Phone number already exists.')
            return { error: 'Phone number already exists.' }
        }
        if (emailExists) {
            toast.error('Email already exists.')
            return { error: 'Email already exists.' }
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password as string, saltRounds)

        await (User as mongoose.Model<InstanceType<typeof User>>).create({
            firstname,
            lastname,
            email,
            phone,
            passwordHash
        })
    } catch (error) {
        console.error(error)
        toast.error('Failed to create user.')
        return { error: 'Database Error: Failed to create user.' }
    }

    redirect('/dashboard/invoices')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}