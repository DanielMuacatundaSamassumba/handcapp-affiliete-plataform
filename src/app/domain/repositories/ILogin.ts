import { User } from "../entities/User";
interface loginData{
     phone:string,
     password:string
}
export interface ILogin {
    login(props:loginData): Promise<User>
}