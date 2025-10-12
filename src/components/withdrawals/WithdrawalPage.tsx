import React, { useMemo, useState } from 'react';
import { ArrowLeft, DollarSign, CreditCard, CheckCircle, AlertCircle, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import WithdrawalModal from './WithdrawalModal';
import WithdrawalsList from './WithdrawalsList';
import { UserData } from '@/app/apresentation/modules/dashboard/types/userType';
import useListMyPaymentData from '@/app/apresentation/modules/profile/services/useListMyPaymentData';
import useListMyTransation from '../utils/useListMyTransation';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import TransactionHistory from '../transactions/TransactionHistory';
import { useNavigate } from 'react-router-dom';

interface WithdrawalPageProps {
  user: UserData;
  onBack: () => void;
}

export default function WithdrawalPage() {
  const { user } = useAuthMe()
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const { myTransations } = useListMyTransation()
  const [withdrawals, setWithdrawals] = useState([

    {
      id: '2',
      amount: 300.00,
      method: 'bank',
      status: 'pending' as const,
      requestDate: '2024-01-18T09:15:00Z',
      bankInfo: {
        bankCode: '001',
        agency: '1234',
        account: '12345-6',
        holderName: 'João Silva'
      }
    },
    {
      id: '3',
      amount: 150.00,
      method: 'pix',
      status: 'rejected' as const,
      requestDate: '2024-01-16T15:20:00Z',
      pixKey: 'joao@example.com'
    }
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const availableBalance = 2847.50;
  const pendingAmount = withdrawals
    .filter(w => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const handleWithdrawalSubmit = (withdrawalData: any) => {
    setWithdrawals(prev => [withdrawalData, ...prev]);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };
  const filter = useMemo(() => {
    const panddingAmmount = myTransations?.filter(item => item.status_id.code == "8")
      .reduce((acc: number, item: any) => {
        return acc + Number(item.amount);
      }, 0) || 0;
    const sucessAmountW = myTransations?.filter(item => item.status_id.code == "12")
      .reduce((acc: number, item: any) => {
        return acc + Number(item.amount);
      }, 0) || 0;
       return {
        panddingAmmount,
        sucessAmountW
       }
  }, [myTransations])
  const navegate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
             <ArrowLeft className='cursor-pointer'  onClick={()=>navegate(-1)}/>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Saques</h1>
                <p className="text-gray-600">Gerencie suas solicitações de saque</p>
              </div>
            </div>
            <button
              onClick={() => setIsWithdrawalModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2 shadow-lg transform hover:scale-[1.02]"
            >
              <CreditCard className="w-5 h-5" />
              <span>Nova Solicitação</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-semibold text-lg">Solicitação enviada com sucesso!</p>
              <p className="text-green-700">Você receberá uma confirmação por email em breve. O processamento pode levar até 2 dias úteis.</p>
            </div>
          </div>
        )}

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Saldo Disponível</p>
                <p className="text-3xl font-bold text-green-600 text-[20px]">
                  {user?.point.value} Kz
                </p>                <p className="text-gray-500 text-sm">Disponível para saque</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Saques Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600 text-[20px]"> {
                 filter.panddingAmmount
                } Kz</p>
                <p className="text-gray-500 text-sm">Em processamento</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Sacado</p>
                <p className="text-3xl font-bold text-blue-600 text-[20px]">{filter?.sucessAmountW} Kz</p>
                <p className="text-gray-500 text-sm">Este mês</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 font-semibold text-lg mb-2">
                Informações Importantes sobre Levantamentos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              
                <div>
                  <h4 className="font-medium mb-2">Transferência Bancária (via IBAN)</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Processamento em 1 a 2 dias úteis</li>
                    <li>• Pode haver taxa de transferência conforme o banco</li>
                    <li>• Disponível apenas em horário bancário</li>
                    <li>• Valor mínimo: 5.000 Kz</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-blue-900 text-sm">
                  <strong>Horários de processamento:</strong> Levantamentos são processados de segunda a sexta-feira, das 8h às 17h.
                  Solicitações feitas fora deste horário serão processadas no próximo dia útil.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Withdrawals List */}
        <TransactionHistory/>
      </main>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSubmit={handleWithdrawalSubmit}
        availableBalance={availableBalance}
      />
    </div>
  );
}