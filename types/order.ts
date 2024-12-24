export type Order = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
  amount: number;
  products: any[];
};

export type OrderResponse = Order & {
  _id?: string;
  status: string;
};
