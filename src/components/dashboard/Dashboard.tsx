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
  Ticket
} from 'lucide-react';
import StatsCard from './StatsCard';
import AffiliatesList from '../affiliates/AffiliatesList';
import TransactionHistory from '../transactions/TransactionHistory';
import WithdrawalPage from '../withdrawals/WithdrawalPage';
import { images } from '@/app/constatnts/images';
import AnchorTemporaryDrawer from '../Shared-Compoonents/MenuMobile';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import UseListAffiliatedUsers from '@/app/apresentation/modules/dashboard/hooks/UseListAffiliatedUsers';
import UserAuthenticated from '../Shared-Compoonents/UserAuthenticated';
interface DashboardProps {
  user: any;
}

export default function Dashboard() {
  const {data }  =UseListAffiliatedUsers()
  const [currentView, setCurrentView] = useState('dashboard');
  const { myData}= useAuthMe()
  const availableBalance = 2847.50; // This would come from your backend
  console.log(myData)
  const formattedValue = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA'
  }).format(myData?.point.value ?? 0);
  const stats = [
    {
      title: 'Total de Lucros',
      value:`${formattedValue}`,
      subtitle: 'Este mês',
      icon: DollarSign,
      color: 'text-green-600',
      trend: { value: '12%', isPositive: true }
    },
    {
      title: 'Total de Lucros Sacado',
      value:`${formattedValue ?? 0}`,
      subtitle: 'Este mês',
      icon: DollarSign,
      color: 'text-green-600',
      trend: { value: '12%', isPositive: true }
    },
    {
      title: 'Afiliados Ativos',
      value:`${data?.length ?? 0}`,
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
      <WithdrawalPage
        user={""}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className='flex items-center space-x-4'>
              <img src={images.handcappIcon} alt="icon-handcapp" className='w-15 h-20 rounded ' />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Bem-vindo de volta, {myData?.name || ""}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 ">
              <header className='hidden lg:block'>
                <nav>
                  <ul className='flex'>


                    <li className=' text-zinc-700  cursor-pointer  text-[18px] ml-4 '>Afiliados</li>
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
              <UserAuthenticated/>
              
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCurrentView('withdrawals')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Gerenciar Saques</p>
                  <p className="text-sm text-gray-600">Solicitar e acompanhar saques</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Seu Link de Afiliação</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Referência
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={myData?.affiliate_code || ""}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopyReferralCode}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link de Referência
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`https://handicapp.co.ao/ref/${myData?.affiliate_code || ""}`}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AffiliatesList />
          <TransactionHistory />
        </div>
      </main>
    </div>
  );
}