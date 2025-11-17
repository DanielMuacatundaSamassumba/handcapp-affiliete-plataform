import { external_api } from '@/app/ infrastructure/api/api'
import { Env } from '@/app/env/env'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { showGameId } from '../utils/showGameId'
import { Fixture, GameResponse } from '../types/LeagueTypes'

export default function useListGame() {
    const location = useLocation()
    const { data } = location.state
    const [games, setGames] = useState<GameResponse[]>()
    const listGame = async () => {
        try {
            const gamePromises = data?.games.map(async (item: any) => {
                const game = await showGameId(item.game_id)
                return {
                    game,
                    gameData: item
                }

            })
            const game = await Promise.all(gamePromises)
            setGames(game)
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        listGame()
    }, [data])
    return {
        dataGames: games
    }
}
