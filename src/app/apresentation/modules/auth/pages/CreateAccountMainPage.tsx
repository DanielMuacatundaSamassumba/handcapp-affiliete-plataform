import CreateAccountForm from "@/components/auth/CreateAccountForm";


export default function CreateAccountMainPage() {
  return (
    <div>
         <CreateAccountForm formData={undefined} handleChangeEvent={function (event: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
          } } handleSubmt={undefined}/>
    </div>
  )
}
