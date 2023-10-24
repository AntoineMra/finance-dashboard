import { defineStore } from "pinia";

export const useDraftsStore = defineStore({
  id: "drafts",
  state: () => ({
    drafts: [] as any[],
  }),
  getters: {
    retrieveDrafts: () => (id: string | undefined) => {
      const storageDrafts = localStorage.getItem("drafts");
      const drafts = storageDrafts ? JSON.parse(storageDrafts) : null;

      if (!drafts || id === undefined) {
        return [];
      }

      const draft = drafts.find((draft: any) => draft.id === id);
      return draft ? draft.drafts : [];
    },
  },
  actions: {
    persistDrafts(id: string, draftObjects: any[]) {
      this.drafts.push({ id: id, drafts: draftObjects });
      localStorage.setItem("drafts", JSON.stringify(this.drafts));
    },
  },
});
