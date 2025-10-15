import { images } from '@/app/constatnts/images'
import { Calendar, Clock, Eye, Menu, User } from 'lucide-react'
import React from 'react'

export default function TicketCard() {
    return (
        <div className='w-11/12 mt-2 md:w-5/4   '>
            <div className='bg-white w-28 ml-2 p-2 rounded-t-md shadow-xl'>
                { /* <img
                    src={images.handcappIcon}
                    alt="handcapp-icon"
                    className='w-10 h-4'
                />*/}
                <p className='text-zinc-500 text-[10px]'>casa de Aposta</p>
            </div>
            <div className='bg-white p-2 shadow-md rounded flex items-center justify-between w-full'>
                <div className='w-full'>
                    <div className='flex justify-between  '>
                        <div className='flex items-center'>
                            <h1 className='font-semibold text-[12px]'>Ficha #2765</h1> <div className=' ml-2 bg-red-600 rounded-full h-5 w-5 '></div>
                        </div>
                        <div className='bg-handcapp_color text-white font-semibold text-[10px] rounded w-[80px]  flex  justify-center items-center'>
                            <p>ODD 1.64</p>
                        </div>
                    </div>
                    <div className='flex justify-between w-full '>
                        <div className=' rounded mt-2 bg-handcapp_color text-white w-6/12 text-center flex justify-center items-center'>
                            <h1 className='font-semibold text-[10px] text-center'>Ganho: 100.000 Kz</h1>
                        </div>
                        <div className='bg-zinc-00 text-white mt-2 bg-zinc-500 p-1 w-1/2 ml-2 font-semibold rounded '>
                            <p className='text-[9px] text-center'>Aposta: 10.000 Kz</p>
                        </div>
                    </div>
                    <div className='flex  w-full '>
                        <div className='flex items-center  w-20'>
                            <Calendar className='text-handcapp_color w-4' />
                            <p className='text-[12px] text-zinc-700 ml-1'>15-10-25</p>
                        </div>
                        <div className='flex items-center  w-'>
                            <Clock className='text-handcapp_color w-4' />
                            <p className='text-[12px] text-zinc-700 ml-1'>17h43</p>
                        </div>
                        <div className='flex items-center ml-2 mr-2'>
                            <Eye className='text-handcapp_color w-4' />
                            <p className='text-[12px] text-zinc-700 ml-1'>40</p>
                        </div>
                        <div className='flex items-center ml-2 mr-2 w-36'>
                            <User className='text-handcapp_color w-4' />
                            <p className='text-[12px] text-zinc-700 ml-1'>Daniel Samassumba</p>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <button className='bg-handcapp_color  rounded-xl p-5 ml-2'>
                        <Menu size={25} className=' text-yellow-400' />
                    </button>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
