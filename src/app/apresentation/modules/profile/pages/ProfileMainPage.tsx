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
  Camera,
  Plus,
  PlusCircle
} from 'lucide-react';
import WithdrawalPage from '@/components/withdrawals/WithdrawalPage';
import { images } from '@/app/constatnts/images';
import AnchorTemporaryDrawer from '@/components/Shared-Compoonents/MenuMobile';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import { Loader } from '@/components/Loader';
import ModalPaymentData from '../components/ModalPaymentData';
import useListPaymentData from '@/app/apresentation/hooks/useListPaymentData';
import useListMyPaymentData from '../services/useListMyPaymentData';
import { PaymentDataEnum } from '../types/PaymentDataType';
import ModalPaymentDataUpdate from '../components/ModalPaymentDataUpdate';
import { Link, useNavigate } from 'react-router-dom';
import ModalUpdateDataUser from '../components/ModalUpdateDataUser';
import UplodImage from '../components/UplodImage';
interface DashboardProps {
  user: any;
}

export default function ProfileMainPage() {
  const [openUploudModal, setOpenUploudModal] = useState(false)
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



  console.log("eu", myData)
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
                  <h1 className="text-2xl font-bold text-gray-900 text-[13px] md:text-[17px]">Perfil</h1>
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
        <div className='w-full  '>
          <div className=' flex flex-col-reverse  items-center md:flex  md:flex-row w-full mt-10 md:justify-center '>
            <div className='w-11/12 mt-10 md:w-1/2 bg-white h-[500px] shadow-md  rounded-xl'>
              <div className='flex  items-center p-5  justify-between'>
                <div>
                  <h1 className='font-semibold text-[22px]'>Informações Pessoais</h1>
                  <p className='text-zinc-500 text-[12px]'>Gere as suas  Informações Pessois Aqui.</p>

                </div>
                <div className='flex items-center cursor-pointer' onClick={() => setOpenUserModal(true)}>
                  <Pencil className='text-handcapp_color' />
                  <span className='font-semibold text-handcapp_color ml-2'>Editar</span>
                </div>
              </div>

              <div className='border border-t-[0.2px] -mt-4'></div>
              <div className=''>
                <div className='flex justify-between'>
                  <div className='p-5'>
                    <label className='text-[14px]  text-zinc-500'>Nome Completo</label>
                    <h1 className='mt-2'>  {
                      myData?.name
                    }</h1>
                  </div>
                  <div className='p-5'>
                    <label className='text-[14px]  text-zinc-500'>Número de Telefone</label>
                    <h1 className='mt-2'>  {
                      myData?.phone
                    }</h1>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='p-5'>
                    <label className='text-[14px]  text-zinc-500'>Email</label>
                    <h1 className='mt-2'>  {
                      myData?.email ? myData?.email : "N/A"
                    }</h1>
                  </div>
                  <div className='p-5'>
                    <label className='text-[14px]  text-zinc-500'>Endereço</label>
                    <h1 className='mt-2'>  {
                      myData?.address ? myData?.address : "N/A"
                    }</h1>
                  </div>
                </div>

                <div className='flex'>
                  <div className='p-5'>
                    <label className='text-[14px]  text-zinc-500'>Nome de Batedor de Fichas</label>
                    <h1 className='mt-2'>  {
                      myData?.beater_ticket_name ? myData?.beater_ticket_name : "N/A"
                    }</h1>
                  </div>
                </div>
              </div>

            </div>
            <div className=' w-full md:w-1/3 flex  flex-col  items-center'>
              <div className='w-11/12 bg-white h-[240px] shadow-md rounded-xl mt-8 flex justify-center  items-center'>
                <div className='flex flex-col items-center justify-center '>
                  <div className='border border-4 cursor-pointer border-handcapp_color h-[120px] w-[120px]  flex justify-center items-center rounded-full'>
                    <img
                      src={myData?.image_path ? myData?.image_path : images.handcappIcon} alt="profile" className='h-[105px] w-[105px] rounded-full' />
                  </div>
                    <div className='bg-handcapp_color  text-white rounded-full p-2  absolute cursor-pointer'
                     onClick={()=>setOpenUploudModal(true)}
                    >
                       <Camera/>
                    </div>
                  <div className='flex justify-center w-full '>
                    <h1 className=' text-[18px] text-center  font-semibold p-2 text-zinc-800'>{myData?.name}</h1>

                  </div>
                  <h1 className=' text-[14px] text-zinc-500'>Afiliado</h1>
                </div>
              </div>
              <div className='w-11/12 bg-white h-[230px] p-2 shadow-md rounded-xl mt-8'>
                <div className='flex items-center  justify-between'>
                  <h1 className='text-[18px]   font-semibold  text-zinc-800 mt-2'>Detalhes da Conta Bancária</h1>
                  <Pencil className='w-5 text-zinc-400  cursor-pointer' onClick={() => {
                    if (myPaymentData && myPaymentData.length > 0) {
                      const firstPayment = myPaymentData[0];

                      setId(firstPayment.id || "");
                      setReference(firstPayment.reference || "");
                      setPaymentDataId(firstPayment.payment_method?.id || "");
                      setUpdateOpenModal(true);
                    }
                  }} />
                </div>
                <div className='border border-t-[0.1px]  mt-4 '>

                </div>
                <span className='text-[14px]  text-zinc-400 mt'>IBAN</span>
                <h1 className='mt-1 text-zinc-600 text-[18px] '> AO06{myPaymentData && myPaymentData[0]?.reference
                  ? myPaymentData[0].reference.match(/.{1,4}/g)?.join(" ")
                  : ""}</h1>
                <div className='flex justify-center mt-10'>
                  {myPaymentData && myPaymentData[0]?.reference ?
                    "" : <button className='bg-handcapp_color w-full p-3  flex text-white rounded'
                     onClick={()=>setOpenAddModal(!openAddModal)}
                    >
                      <PlusCircle className='ml-2 mr-2' />
                      Adicionar detalhes da Conta</button>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalPaymentData open={openAddModal} setOpen={setOpenAddModal} />
        {openUploudModal && <UplodImage image={myData?.image_path || ""} setOpen={setOpenUploudModal} open={openUploudModal} />}
        <ModalUpdateDataUser open={openUserModal} setOpen={setOpenUserModal} />
        <ModalPaymentDataUpdate
          open={UpdateOpenModal}
          setOpen={setUpdateOpenModal}
          payment_data_id={PaymentDataId}
          reference={reference}
          id={Id}
        />
      </div>
      {loaderControl && <Loader />}
    </div>
  );
}