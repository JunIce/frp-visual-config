<template>
  <el-form :model="state" label-width="140">
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="state.type">
        <el-radio v-for="item in types" :label="item.label">{{
          item.label
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="state.type === 'tcp' || state.type === 'udp'">
      <el-form-item label="本地ip" prop="local_ip">
        <el-input v-model="state.local_ip" placeholder="192.168.1.1"></el-input>
      </el-form-item>
      <el-form-item label="本地端口" prop="local_port">
        <el-input v-model="state.local_port" placeholder="8080"></el-input>
      </el-form-item>
      <el-form-item label="远程端口" prop="remote_port">
        <el-input v-model="state.remote_port" placeholder="6666"></el-input>
      </el-form-item>
    </template>

    <template v-if="state.type === 'http'">
      <el-form-item label="本地端口" prop="local_port">
        <el-input v-model="state.local_port" placeholder="8080"></el-input>
      </el-form-item>
      <el-form-item label="绑定域名" prop="custom_domains">
        <el-input
          v-model="state.custom_domains"
          placeholder="http://example.com"
        ></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { useClient } from "../store/client";
const state = useClient();

const types = [
  {
    label: "tcp",
  },
  {
    label: "udp",
  },
  {
    label: "http",
  },
];
</script>
