<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入用户名',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入密码',
      },
      {
        min: 6,
        message: '密码最少为6位',
        trigger: 'blur',
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入验证码',
      },
    ],
  }
})
</script>
