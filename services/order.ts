import { ENDPOINT } from "@/constants/endpoint";
import { Order } from "@/types/order";
import { APIs } from ".";
import { AxiosResponse } from "axios";

export const createOrder = async (data: Order) => {
  try {
    const res = await APIs.post(ENDPOINT.ORDER.BASE, data);

    return res;
  } catch (error) {
    console.error(error);
    return {
      data: {
        data: null,
        message: "Something went wrong!",
      },
      status: 400,
    } as AxiosResponse;
  }
};

export const getOrders = async (userId: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.ORDER.BASE}/${userId}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};
