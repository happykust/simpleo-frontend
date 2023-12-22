<!--
  - Copyright (C) Simpleo - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <Head>
    <Title>Simpleo</Title>
  </Head>
  <div class="bg-slate-50 container w-full h-full mx-auto py-10 px-5 lg:px-40">
    <div v-if="!newsStore.loading">
      <div class="w-full flex justify-between">
        <h1 class="h1 text-2xl font-bold text-black">Все новости</h1>
        <NuxtLink to="/add" v-if="authStore.isLoggedIn">
          <a href="" class="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ribg-primary-800">Создать новость</a>
        </NuxtLink>
        <a href="#" v-else class="text-gray-500 bg-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 border border-gray-500">Войдите для создания новостей</a>
      </div>
      <div class="mt-10">
        <one_news v-for="news in newsStore.news" v-if="newsStore.news?.length > 0" :title="news.title" :content="news.content" :author="news.user.username" :created_at="news.created_at" />
        <h1 v-else class="font-bold text-2xl text-center">Новостей пока нет =(</h1>
      </div>
    </div>
    <Spinner v-else/>
  </div>
</template>

<script>
import One_news from "~/components/news/one_news.vue";
import Spinner from "~/components/utils/Spinner.vue";
import {useAuthStore} from "~/stores/authStore";
import {useNewsStore} from "~/stores/newsStore";

export default {
  name: "SimpleoMain",
  components: {Spinner, One_news},
  async setup() {
    const authStore = useAuthStore();
    const newsStore = useNewsStore();

    return {authStore, newsStore}
  },
}

</script>
