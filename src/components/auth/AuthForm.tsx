import { useState } from 'react';
import { Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { images } from '@/app/constatnts/images';
import { LoginPropsType } from '@/app/apresentation/modules/auth/types/AuthDataType';
import { Loader } from '../Loader';
import { Link } from 'react-router-dom';


export default function AuthForm(props: LoginPropsType) {
  const [showPassword, setShowPassword] = useState(false);
  const { formData, handleChangeEvent, handleSubmt } = props
  return (
    <div className="min-h-screen bg-gradient-to-br from-handcapp_color via-indigo-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src={images.handcappIcon} className=' rounded' />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seja Benvindo(a)
          </h1>
          <p className="text-gray-600">
            Acesse seu dashboard de afiliado
          </p>
        </div>

        <form onSubmit={handleSubmt} className="space-y-6">

          {  /*<div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={() => { }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>*/
          }

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={formData?.phone}
                required
                onChange={handleChangeEvent}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="900 900 900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData?.password}
                onChange={handleChangeEvent}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <p className=' text-zinc-500 text-sm text-end '>
          Esqueceu a sua Senha? <Link   to={"/create/affiliete-account"}  className='text-handcapp_color font-semibold'>recuperar</Link>
        </p>
          <button
            type="submit"
            className="w-full  bg-handcapp_color p-3  text-white  rounded"
          >
            Entrar
          </button>
        </form>
        <p className=' text-zinc-500 text-center mt-5'>
          Não  possui uma conta ? <Link   to={"/create/affiliete-account"}  className='text-handcapp_color font-semibold'>Criar</Link>
        </p>
     

      </div>

    </div>
  );
}