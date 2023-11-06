<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
    <div>
        <div v-if="authStore.user && !authStore.loading">
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-center">
                    <div class="flex items-center justify-between container">
                        <div class="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                    aria-controls="logo-sidebar" type="button"
                                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Открыть сайдбар</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" class="flex ml-2 md:mr-24">
                                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">cyberzone</span>
                            </a>
                        </div>
                        <div class="flex items-center">
                            <div class="flex items-center ml-3">
                                <div>
                                    <button type="button"
                                            class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span class="sr-only">Открыть меню</span>
                                        <img class="w-8 h-8 rounded-full"
                                             src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                             alt="user photo">
                                    </button>
                                </div>
                                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                     id="dropdown-user">
                                    <div class="px-4 py-3" role="none">
                                        <p class="text-sm text-gray-900 dark:text-white" role="none">
                                            {{ authStore.user.lastname }} {{ authStore.user.firstname }}
                                            {{ authStore.user.patronymic }}
                                        </p>
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                           role="none">
                                            {{ authStore.user.email }}
                                        </p>
                                    </div>
                                    <ul class="py-1" role="none">
                                        <li>
                                            <NuxtLink to="/">
                                                <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                   role="menuitem">Мой профиль</a>
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink>
                                                <a v-on:click="authStore.Logout()"
                                                   class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-400 dark:text-red-300 dark:hover:bg-gray-600 dark:hover:text-red"
                                                   role="menuitem"
                                                   style="cursor: pointer; user-select: contain">Выйти</a>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                   class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                   aria-label="Sidebar">
                <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <NuxtLink to="/"
                                      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span class="material-symbols-rounded text-gray-500">home</span>
                                <span class="ml-3">Главная</span>
                            </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.news.can_activate)">
                            <NuxtLink to="/news"
                                      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span class="material-symbols-rounded text-gray-500">insights</span>
                                <span class="flex-1 ml-3 whitespace-nowrap">Новости</span>
                            </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.event.can_activate)">
                            <NuxtLink to="/events"
                                      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span class="material-symbols-rounded text-gray-500">headphones</span>
                                <span class="flex-1 ml-3 whitespace-nowrap">Мероприятия</span>
                            </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.tournament.can_activate)">
                          <NuxtLink to="/tournaments"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">star_rate_half</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Турниры</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.booking.can_activate)">
                          <NuxtLink to="/bookings"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">acute</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Бронирование</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.device.can_activate)">
                            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-content" data-collapse-toggle="dropdown-content">
                                <span class="material-symbols-rounded text-gray-500">view_cozy</span>
                                <span class="mx-3 whitespace-nowrap">Устройства</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul id="dropdown-content" class="hidden py-2 space-y-2">
                                <li>
                                  <NuxtLink to="/devices" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Все устройства</NuxtLink>
                                </li>
                                <li v-if="authStore.hasPermission(allowedPermissionsEnum.gizmo_device.can_activate)">
                                    <NuxtLink to="/devices/gizmo" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Gizmo устройства</NuxtLink>
                                </li>
                                <li v-if="authStore.hasPermission(allowedPermissionsEnum.cyberzone_device.can_activate)">
                                    <NuxtLink to="/devices/cyberzone" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Cyberzone устройства</NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.board_game.can_activate)">
                          <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="boardgame-content" data-collapse-toggle="boardgame-content">
                            <span class="material-symbols-rounded text-gray-500">chess</span>
                            <span class="mx-3 whitespace-nowrap">Настольные игры</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                          </button>
                          <ul id="boardgame-content" class="hidden py-2 space-y-2">
                            <li>
                              <NuxtLink to="/board_games/" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Мои резервации</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink to="/board_games/manage" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Список настолок</NuxtLink>
                            </li>
                          </ul>
                        </li>
                        <li v-if="!authStore.hasPermission(allowedPermissionsEnum.board_game.can_activate)">
                          <NuxtLink to="/board_games"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">chess</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Настольные игры</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.organization.can_activate)">
                            <NuxtLink to="/organization"
                                      class="text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span class="material-symbols-rounded text-gray-500">badge</span>
                                <span class="flex-1 ml-3 whitespace-nowrap">Организация</span>
                            </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.user.can_activate)">
                          <NuxtLink to="/users"
                                    class="text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">group</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Пользователи</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.role.can_activate)">
                          <NuxtLink to="/roles"
                                    class="text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">format_list_bulleted</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Роли и права доступа</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.audit.can_activate)">
                          <NuxtLink to="/audit"
                                    class="text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">settings</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Аудит действий</span>
                          </NuxtLink>
                        </li>
                        <li v-if="authStore.hasPermission(allowedPermissionsEnum.system.can_activate)">
                          <NuxtLink to="/system"
                                    class="text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span class="material-symbols-rounded text-gray-500">settings</span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Управление системой</span>
                          </NuxtLink>
                        </li>
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64 min-h-screen h-full">
                <div class="p-4 mt-14">
                    <slot />
                </div>
            </div>
        </div>
        <div v-else class="h-screen flex flex-col items-center justify-center">
            <Spinner v-if="!authStore.error"/>
            <p class="font-bold mt-3" v-if="!authStore.error">Испекаем печеньки 🍪 ...</p>
            <img src="assets/images/err_tyan.png" alt="" class="w-64" v-if="authStore.error">
            <p class="text-center font-bold mt-3 w-64" v-if="authStore.error">Мы не смогли связаться с нашими серверами 😥</p>
            <button v-on:click="authStore.GetMe()" v-if="authStore.error" class="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Повторить</span>
            </button>
        </div>
    </div>
</template>

<script>
import {useAuthStore} from "~/stores/authStore";
import {allowedPermissionsEnum} from "~/api/interfaces/auth.interface";
import Spinner from "~/components/utils/Spinner.vue";

export default {
    name: "default",
    components: {Spinner},
    computed: {
        allowedPermissionsEnum() {
            return allowedPermissionsEnum
        }
    },
    async setup() {
        const authStore = useAuthStore();
        return {authStore}
    },
    mounted() {
        initFlowbite();
    },
    updated() {
        initFlowbite();
    }
}
</script>
