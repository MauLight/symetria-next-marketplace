'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import dbConnect from "./mongoose"
import User from "./models/User"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"
import { z } from "zod"

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

const UserSchema = z.object({
    firstname: z.string({ invalid_type_error: 'First name is required.' }),
    lastname: z.string({ invalid_type_error: 'Last name is required.' }),
    email: z.string({ invalid_type_error: 'Email is required.' }).email(),
    phone: z.string({ invalid_type_error: 'Phone number is required.' }),
    password: z.string({ invalid_type_error: 'Password is required' }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit."
    ),
})

export type State = {
    errors?: {
        firstname?: string[]
        lastname?: string[]
        email?: string[]
        phone?: string[]
        password?: string[]
    },
    message?: string | null
}

export async function register(prevState: State, formData: FormData) {

    const validatedFields = UserSchema.safeParse({
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        }
    }

    const { firstname, lastname, email, phone, password } = validatedFields.data

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

    redirect('/login?from=register')
}

interface User {
    firstname: string
    lastname: string
    email: string
    phone: number
    password: string
}