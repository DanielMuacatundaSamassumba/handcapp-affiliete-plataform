import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'
import { PaymentData } from '../modules/profile/types/PaymentDataType'

export default function useListPaymentData() {
    const [paymentData, setPaymentData] = useState<PaymentData[]>()

    async function listPaymentData() {
        try {
            const response = await api.get("/payment-type/list", headersConfig())
       
         const fiilterPaymentMethod = response.data.data.filter((item:any)=>item.short_name != "MCX")
      setPaymentData(fiilterPaymentMethod)
         console.log( "||",fiilterPaymentMethod)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        listPaymentData()
    }, [])
    return {
        paymentData
    }
}
