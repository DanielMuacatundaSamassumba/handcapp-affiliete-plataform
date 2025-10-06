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
  ArrowLeft
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
import { useNavigate } from 'react-router-dom';
interface DashboardProps {
  user: any;
}

export default function ProfileMainPage() {
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

  if (currentView === 'withdrawals') {
  return (
    <>
      {myData && (
        <WithdrawalPage
          user={myData}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </>
  );
}

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
                <ArrowLeft className='text-zinc-400 cursor-pointer' onClick={()=>navegate(-1)}/>
               <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
               </div>
                <p className="text-gray-600">Bem-vindo de volta, {myData?.name || ""}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 ">
              <header className='hidden lg:block'>
                <nav>
                  <ul className='flex'>


                    <li className=' text-zinc-700  cursor-pointer  text-[18px] ml-4 '>Referidos</li>
                    <li className=' text-zinc-700  cursor-pointer text-[18px]  ml-4 '>Histórico</li>



                  </ul>
                </nav>
              </header>

              <div className='block lg:hidden'>
                <AnchorTemporaryDrawer />
              </div>
              <button onClick={() => setCurrentView('withdrawals')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">

                <CreditCard className="w-4 h-4" />
                <span>Solicitar Saque</span>
              </button>
              <UserAuthenticated />

            </div>
          </div>
        </div>
      </header>
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-white mt-10 p-5 shadow-md rounded w-11/12 md:w-6/12 lg:w-1/3 border'>
          <div className=' flex items-center '>
            <div className='border-4 border-handcapp_color  rounded-full'>
              <img src={images.avatarIcon} alt="image-profile" className='w-20 rounded-full ' />
            </div>
            <div className='ml-4' >
              <p className='text-[17px]'>{myData?.name}</p>
              <p className='text-zinc-400'>{myData?.phone}</p>
            </div>

          </div>
          <span className='border-b border-zinc-300 block mt-2'></span>
          <div className=' flex justify-between border-b border-zinc-300 p-4 '>
            <p className='text-zinc-400'>Nome</p>
            <p className='text-zinc-400'>{myData?.name}</p>

          </div>
          <div className=' flex justify-between border-b border-zinc-300 p-4 '>
            <p className='text-zinc-400'>Email</p>
            <p className='text-zinc-400'>{myData?.email ? myData?.email : "N/A"}</p>

          </div>


          <div className='mt-4 flex justify-end'>
            <button className='bg-handcapp_color text-white rounded p-2'>Alterar Dados</button>
          </div>
        </div>
        <div className=' bg-white p-5 mt-2 shadow-md  w-11/12 md:w-6/12 lg:w-1/3'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl  font-bold text-zinc-500 '>Dados Bancários</p>
            <button className='text-white bg-handcapp_color p-2 rounded' onClick={() => setOpenAddModal(!openAddModal)}>Adicionar</button>
          </div>
          <span className='border block border-dashed mt-3 '></span>
          <div className='flex justify-between items-center'>
            <div>
              {
                myPaymentData && myPaymentData.map(item => (
                  <div key={item.id}>
                    {
                      item.payment_method.short_name != PaymentDataEnum.MCX ?
                        <div>
                          <p className='text-zinc-400 text-xl mt-2  font-semibold'>IBAN</p>
                          <div className='flex items-center'>
                            <p className='text-zinc-400 text-xl mt-2'>{item.reference}</p>
                            <Pencil className='w-20 text-zinc-400 cursor-pointer'
                              onClick={() => {
                                setUpdateOpenModal(true)
                                setId(item.id)
                                setReference(item.reference)
                                setPaymentDataId(item.payment_method.id)
                              }}
                            />
                          </div>
                        </div>
                        : ""
                    }
                  </div>
                ))
              }
            </div>

          </div>
          <div className='flex justify-between items-center'>
            <div>
              {
                myPaymentData && myPaymentData.map(item => (
                  <div key={item.id}>
                    {
                      item.payment_method.short_name != PaymentDataEnum.TRANSFER ?
                        <div >
                          <p className='text-zinc-400 text-xl mt-2 font-semibold'>Express</p>
                          <div className='flex items-center'>
                            <p className='text-zinc-400 text-xl mt-2'>{item.reference}</p>
                            <Pencil className='w-20 text-zinc-400 cursor-pointer'
                              onClick={() => {
                              
                                setId(item.id)
                                setReference(item.reference)
                                setPaymentDataId(item.payment_method.id),
                                  setUpdateOpenModal(true)
                              }}
                            />
                          </div>
                        </div>
                        : ""
                    }
                  </div>
                ))
              }

            </div>

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
    </div>
  );
}