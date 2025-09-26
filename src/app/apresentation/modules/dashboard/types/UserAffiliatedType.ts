export interface ApiResponse {
    message: string;
    data: AffiliatedData[];
  }
  
  export interface AffiliatedData {
    affiliate: Affiliate;
    user_affiliated: UserAffiliated;
    UserAffialtedData: UserAffialtedData
  }
  export interface UserAffialtedData {
    id: string;
    foreign_user_id: string;
    foreign_affiliate_code: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Affiliate {
    id: string;
    name: string;
    affiliate_code: string;
    email: string;
    phone: string;
    address: string | null;
    status_id: string;
    email_verified_at: string | null;
    recover_password_code: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserAffiliated {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    image_path: string | null;
    created_at: string;
    updated_at: string;
    status: string;
    bi: string | null;
    deleted_at: string | null;
    subscriptions: Subscription[];
    roles: string[];
    permissions: string[];
  }
  
  export interface Subscription {
    id: string;
    started_at: string;
    ended_at: string;
    status: string;
    plan: Plan;
    user: SubscribedUser;
    created_at: string;
    updated_at: string;
  }
  
  export interface Plan {
    id: string;
    name: string;
    price: number;
    duration: number;
    duration_unit: string;
    ticket_quantity: number | null;
    status: string;
    initial: string;
    descriptions: any[]; // pode tipar melhor se souber a estrutura
    created_at: string;
    updated_at: string;
  }
  
  export interface SubscribedUser {
    id: string;
    name: string;
    image_path: string | null;
    code: string | null;
    email: string | null;
    phone: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    fcm_token: string | null;
    status: string;
    bi: string | null;
  }
  