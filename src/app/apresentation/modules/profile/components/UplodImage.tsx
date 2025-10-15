import { images } from '@/app/constatnts/images'
import { Modal } from '@mui/material'
import { Camera, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { UplodImageType } from '../types/UserModalUpdateType';
import useUploud from '../services/useUploud';
import { Loader } from '@/components/Loader';

export default function UplodImage(params: UplodImageType) {
    const { handleUploud, loader, file } = useUploud();
    const { open, setOpen, image } = params
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            console.log('Imagem selecionada:', file);
        }
    }
    useEffect(() => {
        setImagePreview(image)
    }, [open])
    return (
        <Modal open={open} className='min-h-svh' onClose={() => setOpen(!open)}>
            <div className=' flex justify-center items-center h-full'>
                <div className='bg-white  rounded w-11/12 h-[350px]  flex flex-col justify-center items-center p-4 md:w-5/12'>
                    <div className='w-full flex justify-end p-2 cursor-pointer'>
                        <X className='cursor-pointer' onClick={() => setOpen(!open)} />
                    </div>
                    <div className='flex justify-center w-11/12'>
                        <h1 className='font-semibold  text-[24px]'>Actualizar Foto de Perfil</h1>


                    </div>
                    <div className='border border-2 mt-2 border-dashed h-[180px] w-[180px] flex justify-center items-center rounded-full  '>
                        <div className='z-10 absolute  p-2 rounded-full text-white top-30 cursor-pointer'>
                            <label htmlFor="file">
                                <Camera size={40} className='cursor-pointer text-zinc-500' />
                            </label>
                            <input type="file" id='file' ref={file || undefined} className='hidden' onChange={handleChangeImage} />
                        </div>
                        <img src={imagePreview || ''} alt="" className='w-28 h-28 rounded-full' />
                    </div>
                    <div className='mt-5'>
                        <button className='bg-handcapp_color text-white p-2 rounded' onClick={() => handleUploud()}>Actuazar Imagem</button>
                    </div>
                </div>
              { loader && <Loader />}
            </div>
        </Modal>
    )
}
