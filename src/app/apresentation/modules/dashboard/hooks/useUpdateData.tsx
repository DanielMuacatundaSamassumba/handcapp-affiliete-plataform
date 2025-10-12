import { api } from '@/app/ infrastructure/api/api'
import React, { useState } from 'react'
import useAuthMe from './useAuthMe'
import { headersConfig } from '@/app/utils/HeaderConfig'
import { decrypt } from '../../auth/utils/CryptoUtils'
import Swal from 'sweetalert2'


export default function useUpdateData() {
    const { myData } = useAuthMe()
    const [loaderControl, setLoaderControl] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "N/A"

    })

    const handleChangeValue = (e: any) => {
        const { value, name } = e.target
        setFormData((prev: any) => {
            return { ...prev, [name]: value }
        })
    }
    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoaderControl(true)
        try {
            const user = localStorage.getItem("data_user")
            const data_user = decrypt(user || "")
            const userLoggin = JSON.parse(data_user)
            const response = await api.put(`user/udate/data/${userLoggin?.id}`,
                formData,
                headersConfig()
            )
            console.log(response)
            setLoaderControl(false)
            Swal.fire({
                title: "Sucesso ",
                text: "Dados Pessoais Actualizados com Sucesso ",
                icon: "success",
                customClass: {
                    container: "swal2-container "
                }
            }).then((res)=>{
                if(res.isConfirmed){
                     window.location.reload()
                }
            })

        } catch (error:any) {
            console.error(error)
            Swal.fire({
                title: "Sucesso ",
                text: error.data.response.message || "Algo Correu Mal",
                icon: "error",
                customClass: {
                    container: "swal2-container "
                }
            })
            setLoaderControl(false)
        }
    }
    return {
        handleChangeValue,
        handleSubmit,
        formData,
        setFormData,
        loaderControl
    }
}
