'use client'

import { useTheme } from '@/app/context/themeContext'
import Waves from '@/blocks/Backgrounds/Waves/Waves'
import React from 'react'

export default function HeroMatrix() {

    const { theme } = useTheme()

    return (
        <div className="absolute top-0 left-0 w-screen h-full flex flex-wrap overflow-hidden">
            <Waves
                lineColor={theme === 'light' ? '#c2c2c2' : '#292929'}
                backgroundColor="transparent"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
            />
            <div className="absolute top-0 left-0 w-screen h-full bg-radial from-20% from-transparent via-sym-light dark:via-black via-80% to-sym-light dark:to-black overflow-hidden opacity-80"></div>
        </div>
    )
}
