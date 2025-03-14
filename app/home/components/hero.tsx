'use client'

import { motion } from "motion/react"

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

export default function Hero() {
    return (
        <div className='w-full h-[950px] flex flex-col items-start justify-start gap-y-20'>
            <div className="h-[40%]"></div>
            <div>
                <motion.h1
                    variants={fadeIn('top', 0.2)}
                    initial={'hidden'}
                    whileInView={'show'}
                    className='text-[2rem] min-[400px]:text-[3rem] sm:text-[5rem] lg:text-[8.5rem] leading-none uppercase animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent font-semibold tracking-tight bg-clip-text z-10 max-sm:px-5'>Marketplace</motion.h1>
                <p className='w-full text-[0.9rem] max-[400px]:text-center sm:text-[16px] text-[#fff] z-10 uppercase text-balance leading-tight'>The best place to buy stuff</p>
            </div>
            <div className="h-[25%]"></div>
            <div className="w-full flex justify-center">
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className=" w-[180px] h-[180px] border border-[#292929]"></div>
                    ))
                }
            </div>
        </div>
    )
}
