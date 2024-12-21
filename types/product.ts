export interface ProductResponse {
  _id: string;
  name: string;
  price: number;
  size: string;
  description: string;
  category: string;
  image: string;
  __v: number;
}

export interface ProductStack extends ProductResponse {
  quantity: number;
}
