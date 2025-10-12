export interface UserData {
    id:string
    name: string;
    email: string;
    phone: string;
    point: UserPoint;
    status: UserStatus;
    affiliate_code: string;
    address:string
    created_at: string;
    permissions: string[];
    image_path:string
  }
  
  export interface UserPoint {
    id: string;
    user_id: string;
    status_id: string;
    value: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserStatus {
    id: string;
    name: string;
    code: string;
    status_type_id: string;
    created_at: string | null;
    updated_at: string | null;
  }
  