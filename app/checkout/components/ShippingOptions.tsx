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
    const prices = cart.map((product) => product.price)
    const total = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)
    const discountedPrices = cart.map((product) => getPercentage(product.discount, product.price))
    const totalWithDiscount = discountedPrices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)
    const vat = Math.floor(((totalWithDiscount / 100) * 19))
    const totalWithVat = totalWithDiscount + vat

    const [courierOptions, setCourierOptions] = useState([])
    const [selectedCourier, setSelectedCourier] = useState<string>('')
    const [{ one, two }, setCurrentStep] = useState<{ one: boolean, two: boolean }>({
        one: true,
        two: false
    })

    const transbankStr = localStorage.getItem('transbank-order')
    const transbank: { token: string, url: string, buyOrder: string } | null = transbankStr ? JSON.parse(transbankStr) : null

    function handleChangeStep() {
        if (one && !two) setCurrentStep({ one: false, two: true })
        else setCurrentStep({ one: true, two: false })
    }

    function handleSelectCourier(e: React.ChangeEvent<HTMLInputElement>, quo: QuotesProps): void {
        setSelectedCourier(e.target.value)
        console.log(e.target.value)
        console.log(quo)
        //setWasChosen(true)
    }

    useEffect(() => {

        async function getCourier() {
            try {
                const { data } = await axios.get('http://testservices.wschilexpress.com/georeference/api/v1/regions')
                //@ts-expect-error region type missing
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
        <div className="w-full h-full grid grid-cols-3 gap-x-10 pb-20">
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
                            <div className="flex flex-col gap-y-2">
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
                            </div>
                            <div className="w-full flex justify-end">
                                {
                                    selectedCourier !== '' && (
                                        <button onClick={handleChangeStep} className="text-[#ededed] w-[200px] py-2 mt-5 rounded-[6px] border border-[#292929] hover:bg-[#ededed] hover:text-[#080808] transition-all duration-300">Next</button>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {
                    two && (
                        <div className="flex flex-col gap-y-5">
                            {
                                cart.length > 0 && cart.map((product) => (
                                    <div key={product.id} className="grid grid-cols-3 border border-[#292929] p-5">
                                        <Image className="col-span-1" width={120} height={120} src={product.image} alt={product.title} />
                                        <div className="col-span-2 flex flex-col">
                                            <h1 className="text-[#ededed] text-[1.1rem]">{product.title}</h1>
                                            <p className="text-[#ededed]">${getPercentage(product.discount, product.price)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex flex-col items-end">
                                <div className="w-[400px] flex flex-col gap-y-5 border border-[#292929] p-5 text-[#fff]">
                                    <div className="flex flex-col gap-y-2">
                                        <div className="grid grid-cols-3">
                                            <h1 className="col-span-1 text-[1rem]">{`${cart.length} Items`}</h1>
                                            <p className="col-span-2 text-[1rem] text-end">${total}</p>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <h1 className="col-span-1 text-[1rem]">With discounts</h1>
                                            <p className="col-span-2 text-[1rem] text-end">${totalWithDiscount}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-3 items-center border-t border-[#292929] pt-4">
                                            <h1 className="col-span-1 text-[2rem]">Total</h1>
                                            <p className="col-span-2 text-[2rem] text-green-500 text-end">${totalWithVat + Number(selectedCourier)}</p>
                                        </div>
                                        <p className="text-end text-[#ededed] text-[0.8rem]">{`(*) Includes19% VAT`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>

            {
                two && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-1 pt-[120px] px-10">
                        <div className='h-full col-span-1'>
                            <section className='flex flex-col gap-y-4 min-h-[400px] pt-0'>
                                <div className='bg-[#ffffff] mb-5 rounded-[6px] overflow-hidden'>
                                    <Image width={150} height={44} className='w-full' src="https://res.cloudinary.com/maulight/image/upload/v1734712129/zds7cbfpfhfki1djh3wp.png" alt="webpay" />
                                </div>

                                <form method="post" action={transbank?.url}>
                                    <input type="hidden" name="token_ws" value={transbank?.token} />
                                    <button type='submit' className='w-full h-8 flex justify-center items-center px-2 uppercase text-[#10100e] mt-3 transition-all duration-200 bg-[#ffffff] hover:bg-indigo-500 active:bg-[#ffffff] rounded-[6px]'>
                                        Pay
                                    </button>
                                </form>
                            </section>
                        </div>
                    </motion.section>
                )
            }

        </div>
    )
}
