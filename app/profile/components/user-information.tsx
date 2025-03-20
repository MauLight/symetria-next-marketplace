/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import * as z from "zod"

import { CloudArrowUpIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { ReactNode, useEffect, useState } from "react"
import { motion } from "motion/react"
import CustomDropdownWithCreate from "@/app/ui/CustomDropdownWithCreate"
import { toast } from "react-toastify"

const schema = z.object({
    firstname: z.string({ required_error: 'First name is required.' }).min(2),
    lastname: z.string({ required_error: 'Last name is required.' }).min(2),
    email: z.string({ required_error: 'Email is required.' }).email(),
    phone: z.number({ required_error: 'Phone number is required.' }).min(11),
    zipcode: z.number({ required_error: 'Zipcode is required.' }).min(7),
    street: z.string({ required_error: 'Street is required.' }).min(2),
    street_number: z.string({ required_error: 'Street number is required.' }).min(2),
    house_number: z.string({ required_error: 'House number is required.' }).min(2),
    city: z.string({ required_error: 'City is required.' }).min(2),
    state: z.string({ required_error: 'State is required.' }).min(2),
    country: z.string({ required_error: 'Country is required.' }).min(2),
})

const backUrl = 'https://symetria.ngrok.io'
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://symetria-next-marketplace.vercel.app'

export default function UserInformation({ id, firstname, lastname, email, phone, street, street_number, house_number, state, city, country, zipcode }: {
    id: string,
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    street: string;
    street_number: string;
    house_number: string;
    state: string;
    city: string;
    country: string;
    zipcode: number;
}
) {

    const [editing, setEditing] = useState<boolean>(false)
    const [courierIsLoading, setCourierIsLoading] = useState<boolean>(false)
    const [courierHasError, setCourierHasError] = useState<boolean>(false)
    const [countiesList, setCountiesList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [regionNameList, setRegionNameList] = useState<string[]>([])

    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstname: firstname || '',
            lastname: lastname || '',
            street: street || '',
            street_number: street_number || '',
            house_number: house_number || '',
            city: city || '',
            state: state || '',
            country: country || '',
            phone: phone || 0,
            zipcode: zipcode || 0,
            email: email || ''
        },
        resolver: zodResolver(schema)
    })

    const watchedValue = watch('state')

    async function submitForm(data: {
        firstname: string
        lastname: string
        street: string
        street_number: string
        house_number: string
        city: string
        state: string
        country: string
        email: string
        phone: number
        zipcode: number
    }) {
        const updatedUser = data
        try {
            const { data } = await axios.put(`${backUrl}/auth/user/${id}`, updatedUser)
            if (data.updatedUser) {
                toast.success('User updated succesfully.')
                setEditing(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function getRegions() {
            setCourierIsLoading(true)
            try {
                const { data } = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1/regions')
                //@ts-expect-error region type missing
                setRegionNameList(data.regions.map((region) => region.regionName))
                setRegionList(data.regions)
                setCourierIsLoading(false)
            } catch (error) {
                console.error(error)
                setCourierHasError(true)
                setCourierIsLoading(false)
            }
        }

        getRegions()
    }, [])

    useEffect(() => {
        async function getCountiesAsync() {
            if (getValues().state !== '') {
                const selectedRegion = getValues().state
                //@ts-expect-error region type missing
                const regionCode = regionList.find(region => region.regionName === selectedRegion).regionId
                if (regionCode) {
                    try {
                        const { data } = await axios.get(`${url}/api/courier?regionCode=${regionCode}&type=${0}`)
                        const response = data.data.coverageAreas
                        const counties = response.map((county: Record<string, string>) => county.coverageName)
                        setCountiesList(counties)
                        return data
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        }

        if (regionList.length > 0) {
            getCountiesAsync()
        }

    }, [watchedValue, regionList])

    return (
        <div className="col-span-1">

            {
                editing ? (
                    <motion.form
                        key={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit(submitForm)}
                        className="flex flex-col gap-y-8 p-5 text-[#ededed]">


                        <ErrorWrapper error={errors.firstname?.message}>

                            <div className="flex gap-x-5 items-center">
                                <div className="flex gap-x-2">
                                    <input {...register("firstname")} type="text" placeholder={`${firstname}`} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                    <input {...register("lastname")} type="text" placeholder={`${lastname}`} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                </div>
                                <button type="submit">
                                    <CloudArrowUpIcon className="w-5 h-5 hover:text-green-500 transition-color duration-300" />
                                </button>
                            </div>

                        </ErrorWrapper>


                        <div className="flex flex-col gap-y-2 pr-10">
                            <h2 className="uppercase text-[0.8rem]">Contact</h2>
                            <div className="flex flex-col gap-y-3">

                                <ErrorWrapper error={errors.email?.message}>
                                    <input {...register('email')} type="text" placeholder={email} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                </ErrorWrapper>

                                <ErrorWrapper error={errors.phone?.message}>
                                    <input {...register('phone')} type="text" placeholder={String(phone)} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                </ErrorWrapper>

                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2 pr-10">
                            <h2 className="uppercase text-[0.8rem]">Address</h2>
                            <div className="flex flex-col gap-y-3">
                                <input type="text" placeholder={street} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />

                                <CustomDropdownWithCreate
                                    value='state'
                                    defaultValue={getValues().state}
                                    setValue={setValue}
                                    list={regionNameList}
                                    loading={courierIsLoading}
                                    error={courierHasError}
                                />

                                <CustomDropdownWithCreate
                                    value='city'
                                    defaultValue={getValues().city}
                                    setValue={setValue}
                                    list={countiesList}
                                    loading={courierIsLoading}
                                    error={courierHasError}
                                />

                                <input type="text" placeholder={country} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                                <input type="text" placeholder={String(zipcode)} className="w-full h-[32px] px-5 border border-[#292929] rounded-[6px]" />
                            </div>
                        </div>
                    </motion.form>
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
                                    <p>{capitalizeWord(state.toLowerCase())}</p>
                                    <p>{capitalizeWord(city.toLowerCase())}</p>
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

function ErrorWrapper({ error, children }: { error: string | undefined, children: ReactNode }) {

    console.log(error)

    return (
        <div className="flex flex-col gap-y-2">
            {
                children
            }
            {
                error && (
                    <small className="text-red-500">{error}</small>
                )
            }
        </div>
    )
}

function capitalizeWord(word: string) {

    const wordList = word.split(' ')

    const newWord = wordList.map((word) => {
        if (word.length > 2) {
            const firstLetter = word.slice(0, 1)
            const restOfWord = word.slice(1, word.length)
            return `${firstLetter.toUpperCase()}${restOfWord}`
        } else {
            return word
        }
    }).join(' ')

    return newWord
}
