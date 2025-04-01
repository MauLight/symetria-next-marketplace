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

            {/* Render a list of blocks colored in gradient, covered in gradients */}
            <div className="absolute top-0 left-0 w-screen h-full flex flex-wrap overflow-hidden opacity-70">
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