<template>
  <el-form
    ref="clientConfRef"
    :model="state"
    :rules="rules"
    :label-width="app.isMobile ? 'auto' : 140"
    :label-position="app.isMobile ? 'left' : 'right'"
  >
    <el-form-item :label="$t('type')" prop="type">
      <el-radio-group v-model="state.type">
        <el-radio v-for="item in types" :label="item.label">{{
          item.label
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="state.type === 'tcp' || state.type === 'udp'">
      <el-form-item
        v-if="state.type === 'tcp'"
        :label="$t('multi_tcp')"
        prop="tcp_multi"
      >
        <el-checkbox v-model="state.tcp_multi" />
      </el-form-item>
      <el-form-item :label="$t('local_ip')" prop="local_ip">
        <el-input v-model="state.local_ip" placeholder="192.168.1.1"></el-input>
      </el-form-item>
      <el-form-item :label="$t('local_port')" prop="local_port">
        <el-input v-model="state.local_port" placeholder="8080"></el-input>
      </el-form-item>
      <el-form-item v-if="!state.tcp_multi" :label="$t('remote_port')" prop="remote_port">
        <el-input v-model="state.remote_port" placeholder="6666"></el-input>
      </el-form-item>
      <el-form-item v-else :label="$t('bind_domain')" prop="custom_domains">
        <el-input
          v-model="state.custom_domains"
          placeholder="machine-a.example.com"
        ></el-input>
      </el-form-item>
    </template>

    <template v-if="state.type === 'http'">
      <el-form-item :label="$t('local_port')" prop="local_port">
        <el-input v-model="state.local_port" placeholder="8080"></el-input>
      </el-form-item>
      <el-form-item :label="$t('bind_domain')" prop="custom_domains">
        <el-input
          v-model="state.custom_domains"
          placeholder="www.example.com"
        ></el-input>
      </el-form-item>
    </template>

    <template v-if="state.type === 'https'">
      <el-form-item :label="$t('bind_domain')" prop="custom_domains">
        <el-input
          v-model="state.custom_domains"
          placeholder="machine-a.example.com"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('local_addr')" prop="local_addr">
        <el-input v-model="state.local_addr" placeholder="8080"></el-input>
      </el-form-item>
      <el-form-item :label="$t('crt_path')" prop="crt_path">
        <el-input v-model="state.crt_path" placeholder="/"></el-input>
      </el-form-item>
      <el-form-item :label="$t('key_path')" prop="key_path">
        <el-input v-model="state.key_path" placeholder="/"></el-input>
      </el-form-item>
      <el-form-item :label="$t('header_rewrite')" prop="header_rewrite">
        <el-input v-model="state.header_rewrite" placeholder="/"></el-input>
      </el-form-item>
      <el-form-item :label="$t('header_from')" prop="header_from">
        <el-input v-model="state.header_from"></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useClient } from "../store/client";
import { useApp } from "../store/app";
import { FormInstance } from "element-plus";
import validator from "validator";

const state = useClient();
const app = useApp();
const clientConfRef = ref<FormInstance>();

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
  {
    label: "https",
  },
];

const rules = computed(() => {
  return {
    local_ip: [
      {
        required: true,
      },
      {
        validator: (rule: any, value: string, cb: Function) => {
          if (validator.isIP(value)) {
            cb();
          } else {
            cb(new Error("请输入正确的IP"));
          }
        },
      },
    ],
    local_port: [
      {
        required: true,
      },
      {
        validator: (rule: any, value: string, cb: Function) => {
          if (validator.isPort(value)) {
            cb();
          } else {
            cb(new Error("请输入正确的port"));
          }
        },
      },
    ],
    remote_port: [
      {
        required: true,
      },
      {
        validator: (rule: any, value: string, cb: Function) => {
          if (validator.isPort(value)) {
            cb();
          } else {
            cb(new Error("请输入正确的port"));
          }
        },
      },
    ],
    custom_domains: [
      {
        required: true,
      },
      {
        validator: (rule: any, value: string, cb: Function) => {
          if (validator.isFQDN(value)) {
            cb();
          } else {
            cb(new Error("请输入正确的domain"));
          }
        },
      },
    ],
  };
});

const validate = () => {
  return new Promise((resolve, reject) => {
    clientConfRef.value!.validate((valid, fields) => {
      if (valid) {
        resolve(state);
      }
    });
  });
};

defineExpose({
  validate,
});
</script>
