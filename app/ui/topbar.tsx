import { PowerIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'
import React from 'react'
import Link from 'next/link'

export default function Topbar() {
    return (
        <nav className="fixed w-full flex justify-center items-center">
            <div className='w-[1440px] h-[60px] flex justify-between items-center border-b border-[#292929]'>
                <h1 className='text-[1.1rem] text-[#fff]'>Marketplace</h1>
                <div className='flex items-center gap-x-5'>
                    <div className='relative group'>
                        <input className='w-[250px] h-10 border border-[#292929] text-[#fff] outline-none pl-12' type="text" />
                        <MagnifyingGlassIcon className='absolute top-2 text-gray-500 group-hover:text-[#fff] left-2 w-7 h-7 transition-color duration-300' />
                    </div>
                    <Link className='text-[#a1a1a1] hover:text-[#fff] transition-color duration-300' href='/'>
                        Profile
                    </Link>

                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/login' })
                        }}
                    >
                        <button className="flex items-center justify-center gap-x-2 px-2 cursor-pointer">
                            <PowerIcon className="w-4 h-4" />
                            <div className="text-[1rem] text-[#a1a1a1] hover:text-[#fff] transition-color duration-300">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
