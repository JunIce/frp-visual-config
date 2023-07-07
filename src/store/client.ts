import { defineStore } from "pinia";

export const useClient = defineStore("client", {
  state: () => ({
    type: "http",
    local_port: "",
    custom_domains: "",
  }),
});
