import { Suspense, type JSX } from 'react'
import LoginForm from './components/login-form'

export default function Page(): JSX.Element {
    return (
        <div className='relative w-full min-h-screen flex justify-center items-center text-[2rem]'>
            <Suspense fallback={<LoginFallback />}>
                <LoginForm />
            </Suspense>
            <video
                loop
                muted
                autoPlay
                src="/Sign_video1.webm"
                className='w-full h-screen object-cover'
            />
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