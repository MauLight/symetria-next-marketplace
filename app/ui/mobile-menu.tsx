'use client'

import { Divide as Hamburger } from 'hamburger-react'
import { Modal } from '../admin/dashboard/components/Modal'
import { useState } from 'react'
import { MagnifyingGlassIcon, UserIcon, PowerIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import CartHub from './cart-hub'

export default function MobileMenu({ action }: { action: () => Promise<void> }) {

    const [isOpen, setOpen] = useState(false)

    return (
        <div className='max-md:block hidden'>
            <Hamburger toggled={isOpen} toggle={setOpen} size={18} color='#ededed' />
            <Modal bgColor='black' width='w-[90%]' openModal={isOpen} handleOpenModal={() => { setOpen(!isOpen) }}>
                <>
                    <div className='flex flex-col justify-center gap-y-5 text-[0.9rem]'>

                        <div className='relative group '>
                            <input className='w-full h-10 border border-[#292929] text-[#ededed] outline-none pl-12' type="text" />
                            <MagnifyingGlassIcon className='absolute top-2 text-gray-500 group-hover:text-[#ededed] left-2 w-7 h-7 transition-color duration-300' />
                        </div>

                        <Link className='flex gap-x-2 items-center text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300' href='/profile'>
                            <UserIcon className="w-4 h-4" />
                            Profile
                        </Link>

                        <CartHub />

                        <form
                            action={action}
                        >
                            <button className="flex text-[#a1a1a1] hover:text-[#ededed] transition-color duration-300 items-center justify-center gap-x-2 cursor-pointer">
                                <PowerIcon className="w-4 h-4" />
                                <div className="text-[0.9rem]">Sign Out</div>
                            </button>
                        </form>
                    </div>
                </>
            </Modal>
        </div>
    )
}
