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
    ArrowDownLeft
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

interface DashboardProps {
    user: any;
}

export default function TransationResume() {
    const { UpdateCancelPayemntRequest, loader } = useCancelPaymentRequest()
    const [openAddModal, setOpenAddModal] = useState(false)
    const { data } = UseListAffiliatedUsers()
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData, loaderControl } = useAuthMe()
    const { myPaymentData } = useListMyPaymentData()
    const [reference, setReference] = useState("")
    const [PaymentDataId, setPaymentDataId] = useState("")
    const [UpdateOpenModal, setUpdateOpenModal] = useState(false)
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
    const location = useLocation()
    const transaction = location.state.data
    console.log(transaction)
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
                                    <h1 className="text-2xl font-bold text-gray-900">Resumo da Transação</h1>
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
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full'>
                    <div className='w-full flex  justify-center'>
                        {
                            transaction.status_id.code == "8" && (
                                <div className='bg-white shadow-sm mt-5  p-10 flex flex-col items-center justify-center w-11/12 md:w-6/12'>
                                    <div className='bg-orange-500 flex flex-row  items-center justify-center text-white w-24 h-24 rounded-full'>
                                        <p className='text-white text-[50px]'>!</p>
                                    </div>
                                    <div className='w-full '>
                                        <span className='border border-dashed border-1 mt-5 block'></span>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Montate</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.amount} Kz</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>data de solicitação</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.created_at.split("T")[0]}</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Status</p>
                                            <p className='text-[18px]   font-bold text-orange-500 '>{
                                                handleTranstionEnum(transaction.status_id.code)
                                            }</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Número de Solicitação</p>
                                            <p className='text-[16px] text-zinc-500'>{transaction?.payment_request_number}</p>
                                        </div>
                                        <span className='border border-dashed border-1 block'></span>
                                        <div className='flex justify-end mt-5'>
                                            <button className='bg-red-600  text-white rounded p-2 cursor-pointer'
                                                onClick={() => UpdateCancelPayemntRequest(transaction.id)}
                                            >Cancelar Solicitação</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            transaction.status_id.code == "10" && (
                                <div className='bg-white shadow-sm mt-5  p-10 flex flex-col items-center justify-center w-11/12 md:w-4/12'>
                                    <div className=' flex flex-row  items-center justify-center text-white w-24 h-24 rounded-full'>
                                        <img src={images.IconFalied} className='w-full h-full' />
                                    </div>
                                    <div className='w-full '>
                                        <h1 className='text-[22px] text-center  font-semibold  text-zinc-400 mt-4'>Pagamento Falhou</h1>
                                        <span className='border border-dashed border-1 mt-5 block'></span>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Montate</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.amount} Kz</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>data de solicitação</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.created_at.split("T")[0]}</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Status</p>
                                            <p className='text-[18px]   font-bold text-red-600 '>{
                                                handleTranstionEnum(transaction.status_id.code)
                                            }</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Número de Solicitação</p>
                                            <p className='text-[16px] text-zinc-500'>{transaction?.payment_request_number}</p>

                                        </div>
                                        <span className='border border-dashed border-1 block'></span>

                                    </div>
                                </div>
                            )
                        }
                        {
                            transaction.status_id.code == "11" && (
                                <div className='bg-white shadow-sm mt-5  p-10 flex flex-col items-center justify-center w-11/12 md:w-4/12'>
                                    <div className=' flex flex-row  items-center justify-center text-white w-24 h-24 rounded-full'>
                                        <img src={images.IconFalied} className='w-full h-full' />
                                    </div>
                                    <div className='w-full '>
                                        <h1 className='text-[22px] text-center  font-semibold  text-zinc-400 mt-4'>Pagamento  Cancelado</h1>
                                        <span className='border border-dashed border-1 mt-5 block'></span>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Montate</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.amount} Kz</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>data de solicitação</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.created_at.split("T")[0]}</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Status</p>
                                            <p className='text-[18px]   font-bold text-red-600 '>{
                                                handleTranstionEnum(transaction.status_id.code)
                                            }</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Número de Solicitação</p>
                                            <p className='text-[16px] text-zinc-500'>{transaction?.payment_request_number}</p>

                                        </div>
                                        <span className='border border-dashed border-1 block'></span>

                                    </div>
                                </div>
                            )
                        }
                        {
                            transaction.status_id.code == "12" && (
                                <div className='bg-white shadow-sm mt-5  p-10 flex flex-col items-center justify-center w-11/12 md:w-4/12'>
                                    <div className=' flex flex-row  items-center justify-center text-white w-24 h-24 rounded-full'>
                                        <img src={images.Iconsucess} className='w-full h-full' />
                                    </div>
                                    <div className='w-full '>
                                        <h1 className='text-[22px] text-center  font-semibold  text-zinc-400 mt-4'>Pagamento  Feito Com Sucesso!</h1>

                                        <span className='border border-dashed border-1 mt-5 block'></span>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Montate</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.amount} Kz</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>data de solicitação</p>
                                            <p className='text-[18px]  text-zinc-500'>{transaction.created_at.split("T")[0]}</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Status</p>
                                            <p className='text-[18px]   font-bold text-green-800 '>{
                                                handleTranstionEnum(transaction.status_id.code)
                                            }</p>
                                        </div>
                                        <div className='w-full flex justify-between p-4'>
                                            <p className='text-[18px] text-zinc-500'>Número de Solicitação</p>
                                            <p className='text-[16px] text-zinc-500'>{transaction?.payment_request_number}</p>

                                        </div>
                                        <span className='border border-dashed border-1 block'></span>
                                        <div className='flex justify-end'>
                                            <button className='p-3 rounded bg-handcapp_color  text-white cursor-pointer mt-4'>Baixar Comprovativo</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <ModalPaymentData open={openAddModal} setOpen={setOpenAddModal} />

                <ModalPaymentDataUpdate
                    open={UpdateOpenModal}
                    setOpen={setUpdateOpenModal}
                    payment_data_id={PaymentDataId}
                    reference={reference}
                    id={Id}
                />
            </div>
            {loaderControl && <Loader />}
            {loader && <Loader />}
        </div>
    );
}