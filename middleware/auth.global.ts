/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (to.path != "/auth/login" && !authStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
  if (to.path == "/auth/login" && authStore.isLoggedIn) {
    return navigateTo("/");
  }
})