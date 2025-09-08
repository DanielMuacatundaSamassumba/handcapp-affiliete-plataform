export interface LoginTypeData {
    phone?: string,
    password?: string,
    name?: string,
}


 export interface LoginPropsType{
     formData:LoginTypeData,
     handleChangeEvent:(event: React.ChangeEvent<HTMLInputElement>) => void
     handleSubmt:  React.FormEventHandler<HTMLFormElement> | undefined
 }