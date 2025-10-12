import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function useCancelPaymentRequest() {
    const [loaderControl, setLoaderControl] = useState(false)
    const navegate = useNavigate()
    async function UpdateCancelPayemntRequest(id: string) {
        try {
            Swal.fire({
                title: "Atenção",
                text: "Tem Certeza que Pretende Cancelar a sua Solicitação?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Não",
                confirmButtonText: "Sim"
            }).then(async (res) => {
                setLoaderControl(true)
                try {
                    const response = await api.put(`affiliate/payment-request/cancel/${id}`, {}, headersConfig())
                    console.log(response)
                    Swal.fire({
                        title: "Sucesso ",
                        text: "Solicitação Cancelada com sucesso!",
                        icon: "success",
                        customClass: {
                            container: "swal2-container "
                        }
                    }).then((res) => {
                        if (res.isConfirmed) {
                         navegate("/dashboard")
                        }
                    })
                    setLoaderControl(false)

                } catch (error) {
                    console.error(error)
                    setLoaderControl(false)
                }

            })


        } catch (error) {
            console.error(error)
        }

    }
    return {
        UpdateCancelPayemntRequest,
        loader:loaderControl
    }
}
