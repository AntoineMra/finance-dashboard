import { defineStore } from "pinia";
import { getInstance } from "@/api/axios";
import type { Category } from "@/interface/api";
import { handleExpiredToken } from "@/api/config";

interface MakeState {
    categories: [];
    fetchError: string | null;
}  

export const useCategoryStore = defineStore("category", {
  state: (): UserState => {
    return { 
        categories: [],
        fetchError: ''
    };
  },
  actions: {
    async setCategories() {
        const instance = getInstance();

        try {
            const response = await instance.get<Category[]>("/categories", {
              headers: {
                Accept: "application/ld+json",
              },
            });
        
            const result: any = response.data;
            this.categories = result["hydra:member"];
          } catch (error: any) {
            if (error.response.status === 401) {
              handleExpiredToken();
            }
          }
    },
  },
});
