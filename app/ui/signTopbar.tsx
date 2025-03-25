import Link from 'next/link'
import React from 'react'

export default function SignTopbar() {
    return (
        <div className='absolute top-0 right-0 w-full flex justify-center'>
            <div className="w-full max-w-[1440px] max-sm:px-5 h-[60px] flex items-center justify-end">
                <Link className='text-sym-text-secondary hover:text-indigo-500 transition-color duration-300 text-[1rem]' href={'/home'}>Back to home</Link>
            </div>
        </div>
    )
}
