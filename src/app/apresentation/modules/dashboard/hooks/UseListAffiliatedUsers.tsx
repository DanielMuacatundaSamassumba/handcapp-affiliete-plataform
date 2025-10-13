import { api } from '@/app/ infrastructure/api/api';
import { headersConfig } from '@/app/utils/HeaderConfig';
import React, { useEffect, useState } from 'react'
import { AffiliatedData } from '../types/UserAffiliatedType';

export default function UseListAffiliatedUsers() {
    const [data, setData] = useState<AffiliatedData[]>()
    const [dataUsers, setDataUsers] = useState<AffiliatedData[]>()
    const [ loaderControl, setLoaderControl] = useState(false)

    async function fetchAffiliatedUsers() {
            setLoaderControl(true)
        try {
            const response = await api.get("/affiliate-reference/list", headersConfig())
       setData(response.data.data)
       setDataUsers(response.data.data)
       setLoaderControl(false)
       console.log(response.data.data)
        } catch (error) {
            setLoaderControl(true)
            console.error("Error fetching affiliated users:", error);

        }
    }

    useEffect(() => {
        fetchAffiliatedUsers()
    }, [])
    return {
        data,
         loaderControl,
         dataUsers
    }
}
