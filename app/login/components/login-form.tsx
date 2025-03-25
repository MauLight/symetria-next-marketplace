'use client'

import { useActionState, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { authenticate } from "@/api/actions"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"
import { RotatingLines } from "react-loader-spinner"
import Link from "next/link"


export default function LoginForm() {

    const searchParams = useSearchParams()
    const from = searchParams.get("from")
    const [loading, setLoading] = useState<boolean>(false)

    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    useEffect(() => {
        if (from) {
            toast.success('User created succesfully.')
        }
    }, [from])

    useEffect(() => {
        if (errorMessage) {
            setLoading(false)
        }
    }, [errorMessage])

    return (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <main className='min-h-[400px] w-[300px] flex flex-col rounded-[10px] px-7 pb-2 bg-black gap-y-5 pt-9 z-20 border border-sym-border'>

                <h1 className='font-body text-sym-text-primary text-4xl text-center uppercase'>Welcome</h1>

                <form action={formAction} className="flex flex-col gap-y-2 pt-5 text-[0.9rem]">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder='Email'
                        className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500'
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder='Password'
                        className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500'
                    />
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <button onClick={() => { setLoading(true) }} aria-disabled={isPending} type='submit' className='w-full h-10 flex justify-center items-center rounded-[6px] text-[16px] text-sym-text-primary mt-1 uppercase bg-black hover:bg-indigo-500 active:bg-black border border-sym-border'>
                        {
                            loading ? <RotatingLines width="25" strokeColor="#ededed" /> : 'Log in'
                        }
                    </button>

                    <div className="flex justify-center items-center pt-2">
                        <div className="w-full border-b border-sym-border"></div>
                        <p className='text-[14px] font-body text-sym-text-secondary px-5 uppercase'>marketplace</p>
                        <div className="w-full border-b border-sym-border"></div>
                    </div>

                </form>

                <div className="w-full flex justify-center mt-7 text-[0.9rem]">
                    <small className="flex gap-x-1 text-sym-text-secondary">{"Don't have an account?"}<Link className="text-indigo-500" href={'/sign'}>Sign up.</Link></small>
                </div>
                {
                    errorMessage && (
                        <div className="flex justify-center items-center gap-x-2">
                            <ExclamationCircleIcon className='w-5 h-5 text-red-500' />
                            <small className='text-red-500 text-sm'>{errorMessage}</small>
                        </div>
                    )
                }
            </main>
        </div>
    )
}
