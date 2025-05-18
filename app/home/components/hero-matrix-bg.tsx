'use client'

import { useTheme } from '@/app/context/themeContext'
import React from 'react'

export default function HeroMatrix() {

    const { theme } = useTheme()

    if (theme === 'light') return null

    return (
        <>
            {/* Render a list of blocks colored in gradient, covered in gradients */}
            <div className="absolute top-0 left-0 w-screen h-full flex flex-wrap overflow-hidden">
                <div className="absolute top-0 left-0 w-screen h-full bg-black opacity-60"></div>
                <div className="absolute top-0 left-0 w-screen h-full bg-radial from-0% from-transparent via-black via-80% to-black overflow-hidden">
                </div>
                {
                    Array.from({ length: 300 }).map((_, i) => (
                        <div key={i} className="w-[calc(100%/20)] h-[calc(100%/10)] animated-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            <div className="w-full h-full bg-black scale-[98%]"></div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
