import { Suspense, type JSX } from 'react'
import LoginForm from './components/login-form'

export default function Page(): JSX.Element {

    return (
        <div className='relative w-full min-h-screen flex justify-center items-center text-[2rem]'>
            <Suspense fallback={<LoginFallback />}>
                <LoginForm />
            </Suspense>
            <div className='w-full h-screen bg-black'></div>
            <video loop muted autoPlay playsInline className='w-full h-screen object-cover'>
                <source src="/Sign_video1.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

function LoginFallback(): JSX.Element {
    return (
        <div className=''>
            Loading...
        </div>
    )
}