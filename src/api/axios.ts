import axios from "axios";

export function getInstance() {
  //@ts-ignore
  // eslint-disable-next-line no-undef
  const token = $cookies.get("token");
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return axiosInstance;
}
