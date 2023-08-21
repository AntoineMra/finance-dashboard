import router from "@/router/index";

interface Filters {
  [key: string]: any;
}

export function generateApiParams(filters: Filters): string {
  //@ts-ignore
  const params = Object.entries(filters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(
      ([key, value]: [string, any]) => value !== undefined && value !== null
    )
    .map(
      ([key, value]: [string, any]) =>
        `${key}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return params ? `?${params}` : "";
}

export function catchError(response: any) {
  //@ts-ignore
  $cookies.remove("token");
  router.push("/login");

  throw new Error(response.data.message);
}
