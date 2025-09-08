import { images } from "@/app/constatnts/images"
import { Modal } from "@mui/material"

export function Loader() {

    return <div>
        <Modal open={true} onClose={() => { }}>
            <div className="flex w-full justify-center items-center min-h-svh">
                 <img src={images.handcappIcon} 
                  className="w-36 rounded animate-bounce"
                 />
            </div>
        </Modal>
    </div>
}