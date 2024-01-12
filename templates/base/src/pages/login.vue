<template>
  <VpLoginForm :login-items="loginItems" @submit="handleSubmit"></VpLoginForm>
</template>

<script setup lang="tsx">

const loginItems = [
  {
    icon: 'ic:baseline-wechat',
    url: ''
  },
  {
    icon: 'cib:tencent-qq',
    url: ''
  },
  {
    icon: 'bi:sina-weibo',
    url: ''
  },
  {
    icon: 'mdi:github',
    url: ''
  }
]

const handleSubmit = (form: any) => {
  console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped></style>
