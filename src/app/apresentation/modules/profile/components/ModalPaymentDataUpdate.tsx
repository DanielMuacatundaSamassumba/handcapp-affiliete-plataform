import { Modal } from '@mui/material'
import React, { useEffect } from 'react'
import { paymentDataTypes } from '../types/PaymentDataType'
import {  X } from 'lucide-react'
import usePaymentDataUpdate from '../services/usePaymentDataUpdate'
import { Loader } from '@/components/Loader'
import ModalPaymentData from './ModalPaymentData'
import useListPaymentData from '@/app/apresentation/hooks/useListPaymentData'

export default function ModalPaymentDataUpdate(params: paymentDataTypes) {
    const { setOpen, open, payment_data_id, reference, id } = params
    const { paymentData } = useListPaymentData()
    const { formData, handleSubmit, handleOnchageValue, loaderControl, setFormData } = usePaymentDataUpdate()
    const Onclose = () => {
        setOpen(!open)
    }
    useEffect(() => {
        setFormData({
            reference: reference,
            payment_method_id: payment_data_id,
            id:id || ""
        })
    }, [reference, payment_data_id, id])
    return (
        <div>
            <Modal open={open} onClose={Onclose}>
                <div className='flex justify-center items-center h-full'>
                    <div className=' bg-white  flex flex-col p-10 rounded'>
                        <form onSubmit={handleSubmit}>
                            <div className='w-full flex justify-end  text-zinc-400'>
                                <X className=' cursor-pointer' onClick={() => Onclose()} />
                            </div>
                            <h1 className=' text-2xl font-semibold text-center'>Actulizar  Dados Bancários</h1>
                            <div className='mt-5'>
                                <label htmlFor="">Selecione  metódo de Pagamento</label>
                                <select
                                    required
                                    name="payment_method_id"
                                    value={formData.payment_method_id}
                                    onChange={handleOnchageValue}
                                    className="border p-3 rounded w-full outline-none mt-3"
                                >
                                    <option value="">Selecione</option>
                                    {Array.isArray(paymentData) &&
                                        paymentData.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className='mt- flex  flex-col'>
                                <label htmlFor="">Referência</label>
                                <input
                                    required
                                    type="text"
                                    placeholder='Referência'
                                    value={
                                        formData.reference
                                    } className='p-2 mt-2 rounded border outline-none'
                                    name='reference'
                                    onChange={handleOnchageValue}
                                />
                            </div>
                            <div>
                                <button className=' text-white bg-handcapp_color p-2 rounded w-full mt-2' >Actualizar</button>
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
