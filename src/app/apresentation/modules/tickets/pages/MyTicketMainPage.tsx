import { SetStateAction, useState } from 'react';
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
    Pencil,
    ArrowLeft,
    Plus
} from 'lucide-react';
import WithdrawalPage from '@/components/withdrawals/WithdrawalPage';
import { images } from '@/app/constatnts/images';
import AnchorTemporaryDrawer from '@/components/Shared-Compoonents/MenuMobile';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import { Loader } from '@/components/Loader';
import ModalPaymentData from '../../profile/components/ModalPaymentData';
import useListPaymentData from '@/app/apresentation/hooks/useListPaymentData';
import useListMyPaymentData from '../../profile/services/useListMyPaymentData';
import { PaymentDataEnum } from '../../profile/types/PaymentDataType';
import ModalPaymentDataUpdate from '../../profile/components/ModalPaymentDataUpdate';
import { Link, useNavigate } from 'react-router-dom';
import ModalUpdateDataUser from '../../profile/components/ModalUpdateDataUser';
import TicketCard from '../components/TicketCard';
interface DashboardProps {
    user: any;
}

export default function MyTicketMainPage() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const { data } = UseListAffiliatedUsers()
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData, loaderControl } = useAuthMe()
    const { myPaymentData } = useListMyPaymentData()
    const [reference, setReference] = useState("")
    const [PaymentDataId, setPaymentDataId] = useState("")
    const [UpdateOpenModal, setUpdateOpenModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)
    const [Id, setId] = useState("")
    const availableBalance = 2847.50; // This would come from your backend
    const formattedValue = new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    }).format(myData?.point.value ?? 0);
    const stats = [
        {
            title: 'Total de Lucros',
            value: `${formattedValue}`,
            subtitle: 'Este mês',
            icon: DollarSign,
            color: 'text-green-600',
            trend: { value: '12%', isPositive: true }
        },
        {
            title: 'Total de Lucros Sacado',
            value: `${formattedValue ?? 0}`,
            subtitle: 'Este mês',
            icon: DollarSign,
            color: 'text-green-600',
            trend: { value: '12%', isPositive: true }
        },
        {
            title: 'Afiliados Ativos',
            value: `${data?.length ?? 0}`,
            subtitle: 'Total de referidos',
            icon: Users,
            color: 'text-blue-600',
            trend: { value: '8%', isPositive: true }
        },
        {
            title: 'Total de Fichas',
            value: '32',
            subtitle: 'Últimos 30 dias',
            icon: Ticket,
            color: 'text-purple-600',
            trend: { value: '0.5%', isPositive: true }
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


    const navegate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className='flex items-center space-x-4'>
                            <img src={images.handcappIcon} alt="icon-handcapp" className='w-15 h-20 rounded ' />
                            <div>
                                <div className='flex items-center'>
                                    <ArrowLeft className='text-zinc-400 cursor-pointer' onClick={() => navegate(-1)} />
                                    <h1 className="text-2xl font-bold text-gray-900">Minhas Fichas</h1>
                                </div>
                                <p className="text-gray-600">Bem-vindo de volta, {myData?.name || ""}</p>
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

                            <div className='block lg:hidden'>
                                <AnchorTemporaryDrawer />
                            </div>
                            <button onClick={() => navegate('/withdrawal')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 hidden md:block md:flex md:flex-row">

                                <CreditCard className="w-4 h-4" />
                                <span>Solicitar Saque</span>
                            </button>
                            <UserAuthenticated />

                        </div>
                    </div>
                </div>
            </header>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-11/12 md:w-7/12 flex justify-end'>
                    <button className='bg-handcapp_color text-white rounded p-3 flex cursor-pointer mt-4'>Bater Ficha
                        <Plus />
                    </button>
                </div>
                <div className='w-full flex flex-col  items-center md:w-4/12  md:flex md:flex-row md:flex-wrap md:justify-between'>
                    {
                        Array(10).fill(null).map((_, index) => (
                            <TicketCard />
                        ))
                    }
                </div>
            </div>
            {loaderControl && <Loader />}
        </div>
    );
}