'use client'

import { CloudArrowUpIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function UserInformation({ firstname, lastname, email, phone, street, city, country, zipcode }: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    zipcode: string;
}
) {

    const [editing, setEditing] = useState(false)

    useEffect(() => {
        console.log(editing)
    }, [editing])

    return (
        <div className="col-span-1">

            {
                editing ? (
                    <motion.div
                        key={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-y-8 p-5 text-[#ededed]">
                        <div className="flex gap-x-5 items-center">
                            <input type="text" placeholder={`${firstname} ${lastname}`} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                            <button onClick={() => { setEditing(!editing) }}>
                                <CloudArrowUpIcon className="w-5 h-5 hover:text-green-500 transition-color duration-300" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-y-2 pr-10">
                            <h2 className="uppercase text-[0.8rem]">Contact</h2>
                            <div className="flex flex-col gap-y-3">
                                <input type="text" placeholder={email} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                <input type="text" placeholder={phone} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2 pr-10">
                            <h2 className="uppercase text-[0.8rem]">Address</h2>
                            <div className="flex flex-col gap-y-3">
                                <input type="text" placeholder={street} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                <input type="text" placeholder={city} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                <input type="text" placeholder={country} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                <input type="text" placeholder={zipcode} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                            </div>
                        </div>
                    </motion.div>
                )
                    :
                    (
                        <motion.div
                            key={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-y-8 p-5 text-[#ededed]">
                            <div className="flex gap-x-5 items-center">
                                <h1 className="text-[1.5rem]">{`${firstname} ${lastname}`}</h1>
                                <button onClick={() => { setEditing(!editing) }}>
                                    <PencilSquareIcon className="w-5 h-5 hover:text-indigo-500 transition-color duration-300" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <h2 className="uppercase text-[0.8rem]">Contact</h2>
                                <div>
                                    <p>{email}</p>
                                    <p>{phone}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <h2 className="uppercase text-[0.8rem]">Address</h2>
                                <div>
                                    <p>{street}</p>
                                    <p>{city}</p>
                                    <p>{country}</p>
                                    <p>{zipcode}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
            }

        </div>
    )
}
