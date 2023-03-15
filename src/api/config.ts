import axios from "axios";
// TODO: Implement Vue Cookies

interface Filters {
  [key: string]: any;
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        Accept: "application/ld+json",
        "Content-Type": "application/ld+json",
        // Authorization: authStore.token ? `Bearer ${authStore.token}` : "",
    }
  });

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
      // authStore.resetToken()
    }
    throw new Error(response.statusText);
  }