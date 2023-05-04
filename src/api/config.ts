import axios from "axios";
import { useAuthStore } from "@/stores/user";
const userStore = useAuthStore();
import router from "@/router/index";

//@ts-ignore
const token = $cookies.get("token");
console.log("token", token);

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

interface Filters {
  [key: string]: any;
}

export function generateApiParams(filters: Filters): string {
  let params = "";
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== undefined && value !== null) {
      params += `&${key}=${encodeURIComponent(String(value))}`;
    }
  });
  if (params !== "") {
    params = "?" + params.slice(1);
  }
  return params;
}

export function catchError(response: any) {
  if (response.status === 401) {
    //@ts-ignore
    $cookies.remove("token");
    userStore.resetToken();
    userStore.setLoggedIn(false);
    router.push("/login");
  }
  throw new Error(response.statusText);
}
