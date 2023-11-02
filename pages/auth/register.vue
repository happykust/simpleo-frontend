<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <Head>
    <Title>Регистрация | Cyberzone CP</Title>
  </Head>
  <div class="grid grid-cols-12 grid-rows-[auto] h-screen justify-center content-center text-center">

    <div class="col-start-1 col-end-13">
      <h1 class="font-bold text-5xl dark:text-white">cyberzone</h1>
      <h3 class="text-xl tracking-wider dark:text-white">Регистрация</h3>

      <form class="login-form w-64 m-auto mt-5" v-on:submit.prevent="store.Register(this.register)">
        <div v-if="store.error" class="p-4 my-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {{store.error}}
        </div>
        <div class="grid gap-2 mb-2 md:grid-cols-1">
          <div class="mb-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Почта или телефон</label>
            <input v-model="register.login" :disabled="store.loading" type="email" id="email" name="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="alex.fot@mail.ru" required>
          </div>
          <div class="mb-2">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Никнейм</label>
            <input v-model="register.username" :disabled="store.loading" type="text" id="username" name="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="superdoter228" required>
          </div>
          <div class="mb-2">
            <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
            <input v-model="register.firstname" :disabled="store.loading" type="text" id="firstname" name="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Алексей" required>
          </div>
          <div class="mb-2">
            <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фамилия</label>
            <input v-model="register.lastname" :disabled="store.loading" type="text" id="lastname" name="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Фортнайт">
          </div>
          <div class="mb-2">
            <label for="patronymic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Отчество (опционально)</label>
            <input v-model="register.patronymic" :disabled="store.loading" type="text" id="patronymic" name="patronymic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Киберзонович" required>
          </div>
          <div class="mb-2">
            <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата рождения</label>
            <input v-model="register.birthday" :disabled="store.loading" type="date" id="birthday" name="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2023-10-10" required>
          </div>
          <div class="mb-2">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
            <input v-model="register.password" :disabled="store.loading" type="password" id="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
          </div>
          <div class="mb-2">
            <label for="password_confirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Подтверждение пароля</label>
            <input v-model="password_confirm" :disabled="store.loading" type="password" id="password_confirm" name="password_confirm" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
          </div>
        </div>
        <NuxtLink to="/auth/login" class="block mb-3 text-sm text-blue-700">Войти</NuxtLink>
        <button type="submit" :disabled="store.loading" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {useAuthStore} from "~/stores/authStore";

export default {
  name: "register",
  data() {
    return {
      register: {
        login: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        patronymic: "",
        birthday: ""
      },
      password_confirm: ""
    }
  },
  setup() {
    const store = useAuthStore();

    return {store}
  }
}
</script>
