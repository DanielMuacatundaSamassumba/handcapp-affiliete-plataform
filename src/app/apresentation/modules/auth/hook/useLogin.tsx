import { useState } from 'react'
import { LoginTypeData } from '../types/AuthDataType'
import { api } from '@/app/ infrastructure/api/api'
import { Alert } from '@/components/utils/Alert'
import { encrypt } from '../utils/CryptoUtils'
import { useNavigate } from 'react-router-dom'
export default function useLogin() {
    const navegate = useNavigate()
    const [formData, setFormData] = useState<LoginTypeData>({
        phone: "",
        password: "",
    })
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
        e.preventDefault();
        setLoaderControl(true)
        try {
            const response = await api.post("/auth/login", {
                phone: formData.phone,
                password: formData.password
            })
            const token = encrypt(response.data.token)
            const data_user = encrypt(JSON.stringify(response.data.data))
            localStorage.setItem("auth_token", token)
            localStorage.setItem("data_user", data_user)

            Alert({
                text: "",
                title: `Seja Benvindo(a) ${response.data.data.name}`,
                icon: "success"
            })
            navegate("/dashboard")
            setLoaderControl(false)
        } catch (error: any) {
            console.error(error)
            setLoaderControl(false)
            Alert({
                text: "Erro  ao tentar  fazer Login",
                title: error.response.data.message || "Erro ao Realizar o Login",
                icon: "error"
            })
             console.log(formData)
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
