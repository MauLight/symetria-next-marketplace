'use client'

import Noise from '@/blocks/Animations/Noise/Noise'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import useMeasure from 'react-use-measure'

export default function DoubleHero() {

    const [ref, bounds] = useMeasure()

    useEffect(() => {
        console.log(bounds.width)
    }, [bounds])

    return (
        <div ref={ref} className="w-full max-w-[1440px] max-lg:py-20 lg:h-[850px] flex max-lg:flex-col max-lg:justify-center items-center">

            <HeroBlockWithMarquee
                url='https://res.cloudinary.com/maulight/image/upload/v1750764741/z1lzbticvx2obapxcfjp.jpg'
                width={bounds.width}
            />
            <HeroBlock
                url='https://res.cloudinary.com/maulight/image/upload/v1750763298/nmkpyijdezfmqml4u1mr.jpg'
                width={bounds.width}
            />

        </div>
    )
}

function HeroBlock({ width, url }: { width: number, url: string }) {
    return (
        <Link
            href={'/'}
            style={{
                height: (width) > 600 ? width / 2 : '100%',
                width: (width) > 600 ? width / 2 : '100%'
            }}>
            <Image
                src={url}
                alt='product'
                width={1000}
                height={1000}
                className='h-full object-cover'
            />
        </Link>
    )
}
function HeroBlockWithMarquee({ width, url }: { width: number, url: string }) {
    return (
        <Link
            href={'/'}
            className='relative p-8 lg:p-12 overflow-hidden'
            style={{
                height: (width) > 600 ? (width / 2) : '100%',
                width: (width) > 600 ? (width / 2) : '100%'
            }}>
            <div className='h-full z-20 overflow-hidden'>
                <Image
                    src={url}
                    alt='product'
                    width={1000}
                    height={1000}
                    className='relative h-full object-cover z-20'
                />
            </div>
            <div className="absolute w-full h-full top-0 left-0 animated-background bg-gradient-to-r from-gray-100 via-[#292929] to-gray-400 grayscale -z-0">
            </div>
            <Noise
                patternSize={450}
                patternScaleX={1}
                patternScaleY={3}
                patternRefreshInterval={2}
                patternAlpha={25}
            />
        </Link>
    )
}
