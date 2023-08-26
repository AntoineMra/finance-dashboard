import router from "@/router/index";

export function handleExpiredToken() {
  //@ts-ignore
  $cookies.remove("token");
  router.push("/login");
  console.log("Token expired, redirecting to login page");
}
