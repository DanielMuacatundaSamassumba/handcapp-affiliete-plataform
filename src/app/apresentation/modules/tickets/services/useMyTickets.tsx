import { external_api_handcapp } from '@/app/ infrastructure/api/api'
import { useEffect, useState } from 'react'
import useAuthMe from '../../dashboard/hooks/useAuthMe'
import { Ticket } from '../types/ticketType'

export default function useMyTickets() {
    const [myTickets, setMyTicket] = useState<Ticket[]>()
    const [loaderControl, setLoaderControl] = useState(false)
    const { myData } = useAuthMe()
    const show = async () => {
        setLoaderControl(true)
        try {
            const response = await external_api_handcapp.get(`/ticket/show/affiliate/${myData?.affiliate_code} `)
            setMyTicket(response.data.data)
            console.log("tickets----->",response.data.data)
            setLoaderControl(false)
        } catch (error) {
            console.error(error)
            setLoaderControl(false)
        }
    }
    useEffect(() => {
        show()
    }, [myData])
    return {
        myTickets,
        loader: loaderControl
    }
}
