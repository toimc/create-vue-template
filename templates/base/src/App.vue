<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { messages, locale } = useI18n()

const local = messages[locale.value] as any
</script>

<template>
  <el-config-provider :locale="local">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
