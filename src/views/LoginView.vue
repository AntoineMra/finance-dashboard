<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div
        class="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div>
          <h1 class="text-center font-bold text-4xl mb-8">Finance Dashboard</h1>
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form @submit.prevent="login">
            <!-- Email input -->
            <div class="mb-6">
              <input
                v-model="username"
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                placeholder="Username"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                v-model="password"
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/user";
import axios from "axios";
import { handleExpiredToken } from "@/api/config";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_API_URL + "/login",
      JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    //@ts-ignore
    // eslint-disable-next-line no-undef
    $cookies.set("token", response.data.token);

    const userRes = await axios.get(
      import.meta.env.VITE_BASE_API_URL + "/whoami",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.data.token}`,
        },
      }
    );

    if (userRes.status === 401) {
      authStore.resetToken();
      authStore.setLoggedIn(false);
      handleExpiredToken();
    }

    authStore.setUser(userRes.data);
    authStore.setLoggedIn(true);
    router.push("/");
  } catch (error) {
    console.error("Unable to connect : " + error);
  }
};
</script>

<style lang="scss"></style>
