import React, { useState } from 'react';
import { X, CreditCard, Building, Smartphone, AlertCircle, DollarSign } from 'lucide-react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (withdrawalData: any) => void;
  availableBalance: number;
}

export default function WithdrawalModal({ isOpen, onClose, onSubmit, availableBalance }: WithdrawalModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    method: 'pix',
    pixKey: '',
    bankCode: '',
    agency: '',
    account: '',
    accountType: 'corrente',
    holderName: '',
    holderDocument: ''
  });

  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }
    
    if (parseFloat(formData.amount) > availableBalance) {
      newErrors.amount = 'Valor não pode ser maior que o saldo disponível';
    }
    
    if (parseFloat(formData.amount) < 50) {
      newErrors.amount = 'Valor mínimo para saque é R$ 50,00';
    }

    if (formData.method === 'pix' && !formData.pixKey) {
      newErrors.pixKey = 'Chave PIX é obrigatória';
    }

    if (formData.method === 'bank') {
      if (!formData.bankCode) newErrors.bankCode = 'Código do banco é obrigatório';
      if (!formData.agency) newErrors.agency = 'Agência é obrigatória';
      if (!formData.account) newErrors.account = 'Conta é obrigatória';
      if (!formData.holderName) newErrors.holderName = 'Nome do titular é obrigatório';
      if (!formData.holderDocument) newErrors.holderDocument = 'CPF/CNPJ é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const withdrawalData = {
        ...formData,
        amount: parseFloat(formData.amount),
        requestDate: new Date().toISOString(),
        status: 'pending',
        id: Math.random().toString(36).substr(2, 9)
      };
      
      onSubmit(withdrawalData);
      onClose();
      
      // Reset form
      setFormData({
        amount: '',
        method: 'pix',
        pixKey: '',
        bankCode: '',
        agency: '',
        account: '',
        accountType: 'corrente',
        holderName: '',
        holderDocument: ''
      });
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
                <p className="text-sm text-gray-600">Saldo disponível: R$ {availableBalance.toFixed(2)}</p>
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="50"
                max={availableBalance}
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.amount ? 'border-red-300' : 'border-gray-300'
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
            <p className="mt-1 text-xs text-gray-500">Valor mínimo: R$ 50,00</p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Método de Pagamento *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, method: 'pix' }))}
                className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  formData.method === 'pix'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">PIX</span>
                <span className="text-xs text-gray-500">Instantâneo</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, method: 'bank' }))}
                className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                  formData.method === 'bank'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">TED</span>
                <span className="text-xs text-gray-500">1-2 dias úteis</span>
              </button>
            </div>
          </div>

          {/* PIX Fields */}
          {formData.method === 'pix' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chave PIX *
              </label>
              <input
                type="text"
                name="pixKey"
                value={formData.pixKey}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.pixKey ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="CPF, e-mail, telefone ou chave aleatória"
              />
              {errors.pixKey && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.pixKey}
                </p>
              )}
            </div>
          )}

          {/* Bank Fields */}
          {formData.method === 'bank' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código do Banco *
                  </label>
                  <input
                    type="text"
                    name="bankCode"
                    value={formData.bankCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.bankCode ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="001"
                  />
                  {errors.bankCode && (
                    <p className="mt-1 text-xs text-red-600">{errors.bankCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agência *
                  </label>
                  <input
                    type="text"
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.agency ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="1234"
                  />
                  {errors.agency && (
                    <p className="mt-1 text-xs text-red-600">{errors.agency}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conta *
                  </label>
                  <input
                    type="text"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.account ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="12345-6"
                  />
                  {errors.account && (
                    <p className="mt-1 text-xs text-red-600">{errors.account}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conta *
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="corrente">Corrente</option>
                    <option value="poupanca">Poupança</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Titular *
                </label>
                <input
                  type="text"
                  name="holderName"
                  value={formData.holderName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.holderName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nome completo do titular"
                />
                {errors.holderName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.holderName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF/CNPJ do Titular *
                </label>
                <input
                  type="text"
                  name="holderDocument"
                  value={formData.holderDocument}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.holderDocument ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="000.000.000-00"
                />
                {errors.holderDocument && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.holderDocument}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Informações importantes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• PIX: Processamento instantâneo, sem taxas</li>
                  <li>• TED: Processamento em 1-2 dias úteis, taxa de R$ 5,00</li>
                  <li>• Valor mínimo para saque: R$ 50,00</li>
                  <li>• Saques são processados de segunda a sexta</li>
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