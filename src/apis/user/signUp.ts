import api from "../interceptor";

export const signUpUser = async (userData: unknown) => {
  const response = await api.post("/v1/api/users", userData);
  return response.data;
};

export const checkEmail = async (email: string) => {
  const response = await api.post("/v1/api/users/emailConfirm", email);
  return response;
};
