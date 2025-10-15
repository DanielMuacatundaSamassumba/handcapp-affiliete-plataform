import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import { useRef, useState } from 'react'
import { decrypt } from '../../auth/utils/CryptoUtils'

export default function useUploud() {
    const file = useRef<HTMLInputElement | null>(null)
    const [loader, setLoader] = useState(false)
    const handleUploud = async () => {
        setLoader(true)
        try {
            setLoader(true);

            if (file.current?.files?.[0]) {
                const formData = new FormData();
                formData.append("profile_image", file.current.files[0]);
                    const token = localStorage.getItem("auth_token");
                    const token_decrypted = decrypt(token || "");
                const response = await api.post(
                    "/user/uploud/image/profile",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token_decrypted}`,
                            "Content-Type": "multipart/form-data",
                        }
                    }
                );
                console.log("Upload feito com sucesso:", response.data);
            } else {
                console.warn("Nenhum arquivo selecionado.");
            }

        } catch (error) {
            console.error(error)
            setLoader(false)
        }

    }
    return {
        handleUploud,
        file,
        setLoader,
        loader
    }
}
