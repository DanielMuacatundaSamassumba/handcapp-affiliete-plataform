import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar, CreditCard, Smartphone, Building } from 'lucide-react';

interface Withdrawal {
  id: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
  pixKey?: string;
  bankInfo?: {
    bankCode: string;
    agency: string;
    account: string;
    holderName: string;
  };
}

interface WithdrawalsListProps {
  withdrawals: Withdrawal[];
}

export default function WithdrawalsList({ withdrawals }: WithdrawalsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Pendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getMethodIcon = (method: string) => {
    return method === 'pix' ? (
      <Smartphone className="w-4 h-4 text-green-600" />
    ) : (
      <Building className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Histórico de Saques</h2>
        <p className="text-gray-600">Suas solicitações de saque</p>
      </div>
      
      <div className="p-6">
        {withdrawals.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma solicitação de saque encontrada</p>
            <p className="text-sm text-gray-400">Suas solicitações aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-4">
            {withdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getStatusIcon(withdrawal.status)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          R$ {withdrawal.amount.toFixed(2)}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {getMethodIcon(withdrawal.method)}
                          <span className="text-sm text-gray-600 capitalize">
                            {withdrawal.method === 'pix' ? 'PIX' : 'TED'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Solicitado em {new Date(withdrawal.requestDate).toLocaleDateString('pt-BR')}
                        </div>
                        {withdrawal.processedDate && (
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Processado em {new Date(withdrawal.processedDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                      {withdrawal.method === 'pix' && withdrawal.pixKey && (
                        <p className="text-xs text-gray-500 mt-1">
                          PIX: {withdrawal.pixKey}
                        </p>
                      )}
                      {withdrawal.method === 'bank' && withdrawal.bankInfo && (
                        <p className="text-xs text-gray-500 mt-1">
                          Banco {withdrawal.bankInfo.bankCode} - Ag: {withdrawal.bankInfo.agency} - Conta: {withdrawal.bankInfo.account}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                      {getStatusText(withdrawal.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}