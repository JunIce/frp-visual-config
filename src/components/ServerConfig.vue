<template>
  <div>
    <el-form :model="state" label-width="140">
      <el-form-item label="IP">
        <el-input v-model="state.IP" />
      </el-form-item>
      <el-form-item label="port">
        <el-input v-model="state.port" />
      </el-form-item>
      <el-form-item label="dashboard">
        <el-checkbox v-model="state.dashboard" />
      </el-form-item>
      <template v-if="state.dashboard">
        <el-form-item label="dashboard_port">
          <el-input v-model="state.dashboard_port" />
        </el-form-item>
        <el-form-item label="dashboard_user">
          <el-input v-model="state.dashboard_user" />
        </el-form-item>
        <el-form-item label="dashboard_pwd">
          <el-input v-model="state.dashboard_pwd" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { useServer } from "../store/server";
const state = useServer();
</script>
<style></style>
