import axios from "axios";
import router from "@/router/index";

//@ts-ignore
const token = $cookies.get("token");

// @ts-ignore
export const APISettings = {
  headersJSON: headers("application/json"),
  baseUrl: import.meta.env.VITE_BASE_API_URL,
};

export function headers(type: string = "application/json") {
  return new Headers({
    Accept: type,
    "Content-Type": type,
    Authorization: token ? `Bearer ${token}` : "",
  });
}


interface Filters {
  [key: string]: any;
}

export function generateApiParams(filters: Filters): string {
  //@ts-ignore
  const params = Object.entries(filters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]: [string, any]) => value !== undefined && value !== null)
    .map(([key, value]: [string, any]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return params ? `?${params}` : "";
}

export function catchError(response: any) {
  if (response.status === 401) {
    //@ts-ignore
    $cookies.remove("token");
    router.go(0);
  }
  throw new Error(response.statusText);
}
