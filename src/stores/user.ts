import { defineStore } from "pinia";

interface UserState {
  user: {} | null;
  token: string;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): UserState => {
    return { user: null, token: "", isLoggedIn: false };
  },
  actions: {
    setUser(user: {}) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
    setLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
    resetToken() {
      this.token = "";
    },
  },
});
