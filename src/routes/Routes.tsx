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
import NotFoundedPage from '@/app/apresentation/modules/error-pages/NotFoundedPage'
import PersonalTicketPage from '@/app/apresentation/modules/tickets/pages/PersonalTicketPage'
import PersonalPageUserDetails from '@/app/apresentation/modules/users/pages/PersonalPageUserDetails'
import ErrorPage from '@/app/apresentation/modules/error-pages/ErrorPage'
export default function Routes() {
     const DashboardMainPAgeAuth = AuthCheck(DashboardMainPage)
     const ProfileMainPageAuth = AuthCheck(ProfileMainPage)
     const TransationResumePageAuth = AuthCheck(TransationResume)
     const WithdrawalPageAuth = AuthCheck(WithdrawalPage)
     const TransationsMainPageAuth = AuthCheck(TransationsMainPage)
     const UserMainPageAuth = AuthCheck(UserMainPage)
     const MyTicketMainPagePageAuth = AuthCheck(MyTicketMainPage)
     const SugestTicketPageAuth = AuthCheck(SugestTicket)
     const PersonalTicketPageAuth = AuthCheck(PersonalTicketPage)
     const PersonalPageUserDetailsPageAuth= AuthCheck(PersonalPageUserDetails)
     //const Auth = AuthCheck(SugestTicket)
     const routes = createBrowserRouter([
          {
               path: "/",
               element: (
                    <PublicRoutes>
                         <LogiMainPage />
                    </PublicRoutes>
               ),
                              errorElement:<ErrorPage/>

          },
          {
               path: "/create/affiliete-account",
               element: (
                    <PublicRoutes>
                         <CreateAccountMainPage />
                    </PublicRoutes>
               ),
               errorElement:<ErrorPage/>
          },
          {
               path: "dashboard",
               element: <DashboardMainPAgeAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "profile",
               element: <ProfileMainPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "transation-resume",
               element: <TransationResumePageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "withdrawal",
               element: <WithdrawalPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "history",
               element: <TransationsMainPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "users",
               element: <UserMainPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "my-tickets",
               element: <MyTicketMainPagePageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "my-tickets/suggest",
               element: <SugestTicketPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "my-tickets/personal-ticket",
               element: <PersonalTicketPageAuth />,
                              errorElement:<ErrorPage/>

          },
              {
               path: "users/personal",
               element: <PersonalPageUserDetailsPageAuth />,
                              errorElement:<ErrorPage/>

          },
          {
               path: "*",
               element: <NotFoundedPage />
          },

     ])
     return {
          routes
     }
}
