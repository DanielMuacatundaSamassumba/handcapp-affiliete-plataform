import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'

export default function useListMyPaymentData() {
    const [myPaymentData, seMyPaymentData] = useState([])

    async function show() {
        try {
            const response = await api.get("/user/payment-data/list", headersConfig())
            console.log(response)
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
