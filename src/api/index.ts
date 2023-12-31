import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default instance;
