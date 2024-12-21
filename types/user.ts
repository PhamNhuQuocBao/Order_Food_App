export interface UserResponse {
  email: string;
  password: string;
  role: string;
  __v: number;
  _id: string;
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
  };
}
