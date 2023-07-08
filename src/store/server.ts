import { defineStore } from "pinia";

export const useServer = defineStore("server", {
  state: () => ({
    IP: "",
    port: "",
    dashboard: false,
    dashboard_port: "",
    dashboard_user: "",
    dashboard_pwd: "",
  }),
});
