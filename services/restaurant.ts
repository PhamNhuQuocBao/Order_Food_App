import { ENDPOINT } from "@/constants/endpoint";
import { APIs } from ".";

export const getRestaurants = async () => {
  try {
    const res = APIs.get(ENDPOINT.RESTAURANTS.BASE);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const res = APIs.get(`${ENDPOINT.RESTAURANTS.BASE}/${id}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};
