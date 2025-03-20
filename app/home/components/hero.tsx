'use client'

import { motion } from "motion/react"
import { type ReactNode } from "react"

const fadeIn = (direction: string, delay: number) => {
    return {
        hidden: {
            y: direction === 'top' ? 10 : direction === 'down' ? -10 : 0,
            opacity: 0,
            x: direction === 'left' ? 10 : direction === 'right' ? -10 : 0
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.5,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    }
}

export default function Hero({ children }: { children: ReactNode }) {
    return (
        <div className='w-full h-[950px] flex flex-col items-start justify-start gap-y-20'>
            <div className="h-[25%]"></div>
            <div className="z-10 w-full">
                <div className="w-full max-w-[1000px] mx-auto">
                    <motion.h1
                        variants={fadeIn('top', 0.2)}
                        initial={'hidden'}
                        whileInView={'show'}
                        className='w-full text-[2.2rem] z-auto min-[400px]:text-[3rem] sm:text-[5rem] max-[400px]:text-center lg:text-[8.5rem] leading-none uppercase animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent font-semibold tracking-tight bg-clip-text max-sm:px-5'>Marketplace</motion.h1>
                    <p className='w-full text-[0.9rem] max-[400px]:text-center max-sm:px-5 sm:text-[1.2rem] text-[#fff] z-10 text-balance leading-tight'>The best place to buy stuff</p>
                </div>
            </div>
            <div className="h-[5%]"></div>
            {
                children
            }
        </div>
    )
}
