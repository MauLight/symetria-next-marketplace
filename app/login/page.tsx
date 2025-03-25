import { Suspense, type JSX } from 'react'
import LoginForm from './components/login-form'
import Fallback from '../ui/Fallback'
import SignTopbar from '../ui/signTopbar'

export default function Page(): JSX.Element {

    return (
        <div className='relative w-full min-h-screen flex justify-center items-center text-[2rem] bg-black'>
            <Suspense fallback={<LoginFallback />}>
                <LoginForm />
            </Suspense>
            <SignTopbar />
        </div>
    )
}

function LoginFallback(): JSX.Element {
    return (
        <div className=''>
            <Fallback color='#ededed' />
        </div>
    )
}