import { useState } from 'react'
import { LoginTypeData } from '../types/LoginTypeData'

export default function useLogin() {
    const [formData, setFormData] = useState<LoginTypeData>({
        phone: "",
        password: "",
    })
    const [loaderControl, setLoaderControl] = useState(false)

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    function handleSumbit(e: React.FormEvent) {
        e.preventDefault();
        setLoaderControl(true)
        setTimeout(() => {
            setLoaderControl(false)
        }, 5000)
    }
    return {
        formData, setFormData,
        handleChangeValue,
        handleSumbit,
        loaderControl,
        setLoaderControl
    }
}
