import { ENDPOINT } from "@/constants/endpoint";
import { APIs } from ".";

export const updateProfile = async (data: {
  name: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  avatar: string;
  userId: string;
}) => {
  try {
    const res = await APIs.put(ENDPOINT.PROFILE.BASE, data);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = async (userId: string) => {
  try {
    const res = await APIs.get(`${ENDPOINT.PROFILE.BASE}/${userId}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};
