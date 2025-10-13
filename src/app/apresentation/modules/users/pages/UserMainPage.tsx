import { Loader } from '@/components/Loader';
import React, { useState } from 'react'
import ModalUpdateDataUser from '../../profile/components/ModalUpdateDataUser';
import ModalPaymentData from '../../profile/components/ModalPaymentData';
import { ArrowLeft, Calendar, CreditCard, DollarSign, Pencil, Ticket, User, Users } from 'lucide-react';
import { PaymentDataEnum } from '../../profile/types/PaymentDataType';
import ModalPaymentDataUpdate from '../../profile/components/ModalPaymentDataUpdate';
import UserAuthenticated from '@/components/Shared-Compoonents/UserAuthenticated';
import AnchorTemporaryDrawer from '@/components/Shared-Compoonents/MenuMobile';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '@/app/constatnts/images';
import useListMyPaymentData from '../../profile/services/useListMyPaymentData';
import UseListAffiliatedUsers from '../../dashboard/hooks/UseListAffiliatedUsers';
import useAuthMe from '../../dashboard/hooks/useAuthMe';
import AffiliatesList from '@/components/affiliates/AffiliatesList';

export default function UserMainPage() {
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
                                    <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
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
            <div className="p-6">
        <div className="space-y-4 flex flex-col  items-center justify-center">
          {data?.map((affiliate) => (
            <div key={affiliate?.user_affiliated?.id} className=" bg-white flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all md:w-1/2">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                   {
                     affiliate?.user_affiliated?.image_path ? (
                      <img
                      src={affiliate?.user_affiliated?.image_path}
                      alt={affiliate?.user_affiliated?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                     ) : (
                      <User className="w-5 h-5 text-blue-600" />
                     )
                   }
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{affiliate?.user_affiliated?.name}</h3>
                  <p className="text-sm text-gray-600">{affiliate?.user_affiliated?.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(affiliate?.UserAffialtedData?.created_at).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <DollarSign className="w-3 h-3 mr-1" />
                
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {/*<p className="font-semibold text-green-600">{affiliate.totalEarnings}</p>*/}
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  affiliate?.user_affiliated?.status === '1' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {        affiliate?.user_affiliated?.status === '1' ? "Activo":"Inactivo" }
                </span>
              </div>
            </div>
          ))}
        </div>
        
       
      </div>
            {loaderControl && <Loader />}
        </div>
    );
}
