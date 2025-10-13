import useListPaymentData from '@/app/apresentation/hooks/useListPaymentData'
import { Modal } from '@mui/material'
import { X } from 'lucide-react'
import React from 'react'
import useAddPayemntData from '../services/useAddPayemntData'
import { PaymentDataEnum } from '../types/PaymentDataType'
import { Loader } from '@/components/Loader'
import useBanks from '../services/useBanks'
import Select from 'react-select'

export default function ModalPaymentData(params: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { paymentData } = useListPaymentData()
    const { open, setOpen } = params
    const { banks } = useBanks()
    const { handleOnchageValue, formData, handleSubmit, loaderControl } = useAddPayemntData()
    const Onclose = () => {
        setOpen(!open)
    }
     const optionsData = banks && banks.map((item)=>{
         return { value: item.id, label: item.name }
     })
    return (
        <div>
            <Modal open={open} onClose={Onclose}>
                <div className='flex justify-center items-center h-full'>
                    <div className=' bg-white  flex flex-col p-10 rounded'>
                        <form onSubmit={handleSubmit}>
                            <div className='w-full flex justify-end  text-zinc-400'>
                                <X className=' cursor-pointer' onClick={() => Onclose()} />
                            </div>
                            <h1 className=' text-2xl font-semibold text-center'>Adicionar  Dados Bancários</h1>
                            <div className='mt-5'>
                                <label htmlFor="">Selecione  metódo de Pagamento</label>
                                <select
                                    required
                                    name='payment_method_id'
                                    value={formData.payment_method_id}
                                    onChange={handleOnchageValue}
                                    className='border p-3  rounded w-full outline-none mt-3'>
                                    <option value="">Selecione </option>
                                    {
                                        Array.isArray(paymentData) && paymentData?.map((item) => (

                                            <option value={item.id} key={item.id}>{item.name} </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="">Banco</label>
                                <Select
                                    options={optionsData}
                                    value={optionsData?.find((option: any) => option.value === formData.bank_id) ?? null}
                                    onChange={(selectedOption) => handleOnchageValue({ target: { name: 'bank_id', value: selectedOption?.value } })}
                                    name="bank_id"
                                />
                            </div>
                            <div className='mt- flex  flex-col'>
                                <label htmlFor="">Referência</label>
                                <input
                                    required
                                    type="text"
                                    placeholder='Referência'
                                    value={formData.reference}
                                    className='p-2 mt-2 rounded border outline-none'
                                    name='reference'
                                    onChange={handleOnchageValue}
                                />
                            </div>
                            <div>
                                <button className=' text-white bg-handcapp_color p-2 rounded w-full mt-2' >Adicionar</button>
                            </div>
                        </form>
                    </div>
                    {
                        loaderControl && (
                            <Loader />
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}
