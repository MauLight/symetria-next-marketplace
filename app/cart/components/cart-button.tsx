'use client'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/navigation'

export default function CartButton({ total }: { total: number }) {

    const router = useRouter()
    const isBtnDisabled = total === 0

    async function handleTransbankCreateTransaction() {
        const sessionId = `session-${Date.now().toString()}-${uuid()}`
        const paymentInformation = { sessionId, amount: total }

        try {
            const { data } = await axios.post(`http://localhost:3000/api/transbank/create`, paymentInformation)
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
