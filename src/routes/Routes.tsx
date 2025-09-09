import { createBrowserRouter } from 'react-router-dom'
import LogiMainPage from '@/app/apresentation/modules/auth/pages/LogiMainPage'
import CreateAccountMainPage from '@/app/apresentation/modules/auth/pages/CreateAccountMainPage'
import DashboardMainPage from '@/app/apresentation/modules/dashboard/pages/DashboardMainPage'
export default function Routes() {
    const routes =  createBrowserRouter([
        {
             path:"/",
             element:<LogiMainPage/>
        },
        {
             path:"/create/affiliete-account",
             element:<CreateAccountMainPage/>
        },
        {
             path:"dashboard",
             element:<DashboardMainPage/>
        }
    ])
  return{
    routes
  }
}
