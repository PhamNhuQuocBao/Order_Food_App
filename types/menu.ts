export interface MenuResponse {
  _id: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  category: string;
  restaurantId: string;
  size: string[];
  __v: number;
  image?: string;
}
