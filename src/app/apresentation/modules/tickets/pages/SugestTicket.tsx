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
import Select from "react-select"
import { ActionMeta, InputActionMeta } from 'react-select';
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
    const games = [
        {
          id: "1",
          homeTeam: {
            name: "Manchester City",
            logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
          },
          awayTeam: {
            name: "Real Madrid",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
          },
          date: "2025-10-20",
          time: "20:00",
          stadium: "Etihad Stadium",
          status: "Ao vivo",
        },
        {
          id: "2",
          homeTeam: {
            name: "Barcelona",
            logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
          },
          awayTeam: {
            name: "Liverpool",
            logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
          },
          date: "2025-10-22",
          time: "21:00",
          stadium: "Camp Nou",
          status: "Agendado",
        },
        {
          id: "3",
          homeTeam: {
            name: "Bayern Munich",
            logo: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_München_logo_%282017%29.svg",
          },
          awayTeam: {
            name: "Arsenal",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
          },
          date: "2025-10-25",
          time: "19:30",
          stadium: "Allianz Arena",
          status: "Finalizado",
        },
      ];
 const options = games.map(game=>{
      return{value:game.id,label:`${game.homeTeam.name} vs ${game.awayTeam.name} `}
 })
  const [ allGames , setAllGames] = useState({
      game:"",
      id:""
  })
  const handleAddGame = (e:any)=>{
     const { name, value } = e.target
      console.log({[name]:value})
  }
    const handleCopyReferralLink = () => {
        const link = `https://exemplo.com/ref/${"user.referralCode"}`;
        navigator.clipboard.writeText(link);
        // Aqui você poderia adicionar uma notificação de sucesso
    };

    const [selected, setSelected] = useState<{ value: string; label: string } | null>(null);

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
                <div className='flex flex-col bg-white shadow-md mt-5 rounded w-11/12 p-5 md:w-5/12'>
                    <div className='w-full flex flex-col mt-4'>
                        <label className='mt-2 mb-2'>Data</label>
                        <input type="date" className='border p-2 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col mt-2'>
                        <label className='mt-2 mb-2'>Liga</label>
                        <Select
                            className=" p-2 rounded-md  w-full"
                            options={options}
                            value={selected}
                            onChange={(newValue) => setSelected(newValue)}
                        />
                    </div>
                    <div className='w-full flex flex-col mt-2'>
                        <label className='mt-2 mb-2'>Jogo</label>
                        <Select
                            className=" p-2 rounded-md  w-full"
                            options={options}
                            value={selected}
                            onChange={(newValue) => setSelected(newValue)}
                        />
                    </div>
                </div>
            </div>
            {loaderControl && <Loader />}
        </div>
    );
}