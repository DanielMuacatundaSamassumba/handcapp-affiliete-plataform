import CreateAccountForm from "@/components/auth/CreateAccountForm";
import useCreateAccount from "../hook/useCreateAccount";
import { Loader } from "@/components/Loader";

export default function CreateAccountMainPage() {
  const { formData, setFormData,
    handleChangeValue,
    handleSumbit,
    loaderControl,
 } = useCreateAccount()
  return (
    <div>
      <CreateAccountForm
        formData={formData}
        handleChangeEvent={handleChangeValue}
        handleSubmt={handleSumbit} />
         {
           loaderControl && ( <Loader/>)
         }
    </div>
  )
}
