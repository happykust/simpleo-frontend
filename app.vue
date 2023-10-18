<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <div class="bg-slate-50 dark:bg-slate-600 dark:text-white">
    <NuxtLoadingIndicator/>
    <NuxtPage v-if="useRouter().currentRoute.value.fullPath === '/auth/login'"/>
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import {useAuthStore} from "~/stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.isLoggedIn;

    return {isLoggedIn, authStore}
  },
  mounted() {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) authStore.GetMe();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&display=swap');

* {
  font-family: 'Nunito', sans-serif;
}
</style>