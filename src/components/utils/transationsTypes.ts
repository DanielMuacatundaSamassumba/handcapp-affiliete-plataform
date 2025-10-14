export type Payment = {
    id: string;
    payment_request_number:string
    amount: string;
    payment_method: string;
    payment_data: {
      id: string;
      reference: string;
      user_id: string;
      status_id: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      payment_method_id: string;
    };
    user: {
      id: string;
      name: string;
      affiliate_code: string;
      email: string | null;
      phone: string | null;
      address: string | null;
      status_id: string;
      email_verified_at: string | null;
      recover_password_code: string | null;
      image_path: string | null;
      created_at: string;
      updated_at: string;
    };
    backoffice_user: null | {
      // se houver estrutura futura para backoffice_user, adicionar aqui
      [key: string]: any;
    };
    status_id: {
      id: string;
      name: string;
      code: string;
      status_type_id: string;
      created_at: string | null;
      updated_at: string | null;
    };
    notification: {
      id: string;
      description: string;
      payment_request_id: string;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  