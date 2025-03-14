import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    providers: [],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const { pathname } = nextUrl

            //* Allow access to public routes
            if (pathname.startsWith('/login') || pathname.startsWith('/signup')) return true

            //* Check if user is logged in if protected routes
            if (pathname.startsWith('/home') || pathname.startsWith('/product') || pathname.startsWith('/cart')) return isLoggedIn

            //* Redirect to login if not logged in
            return isLoggedIn ? Response.redirect(new URL('/home', nextUrl)) : false
        }
    }
} satisfies NextAuthConfig