import { SetStateAction, useEffect, useState } from 'react';
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
    Plus,
    Trash,
    Trash2
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
import Select from "react-select"
import { ActionMeta, InputActionMeta } from 'react-select';
import useLeagueByDate from '../services/useLeagueByDate';
import useAuthHandcappApi from '@/app/hooks/useAuthHandcappApi';
import { ModalBeaterTicketName } from '../components/ModalBeaterTicketName';
interface DashboardProps {
    user: any;
}

export default function SugestTicket() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const { data } = UseListAffiliatedUsers()
    const [currentView, setCurrentView] = useState('dashboard');
    const { myData, loaderControl } = useAuthMe()
    const { myPaymentData } = useListMyPaymentData()
    const [reference, setReference] = useState("")
    const [PaymentDataId, setPaymentDataId] = useState("")
    const [UpdateOpenModal, setUpdateOpenModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)
    const [modalBeatTicketName, setModalBeatTicketName] = useState(false)
    const [Id, setId] = useState("")
    const availableBalance = 2847.50; // This would come from your backend
    const formattedValue = new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA'
    }).format(myData?.point.value ?? 0);


    const {
        leaguesData,
        setDateFilter,
        loadingProcess,
        setLeagueSelected,
        leagueselected,
        gameSelected,
        setGameSelected,
        gameData, handleAddGame,
        games,
        merketData,
        marketSelected,
        setMerketSelected,
        prodictionData,
        handleFilterPreddits,
        setPrognosticSelected,
        handleDeleteGame,
        handleSubmit
    } = useLeagueByDate()

    const optionsLeagues = leaguesData?.map(league => {
        return { value: String(league.id,), label: `${league.name} ` }
    })
    const optionsGames = gameData?.map(game => ({
        value: game,
        label: `${game.teams.home.name} vs ${game.teams.away.name}`,
    }));

     useEffect(()=>{
     if (myData?.beater_ticket_name === null) {
        setModalBeatTicketName(true)
    }
   },[myData] )

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
                                    <h1 className="text-2xl font-bold text-gray-900">Bater Ficha</h1>
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
                <div className='flex flex-col bg-white shadow-md mt-5 rounded w-11/12 p-5 md:w-5/12'>
                    <div className='w-full flex flex-col mt-4'>
                        <label className='mt-2 mb-2'>Data</label>
                        <input type="date" className='border p-2 rounded-md' onChange={(e) => setDateFilter(String(e.target.value))} />
                    </div>

                    {
                        leaguesData && leaguesData?.length > 0 ?
                            <div className='w-full flex flex-col mt-2'>
                                <label className='mt-2 mb-2'>Liga</label>
                                <Select
                                    className=" p-2 rounded-md  w-full"
                                    options={optionsLeagues}
                                    value={leagueselected}
                                    onChange={(newValue) => setLeagueSelected(newValue)}
                                />
                            </div>
                            : ""
                    }



                    {
                        leagueselected?.label != "" ?
                            <div className='w-full flex flex-col mt-2'>
                                <label className='mt-2 mb-2'>Jogo</label>
                                <Select
                                    className=" p-2 rounded-md  w-full"
                                    options={optionsGames}
                                    value={gameSelected}
                                    onChange={(newValue) => setGameSelected(newValue)}
                                />
                            </div>

                            : ""
                    }

                    {
                        gameSelected?.label != null ?
                            <div className='w-full flex flex-col mt-2 px-2'>
                                <label htmlFor="">Mercado</label>
                                <select className='border p-2 rounded outline-none  w-full mt-3' onChange={(e) => handleFilterPreddits(e.target.value)}>
                                    <option value="">Selecione O mercado</option>
                                    {
                                        merketData?.map(item => (
                                            <option key={item.id} value={item.id} >   {item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            : ""
                    }

                    {
                        prodictionData && prodictionData?.length > 0 ?
                            <div className='w-full flex flex-col mt-2 px-2'>
                                <label htmlFor="">Prognostico</label>
                                <select className='border p-2 rounded outline-none  w-full mt-3' onChange={(e) => {
                                    const selected = JSON.parse(e.target.value);
                                    setPrognosticSelected(selected);
                                }
                                }>
                                    <option value="">Selecione O Prognostico</option>
                                    {
                                        prodictionData?.map((item: any) => (

                                            <option key={item.id} value={JSON.stringify(item)}>   {item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            : ""
                    }

                    {
                        gameSelected?.label != null ?
                            <div className='w-full flex flex-col mt-2'>
                                <button
                                    onClick={() => handleAddGame()}
                                    className='bg-handcapp_color text-white rounded p-2  cursor-pointer'>Adicionar Jogo</button>
                            </div>

                            : ""
                    }
                </div>
                <div className='w-11/12 md:w-5/12  '>
                    {(games ?? []).map((game, index) => (
                        <div key={index} className='w-full'>
                            <div className='flex flex-col   justify-between w-full bg-zinc-300 p-2 rounded mt-2'>
                                <div className='flex justify-between'>
                                    <p className='font-bold text-sm'>{game.game_id.value.league.name}</p>
                                    <p className='text-[11px]'>{game.game_id.value.time.datetime}</p>
                                </div>
                                <div className='flex justify-evenly'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <img src={game.game_id.value.teams.home.img} className='w-12' alt="home-image" />
                                        <p className='text-[11px] font-semibold mt-2'>{game.game_id.value.teams.home.name} </p>
                                    </div>
                                    <div className='w-1/3 text-center'>
                                        <p className='text-[15px]  text-center font-semibold'>{game.prognostic}</p>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <img src={game.game_id.value.teams.away.img} className='w-12' alt="away-image" />
                                        <p className='text-[11px] font-semibold mt-2'>{game.game_id.value.teams.away.name} </p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button className='bg-handcapp_color text-white p-2 rounded cursor-pointer mt-2' onClick={() => handleDeleteGame(game.id)}>
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    games.length > 0 ?
                        <div className='w-11/12 md:w-5/12'>
                            <button className='bg-handcapp_color text-white w-full p-3 mt-2 rounded' onClick={() => handleSubmit()}>Sugerir Ficha</button>
                        </div> : ""
                }

            </div>
            {loaderControl && <Loader />}
            {loadingProcess && <Loader />}
            {modalBeatTicketName && <ModalBeaterTicketName />}
        </div>
    );
}