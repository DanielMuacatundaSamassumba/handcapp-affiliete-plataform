import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'
import { Payment } from './transationsTypes'

export default function useListMyTransation() {
    const [myTransations, setMyTransations] = useState<Payment[]>()
    const [pendentAmmount, setPendentAmmount] = useState(0)
    const [loaderControl, setLoaderControl] = useState(false)
    const show = async () => {
        setLoaderControl(true)
        try {
            const response = await api.get("affiliate/payment-request/list", headersConfig())
            setMyTransations(response.data.data)
            setLoaderControl(false)
            console.log("teste->> ", response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        show()
    }, [])
    return {
        myTransations,
        loader:loaderControl
    }
}
