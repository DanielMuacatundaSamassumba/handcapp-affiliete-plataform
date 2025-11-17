import React, { useEffect, useState } from 'react'
import { external_api_handcapp } from '../ infrastructure/api/api'
import { Env } from '../env/env'

export default function useAuthHandcappApi() {
    const [token, setToken] = useState("")
    const [dataUser, setDataUser] = useState({
         id:""
     })
    const auth = async () => {
        try {
            const response = await external_api_handcapp.post("auth/login", {
                email: Env.EMAIL,
                password: Env.PASSWORD
            })
            setToken(response.data.token)
            setDataUser(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        auth()
    }, [])
    return {
        token,
        dataUser
    }
}
