/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useState } from "react"
import { useCart } from "@/app/context/cartContext"
import CheckoutToPaymentStep from "./CheckoutToPayment"
import UserInformation from "@/app/profile/components/user-information"
import axios from "axios"
import { getPercentage } from "@/app/functions/functions"
import { QuotesProps } from "@/app/types/types"
import Image from "next/image"
import { motion } from "motion/react"

const paymentSteps = [
    {
        id: 'id-1-06105PQHcs',
        title: 'Select Shipping Options',
        step: 1
    },
    {
        id: 'id-2-d2xGYSqGkN',
        title: 'Review and Payment',
        step: 2
    }
]

export default function ShippingOptions({ id, firstname, lastname, email, phone, street, street_number, house_number, state, city, country, zipcode }: {
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
    const { cart } = useCart()
    const discountedPrices = cart.map((product) => getPercentage(product.discount, product.price))
    const totalWithDiscount = discountedPrices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)

    const [courierOptions, setCourierOptions] = useState([])
    const [selectedCourier, setSelectedCourier] = useState<string>('')
    const [{ one, two }, setCurrentStep] = useState<{ one: boolean, two: boolean }>({
        one: true,
        two: false
    })

    function handleSelectCourier(e: React.ChangeEvent<HTMLInputElement>, quo: QuotesProps): void {
        setSelectedCourier(e.target.value)
        console.log(e.target.value)
        //setWasChosen(true)
    }

    useEffect(() => {

        async function getCourier() {
            try {
                const { data } = await axios.get('http://testservices.wschilexpress.com/georeference/api/v1/regions')
                const currRegion = data.regions.find((region) => region.regionName === state)
                console.log(currRegion)
                if (currRegion.regionId) {
                    try {

                        const destinationData = {
                            regionCode: currRegion.regionId,
                            destinationCounty: city,
                            declaredWorth: totalWithDiscount,
                            deliveryTime: 0
                        }

                        const { data } = await axios.post(`http://localhost:3000/api/courier`, destinationData)
                        console.log(data.data.data.courierServiceOptions)
                        setCourierOptions(data.data.data.courierServiceOptions)
                    } catch (error) {
                        console.error(error)
                    }
                }

            } catch (error) {
                console.error(error)
            }
        }

        if (state) getCourier()

    }, [state])

    return (
        <div className="w-full h-full grid grid-cols-3 gap-x-10">
            <section className='h-full col-span-2 flex flex-col gap-y-10'>
                <div className='w-full flex flex-col'>
                    <div className="w-full h-[60px] grid grid-cols-2">
                        {
                            paymentSteps.map((step, i) => (
                                <CheckoutToPaymentStep
                                    key={step.id}
                                    step={step.step}
                                    title={step.title}
                                    current={i === 0 ? one : two}
                                />
                            ))
                        }
                    </div>
                </div>
                {
                    one && (
                        <>
                            <UserInformation
                                id={id}
                                firstname={firstname}
                                lastname={lastname}
                                email={email}
                                phone={phone}
                                street={street}
                                street_number={street_number}
                                house_number={house_number}
                                state={state}
                                city={city}
                                country={country}
                                zipcode={zipcode}
                            />
                            {

                                courierOptions.length > 0 && courierOptions.slice(0, 2).map((quo: QuotesProps, i: number) => (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        key={`${quo.serviceValue}-${i}`} className={`flex justify-between gap-x-5 pb-5 border border-[#292929] p-5 rounded-[6px]`}>
                                        <div className={`flex flex-col gap-y-2`}>
                                            <div className='grid grid-cols-3 gap-x-5 items-center justify-center'>
                                                <div className="col-span-1 flex justify-center items-center p-2 bg-[#ff0]">
                                                    <Image width={150} height={50} className='w-1/2 object-cover' src='https://developers.wschilexpress.com/content/logo_chilexpress_negro.svg' alt="courier" />
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-[#ededed] col-span-1">{quo.serviceDescription}</p>
                                                    <p className="text-[#fff] col-span-1">{`$${quo.serviceValue}`}</p>
                                                </div>
                                            </div>
                                            <p className='text-balance text-[#ededed]'>{i === 0 ? 'Entrega en destino hasta las 11:00 horas para RM y hasta las 12:00 hrs. en regiones del día hábil siguiente a la admisión.' : 'Entrega  en destino hasta las 19:00 hrs. del día hábil siguiente a la admisión.'}</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <input
                                                value={quo.serviceValue}
                                                checked={selectedCourier === quo.serviceValue}
                                                onChange={(e) => { handleSelectCourier(e, quo) }}
                                                className='accent-black w-5 h-5'
                                                name="courier"
                                                type="radio"
                                            />
                                        </div>
                                    </motion.div>
                                ))

                            }
                        </>
                    )
                }
            </section>

        </div>
    )
}
