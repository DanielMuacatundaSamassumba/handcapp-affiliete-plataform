import { external_api, external_api_handcapp } from '@/app/ infrastructure/api/api'
import { Env } from '@/app/env/env'
import React, { useEffect, useState } from 'react'
import { Fixture, League, Market, Prediction } from '../types/LeagueTypes'
import useAuthHandcappApi from '@/app/hooks/useAuthHandcappApi'
import useAuthMe from '../../dashboard/hooks/useAuthMe'
import Swal from 'sweetalert2'

export default function useLeagueByDate() {
    const [leaguesData, setLeaguesData] = useState<League[]>()
    const [LoaderControl, setLoaderControl] = useState(false)
    const [leagueselected, setLeagueSelected] = useState<{ value: string; label: string } | null>(
        { value: "", label: "" }
    );
    const { myData, loaderControl } = useAuthMe()
    const { token, dataUser } = useAuthHandcappApi()
    const [marketSelected, setMerketSelected] = useState("")
    const [merketData, setMarketData] = useState<Market[]>()
    const [gameData, setGameData] = useState<Fixture[]>()
    const [prodictionData, setPrognosticData] = useState<Prediction[]>()
    const [prognsoticSelected, setPrognosticSelected] = useState<Prediction>()
    const [gameSelected, setGameSelected] = useState<{ value: { id: number }, label: string } | null>(null);
    const [dateFilter, setDateFilter] = useState("")
    const [loadingProcess, setLoadingProcess] = useState(false)
    const [games, setGames] = useState<
        {
            game_id: {
                value: Fixture
            },
            odd: string
            prognostic: string,
            id: number
        }[]
    >([

    ]);

    useEffect(() => {
        if (!dateFilter) return;

        const fetchLeagues = async () => {
            setLoadingProcess(true);
            try {
                const response = await external_api.get(
                    `/v2.2/fixtures/?user=${Env.USERNAME}&token=${Env.TOKEN}&t=schedule&d=${dateFilter}`
                );
                const filteredLeagues = response.data.data?.map((item: any) => item.league);
                setLeaguesData(filteredLeagues);
                const games = response.data.data.filter((item: Fixture) => String(item?.league?.id) == leagueselected?.value)
                setGameData(games);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProcess(false);
            }
        };

        fetchLeagues();
    }, [dateFilter, leagueselected]);
    const handleAddGame = () => {
        const market = merketData?.filter(item => item.id == prognsoticSelected?.market_id)
        const gameChecking = games.find(item => item.game_id.value.id == gameSelected?.value?.id)
        if (gameChecking) {
            alert("Jogo já adicionado ")
            return;
        }
        setGames((prev: any) => {
            return [...prev, {
                game_id: gameSelected,
                prognostic: market?.[0].name + "/" + prognsoticSelected?.name,
                odd: "0",
                id: Date.now()
            }];
        });
        console.log(games)
    }
    const marketsData = async () => {
        try {
            const response = await external_api_handcapp.get("/prognostic-types")
            setMarketData(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        marketsData()
    }, [])

    const handleFilterPreddits = (market_id: string) => {
        const filteredPrdiction = merketData && merketData?.filter(item => item.id == market_id)
        const prodicts = filteredPrdiction && filteredPrdiction[0].predictions
        setPrognosticData(prodicts)
    }
    const handleDeleteGame = (id: number) => {
        const gameDeleted = games.filter(item => item.id != id)
        setGames(gameDeleted)
    }

    const handleSubmit = async () => {
        setLoaderControl(true)
        const data = games.map(item => ({
            game_id: String(item.game_id.value.id), // 👈 deve ser string conforme o backend
            odd: item.odd,
            prognostic: item.prognostic
        }));

        try {
            const response = await external_api_handcapp.post(
                "/ticket/store",
                {
                    start_at: "2025-07-09",
                    end_at: "2025-07-11",
                    user_id: dataUser?.id,
                    affiliate_code: myData?.affiliate_code,
                    beater_ticket_name:myData?.beater_ticket_name,
                    games: data
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setLoaderControl(false)
            Swal.fire({
                title: "Sucesso",
                text: "Ficha Sugerida com sucesso!",
                icon: "success"
            }).then((res)=> {
                  if(res.isConfirmed){  
                     window.location.reload()
                  }
             });
            console.log("✅ Ticket enviado com sucesso:", response.data);

        } catch (error: any) {
            console.error("❌ Erro ao enviar ticket:", error.response?.data || error);
        }
    };



    return {
        leaguesData,
        setDateFilter,
        loadingProcess,
        setLeagueSelected,
        leagueselected,
        gameSelected,
        setGameSelected,
        gameData,
        handleAddGame,
        games,
        merketData,
        marketSelected,
        setMerketSelected,
        handleFilterPreddits,
        prodictionData,
        prognsoticSelected,
        setPrognosticSelected,
        handleDeleteGame,
        handleSubmit,
    }
}
