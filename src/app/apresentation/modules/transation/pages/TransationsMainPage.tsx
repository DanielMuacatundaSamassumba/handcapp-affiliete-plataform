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
    Pencil,
    ArrowBigLeft,
    ArrowLeft,
    ArrowDownLeft,
    Calendar
} from 'lucide-react';
import { images } from '@/app/constatnts/images';
import AnchorTemporaryDrawer from '@/components/Shared-Compoonents/MenuMobile';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import { Loader } from '@/components/Loader';
import ModalPaymentData from '../../profile/components/ModalPaymentData';
import useListMyPaymentData from '../../profile/services/useListMyPaymentData';
import ModalPaymentDataUpdate from '../../profile/components/ModalPaymentDataUpdate';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleTranstionEnum } from '../types/TransationType';
import useCancelPaymentRequest from '../services/useCancelPaymentRequest';
import TransactionHistory from '@/components/transactions/TransactionHistory';
import useListMyTransation from '@/components/utils/useListMyTransation';



export default function TransationsMainPage() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const { data } = UseListAffiliatedUsers()
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData, loaderControl } = useAuthMe()
    const { myPaymentData } = useListMyPaymentData()
    const [reference, setReference] = useState("")
    const [PaymentDataId, setPaymentDataId] = useState("")
    const [UpdateOpenModal, setUpdateOpenModal] = useState(false)
    const [Id, setId] = useState("")
    const { myTransations, loader } = useListMyTransation()
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
                                    <h1 className="text-2xl font-bold text-gray-900">Histórico</h1>
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

            {myTransations && [...myTransations].reverse().map((transaction, index) => (
                <div key={index} className='flex justify-center'  >
                    {


                        <div key={transaction.id}
                            onClick={() => navegate("/transation-resume", { state: { data: transaction } })}
                            className="flex items-center justify-between w-11/12 mt-4 cursor-pointer p-4 border border-gray-200 rounded-lg bg-white hover:border-blue-300 hover:shadow-md transition-all md:w-1/2">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.status_id.name === 'success'
                                    ? 'bg-green-100'
                                    : 'bg-orange-100'
                                    }`}>
                                    {transaction.status_id.name === 'success' ? (
                                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <ArrowUpRight className="w-5 h-5 text-orange-600" />
                                    )}
                                </div>
                                <div>
                                    {<h3 className=" text-[15px]">{transaction?.notification?.description}</h3>}
                                    {<h3 className=" text-[12px]">{transaction?.payment_request_number}</h3>}
                                    <div className="flex items-center text-xs text-gray-500 mt-2">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(transaction.created_at).toLocaleDateString('pt-BR')}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-semibold ${transaction.status_id.name === 'earning' ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                    {transaction.status_id.name === 'earning' ? '+' : '-'}{transaction.amount}
                                </p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${transaction.status_id.name === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : transaction.status_id.name === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {transaction.status_id.name === 'success' ? 'Concluído' :
                                        transaction.status_id.name === 'pending'
                                            ? 'Pendente' :
                                            transaction.status_id.name === "canceled" ? "Cancelado" :
                                                'Falhou'}
                                </span>
                            </div>

                        </div>

                    }
                </div>
            ))}
            {
                loader && (
                    <Loader />
                )
            }
        </div>
    );
}