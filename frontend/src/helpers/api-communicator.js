import api from "../api/users";

export const loginUser = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Unable to login ");
  }
  const data = response.data;
  // console.log(data);
  return data;
};
export const signUpUser = async (email, name, password) => {
  const response = await api.post("/users/signup", { email, name, password });
  // console.log(response);
  if (response.status !== 201) {
    console.log(response.data);
    throw new Error("Unable to login ");
  }
  const data = response.data;
  // console.log(data);
  return data;
};

export const checkAuthStatus = async () => {
  const response = await api.get("/users/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate ");
  }
  const data = response.data;
  return data;
};

export const sendChat = async (message) => {
  const response = await api.post("/chats/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to send chat ");
  }
  const data = response.data;
  return data;
};

export const logOutUser = async () => {
  const response = await api.get("users/logout");
  console.log(response);
  if (response.status !== 200) {
    throw new Error("Unable to login ");
  }
  const data = response.data;
  // console.log(data);
  return data;
};
