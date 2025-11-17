import { useState } from 'react';
import {
    CreditCard,
    ArrowLeft,
    Ticket,
    Copy,
} from 'lucide-react';
import { images } from '@/app/constatnts/images';
import AnchorTemporaryDrawer from '@/components/Shared-Compoonents/MenuMobile';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import { Loader } from '@/components/Loader';
import useListMyPaymentData from '../../profile/services/useListMyPaymentData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useListGame from '../services/useListGame';
import CardGame from '../components/CardGame';
import { ToastContainer, toast } from 'react-toastify';


export default function PersonalTicketPage() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData, loaderControl } = useAuthMe()
    const { myPaymentData } = useListMyPaymentData()
    const [reference, setReference] = useState("")
    const [PaymentDataId, setPaymentDataId] = useState("")
    const [UpdateOpenModal, setUpdateOpenModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)
    const [Id, setId] = useState("")
    const { dataGames } = useListGame()
    const availableBalance = 2847.50; // This would come from your backend
    const formattedValue = new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    }).format(myData?.point.value ?? 0);

    const navegate = useNavigate()
    const location = useLocation()
    const { data } = location.state
    console.log(data)
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(data?.ticket_id)
        toast.success("ID  Copiado com sucesso!")
    }
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
                                    <h1 className="text-2xl font-bold text-gray-900">Ficha</h1>
                                </div>
                                <p className="text-gray-600 text-[10px] md:text-[15px]">Bem-vindo de volta, {myData?.name || ""}</p>
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

                <div className='bg-white shadow-sm rounded-xl w-11/12 md:w-6/12 mt-10 mb-10'>
                    <div className='bg-handcapp_color text-white p-4 rounded-t-lg flex items-center justify-between'>
                        <div>
                            <h1 className='text-2xl font-bold'>#Ficha{data?.number}</h1>
                            <p className='text-xl font-thin mt-1'>Visualização: {data?.views_count}</p>
                            <p className='text-xl font-thin mt-1'>Autor: {data?.affiliate_code}</p>
                            <p className='text-xl font-thin mt-1'>Inicio da Ficha: {data?.start_at.split(" ")[0]}</p>
                            <p className='text-xl font-thin mt-1'>Termino da Ficha: {data?.end_at.split(" ")[0]}</p>
                        </div>
                        <div>
                            <Ticket size={50} />
                        </div>
                    </div>
                    <div>
                        {dataGames?.map((item, index) => (
                            <div key={index}>
                                <CardGame
                                    home={item?.game?.teams?.home}
                                    game={item?.game}
                                    prognosticType={item.gameData.prognostic}
                                    away={item?.game?.teams?.away}
                                    league={item.game?.league}
                                    start_at={item?.game?.time.datetime}
                                    odd={item.gameData.odd}
                                />
                            </div>
                        ))}
                        <div></div>
                    </div>
                    <div className='p-2'>
                        <div className='bg-handcapp_color rounded p-2 text-white'>
                            <p>Odd total: {data?.affiliate_code}</p>
                            <p>Valor da Aposta: {
                                new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(Number(data?.amount_to_invest))
                            }</p>
                            <p className=' font-semibold bg-yellow-300 p-2 mt-2 text-black rounded'>Ganho - {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(Number(data?.earn))}</p>
                        </div>
                    </div>

                    <div className='p-3  flex  justify-between ' onClick={() => copyToClipBoard()}>
                        <h1 className='font-semibold'>ID da  Ficha: {data.ticket_id} </h1>
                        <div className='flex cursor-pointer'>
                            <Copy className='text-handcapp_color ' />
                            <p className='text-handcapp_color ml-1'>Copiar ID</p>
                        </div>
                        
                    </div>

                    <div className='p-3  flex  justify-between ' >
                        <h1 className='font-semibold'>Estado da ficha:  <span className=' font-normal text-zinc-400'>
                               {data.status == "0" ? "Normal" : 
                                data.status == "1" ? "Entrou " : 
                                data.status == "2" ? "Molhou ":"Pendente"
                                
                             }
                            </span> </h1>
                       
                        
                    </div>
                </div>
                <ToastContainer />
            </div>
            {loaderControl && <Loader />}
        </div>
    );
}