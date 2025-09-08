import React from 'react';
import { User, Calendar, DollarSign } from 'lucide-react';

export default function AffiliatesList() {
  const affiliates = [
    {
      id: 1,
      name: 'Maria Santos',
      email: 'maria@example.com',
      joinDate: '2024-01-15',
      totalEarnings: 'R$ 450,00',
      status: 'Ativo',
      conversions: 12
    },
    {
      id: 2,
      name: 'Carlos Silva',
      email: 'carlos@example.com',
      joinDate: '2024-01-10',
      totalEarnings: 'R$ 320,00',
      status: 'Ativo',
      conversions: 8
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@example.com',
      joinDate: '2024-01-08',
      totalEarnings: 'R$ 180,00',
      status: 'Inativo',
      conversions: 4
    },
    {
      id: 4,
      name: 'Pedro Lima',
      email: 'pedro@example.com',
      joinDate: '2024-01-05',
      totalEarnings: 'R$ 675,00',
      status: 'Ativo',
      conversions: 18
    },
    {
      id: 5,
      name: 'Sofia Oliveira',
      email: 'sofia@example.com',
      joinDate: '2024-01-03',
      totalEarnings: 'R$ 290,00',
      status: 'Ativo',
      conversions: 7
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 xl:col-span-1">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Seus Afiliados</h2>
        <p className="text-gray-600">Lista dos usuários que se cadastraram através do seu link</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {affiliates.map((affiliate) => (
            <div key={affiliate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{affiliate.name}</h3>
                  <p className="text-sm text-gray-600">{affiliate.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(affiliate.joinDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {affiliate.conversions} conversões
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{affiliate.totalEarnings}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  affiliate.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {affiliate.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Ver todos os afiliados
          </button>
        </div>
      </div>
    </div>
  );
}