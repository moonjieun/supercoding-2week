import axios from "axios";

export const signUpUser = async (userData: unknown) => {
  const response = await axios.post(
    "https://pet-commerce.shop/v1/api/users",
    userData
  );
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await axios.post(
    "https://pet-commerce.shop/v1/api/users/emailConfirm",
    email,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
