'use client'
import { v4 as uuid } from 'uuid'

export default function CartButton({ total }: { total: number }) {

    const isBtnDisabled = total === 0

    async function handleTransbankCreateTransaction() {
        const sessionId = `session-${Date.now().toString()}-${uuid()}`
        const paymentInformation = { amount: total, sessionId }

        console.log(paymentInformation)
        //localStorage.setItem('marketplace-order', payload.buyOrder)
    }

    return (
        <button onClick={handleTransbankCreateTransaction} disabled={isBtnDisabled} className="text-[#ededed] w-full py-2 mt-5 rounded-[6px] border border-[#080808] hover:bg-transparent bg-black hover:text-[#080808] transition-all duration-300">Checkout</button>
    )
}
