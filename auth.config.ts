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
            if (pathname.startsWith('/cart') || pathname.startsWith('/login') || pathname.startsWith('/sign') || pathname.startsWith('/admin') || pathname.startsWith('/home') || pathname.startsWith('/product')) return true

            //* Check if user is logged in if protected routes
            if (pathname.startsWith('/checkout') || pathname.startsWith('/confirmation') || pathname.startsWith('/profile')) return isLoggedIn

            //* Redirect to login if not logged in
            return isLoggedIn ? Response.redirect(new URL('/home', nextUrl)) : Response.redirect(new URL('/home', nextUrl))
        }
    }
} satisfies NextAuthConfig