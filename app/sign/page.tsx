import { Suspense, type JSX } from 'react'
import SignupForm from './components/signup-form'
import SignTopbar from '../ui/signTopbar'

export default function Page(): JSX.Element {
    return (
        <div className='relative w-full min-h-screen flex justify-center items-center text-[2rem] bg-black'>
            <Suspense fallback={<LoginFallback />}>
                <SignupForm />
            </Suspense>
            <SignTopbar />
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