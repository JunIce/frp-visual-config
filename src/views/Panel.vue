<template>
  <div class="wrapper">
    <el-row class="h-full">
      <el-col :span="12">
        <div class="px-10 py-8">
          <el-form :model="serverState" label-width="140">
            <p class="text-lg">Server Side</p>
            <el-form-item label="IP">
              <el-input v-model="serverState.IP" />
            </el-form-item>
            <el-form-item label="port">
              <el-input v-model="serverState.port" />
            </el-form-item>

            <p class="text-lg">Client Side</p>
            <div>
              <ClientConfig />
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="px-20 py-10">
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
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import ClientConfig from "../components/ClientConfig.vue";
import { useClient } from "../store/client";
const clientState = useClient();

interface ServerProps {
  IP: string;
  port: string;
}
const serverState = reactive<ServerProps>({
  IP: "",
  port: "",
});

const serverConf = computed(() => {
  let str = "#frps.ini\n";
  if (serverState.port) {
    str += `\n[common]\nbind_port = ${serverState.port}`;
  }
  return str;
});

const clientConf = computed(() => {
  let str = "#frpc.ini\n";
  if (clientState.type === "http") {
    if (serverState.IP || serverState.port) {
      str += `\n[common]\nserver_addr = ${serverState.IP}\nserver_port = ${serverState.port}`;
    }

    str += `\n\n[web]\ntype = http`
    if (clientState.local_port) {
      str += `\nlocal_port = ${clientState.local_port}`;
    }
    if (clientState.custom_domains) {
      str += `\ncustom_domains = ${clientState.custom_domains}`;
    }
  }
  return str;
});
</script>
