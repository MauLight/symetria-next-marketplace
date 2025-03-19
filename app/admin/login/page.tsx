'use client'

import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                <main className='min-h-[400px] w-[300px] flex flex-col rounded-[10px] px-7 pb-2 bg-[#ffffff] gap-y-5 pt-9 z-20 border border-gray-200'>

                    <h1 className='font-body text-[#10100e] text-4xl text-center uppercase'>Welcome</h1>

                    <form className="flex flex-col gap-y-2 pt-5 text-[0.9rem]">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder='Email'
                            className='w-full h-9 bg-gray-50 rounded-[3px] border border-gray-300 ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500'
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder='Password'
                            className='w-full h-9 bg-gray-50 rounded-[3px] border border-gray-300 ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500'
                        />

                        <button type="button" onClick={() => { router.push('/admin/dashboard') }} className='w-full h-10 font-body text-[16px] text-[#fff] mt-1 uppercase bg-[#10100e] hover:bg-indigo-500 active:bg-[#10100e]'>Log in</button>
                        <div className="flex justify-center items-center pt-2">
                            <div className="w-full border-b border-gray-300"></div>
                            <p className='text-[14px] font-body text-gray-500 px-5 uppercase'>Admin</p>
                            <div className="w-full border-b border-gray-300"></div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}
