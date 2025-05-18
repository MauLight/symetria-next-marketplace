import { PowerIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { signOut, auth } from '@/auth'
import React from 'react'
import Link from 'next/link'
import CartHub from './cart-hub'
import MobileMenu from './mobile-menu'


export default async function Topbar() {

    const session = await auth()
    console.log(session)

    return (
        <nav className="fixed w-full flex justify-center items-center z-20 max-md:pl-5 max-md:pr-2 md:max-[1440px]:px-5 bg-sym-light dark:bg-black border-b border-sym-border-light dark:border-sym-border">
            <div className='w-full max-w-[1440px] h-[60px] flex justify-between items-center'>
                <Link href={'/home'}>
                    <h1 className='text-[1.1rem] text-sym-text-light-focus dark:text-sym-text-primary'>Marketplace</h1>
                </Link>
                <div className='hidden md:flex items-center gap-x-8 text-[0.9rem]'>

                    <div className='relative group '>
                        <input className='w-[250px] h-10 border border-sym-border-light dark:border-sym-border text-sym-text-light dark:text-sym-text-primary outline-none pl-12 rounded-[4px]' type="text" />
                        <MagnifyingGlassIcon className='absolute top-2 text-gray-400 dark:text-gray-500 group-hover:text-sym-text-primary left-2 w-6 h-6 transition-color duration-300' />
                    </div>

                    <Link className='flex gap-x-1 items-center text-sym-text-light dark:text-sym-text-secondary hover:text-sym-text-light-focus dark:hover:text-sym-text-primary transition-color duration-300' href='/profile'>
                        <UserIcon className="w-4 h-4" />
                        Profile
                    </Link>

                    <CartHub />

                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/login' })
                        }}
                    >
                        <button className="flex text-sym-text-light dark:text-sym-text-secondary hover:text-sym-text-light-focus dark:hover:text-sym-text-primary transition-color duration-300 items-center justify-center gap-x-1 px-2 cursor-pointer">
                            <PowerIcon className="w-4 h-4" />
                            <div className="text-[0.9rem]">{session ? 'Sign Out' : 'Sign In'}</div>
                        </button>
                    </form>
                </div>
                <MobileMenu action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' })
                }} />
            </div>
        </nav>
    )
}
