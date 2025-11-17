import React from 'react'
import { images } from '@/app/constatnts/images'
export default function ErrorPage() {
  return (
    <div className='flex flex-col  justify-center items-center min-h-svh'>
         <img src={images.errorimage} alt="" />
         <h1 className='text-handcapp_color text-4xl  font-bold mt-4'>Opps!  Algo Correu Mal</h1>
         <p className='text-zinc-500 mt-2'>Nada quebrado, só um pequeno sumiço por aqui..</p>
   <button className='bg-handcapp_color text-white p-3  rounded  cursor-pointer mt-4' onClick={()=> window.location.reload()}>Actualizar a Pagina</button>
    </div>
  )
}
