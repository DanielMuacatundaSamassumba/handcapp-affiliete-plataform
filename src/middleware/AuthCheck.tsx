import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function AuthCheck(Component: any) {

    return (props: any) => {
        const navegate = useNavigate()
        const auth_token = localStorage.getItem("auth_token")
        useEffect(() => {
            if (!auth_token) {
                navegate("/")
            }
        }, [navegate, auth_token])

        return auth_token ? <Component {...props} /> : "Erro..........."
    }

}
