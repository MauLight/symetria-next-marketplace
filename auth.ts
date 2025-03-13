import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from "zod"
import bcryptjs from 'bcryptjs'

import mongoose from "mongoose"
import User from '@/api/models/User'
import dbConnect from "./api/mongoose"


async function getUser(email: string): Promise<InstanceType<typeof User> | null> {

    try {
        await dbConnect()
        const user = await (User as mongoose.Model<InstanceType<typeof User>>).findOne({ email })
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null;
                    const passwordsMatch = await bcryptjs.compare(password, user.passwordHash)

                    if (passwordsMatch) return user
                }
                console.log('Invalid credentials')
                return null
            },
        }),
        Google
    ]
})