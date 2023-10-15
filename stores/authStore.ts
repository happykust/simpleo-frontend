/*
 * Copyright (C) Cyberzone MIREA, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {defineStore} from "pinia";
import {IAuthStore, IEmployeeState} from "~/stores/interfaces/IAuthStore";
import {IAuthTokens, ILoginCredentials} from "~/api/interfaces/auth.interface";
import repositories from "~/api/repositories";

const AuthRepository = repositories.auth;

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore => ({
    employee: null,
    error: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: () => localStorage.getItem("_silya") != null && localStorage.getItem("_ihywbd") != null,
  },

  actions: {
    hasPermission(permission: string): boolean {
      if (!this.employee) return false;
      return this.employee.aggregated_permissions.includes(permission) || this.employee.is_superuser;
    },
    async Login(loginData: ILoginCredentials) {
      this.error = null;
      this.loading = true;
      const {data, error} = await AuthRepository.auth(loginData);

      if (error != null) {
        this.setAuthTokens(data.value);
        window.location.reload();
      }

      this.error = error.value?.data.detail;
      this.loading = false;
    },
    async Logout() {
      const refresh_token = localStorage.getItem("_ihywbd");
      if (refresh_token) {
        await AuthRepository.logout({refresh_token: refresh_token})
      }
      this.clearLocalStorage();
      window.location.reload();
    },
    async GetMe() {
      this.loading = true;
      this.error = null;
      const {data, error} = await AuthRepository.getMe();
      if (error != null) {
        this.error = error;
      }
      this.employee = data;
      this.loading = false;
    },
    async setAuthTokens(tokens: IAuthTokens | null) {
      if (tokens == null) return;
      localStorage.setItem("_silya", tokens.access_token)
      localStorage.setItem("_ihywbd", tokens.refresh_token)
    },
    clearLocalStorage() {
      localStorage.removeItem("_silya");
      localStorage.removeItem("_ihywbd");
    }
  },
})