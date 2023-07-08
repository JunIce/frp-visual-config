import { defineStore } from "pinia";

export const useClient = defineStore("client", {
  state: () => ({
    type: "http",
    local_ip: "",
    local_port: "",
    custom_domains: "",
    remote_port: "",

    // tcp
    tcp_multi: false,

    // https
    vhost_http_port: "80",
    local_addr: "",
    crt_path: "",
    key_path: "",
    header_rewrite: "",
    header_from: "",
  }),
});
