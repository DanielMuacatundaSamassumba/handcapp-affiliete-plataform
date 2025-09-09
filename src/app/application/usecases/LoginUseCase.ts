import { LoginTypeData } from "@/app/apresentation/modules/auth/types/AuthDataType";
import { ILogin } from "@/app/domain/repositories/ILogin";

export class  LoginUseCase{
     constructor(private Ilogin:ILogin){}

     async execute(props:LoginTypeData){
        try {
             //const response = await this.Ilogin.login(props.phone,  props.password)
        } catch (error) {
            
        } 
     }
}