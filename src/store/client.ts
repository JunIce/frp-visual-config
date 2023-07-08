import { defineStore } from "pinia";

export const useClient = defineStore("client", {
  state: () => ({
    type: "http",
    local_ip: "",
    local_port: "",
    custom_domains: "",
    remote_port: "",
  }),
});
