import { createBrowserRouter } from 'react-router-dom'
import LogiMainPage from '@/app/apresentation/modules/auth/pages/LogiMainPage'
import CreateAccountMainPage from '@/app/apresentation/modules/auth/pages/CreateAccountMainPage'
import DashboardMainPage from '@/app/apresentation/modules/dashboard/pages/DashboardMainPage'
import AuthCheck from '@/middleware/AuthCheck'
import { PublicRoutes } from '@/middleware/PublicRoutes'
import WithdrawalPage from '@/components/withdrawals/WithdrawalPage'
import ProfileMainPage from '@/app/apresentation/modules/profile/pages/ProfileMainPage'
import TransationResume from '@/app/apresentation/modules/transation/pages/TransationResume'
import TransationsMainPage from '@/app/apresentation/modules/transation/pages/TransationsMainPage'
import UserMainPage from '@/app/apresentation/modules/users/pages/UserMainPage'
import MyTicketMainPage from '@/app/apresentation/modules/tickets/pages/MyTicketMainPage'
import SugestTicket from '@/app/apresentation/modules/tickets/pages/SugestTicket'
export default function Routes() {
     const DashboardMainPAgeAuth = AuthCheck(DashboardMainPage)
     const ProfileMainPageAuth = AuthCheck(ProfileMainPage)
     const TransationResumePageAuth = AuthCheck(TransationResume)
     const WithdrawalPageAuth = AuthCheck(WithdrawalPage)
     const TransationsMainPageAuth = AuthCheck(TransationsMainPage)
     const UserMainPageAuth = AuthCheck(UserMainPage)
     const MyTicketMainPagePageAuth = AuthCheck(MyTicketMainPage)
     const SugestTicketPageAuth = AuthCheck(SugestTicket)
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
          },
          {
               path: "transation-resume",
               element: <TransationResumePageAuth />
          },
          {
               path: "withdrawal",
               element: <WithdrawalPageAuth />
          },
          {
               path: "history",
               element: <TransationsMainPageAuth />
          },
          {
               path: "users",
               element: <UserMainPageAuth />
          },
          {
               path: "my-tickets",
               element: <MyTicketMainPagePageAuth />
          },
          {
               path: "my-tickets/suggest",
               element: <SugestTicketPageAuth />
          },
     ])
     return {
          routes
     }
}
