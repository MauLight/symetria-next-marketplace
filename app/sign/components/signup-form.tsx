'use client'

import { register, State } from '@/api/actions'
import Link from 'next/link'
import React, { useActionState } from 'react'

export default function SignupForm() {

    const initialState: State = { message: null, errors: {} }
    const [state, formAction] = useActionState(register, initialState)

    return (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <main className='min-h-[400px] w-[350px] flex flex-col rounded-[10px] px-7 pb-10 bg-black gap-y-5 pt-9 z-20 border border-sym-border'>

                <h1 className='font-body text-sym-text-primary text-4xl text-center uppercase'>Welcome</h1>

                <form action={formAction} className="flex flex-col gap-y-2 pt-5 text-[0.9rem]">
                    <div className="flex gap-x-2">
                        <input
                            id="firstname"
                            type="firstname"
                            name="firstname"
                            placeholder='First name'
                            aria-describedby='firstname-error'
                            className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500 text-sym-text-primary'
                        />
                        <input
                            id="lastname"
                            type="lastname"
                            name="lastname"
                            placeholder='Last name'
                            aria-describedby='lastname-error'
                            className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500 text-sym-text-primary'
                        />
                    </div>

                    <div>
                        <div id='firstname-error' aria-live='polite' aria-atomic='true'>
                            {
                                state.errors?.firstname && state.errors.firstname.map((error: string) => (
                                    <small className='mt-2 text-sm text-red-500' key={error}>{error}</small>
                                ))
                            }
                        </div>
                        <div id='lastname-error' aria-live='polite' aria-atomic='true'>
                            {
                                state.errors?.lastname && state.errors.lastname.map((error: string) => (
                                    <small className='mt-2 text-sm text-red-500' key={error}>{error}</small>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder='Email'
                            aria-describedby='email-error'
                            className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500 text-sym-text-primary'
                        />
                        <div id='email-error' aria-live='polite' aria-atomic='true'>
                            {
                                state.errors?.email && state.errors.email.map((error: string) => (
                                    <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <input
                            id="phone"
                            type="phone"
                            name="phone"
                            placeholder='Phone'
                            aria-describedby='phone-error'
                            className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500 text-sym-text-primary'
                        />
                        <div id='phone-error' aria-live='polite' aria-atomic='true'>
                            {
                                state.errors?.phone && state.errors.phone.map((error: string) => (
                                    <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder='Password'
                            aria-describedby='password-error'
                            className='w-full h-9 bg-transparent rounded-[6px] border border-sym-border ring-0 focus:ring-0 focus:outline-none px-2 placeholder-sym_gray-500 text-sym-text-primary'
                        />
                        <div id='password-error' aria-live='polite' aria-atomic='true'>
                            {
                                state.errors?.password && state.errors.password.map((error: string) => (
                                    <p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
                                ))
                            }
                        </div>
                    </div>

                    <button type='submit' className='w-full h-10 flex justify-center items-center rounded-[6px] text-[16px] text-sym-text-primary mt-1 uppercase bg-black hover:bg-indigo-500 active:bg-black border border-sym-border'>Sign Up</button>
                    <div className="flex justify-center items-center pt-2">
                        <div className="w-full border-b border-sym-border"></div>
                        <p className='text-[14px] font-body text-sym-text-secondary px-5 uppercase'>marketplace</p>
                        <div className="w-full border-b border-sym-border"></div>
                    </div>
                </form>
                <div className="w-full flex justify-center mt-5 text-[0.9rem]">
                    <small className="flex gap-x-1 text-sym-text-secondary">{"Already have an account?"}<Link className="text-indigo-500" href={'/login'}>Log in.</Link></small>
                </div>
            </main>
        </div>
    )
}
