'use client'

import React from 'react'
import { useTheme } from '@/app/context/themeContext'

//* Components
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'

export default function ThemeSwitch() {

    const { theme, setTheme } = useTheme()

    return (
        <div className='flex gap-x-8 min-[500px]:gap-x-2 items-center justify-end'>
            <button onClick={() => { setTheme('dark') }}>
                <MoonIcon className={`w-6 h-6 ${theme === 'light' ? 'text-sym-gray-800 hover:text-secondary' : 'text-sym-text-primary hover:text-secondary'} transition-color duration-300`} />
            </button>
            <button onClick={() => { setTheme('light') }}>
                <SunIcon className={`w-6 h-6 ${theme === 'light' ? 'text-sym-gray-800 hover:text-secondary' : 'text-sym-text-primary hover:text-secondary'} transition-color duration-300`} />
            </button>
        </div>
    )
}
