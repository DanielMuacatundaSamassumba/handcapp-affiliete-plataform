import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'
import { Payment } from '../types/PaymentDataType'

export default function useListMyPaymentData() {
    const [myPaymentData, seMyPaymentData] = useState<Payment[]>()

    async function show() {
        try {
            const response = await api.get("/user/payment-data/list", headersConfig())
            seMyPaymentData(response.data.data)
    console.log("teste=", response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        show()
    }, [])
    return {
        myPaymentData
    }
}
