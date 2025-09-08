import { createBrowserRouter } from 'react-router-dom'
import LogiMainPage from '@/app/apresentation/modules/auth/pages/LogiMainPage'
import CreateAccountMainPage from '@/app/apresentation/modules/auth/pages/CreateAccountMainPage'
export default function Routes() {
    const routes =  createBrowserRouter([
        {
             path:"/",
             element:<LogiMainPage/>
        },
        {
             path:"/create/affiliete-account",
             element:<CreateAccountMainPage/>
        }
    ])
  return{
    routes
  }
}
