import React, { useEffect, useState } from 'react'
import { api } from '../ infrastructure/api/api';
import { headersConfig } from '../utils/HeaderConfig';

export default function useMethoPayments() {
    const [allMethods, setAllMethods] = useState([])

    async function fetchAllMethodsPayments() {
        try {
            const response = await api.get("/payment-type/list", headersConfig())
            console.log(response.data.data)
            setAllMethods(response.data.data)
        } catch (error) {
            console.error("Error fetching payment methods:", error);

        }
    }
    useEffect(() => {
        fetchAllMethodsPayments()
    }, [])
    return {
        allMethods
    }
}
