/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useRef, useState } from 'react'
import Fallback from './Fallback'
import { motion } from 'motion/react'
import { UseFormSetValue } from 'react-hook-form'
import useClickOutside from '../hooks/useClickOutside'

export interface DropdownProps {
    create?: boolean
    label?: string
    buttonFunction?: () => void
    id?: string
    value: string
    setValue: UseFormSetValue<{
        firstname: string;
        lastname: string;
        street: string;
        street_number: string;
        house_number: string;
        city: string;
        state: string;
        country: string;
        phone: number;
        zipcode: number;
        email: string;
    }>
    list: string[]
    defaultValue?: string
    loading?: boolean
    error?: boolean
}

function CustomDropdownWithCreate({
    value,
    setValue,
    list,
    defaultValue,
    loading,
    error,
    id,
    create,
    label,
    buttonFunction
}: DropdownProps): ReactNode {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [choice, setChoice] = useState<string>(defaultValue || '')

    const dropRef = useRef(null)

    //@ts-expect-error nullable initialization
    useClickOutside(dropRef, () => { setIsOpen(false) })

    useEffect(() => {
        const choiceInList = list.find(elem => elem === choice)
        if (!choiceInList) {
            setChoice(value)
        }

    }, [value])

    useEffect(() => {
        if (value && choice === defaultValue) {
            setChoice(value)
        }
    }, [value])

    useEffect(() => {
        const choiceInList = list.find(elem => elem === choice)
        if (choice !== '' && choice !== value && choiceInList) {
            // @ts-expect-error values are correct
            setValue(value, choice)
        }
    }, [choice])


    return (
        <div ref={dropRef} id={id} onClick={() => { setIsOpen(!isOpen) }} className='relative w-full h-9 flex justify-between items-center rounded-[3px] border border-[#292929] ring-0 focus:ring-0 focus:outline-none cursor-pointer'>
            <p className={`capitalize px-5 ${choice === '' ? 'text-sym_gray-300' : 'text-[#a1a1a1]'}`}>{choice === '' ? 'Choose one...' : choice}</p>
            {
                isOpen ? (
                    <i className="fa-solid fa-sm fa-arrow-up"></i>
                )
                    :
                    (
                        <i className="fa-solid fa-sm fa-arrow-down"></i>
                    )
            }
            {
                isOpen && (
                    <motion.div
                        initial={{ opacity: 0, top: 0 }}
                        animate={{ opacity: 1, top: 35 }}
                        transition={{ duration: 0.2, type: 'spring', bounce: 0.1 }}
                        className='absolute top-9 left-0 z-20 w-full max-h-[200px] overflow-y-scroll border border-[#292929] rounded-b-[5px] shadow-xl shadow-black'>
                        <>
                            {
                                error ? (
                                    <div className='w-full h-full flex justify-center items-center'>
                                        <p className='text-balance text-center'>There was an error fetching the list, please refresh the page.</p>
                                    </div>
                                )
                                    :
                                    (
                                        <>
                                            {
                                                loading ? (
                                                    <div className='w-full h-full flex justify-center items-center'>
                                                        <Fallback color='#3f51b5' />
                                                    </div>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            {
                                                                create && label && buttonFunction && (
                                                                    <CreateButton label={label} buttonFunction={buttonFunction} />
                                                                )
                                                            }
                                                            {
                                                                list.map((item: string, i: number) => (
                                                                    <button key={`${item}-${i}`} onClick={() => { setChoice(item) }} className={`w-full h-9 bg-black text-[#a1a1a1] ring-0 focus:ring-0 focus:outline-none px-2 placeholder-[#292929] hover:text-[#ededed] active:text-[#ffffff] active:bg-[#10100e] transition-color duration-200`}>
                                                                        {
                                                                            item
                                                                        }
                                                                    </button>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                            }
                                        </>
                                    )
                            }
                        </>
                    </motion.div>
                )
            }
        </div>
    )
}

export default CustomDropdownWithCreate

function CreateButton({ label, buttonFunction }: { label: string, buttonFunction: () => void }) {
    return (
        <button onClick={buttonFunction} className='w-full h-9 bg-[#ffffff] hover:bg-gray-100 transition-color duration-200 text-indigo-500 rounded-[3px] border border-gray-200'>{label}</button>
    )
}