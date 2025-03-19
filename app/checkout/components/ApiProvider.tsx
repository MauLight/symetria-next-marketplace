'use client'

import { APIProvider } from "@vis.gl/react-google-maps"
import { ReactNode } from "react"
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function GoogleApiProvider({ children }: { children: ReactNode }) {
    return (
        <APIProvider onLoad={() => { console.log('Maps loaded.') }} apiKey={apiKey as string}>
            {children}
        </APIProvider>
    )
}
