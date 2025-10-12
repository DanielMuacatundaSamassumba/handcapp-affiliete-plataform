import { Modal } from '@mui/material'
import { Loader } from '@/components/Loader'
import { UserModalUpdateType } from '../types/UserModalUpdateType'
import { images } from '@/app/constatnts/images'
import { X } from 'lucide-react'
import useAuthMe from '../../dashboard/hooks/useAuthMe'
import useUpdateData from '../../dashboard/hooks/useUpdateData'
import { useEffect } from 'react'

export default function ModalUpdateDataUser(params: UserModalUpdateType) {
    const { open, setOpen } = params
    const { formData, loaderControl, handleChangeValue, handleSubmit,       setFormData } = useUpdateData()
    const { myData } = useAuthMe()
    const Onclose = () => {
        setOpen(!open)
    }
     useEffect(()=>{
    return setFormData({
             name: myData?.name || "",
             email:myData?.email  || "",
             address:myData?.address || "",
             phone:myData?.phone || ""
         })
     }, [myData])
    return (
        <div className='flex justify-center items-center  min-h-svh'>
            <Modal open={open} onClose={Onclose} className='flex items-center justify-center'>
                <div className='bg-white w-11/12 p-4 rounded md:w-5/12'>
                    <div className='w-full flex justify-end p-2 cursor-pointer'>
                        <X onClick={Onclose} />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img
                            src={images.handcappIcon}
                            alt="logo-handcapp-icon"
                            className='w-20 rounded'
                        />
                        <h1 className='text-[24px] font-bold mt-4'>Actualizar Dados Pessoais</h1>
                    </div>
                    <form  onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor="">Nome</label>
                            <input
                                name='name'
                                value={formData.name}
                                defaultValue={myData?.name}
                                onChange={handleChangeValue}
                                className='p-2 mt-2 rounded border outline-none'
                                type="text" placeholder='Nome' />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="">Número de Telefone</label>
                            <input
                                onChange={handleChangeValue}
                                name='phone'
                                value={formData.phone}
                                defaultValue={myData?.phone}
                                className='p-2 mt-2 rounded border outline-none'
                                type="text" placeholder='Número de Telefone' />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="">Email</label>
                            <input
                                onChange={handleChangeValue}
                                name='email'
                                value={formData.email}
                                className='p-2 mt-2 rounded border outline-none'
                                type="email" placeholder='Email'
                                defaultValue={myData?.email}
                            />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="">Endereço</label>
                            <input
                            onChange={handleChangeValue}
                                name='address'
                                value={formData.address}
                                className='p-2 rounded mt-2 border outline-none'
                                type="text" placeholder='Endereço'
                                defaultValue={myData?.address}
                            />
                        </div>
                        <div className='w-full'>
                            <button type='submit' className='bg-handcapp_color text-white p-2 w-full mt-4 rounded'> Actualizar Dados</button>
                        </div>
                    </form>
             {
                 loaderControl && (
                       <Loader/>
                 )
             }
                </div>
            </Modal>
        </div>
    )
}
