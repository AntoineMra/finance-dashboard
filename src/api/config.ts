import axios from "axios";

const token = ''
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 1000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    }
  });

export default instance;