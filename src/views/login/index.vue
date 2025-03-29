<template>
  <div class="login">
    <div class="login-header">
      <div class="flex-y-center">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="toggleTheme"
        />
      </div>
    </div>
    <div class="login-form">
      <el-form ref="loginFormRef" :model="loginFormData" :rules="loginRules">
        <div class="form-title">
          <h2>cjyiz登录页面</h2>
          <el-dropdown style="position: absolute; right: 0">
            <div class="cursor-pointer">
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-tag>0.0.1</el-tag>
                </el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('root', '123456')">
                  超级管理员：root/123456
                </el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('admin', '123456')">
                  系统管理员：admin/123456
                </el-dropdown-item>
                <el-dropdown-item @click="setLoginCredentials('test', '123456')">
                  测试小游客：test/123456
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="input-wrapper">
            <el-icon class="mx-2">
              <User />
            </el-icon>
            <el-input
              ref="username"
              v-model="loginFormData.username"
              placeholder="用户名"
              name="username"
              size="large"
              class="h-[48px]"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip :visible="isCapslock" content="大写锁定" placement="right">
          <el-form-item prop="password">
            <div class="input-wrapper">
              <el-icon class="mx-2">
                <Lock />
              </el-icon>
              <el-input
                v-model="loginFormData.password"
                placeholder="密码"
                type="password"
                name="password"
                size="large"
                class="h-[48px] pr-2"
                show-password
                @keyup="checkCapslock"
                @keyup.enter="handleLoginSubmit"
              />
            </div>
          </el-form-item>
        </el-tooltip>

        <!-- 验证码 -->
        <el-form-item prop="captchaCode">
          <div class="input-wrapper">
            <div class="i-svg:captcha mx-2" />

            <el-input
              v-model="loginFormData.captchaCode"
              auto-complete="off"
              size="large"
              class="flex-1"
              placeholder="验证码"
              @keyup.enter="handleLoginSubmit"
            />

            <el-image :src="captchaBase64" class="captcha-img" @click="getCaptcha" />
          </div>
        </el-form-item>

        <div class="flex-x-between w-full py-1">
          <el-checkbox> 记住我 </el-checkbox>
          <el-link type="primary" href="/forget-password"> 忘记密码 </el-link>
        </div>

        <!-- 登录按钮 -->
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLoginSubmit"
        >
          登录
        </el-button>
      </el-form>
    </div>

    <!-- 登录页底部 -->
    <div class="login-footer">
      <el-text size="small">
        Copyright © 2021 - 2025 cjyiz.com All Rights Reserved.
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >皖ICP备20006496号-2</a
        >
      </el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import router from '@/router'

// const route = useRoute()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const isDark = ref(false)
const isCapslock = ref(false)
const captchaBase64 = ref() // 验证码图片Base64字符串

const loginFormData = ref({
  username: 'admin',
  password: '123456',
  captchaKey: '',
  captchaCode: '',
})

const toggleTheme = () => {
  console.log('主题切换')
}

const checkCapslock = (event: KeyboardEvent) => {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState('CapsLock')
  }
}

// 设置登录凭证
const setLoginCredentials = (username: string, password: string) => {
  loginFormData.value.username = username
  loginFormData.value.password = password
}

const handleLoginSubmit = async () => {
  const valid = await loginFormRef.value?.validate()
  if (!valid) return
  loading.value = true
  try {
    console.log('登录')
    await router.push('/')
  } catch (error) {
    getCaptcha() // 刷新验证码
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

const getCaptcha = () => {
  console.log('获取验证码')
  // loginFormData.value.captchaKey = data.captchaKey
  // captchaBase64.value = data.captchaBase64
}
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
<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background: url('@/assets/images/login-bg.jpg') no-repeat center right;

  .login-header {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 15px;

    .logo {
      width: 26px;
      height: 26px;
    }

    .title {
      margin: auto 5px;
      font-size: 24px;
      font-weight: bold;
      color: #3b82f6;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 460px;
    padding: 40px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-light);

    @media (width <= 460px) {
      width: 100%;
      padding: 20px;
    }

    .form-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 20px;
      text-align: center;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .captcha-img {
      height: 48px;
      cursor: pointer;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    .third-party-login {
      display: flex;
      justify-content: center;
      width: 100%;
      color: var(--el-text-color-secondary);

      *:not(:first-child) {
        margin-left: 20px;
      }

      .icon {
        cursor: pointer;
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

html.dark {
  .login {
    background: url('@/assets/images/login-bg-dark.jpg') no-repeat center right;

    .login-form {
      background: transparent;
      box-shadow: var(--el-box-shadow);
    }
  }
}
</style>
