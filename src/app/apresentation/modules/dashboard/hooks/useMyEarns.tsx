import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'

export default function useMyEarns() {
    const [myEarns, setMyEarns] = useState<{
         created_at:string
    }[]>()

    const list = async () => {
        try {
            const response = await api.get('user/show/earns/', headersConfig())
            setMyEarns(response.data.data)
            console.log("all my Data", response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        list()
    }, [])
    return {
        myEarns
    }
}
