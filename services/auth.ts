import { APIs } from ".";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await APIs.post("/login", { email, password });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await APIs.post("/register", { email, password, role: "user" });

    return res;
  } catch (error) {
    console.error(error);
  }
};
