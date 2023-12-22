<!--
  - Copyright (C) Simpleo - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
    <div>
      <header>
        <nav class="border-gray-200 px-6 lg:px-6 py-4 bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Simpleo</span>
            </a>
            <div class="flex items-center lg:order-2">
              <template v-if="!authStore.isLoggedIn">
                <NuxtLink to="/auth/login">
                  <a href="" class="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">Войти</a>
                </NuxtLink>
                <NuxtLink to="/auth/register">
                  <a href="" class="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-800">Зарегистрироваться</a>
                </NuxtLink>
              </template>
              <template v-else>
                <h1 class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">{{ authStore.user?.username }}</h1>
                <a href="" @click="authStore.Logout" class="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800">Выйти</a>
              </template>
            </div>
          </div>
        </nav>
      </header>
      <slot />
    </div>
</template>

<script>
import {useAuthStore} from "~/stores/authStore";
import Spinner from "~/components/utils/Spinner.vue";
import {initFlowbite} from "flowbite";
import {useNewsStore} from "~/stores/newsStore";
import News from "~/components/news/one_news.vue";
import One_news from "~/components/news/one_news.vue";

export default {
    name: "default",
    components: {One_news, News, Spinner},
    async setup() {
        const authStore = useAuthStore();
        const newsStore = useNewsStore();

        return {authStore, newsStore}
    },
    async mounted() {
        await this.newsStore.GetNews();
        initFlowbite();
    },
    updated() {
        initFlowbite();
    }
}
</script>
