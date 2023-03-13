import { defineStore } from "pinia";

interface UserState {
  user: {} | null;
  token: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): UserState => { return { user: null, token: "" } },
  getters: {
    isLoggedIn(state) {
      return state.token !== "";
    },
  },
  actions: {
    setUser(user: {}) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
    resetToken() {
      this.token = "";
    },  },
});
