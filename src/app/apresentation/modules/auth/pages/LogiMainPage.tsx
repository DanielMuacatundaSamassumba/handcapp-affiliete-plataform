import AuthForm from '@/components/auth/AuthForm'
import useLogin from '../hook/useLogin'
import { Loader } from '@/components/Loader'

export default function LogiMainPage() {
    const { formData,
        handleChangeValue,
        handleSumbit,
        loaderControl } = useLogin()
    return (
        <div>
            <AuthForm
                formData={formData}
                handleChangeEvent={handleChangeValue}
                handleSubmt={handleSumbit}
            />
           {
           loaderControl && (<Loader/>)
        }
        </div>
    )
}
