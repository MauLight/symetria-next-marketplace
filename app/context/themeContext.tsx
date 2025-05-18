'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useLayoutEffect } from "react"

interface ThemeContextProps {
    theme: string
    setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>('light')

    useLayoutEffect(() => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isDark) {
            setTheme('dark')
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`transition-color duration-300 ${theme} ${theme === 'light' ? 'bg-primary' : 'bg-black'}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}