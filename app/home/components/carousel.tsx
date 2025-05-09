'use client'

import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'

const assets = [
    {
        type: 'image',
        url: 'https://res.cloudinary.com/maulight/image/upload/v1746766727/f2yx9sxiiqg7eem49nzy.jpg'
    },
    {
        type: 'video',
        url: '/ear.webm'
    },
    {
        type: 'image',
        url: 'https://res.cloudinary.com/maulight/image/upload/v1746777462/yuyrcdopkw4gprcjnjms.jpg'
    },
]

export default function Carousel(): ReactNode {

    const [measure, setMeasure] = useState<number>(0)
    const [pause, setPause] = useState<boolean>(false)

    useEffect(() => {
        let timer: NodeJS.Timeout; // or number if using browser types

        if (!pause) {
            if (measure < assets.length - 1) {
                timer = setTimeout(() => {
                    setMeasure((prev) => prev + 1)
                }, 4000)
            } else {
                timer = setTimeout(() => {
                    setMeasure(0)
                }, 4000)
            }
        }

        return () => {
            clearTimeout(timer)
        }
    }, [measure, pause])

    //-1600

    return (
        <div className='relative w-full h-[667px]'>
            <div className='relative w-full'>
                <motion.div
                    initial={{ x: 378 }}
                    animate={{ x: 378 - (990 * measure) }}
                    transition={{
                        duration: 1,
                        type: 'spring',
                        bounce: 0.5,
                        stiffness: 30
                    }}
                    className="flex w-[calc(970px*3+20px*2)] justify-between">
                    {
                        assets.map((asset, i) => {
                            if (asset.type === 'image') {
                                return (
                                    <Image
                                        onMouseEnter={() => { setPause(true) }}
                                        onMouseLeave={() => { setPause(false) }}
                                        key={asset.url + '-' + i}
                                        width={970}
                                        height={667}
                                        className='w-[970px] object-cover rounded-[4px]'
                                        src={asset.url}
                                        alt='image'
                                    />
                                )
                            } else {
                                return (
                                    <video
                                        onMouseEnter={() => { setPause(true) }}
                                        onMouseLeave={() => { setPause(false) }}
                                        loop
                                        muted
                                        autoPlay
                                        src={asset.url}
                                        key={asset.url + '-' + i}
                                        className='w-[970px] object-cover rounded-[4px]'
                                    />
                                )
                            }
                        })
                    }
                </motion.div>
            </div>
        </div>
    )
}
