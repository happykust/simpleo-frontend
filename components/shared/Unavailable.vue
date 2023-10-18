<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
    <div class="h-full flex flex-col items-center justify-center mt-10">
        <img src="assets/images/err_tyan.png" alt="" class="w-64">
        <p class="text-center font-bold mt-3 w-72">Этот раздел временно недоступен. <br>Приходите позже</p>
        <NuxtLink to="/">
            <button class="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Назад</span>
            </button>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    name: "Unavailable"
}
</script>

<style scoped>

</style>