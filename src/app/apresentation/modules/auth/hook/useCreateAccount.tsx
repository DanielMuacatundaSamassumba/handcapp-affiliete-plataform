import React, { useState } from 'react'
import { CreateAccountType } from '../types/AuthDataType'
import { Alert } from '@/components/utils/Alert'
import { api } from '@/app/ infrastructure/api/api'
import { useNavigate } from 'react-router-dom'
export default function useCreateAccount() {
    const [formData, setFormData] = useState<CreateAccountType>({
        phone: "",
        password: "",
        confPassword: "",
        name: ""
    })
     const navegate = useNavigate()
    const [loaderControl, setLoaderControl] = useState(false)

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target
        if (name == "phone") {
            const onlyNumbers = value.replace(/\D/g, "");
            if (onlyNumbers.length != 10) {
                setFormData((prev) => {
                    return { ...prev, [name]: onlyNumbers }
                })
                return;
            }
            return;

        }
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    async function handleSumbit(e: React.FormEvent) {
        setLoaderControl(true)
        e.preventDefault();
        if (formData.password != formData.confPassword) {
            setLoaderControl(false)
            Alert({
                text: "Verifique as Suas a Palavra-pase e a confirmação",
                title: "Erro de validação",
                icon: "warning"
            })
            return;
        }
        try {
            const response = await api.post("/auth/register", formData)
            console.log(response)
            Alert({
                text:"Conta Criada com sucesso!",
                title: `Sucesso!`,
                icon: "success"
            })
            setLoaderControl(false)
            navegate("/")
        } catch (error:any) {
            console.error(error)
            setLoaderControl(false)
            Alert({
                text: "Erro  ao tentar   Criar Conta",
                title: error.response.data.message || "Erro ao Realizar o Login",
                icon: "error"
            })
        }

    }
    return {
        formData, setFormData,
        handleChangeValue,
        handleSumbit,
        loaderControl,
        setLoaderControl
    }
}
