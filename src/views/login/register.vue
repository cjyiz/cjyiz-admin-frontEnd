<script lang="ts" setup>
defineProps({
  msg: {
    type: String,
    required: true,
    vaule: 'haha',
  },
});
</script>

<template>
  <div>这是注册页面{{ msg }}</div>
</template>
