import router from "@/router/index";

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
  //@ts-ignore
  $cookies.remove("token");
  router.push("/login");

  throw new Error(response.data.message);
}
