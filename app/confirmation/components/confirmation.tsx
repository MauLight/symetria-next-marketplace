/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Fallback from '@/app/ui/Fallback'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/app/context/cartContext'

const backUrl = 'https://symetria.ngrok.io'

export default function Confirmation({ userId }: { userId: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token_ws')

    const { cleanCart } = useCart()

    const [buyOrder, setBuyOrder] = useState<string | undefined>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function handleConfirmationAsync() {

        if (token && buyOrder !== '') {
            const { data } = await axios.post(`${backUrl}/transbank/confirm`, { userId, token, buyOrder })

            if (data.status === 'AUTHORIZED') {
                setIsLoading(false)
                localStorage.removeItem('marketplace-cart')
                localStorage.removeItem('transbank-order')
                cleanCart()

                setTimeout(() => {
                    router.push('/')
                }, 4000)
                return
            }
            if (data.status === 'FAILED') {
                setIsLoading(false)
                setTimeout(() => {
                    router.push('/checkout')
                }, 4000)
                return
            }
        }

        setTimeout(() => {
            router.push('/')
        }, 4000)

        return null
    }

    useEffect(() => {
        const transbankStr = localStorage.getItem('transbank-order')
        const transbank: { token: string, url: string, buyOrder: string } | null = transbankStr ? JSON.parse(transbankStr) : null
        console.log(transbank?.buyOrder, 'The order')
        setBuyOrder(transbank?.buyOrder)
    }, [])

    useEffect(() => {
        handleConfirmationAsync()
    }, [buyOrder])

    return (
        <div className={`w-full h-screen flex justify-center items-center bg-black`}>
            <div className='w-web'>
                {
                    isLoading ? (
                        <Fallback color='#ededed' />
                    )
                        :
                        (
                            <div className="h-[80%] flex flex-col justify-center items-center gap-y-5 text-[#ededed]">
                                <CheckCircleIcon className='w-[70px] h-[70px] text-green-500' />
                                <p className='text-[1.5rem] antialiased'> Your payment has been confirmed.</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
