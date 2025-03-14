import { PowerIcon, MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'
import React from 'react'
import Link from 'next/link'

export default function Topbar() {
    return (
        <nav className="fixed w-full flex justify-center items-center z-20 bg-black">
            <div className='w-[1440px] h-[60px] flex justify-between items-center border-b border-[#292929]'>
                <Link href={'/home'}>
                    <h1 className='text-[1.1rem] text-[#ededed]'>Marketplace</h1>
                </Link>
                <div className='flex items-center gap-x-6'>

                    <div className='relative group '>
                        <input className='w-[250px] h-10 border border-[#292929] text-[#ededed] outline-none pl-12' type="text" />
                        <MagnifyingGlassIcon className='absolute top-2 text-gray-500 group-hover:text-[#ededed] left-2 w-7 h-7 transition-color duration-300' />
                    </div>

                    <Link className='flex gap-x-2 items-center text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300' href='/'>
                        <UserIcon className="w-4 h-4" />
                        Profile
                    </Link>

                    <Link className='flex gap-x-2 items-center text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300' href='/cart'>
                        <ShoppingCartIcon className="w-4 h-4" />
                        Your Cart
                    </Link>

                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/login' })
                        }}
                    >
                        <button className="flex text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300 items-center justify-center gap-x-2 px-2 cursor-pointer">
                            <PowerIcon className="w-4 h-4" />
                            <div className="text-[1rem]">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
