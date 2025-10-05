export type PaymentData = {
    id: string;
    name: string;
    short_name: string;
    description: string;
    image_path: string;
  };
  

  export enum PaymentDataEnum {
    MCX = "MCX",
    TRANSFER = "TRANSFER",
  }

  export type Payment = {
  id: string;
  payment_method: {
    id: string;
    description: string;
    name: string;
    short_name: string;
    image_path: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  reference: string;
  user: {
    id: string;
    name: string;
    affiliate_code: string;
    email: string | null;
    phone: string;
    address: string | null;
    status_id: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
  status: {
    id: string;
    name: string;
    code: string;
    status_type_id: string;
    created_at: string | null;
    updated_at: string | null;
  };
};


export interface paymentDataTypes {
   open:boolean,
   setOpen:React.Dispatch<React.SetStateAction<boolean>>,
   payment_data_id:string,
   reference:string,
   id?:string
}