import React, { useState } from 'react';
import { X, CreditCard, Building, Smartphone, AlertCircle, DollarSign } from 'lucide-react';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
import useListMyPaymentData from '@/app/apresentation/modules/profile/services/useListMyPaymentData';
import { PaymentDataEnum } from '@/app/apresentation/modules/profile/types/PaymentDataType';
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { api } from '@/app/ infrastructure/api/api';
import { headersConfig } from '@/app/utils/HeaderConfig';
interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (withdrawalData: any) => void;
  availableBalance: number;
}

export default function WithdrawalModal({ isOpen, onClose, onSubmit, availableBalance }: WithdrawalModalProps) {
  const { myData } = useAuthMe()
  const { myPaymentData } = useListMyPaymentData()
  const [loaderControl, setLoaderControl] = useState(false)
  const formattedValue = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA'
  }).format(myData?.point.value ?? 0);
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    payment_method_id: "",                             // IBAN Angolano (ex.: AO06 0005 0000 7998 9111 1019 7)
    payment_data_id: ""
  });

  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    if (parseFloat(formData.amount) > Number(myData?.point?.value)) {
      newErrors.amount = 'Valor não pode ser maior que o saldo disponível';
    }

    if (parseFloat(formData.amount) < 5000) {
      newErrors.amount = 'Valor mínimo para saque é  5.000,00 kz';
    }

    /*if (formData.method === 'express' && !formData.reference) {
      newErrors.pixKey = 'Número de Telefone é obrigatório';
    }

    /*if (formData.method === 'transfer') {
      if (!formData.reference) newErrors.bankCode = 'Iban do banco é obrigatório';
    }*/

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.method.length == 0 && !formData.amount) {
      Swal.fire({
        title: "Erro de Validação ",
        text: "Selecione O metodo de Pagamento",
        icon: "warning",
        customClass: {
          container: "swal2-container "
        }
      })
    }
    if (validateForm()) {
      const withdrawalData = {
        ...formData,
        amount: parseFloat(formData.amount),

      };
      try {
        setLoaderControl(true)
        const response = await api.post("affiliate/payment-request/store", formData, headersConfig())
        console.log(response)
        Swal.fire({
          title: "Sucesso  ",
          text: "Solicitação de Pagamento realizado com sucesso!",
          icon: "success",
          customClass: {
            container: "swal2-container "
          }
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload()
          }
        })
        setLoaderControl(false)
      } catch (error: any) {
        Swal.fire({
          title: "Erro de Validação ",
          text: error.response.data.message || "Erro ao Solicitar Pagamento",
          icon: "error",
          customClass: {
            container: "swal2-container "
          }
        })
        console.error(error)
      }



    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Solicitar Saque</h2>
                <p className="text-sm text-gray-600">Saldo disponível: AO {formattedValue}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Saque *
            </label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">AO</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="50"
                max={formattedValue}
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="0,00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.amount}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">Valor mínimo:  5.000,00 kz</p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Pagamento *
            </label>
            <div className="flex justify-between w-full">
             
              {
                myPaymentData?.map(item => (
                  <div key={item.id}>
                    {
                      item.payment_method.short_name == PaymentDataEnum.TRANSFER ?
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, payment_method_id: item.payment_method.id, payment_data_id: item.id, method: "bank" }))}
                          className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${formData.method === 'bank'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <Building className="w-6 h-6 text-blue-600" />
                          <span className="text-sm font-medium">Transferência Bancária</span>
                          <span className="text-xs text-gray-500">1-2 dias úteis</span>
                        </button> : ""
                    }
                  </div>
                ))
              }
            </div>
            {
              myPaymentData?.length == 0 ?
                <Link to={"/profile"}>  <p className='text-xs text-center text-blue-400'>Adicionar Dados Bancários</p></Link>
                : ""
            }
          </div>

          {/* PIX Fields */}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Informações importantes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Multicaixa Express : Processamento instantâneo</li>
                  <li>• Transferência bancária (BAI, BFA, BPC): Processamento em 1-2 dias úteis </li>
                  <li>• Valor mínimo para saque: 5.000 Kz</li>
                  <li>• Saques são processados de segunda a sexta-feira</li>
                </ul>
              </div>
            </div>
          </div>


          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg"
            >
              Solicitar Saque
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}