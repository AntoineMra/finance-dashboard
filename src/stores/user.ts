import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => { return { user: "", token: "" } },
  getters: {
    isLoggedIn(state) {
      return state.token !== "";
    },
  },
  actions: {
    setUser(user: string) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
