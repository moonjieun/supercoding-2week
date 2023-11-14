import axios from "axios";

export const signIn = async (email: string, password: string) => {
  const response = await axios.post(
    "https://pet-commerce.shop/v1/api/users/signin",
    { email, password }
  );
  return response.data;
};
