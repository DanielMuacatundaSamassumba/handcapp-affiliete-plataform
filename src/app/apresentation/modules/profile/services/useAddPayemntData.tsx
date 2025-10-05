import { api } from '@/app/ infrastructure/api/api'
import useListPaymentData from '@/app/apresentation/hooks/useListPaymentData'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { PaymentDataEnum } from '../types/PaymentDataType'

export default function useAddPayemntData() {
    const [formData, setFormData] = useState({
        payment_method_id: "",
        reference: ""
    })
    const { paymentData } = useListPaymentData()
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
        const paymentTypeId = paymentData && paymentData.filter(item => item.id == formData.payment_method_id)
        if (paymentTypeId && paymentTypeId[0].short_name == PaymentDataEnum.TRANSFER) {
            if (formData.reference.length == 25) {
                try {
                    const response = await api.post("/user/payment-data/store", formData, headersConfig())
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
                    return;
                } catch (error: any) {
                    console.error(error)
                    setLoaderControl(false)
                    Swal.fire({
                        title: "Sucesso ",
                        text: error.response.data.message || "Algo foi Errado",
                        icon: "error",
                        customClass: {
                            container: "swal2-container "
                        }
                    })
                    return;
                }
            } else {
                Swal.fire({
                    title: "Sucesso ",
                    text: "O iban Deve ter 25 caractéres ",
                    icon: "error",
                    customClass: {
                        container: "swal2-container "
                    }
                })
            }
        } else {
            if (formData.reference.length == 9) {
                try {
                    const response = await api.post("/user/payment-data/store", formData, headersConfig())
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
                    return;
                } catch (error: any) {
                    console.error(error)
                    setLoaderControl(false)
                    Swal.fire({
                        title: "Sucesso ",
                        text: error.response.data.message || "Algo foi Errado",
                        icon: "error",
                        customClass: {
                            container: "swal2-container "
                        }
                    })
                    return;
                }
            } else {
                Swal.fire({
                    title: "Sucesso ",
                    text: "O referencia deve ter Deve ter 9 caractéres ",
                    icon: "error",
                    customClass: {
                        container: "swal2-container "
                    }
                })
                setLoaderControl(false)
            }
        }

    }
    return {
        handleOnchageValue,
        handleSubmit,
        formData,
        loaderControl,
        setLoaderControl
    }
}
