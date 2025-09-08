import React, { useState } from 'react';
import { ArrowLeft, DollarSign, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import WithdrawalModal from './WithdrawalModal';
import WithdrawalsList from './WithdrawalsList';

interface WithdrawalPageProps {
  user: any;
  onBack: () => void;
}

export default function WithdrawalPage({ user, onBack }: WithdrawalPageProps) {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState([
    {
      id: '1',
      amount: 500.00,
      method: 'pix',
      status: 'completed' as const,
      requestDate: '2024-01-17T10:00:00Z',
      processedDate: '2024-01-17T14:30:00Z',
      pixKey: 'joao@example.com'
    },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
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
                <p className="text-3xl font-bold text-green-600">R$ {availableBalance.toFixed(2)}</p>
                <p className="text-gray-500 text-sm">Disponível para saque</p>
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
                <p className="text-3xl font-bold text-yellow-600">R$ {pendingAmount.toFixed(2)}</p>
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
                <p className="text-3xl font-bold text-blue-600">R$ 1.250,00</p>
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
              <h3 className="text-blue-900 font-semibold text-lg mb-2">Informações Importantes sobre Saques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">PIX (Recomendado)</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Processamento instantâneo</li>
                    <li>• Sem taxas adicionais</li>
                    <li>• Disponível 24/7</li>
                    <li>• Valor mínimo: R$ 50,00</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">TED Bancária</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Processamento em 1-2 dias úteis</li>
                    <li>• Taxa de R$ 5,00</li>
                    <li>• Horário comercial</li>
                    <li>• Valor mínimo: R$ 50,00</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-blue-900 text-sm">
                  <strong>Horários de processamento:</strong> Saques são processados de segunda a sexta-feira, das 9h às 18h. 
                  Solicitações feitas fora deste horário serão processadas no próximo dia útil.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawals List */}
        <WithdrawalsList withdrawals={withdrawals} />
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