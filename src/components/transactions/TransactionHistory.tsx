import { ArrowUpRight, ArrowDownLeft, Calendar, DollarSign } from 'lucide-react';
import useListMyTransation from '../utils/useListMyTransation';
import { Link, useNavigate } from 'react-router-dom';


export default function TransactionHistory() {
  const { myTransations } = useListMyTransation()
  const navegate = useNavigate()
  const transactions = [
    {
      id: "",
      type: '',
      description: '',
      amount: '',
      date: '',
      status: ''
    },

  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 xl:col-span-1">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Histórico de Transações</h2>
        <p className="text-gray-600">Suas últimas atividades financeiras</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {myTransations && [...myTransations].reverse().map((transaction, index) => (
            <div key={index}  >
              {
                index <= 2 && (

                  <div key={transaction.id}
                    onClick={() => navegate("/transation-resume", { state: { data: transaction } })}
                    className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.status_id.name === 'success'
                        ? 'bg-green-100'
                        : 'bg-orange-100'
                        }`}>
                        {transaction.status_id.name === 'success' ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        {<h3 className=" text-[15px]">{transaction?.notification?.description}</h3>}
                        {<h3 className=" text-[12px]">{transaction?.payment_request_number}</h3>}
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(transaction.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.status_id.name === 'earning' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                        {transaction.status_id.name === 'earning' ? '+' : '-'}{transaction.amount}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${transaction.status_id.name === 'success'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status_id.name === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {transaction.status_id.name === 'success' ? 'Concluído' :
                          transaction.status_id.name === 'pending'
                           ? 'Pendente' : 
                           transaction.status_id.name === "canceled" ? "Cancelado":
                           'Falhou'}
                      </span>
                    </div>
         
                  </div>

                )
              }
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
         <Link to={"/history"}>
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Ver histórico completo
          </button>
         </Link>
        </div>
        
      </div>
    </div>
  );
}