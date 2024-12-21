import { ENDPOINT } from "@/constants/endpoint";
import { APIs } from ".";

export const getMenus = async () => {
  try {
    const res = await APIs.get(ENDPOINT.MENUS.BASE);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuById = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.MENUS.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuByRestaurantId = async (id: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.MENUS.BY_RESTAURANT_ID}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};
