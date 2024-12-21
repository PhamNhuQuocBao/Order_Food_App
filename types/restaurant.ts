export interface RestaurantResponse {
  _id: string;
  __v: number;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
  ownerId: string;
  rating: number;
  image: string;
}
