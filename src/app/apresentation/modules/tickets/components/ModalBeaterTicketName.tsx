import { images } from "@/app/constatnts/images"
import { Modal } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useUpdateData from "../../dashboard/hooks/useUpdateData"

export function ModalBeaterTicketName() {
    const navegate = useNavigate()
    const { formData, handleChangeValue, handleSubmit } = useUpdateData()
    return <div>
        <Modal open={true} onClose={() => { }}>
            <div className="flex  w-full justify-center items-center min-h-svh">
                <form className="bg-white w-11/12 flex flex-col justify-center p-4 rounded md:w-1/2" onSubmit={handleSubmit}>

                    <div>
                        <div className="flex items-center text-zinc-500 cursor-pointer" onClick={() => navegate(-1)}>
                            <ArrowLeft /> <label htmlFor="">Voltar</label>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img src={images.handcappIcon}
                            className="w-20 rounded"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-center">Antes de continuar...</h1>
                    <div className="flex  flex-col">
                        <label htmlFor="">Nome de Batedor de Ficha</label>
                        <input
                            type="text"
                            name="beater_ticket_name"
                            className="border p-2 outline-none mt-2"
                            placeholder="Nome de Batedor de Ficha"
                            onChange={handleChangeValue}
                            value={formData.beater_ticket_name}
                        />

                    </div>
                    <div>
                        <button className="bg-handcapp_color text-white p-3 mt-2 rounded w-full">Adicionar</button>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
}