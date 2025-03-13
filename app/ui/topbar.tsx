import { PowerIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'
import React from 'react'

export default function Topbar() {
    return (
        <nav className="h-[60px] border-b border-gray-200">
            <form
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' })
                }}
            >
                <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
        </nav>
    )
}
