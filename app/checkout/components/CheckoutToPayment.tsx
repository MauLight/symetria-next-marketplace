import { motion } from "motion/react"

export default function CheckoutToPaymentStep({ title, step, current }: { title: string, step: number, current: boolean }) {

    return (
        <>
            <div className={`relative col-span-1 flex flex-col justify-center items-center gap-x-2 ${current ? 'border-[#10100e]' : 'border-gray-200'}`}>

                <div className='w-full flex justify-center gap-x-5 max-sm:pb-3'>
                    <div className={`w-[30px] h-[30px] flex justify-center items-center rounded-full ${current ? 'bg-[#ededed] text-gray-800' : 'bg-[#292929] text-black'}`}>{step}</div>
                    <p className={`text-[1.2rem] ${current ? 'text-[#ededed]' : 'font-light text-[#494949]'}`}>{title}</p>
                </div>
                {
                    current && (
                        <div className='absolute w-full bottom-0 left-0 flex flex-col justify-center items-center'>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className='w-full h-[2px] bg-[#ededed]'
                            >
                            </motion.div>
                        </div>
                    )
                }
            </div>
        </>
    )
}