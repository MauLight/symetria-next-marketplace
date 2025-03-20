import { PowerIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'
import React from 'react'
import Link from 'next/link'
import CartHub from './cart-hub'
import MobileMenu from './mobile-menu'

export default function Topbar() {
    return (
        <nav className="fixed w-full flex justify-center items-center z-20 bg-black max-md:pl-5 max-md:pr-2 md:max-[1440px]:px-5">
            <div className='w-full max-w-[1440px] h-[60px] flex justify-between items-center border-b border-[#292929]'>
                <Link href={'/home'}>
                    <h1 className='text-[1.1rem] text-[#ededed]'>Marketplace</h1>
                </Link>
                <div className='hidden md:flex items-center gap-x-6 text-[0.9rem]'>

                    <div className='relative group '>
                        <input className='w-[250px] h-10 border border-[#292929] text-[#ededed] outline-none pl-12' type="text" />
                        <MagnifyingGlassIcon className='absolute top-2 text-gray-500 group-hover:text-[#ededed] left-2 w-7 h-7 transition-color duration-300' />
                    </div>

                    <Link className='flex gap-x-2 items-center text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300' href='/profile'>
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
                        <button className="flex text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300 items-center justify-center gap-x-2 px-2 cursor-pointer">
                            <PowerIcon className="w-4 h-4" />
                            <div className="text-[0.9rem]">Sign Out</div>
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
