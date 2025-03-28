<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider>
    <el-watermark>
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>
