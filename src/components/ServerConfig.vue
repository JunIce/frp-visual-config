<template>
  <div>
    <el-form
      ref="serverFormRef"
      :model="state"
      :rules="rules"
      :label-width="app.isMobile ? 'auto' : 140"
      :label-position="app.isMobile ? 'left' : 'right'"
    >
      <el-form-item label="IP" prop="IP">
        <el-input v-model="state.IP" />
      </el-form-item>
      <el-form-item label="port" prop="port">
        <el-input v-model="state.port" />
      </el-form-item>
      <el-form-item
        v-if="client.type === 'http'"
        :label="$t('vhost_http_port')"
        prop="vhost_http_port"
      >
        <el-input v-model="client.vhost_http_port" placeholder="80"></el-input>
      </el-form-item>
      <el-form-item label="dashboard" prop="dashboard">
        <el-checkbox v-model="state.dashboard" />
      </el-form-item>
      <template v-if="state.dashboard">
        <el-form-item label="dashboard_port" prop="dashboard_port">
          <el-input v-model="state.dashboard_port" />
        </el-form-item>
        <el-form-item label="dashboard_user" prop="dashboard_user">
          <el-input v-model="state.dashboard_user" />
        </el-form-item>
        <el-form-item label="dashboard_pwd" prop="dashboard_pwd">
          <el-input v-model="state.dashboard_pwd" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useServer } from "../store/server";
import { useClient } from "../store/client";
import { useApp } from "../store/app";
import { FormInstance } from "element-plus";
import validator from "validator";

const state = useServer();
const client = useClient();
const app = useApp();
const serverFormRef = ref<FormInstance>();
const rules = computed(() => {
  return {
    IP: [
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
    port: [
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
    dashboard_port: [
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
    dashboard_user: [
      {
        required: true,
      },
    ],
    dashboard_pwd: [
      {
        required: true,
      },
    ],
  };
});

const validate = () => {
  return new Promise((resolve, reject) => {
    serverFormRef.value!.validate((valid, fields) => {
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
