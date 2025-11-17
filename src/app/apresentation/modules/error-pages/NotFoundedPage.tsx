import { images } from '@/app/constatnts/images'
import { ArrowBigLeft, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export default function NotFoundedPage() {
     const navegate = useNavigate()
  return (
    <div className=' flex flex-col  items-center justify-center min-h-svh'>
         <img src={images.NotFoundedIcon} alt="not-founf-icon" className='w-' />
         <h1 className='text-3xl font-semibold text-zinc-800'>Ops! Pagina Não Encontrada</h1>
          <button className='border w-6/12 border-handcapp_color rounded-full p-3 text-handcapp_color flex  justify-center text-[16px] mt-2  md:w-1/6' onClick={()=>navegate(-1)}> <ChevronLeft/>Voltar </button>
    </div>
  )
}
