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
        url: '/Ear.webm'
    },
    {
        type: 'image',
        url: 'https://res.cloudinary.com/maulight/image/upload/v1746777462/yuyrcdopkw4gprcjnjms.jpg'
    },
]

export default function Carousel(): ReactNode {

    const [measure, setMeasure] = useState<number>(0)
    const [pause, setPause] = useState<boolean>(false)

    const initialX = 378 - 990

    useEffect(() => {
        let timer: NodeJS.Timeout; // or number if using browser types
        console.log(measure)
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
            <div className='relative w-full h-full'>
                <motion.div
                    initial={{ x: initialX }}
                    animate={{ x: initialX - (990 * measure) }}
                    transition={{
                        duration: 1,
                        type: 'spring',
                        bounce: 0.5,
                        stiffness: 30
                    }}
                    className="flex w-[calc(970px*7+20px*5)] h-full justify-between">
                    {
                        [assets[2], ...assets, ...assets].map((asset, i) => {
                            if (asset.type === 'image') {
                                return (
                                    <div
                                        key={asset.url + '-' + i}
                                        className='relative h-full overflow-hidden'
                                        onMouseEnter={() => { setPause(true) }}
                                        onMouseLeave={() => { setPause(false) }}
                                    >
                                        <Image
                                            width={970}
                                            height={667}
                                            className={`w-[970px] h-full object-cover rounded-[6px] ${measure === (i - 1) ? '' : 'grayscale'} transition-all duration-500`}
                                            src={asset.url}
                                            alt='image'
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: measure === (i - 1) ? 0 : 0.3 }}
                                            transition={{ duration: 0.8 }}
                                            className='absolute z-20 w-full h-full left-0 top-0 bg-[var(--theme-light-background-color)]'>
                                        </motion.div>

                                        <div className="absolute w-full h-full top-0 left-0 z-50 flex items-end py-15">
                                            <div className="flex justify-start items-center gap-x-5 w-full h-[45px] px-10">
                                                <motion.button
                                                    key={1}
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={{ y: measure === (i - 1) ? 0 : 100, opacity: measure === (i - 1) ? 100 : 0 }}
                                                    transition={{ duration: 0.8, delay: 0 }}
                                                    className='h-full px-6 rounded-full bg-[var(--theme-light-background-color)]'>Learn more</motion.button>
                                                <motion.p
                                                    key={2}
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={{ y: measure === (i - 1) ? 0 : 100, opacity: measure === (i - 1) ? 100 : 0 }}
                                                    transition={{ duration: 0.8, delay: 0.1 }}
                                                    className='text-sym-text-secondary'><b className='text-sym-text-primary pr-5'>Nothing Ear(A)</b>Made for every part of every day, Ear (a) is for the music lovers.</motion.p>
                                            </div>
                                        </div>

                                        <div className="absolute w-full h-full top-0 left-0 z-40 bg-gradient-to-t from-black from-0% to-transparent to-40%" />
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={asset.url + '-' + i}
                                        className='relative h-full'
                                        onMouseEnter={() => { setPause(true) }}
                                        onMouseLeave={() => { setPause(false) }}
                                    >

                                        <video
                                            loop
                                            muted
                                            autoPlay
                                            src={asset.url}
                                            key={asset.url + '-' + i}
                                            className={`w-[970px] h-full object-cover rounded-[6px] ${measure === (i - 1) ? '' : 'grayscale'} transition-all duration-500`}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: measure === (i - 1) ? 0 : 0.3 }}
                                            transition={{ duration: 0.8 }}
                                            className='absolute z-20 w-full h-full left-0 top-0 bg-[var(--theme-light-background-color)]'>
                                        </motion.div>
                                        <div className="absolute w-full h-full top-0 left-0 z-50 flex items-end py-15">
                                            <div className="flex justify-start items-center gap-x-5 w-full h-[45px] px-10">
                                                <motion.button
                                                    key={1}
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={{ y: measure === (i - 1) ? 0 : 100, opacity: measure === (i - 1) ? 100 : 0 }}
                                                    transition={{ duration: 0.8, delay: 0 }}
                                                    className='h-full px-6 rounded-full bg-[var(--theme-light-background-color)]'>Learn more</motion.button>
                                                <motion.p
                                                    key={2}
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={{ y: measure === (i - 1) ? 0 : 100, opacity: measure === (i - 1) ? 100 : 0 }}
                                                    transition={{ duration: 0.8, delay: 0.1 }}
                                                    className='text-sym-text-secondary'><b className='text-sym-text-primary pr-5'>Nothing Ear(A)</b>Made for every part of every day, Ear (a) is for the music lovers.</motion.p>
                                            </div>
                                        </div>
                                        <div className="absolute w-full h-full top-0 left-0 z-40 bg-gradient-to-t from-black from-0% to-transparent to-40%"></div>
                                    </div>
                                )
                            }
                        })
                    }
                </motion.div>
            </div>
        </div>
    )
}
