import { api } from '@/app/ infrastructure/api/api'
import { headersConfig } from '@/app/utils/HeaderConfig'
import React, { useEffect, useState } from 'react'
import { Bank } from '../types/PaymentDataType'

export default function useBanks() {
     const [ banks, setBanks ] = useState<Bank[]>()

      async function list(){
        try {
         const response = await api.get("/banks/list", headersConfig())
            setBanks(response.data.data)
            console.log("banks",response.data.data)
        } catch (error) {
             console.log(error)
        }
      }
       useEffect(()=>{
        list()
       }, [])
  return {
    banks
  }
}
