<template>
  <a href="https://github.com/JunIce/frp-visual-config" target="_blank">
    <img
      class="fixed w-6 z-10 right-4 top-4"
      src="../assets/images/github.svg"
      alt="github"
    />
  </a>
  <div class="wrapper pt-4">
    <el-row>
      <el-col :lg="12" :sm="24">
        <div class="p-2 md:px-10 md:py-8">
          <p class="text-lg">Server Side</p>
          <div>
            <ServerConfig ref="serverConfRef" />
          </div>
          <p class="text-lg">Client Side</p>
          <div>
            <ClientConfig ref="clientConfRef" />
          </div>
        </div>
      </el-col>
      <el-col :lg="12" :sm="24">
        <div class="p-2 md:px-20 md:py-10">
          <p class="mb-2 text-md text-gray-900">frps.ini</p>
          <div>
            <pre class="bg-slate-400 rounded-md p-4 text-current">{{
              serverConf
            }}</pre>
          </div>
          <p class="mt-2 mb-2 text-md text-gray-900">frpc.ini</p>
          <div>
            <pre class="bg-slate-400 rounded-md p-4 text-current">{{
              clientConf
            }}</pre>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="text-center">
      <el-button @click="download">Download Config File</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import ClientConfig from "../components/ClientConfig.vue";
import ServerConfig from "../components/ServerConfig.vue";
import { useClient } from "../store/client";
import { useServer } from "../store/server";
import { saveAs } from "file-saver";

const clientState = useClient();
const serverState = useServer();

const serverConfRef = ref();
const clientConfRef = ref();

const serverConf = computed(() => {
  let str = "#frps.ini\n";
  if (serverState.port) {
    str += `\n[common]\nbind_port = ${serverState.port}`;
  }

  if (clientState.type === "http") {
    str += `\nvhost_http_port = ${clientState.vhost_http_port}`;
  }

  if (clientState.type === "https") {
    str += `\nvhost_https_port = 443`;
  }

  if (serverState.dashboard) {
    str += `\n\ndashboard_port = ${serverState.dashboard_port}`;
    str += `\ndashboard_user = ${serverState.dashboard_user}`;
    str += `\ndashboard_pwd = ${serverState.dashboard_pwd}`;
  }
  return str;
});

const clientConf = computed(() => {
  let str = "#frpc.ini\n";
  if (serverState.IP || serverState.port) {
    str += `\n[common]\nserver_addr = ${serverState.IP}\nserver_port = ${serverState.port}`;
  }

  if (clientState.type === "http") {
    str += `\n\n[web]\ntype = http`;
    if (clientState.local_port) {
      str += `\nlocal_port = ${clientState.local_port}`;
    }
    if (clientState.custom_domains) {
      str += `\ncustom_domains = ${clientState.custom_domains}`;
    }
  }

  if (clientState.type === "tcp" || clientState.type === "udp") {
    str += `\n\n[ssh]\ntype = ${
      clientState.tcp_multi ? "tcpmux" : clientState.type
    }`;

    if (clientState.tcp_multi) {
      str += `\nmultiplexer = httpconnect`;
    }

    if (clientState.local_ip) {
      str += `\nlocal_ip = ${clientState.local_ip}`;
    }
    if (clientState.local_port) {
      str += `\nlocal_port = ${clientState.local_port}`;
    }
    if (clientState.tcp_multi) {
      str += `\ncustom_domains = ${clientState.custom_domains}`;
    }
    if (!clientState.tcp_multi && clientState.remote_port) {
      str += `\nremote_port = ${clientState.remote_port}`;
    }
  }

  if (clientState.type === "https") {
    str += `\n\n[https]\ntype = ${clientState.type}`;

    str += `\ncustom_domains = ${clientState.custom_domains}`;

    str += `\n\n`;

    str += `\nplugin = https2http`;
    str += `\nplugin_local_addr = ${clientState.local_addr}`;
    str += `\nplugin_crt_path = ${clientState.crt_path}`;
    str += `\nplugin_key_path = ${clientState.key_path}`;
    str += `\nplugin_host_header_rewrite = ${clientState.header_rewrite}`;
    str += `\nplugin_header_X-From-Where = ${clientState.header_from}`;
  }
  return str;
});

const download = () => {
  Promise.all([
    serverConfRef.value.validate(),
    clientConfRef.value.validate(),
  ]).then(() => {
    downloadFile(serverConf.value, "frps.ini");
    downloadFile(clientConf.value, "frpc.ini");
  });
};

const downloadFile = async (content: string, fileName: string) => {
  await saveAs(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
    fileName
  );
};
</script>
