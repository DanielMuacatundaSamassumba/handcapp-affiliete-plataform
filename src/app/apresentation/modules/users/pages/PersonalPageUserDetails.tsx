import { useState } from 'react';
import {
    DollarSign,
    Users,
    TrendingUp,
    Eye,
    Copy,
    Share2,
    CreditCard,
    ArrowUpRight,
    Ticket,
    User,
    ArrowLeft
} from 'lucide-react';
import { images } from '@/app/constatnts/images';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useMyEarns from '@/app/apresentation/modules/dashboard/hooks/useMyEarns';
import useMyTickets from '@/app/apresentation/modules/tickets/services/useMyTickets';
import { getISOWeekNumber } from '@/app/apresentation/modules/dashboard/utils/WeekNumberFunction';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import TransationsEarnTable from '../components/TransationsEarnTable';
import useListEarns from '../services/useListEarns';
import { Loader } from '@/components/Loader';


export default function PersonalPageUserDetails() {
    const { myTickets } = useMyTickets()
    const ticketsWeekNumber = myTickets?.map(item => {
        if (getISOWeekNumber(String(new Date())) == getISOWeekNumber(String(item?.created_at))) {
            return item?.created_at
        }
    })

    console.log("ticket_number!", ticketsWeekNumber?.length)
    const { data } = UseListAffiliatedUsers()
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData } = useAuthMe()
    const availableBalance = 2847.50; // This would come from your backend
    console.log(myData)
    const formattedValue = new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    }).format(myData?.point.value ?? 0);
    const date = new Date();
    const { myEarns } = useMyEarns();

    // Formata a data de hoje
    const todayFormatted = date.toLocaleDateString('pt-BR');

    // Cria uma data de ontem
    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    const yesterdayFormatted = yesterday.toLocaleDateString('pt-BR');

    // Filtra e soma os ganhos de hoje
    const myEarnsToday = myEarns
        ?.filter((earn: any) =>
            new Date(earn.created_at).toLocaleDateString('pt-BR') === todayFormatted
        )
        .reduce((acc: number, earn: any) => acc + parseFloat(earn.value), 0) || 0;

    // Filtra e soma os ganhos de ontem
    const myEarnsYesterday = myEarns
        ?.filter((earn: any) =>
            new Date(earn.created_at).toLocaleDateString('pt-BR') === yesterdayFormatted
        )
        .reduce((acc: number, earn: any) => acc + parseFloat(earn.value), 0) || 0;

    const { dataUsers } = UseListAffiliatedUsers();
    const userAffilatedWeek = dataUsers?.map(item => {
        if (getISOWeekNumber(String(new Date())) == getISOWeekNumber(String(item.UserAffialtedData.created_at))) {
            return item.UserAffialtedData.created_at
        }
    })
    // Pega a data de hoje
    const today = new Date();

    // Calcula o primeiro dia da semana (segunda-feira)
    const firstDayOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, ...
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    firstDayOfWeek.setDate(today.getDate() - diffToMonday);

    // Normaliza para ignorar horário (comparar apenas datas)
    firstDayOfWeek.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);

    // Filtra os usuários criados entre segunda-feira e hoje
    const usersThisWeek = dataUsers?.filter((user: any) => {
        const createdAt = new Date(user.created_at);
        return createdAt >= firstDayOfWeek && createdAt <= today;
    }) || [];

    // Número total de usuários nesta semana
    const totalUsersThisWeek = usersThisWeek.length;

    console.log("Usuários cadastrados nesta semana:", dataUsers);
    const stats = [
        {
            title: 'Total de Lucros',
            value: `${formattedValue}`,
            subtitle: '-',
            icon: DollarSign,
            color: 'text-green-600',
            trend: { value: '', isPositive: true }
        },
        {
            title: 'Ganho Hoje',
            value: `${myEarnsToday ?? 0} Kz`,
            subtitle: 'Ontem',
            icon: DollarSign,
            color: 'text-green-600',
            trend: { value: `${myEarnsYesterday} Kz`, isPositive: true }
        },
        {
            title: 'Total de  Usuário',
            value: `${dataUsers?.length ?? 0}`,
            subtitle: 'Novos Usuários Nesta Semana',
            icon: Users,
            color: 'text-blue-600',
            trend: { value: `${userAffilatedWeek?.length}`, isPositive: true }
        },
        {
            title: 'Total de Fichas',
            value: `${myTickets?.length}`,
            subtitle: 'Fichas Nesta Semana',
            icon: Ticket,
            color: 'text-purple-600',
            trend: { value: `${ticketsWeekNumber?.length}`, isPositive: true }
        },

    ];

    const handleCopyReferralCode = () => {

        // Aqui você poderia adicionar uma notificação de sucesso
    };

    const handleCopyReferralLink = () => {
        const link = `https://exemplo.com/ref/${"user.referralCode"}`;
        navigator.clipboard.writeText(link);
        // Aqui você poderia adicionar uma notificação de sucesso
    };
    const location = useLocation()
    const id = location.state.id
    const { eansData, laoderControl } = useListEarns();
    const navegate = useNavigate()
    const Myearns = eansData?.map(item => item.amount).reduce((acc, val) => acc + val, 0) ?? 0;
    const totalBuyed = eansData?.map(item => item.ammount_plan).reduce((acc, val) => acc + val, 0) ?? 0;
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className='flex items-center space-x-4'>
                            <img src={images.handcappIcon} alt="icon-handcapp" className='w-8 rounded  md:w-20 md:h-20 ' />
                            <div>
                                <div className='flex items-center'>
                                    <ArrowLeft className='text-zinc-400 cursor-pointer' onClick={() => navegate(-1)} />
                                    <h1 className="text-2xl font-bold text-gray-900 text-[13px] md:text-[17px]">Resumo de usuário</h1>
                                </div>                                <p className="text-gray-600 text-[10px] md:text-[15px]">Bem-vindo de volta, {myData?.name || ""}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 ">
                            <header className='hidden lg:block'>
                                <nav>
                                    <ul className='flex'>
                                        <Link to={"/dashboard"}>  <li className=' text-zinc-700  cursor-pointer text-[18px]  ml-4 '>DashBoard</li></Link>
                                        <Link to={"/users"}>  <li className=' text-zinc-700  cursor-pointer text-[18px]  ml-4 '>Usuários</li></Link>
                                        <Link to={"/history"}>   <li className=' text-zinc-700  cursor-pointer text-[18px]  ml-4 '>Histórico</li></Link>
                                        <Link to={"/my-tickets"}>   <li className=' text-zinc-700  cursor-pointer text-[18px]  ml-4 '>Minhas Fichas</li></Link>
                                    </ul>
                                </nav>
                            </header>


                            <button onClick={() => navegate('/withdrawal')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 hidden md:block md:flex md:flex-row">
                                <CreditCard className="w-4 h-4" />
                                <span>Solicitar Saque</span>
                            </button>
                            <UserAuthenticated />

                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}


                {/* Quick Actions */}
                <div className='flex flex-col justify-center  w-full'>

                    <div className=' w-full flex items-center'>
                        <img src={images.avatarIcon2} alt="avatar-icon" className='text-blue-600 w-20 h-20 border border-4 p-1  border-handcapp_color rounded-full' />
                        <h1 className='font-bold md:text-[28px] ml-4'>Ganhos de {id?.slice(0, 7)}</h1>
                    </div>
                    <div className='md:flex  md:justify-center w-full mt-5'>

                        <div className='bg-white  p-6  ml-2 rounded-md border  mt-4 flex flex-col items-center md:w-1/4'>
                            <div className='text-start w-full'>
                                <p className='text-zinc-500 '>Total de Ganhos</p>
                            </div>
                            <div className='w-full  text-start'>
                                <h1 className='font-bold text-[28px] mt-2 text-green-700'> {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(Myearns).trim()} </h1>
                            </div>
                        </div>

                        <div className='bg-white  p-6  ml-2 rounded-md border  mt-4 flex flex-col items-center md:w-1/4'>
                            <div className='text-start w-full'>
                                <p className='text-zinc-500'>Valor Total de Compra</p>
                            </div>
                            <div className='w-full  text-start'>
                                <h1 className='font-bold text-[28px] mt-2'> {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(totalBuyed).trim()} </h1>
                            </div>
                        </div>
                        <div className='bg-white  p-6  ml-2 rounded-md border mt-4 flex flex-col items-center md:w-1/4'>
                            <div className='text-start w-full'>
                                <p className='text-zinc-500'>Total de Transações</p>
                            </div>
                            <div className='w-full  text-start'>
                                <h1 className='font-bold text-[28px] mt-2'>{eansData?.length} </h1>
                            </div>

                        </div>
                        <div className='bg-white  p-6  ml-2 rounded-md border mt-4  flex flex-col items-center md:w-1/4'>
                            <div className='text-start w-full'>
                                <p className='text-zinc-500'>Comissçao de Affiliado </p>
                            </div>
                            <div className='w-full  text-start'>
                                <h1 className='font-bold text-[28px] mt-2'>  {myData?.affiliate_commission ?? 0}%</h1>
                            </div>
                        </div>



                    </div>
                    <div className='mt-10'>
                        <TransationsEarnTable />
                    </div>

                </div>
                {
                    laoderControl && <Loader />
                }

            </main>
        </div>
    );
}