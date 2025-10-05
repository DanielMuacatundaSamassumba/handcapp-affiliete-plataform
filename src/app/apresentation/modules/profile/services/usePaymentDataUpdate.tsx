import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function usePaymentDataUpdate() {
    const [formData, setFormData] = useState({
        payment_method_id: "",
        reference: "",
        id: ""
    })
    const [loaderControl, setLoaderControl] = useState(false)

    const handleOnchageValue = (e: any) => {
        const { value, name } = e.target
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoaderControl(true)
        try {
            const response = await api.put(
                `/user/payment-data/update/${formData.id}`,
                formData,
                headersConfig()
            );
            console.log(response)
            setLoaderControl(false)
            Swal.fire({
                title: "Sucesso ",
                text: "Dados Bancários Cadastrado com sucesso!",
                icon: "success",
                customClass: {
                    container: "swal2-container "
                }
            }).then((res) => {
                if (res.isConfirmed) {
                    window.location.reload()
                }
            });
        } catch (error) {
            console.log(formData)
            console.error(error)
            setLoaderControl(false)
        }
    }
    return {
        formData,
        setFormData,
        handleSubmit,
        handleOnchageValue,
        loaderControl
    }
}
