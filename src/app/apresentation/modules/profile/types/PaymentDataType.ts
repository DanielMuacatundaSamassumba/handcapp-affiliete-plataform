export type PaymentData = {
    id: string;
    name: string;
    short_name: string;
    description: string;
    image_path: string;
  };
  

  export enum PaymentDataEnum {
    MCX_QR_CODE = "MCX_QR_CODE",
  }