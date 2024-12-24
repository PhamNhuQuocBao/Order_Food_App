import { APIs } from ".";
import { ENDPOINT } from "@/constants/endpoint";
import { itemCart } from "@/types/cart";

export const getCart = async (userId: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.CART.BASE}/${userId}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemCart: itemCart, userId: string) => {
  try {
    const cartFormatted = {
      products: [itemCart],
      userId,
    };
    const res = await APIs.post(
      `${ENDPOINT.CART.BASE}/${userId}`,
      cartFormatted
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const removeItemCart = async () => {};

export const updateItemCart = async (userId: string, products: any[]) => {
  try {
    const res = await APIs.put(`${ENDPOINT.CART.BASE}/${userId}`, products);

    return res;
  } catch (error) {
    console.error(error);
  }
};
