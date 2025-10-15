export interface UserModalUpdateType {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}

  export interface UplodImageType{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    image: string | null,
  }