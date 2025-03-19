'use client'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/navigation'

const backUrl = 'https://symetria.ngrok.io'
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://symetria-next-marketplace.vercel.app'

export default function CartButton({ total }: { total: number }) {

    const router = useRouter()
    const isBtnDisabled = total === 0

    async function handleTransbankCreateTransaction() {
        const sessionId = `session-${Date.now().toString()}-${uuid()}`
        const returnUrl = `${url}/confirmation`
        const paymentInformation = { sessionId, amount: total, returnUrl }

        try {
            const { data } = await axios.post(`${backUrl}/transbank`, paymentInformation)
            localStorage.setItem('transbank-order', JSON.stringify(data))

            if (data.buyOrder) {
                localStorage.setItem('marketplace-order', data.buyOrder)
                router.push('/checkout')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={handleTransbankCreateTransaction} disabled={isBtnDisabled} className="text-[#ededed] w-full py-2 mt-5 rounded-[6px] border border-[#080808] hover:bg-transparent bg-black hover:text-[#080808] transition-all duration-300">Checkout</button>
    )
}
