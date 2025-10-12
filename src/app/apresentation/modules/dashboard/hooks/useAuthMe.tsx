import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import { useEffect, useState } from 'react'
import { UserData } from '../types/userType'

export default function useAuthMe() {
    const [myData, setMyData] = useState<UserData>()
    const [ loaderControl, setLoaderControl ] = useState(false)
    const [myDataCustum, setMydataCustom] = useState<UserData>()
    async function me() {
        setLoaderControl(true)
        try {
            const response = await api.get("/auth/me", headersConfig())
            setMyData(response.data.data)
            setLoaderControl(false)
        } catch (error: any) {
              if(error.status == 401){
                 localStorage.removeItem("auth_token")
                  window.location.reload()
              }
            setLoaderControl(false)
        }
    }
    useEffect(() => {
        me()
    }, [])
    useEffect(() => {
     setMydataCustom(myData)
    }, [myData])
    return {
        myData,
        loaderControl,
        user:myDataCustum
    }
}
