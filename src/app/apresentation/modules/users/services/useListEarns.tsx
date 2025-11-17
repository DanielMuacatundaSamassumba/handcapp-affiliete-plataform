import React, { useEffect, useState } from 'react'
import { Earn } from '../types/EarnsType'
import { api } from '@/app/ infrastructure/api/api'
import { useLocation } from 'react-router-dom'
import { headersConfig } from '@/app/utils/HeaderConfig'

export default function useListEarns() {
    const [eansData, setEarnsData] = useState<Earn[]>()
    const  [laoderControl, setLoaderControl] = useState(true)
    const  location = useLocation()
    const  id = location.state.id
    const list = async () => {
        setLoaderControl(true)
        try {
            const response = await api.get(`/my/earns/show/${id}`, headersConfig())
            setEarnsData(response.data.data)
            console.log( "tete=>>>>",response.data.data)
            setLoaderControl(false)
        } catch (error) {
            console.error(error)
                   setLoaderControl(false)
        }
    }
    useEffect(() => {
        list()
    }, [])
    return {
        eansData,
        laoderControl
    }
}
