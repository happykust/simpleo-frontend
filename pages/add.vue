<!--
  - Copyright (C) Simpleo - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <section class="container w-full h-full mx-auto h-full py-10 px-5">
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white">Создать новость</h2>
      <form action="#" class="space-y-8">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Заголовок</label>
          <input v-model="news.title" type="text" id="title" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Lorem ipsum dolor??!" required>
        </div>
        <div class="sm:col-span-2">
          <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Содержимое</label>
          <textarea v-model="news.content" id="content" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."></textarea>
        </div>
        <button @click="create" type="button" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Создать</button>
      </form>
    </div>
  </section>
</template>

<script>

import {useNewsStore} from "~/stores/newsStore";

export default {
  setup() {
    const newsStore = useNewsStore();

    return {newsStore};
  },
  methods: {
    async create() {
      await this.newsStore.CreateNews({
        title: this.news.title,
        content: this.news.content
      });
      await navigateTo("/");
      await this.newsStore.GetNews();
    }
  },
  data() {
    return {
      news: {
        title: "",
        content: ""
      }
    }
  }
}

</script>

<style scoped>

</style>