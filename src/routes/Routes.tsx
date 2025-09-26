import { createBrowserRouter } from 'react-router-dom'
import LogiMainPage from '@/app/apresentation/modules/auth/pages/LogiMainPage'
import CreateAccountMainPage from '@/app/apresentation/modules/auth/pages/CreateAccountMainPage'
import DashboardMainPage from '@/app/apresentation/modules/dashboard/pages/DashboardMainPage'
import AuthCheck from '@/middleware/AuthCheck'
import { PublicRoutes } from '@/middleware/PublicRoutes'
import ProfileMainPage from '@/app/apresentation/modules/profile/pages/ProfileMainPage'
export default function Routes() {
     const DashboardMainPAgeAuth = AuthCheck(DashboardMainPage)
     const ProfileMainPageAuth = AuthCheck(ProfileMainPage)
     const routes = createBrowserRouter([
          {
               path: "/",
               element: (
                    <PublicRoutes>
                         <LogiMainPage />
                    </PublicRoutes>
               )
          },
          {
               path: "/create/affiliete-account",
               element: (
                    <PublicRoutes>
                         <CreateAccountMainPage />
                    </PublicRoutes>
               )
          },
          {
               path: "dashboard",
               element: <DashboardMainPAgeAuth />
          },
          {
               path: "profile",
               element: <ProfileMainPageAuth />
          }
     ])
     return {
          routes
     }
}
