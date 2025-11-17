import React from 'react'
import { cardGameType } from '../types/LeagueTypes'

export default function CardGame(params: cardGameType) {
    const {
        away,
        home,
        start_at,
        odd,
        prognosticType,
        league,
        game
    } = params
    return (
        <div className='flex flex-col p-2 '  >
            <div className='flex  justify-between mt-4'>
                <p className='font-semibold text-zinc-700 text-[12px]'>{league?.name} </p>
                <p className='font-semibold text-zinc-700 text-[10px]'>{game?.time?.datetime}</p>
            </div>
            <div className='flex  items-center justify-around'>
                <div className=' flex flex-col justify-center items-center'>
                    <img src={home?.img} alt="home-image" className='w-12' />
                    <p className='text-[14px] mt-2'>{home?.name}</p>
                </div>
                <div>
                    <p className='font-semibold text-zinc-700 text-[12px]'>{prognosticType}</p>
                      <p className='font-semibold text-zinc-700 text-[12px] text-center mt-2'>Odd:{odd}</p>
                </div>
                <div className=' flex flex-col justify-center items-center'>
                    <img src={away?.img} alt="away-image" className='w-12 text-center' />
                    <p className='text-[14px] mt-2'>{away?.name}</p>
                </div>
            </div>
        </div>
    )
}
