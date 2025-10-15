import { useState } from 'react';
import { Avatar, Menu, MenuItem, Modal } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { images } from '@/app/constatnts/images';
import useAuthMe from '@/app/apresentation/modules/dashboard/hooks/useAuthMe';
export default function UserAuthenticated() {
    const [darkControlButton, setDarkModeControlButton] = useState(false)
    const [logoutButtonControl, setLogoutButtonControl] = useState(false)
    const { myData } = useAuthMe()
    const navegate = useNavigate()
    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-menu" >
                {(popupState) => (
                    <>
                        <Avatar
                            {...bindTrigger(popupState)}
                            className="cursor-pointer"
                             style={{width:40}}
                        >
                            <div>
                                <img 
                                    src={myData?.image_path ? myData.image_path : images.handcappIcon} 
                                    className="w-12 rounded-full" 
                                    alt="User Avatar" 
                                />
                            </div>
                        </Avatar>
                        <Menu {...bindMenu(popupState)} className='mt-6'>
                            <MenuItem onClick={popupState.close} onClickCapture={() => setLogoutButtonControl(true)}>
                                <div className="flex cursor-pointer w-full">
                          <LogOut/>
                                    <h1 className="text-font-color text-xl ml-1">Sair</h1>
                                </div>
                            </MenuItem>


                            <MenuItem onClick={popupState.close} className='text-font-color text-2xl ml-1'>
                                <div className='flex items-center' onClick={() => navegate("/profile")}>
                                    <User className='text-blue' size={30} />
                                    <h1 className="text-font-color text-xl ml-1">Perfil</h1>
                                </div>
                            </MenuItem>

                        </Menu>
                    </>
                )}
            </PopupState>

            {

                <Modal
                    open={logoutButtonControl}
                    onClose={() => { }}

                >
                    <div className=' flex justify-center h-full  items-center'>
                        <div className='bg-white rounded w-11/12 flex flex-col justify-center items-center p-4 md:w-1/3'>
                            <img src={images.handcappIcon} className='w-36 rounded' />
                            <h1 className='text-2xl font-semibold text-zinc-500'>Deseja Sair da sua conta?</h1>
                            <div className='bg-white rounded w-11/12 flex flex-row justify-center items-center mt-10'>
                                <button className='p-3 text-white bg-handcapp_color rounded w-1/3 text-xl cursor-pointer' onClick={() => setLogoutButtonControl(false)}>Cancelar</button>
                                <button className='p-3 text-green border border-green rounded w-1/3 text-xl ml-5  cursor-pointer'
                                    onClick={() => {
                                        localStorage.removeItem("auth_token")
                                        localStorage.removeItem("user")
                                        localStorage.removeItem("session_expiry")
                                        window.location.reload()

                                    }}
                                >Sair</button>

                            </div>
                        </div>
                    </div>
                </Modal>

            }
        </div>
    );
}


<div className={'flex flex-col items-center justify-center mt-5 p-2 border-t-1 border-t-zinc-400'}>



</div>