/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {defineStore} from "pinia";
import {IAuthStore} from "~/stores/interfaces/IAuthStore";
import {IAuthTokens, ILoginCredentials, IRegisterCredentials, IUser} from "~/api/interfaces/auth.interface";
import repositories from "~/api/repositories";

const AuthRepository = repositories.auth;

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore => ({
    user: null,
    error: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: () => localStorage.getItem("_silya") != null && localStorage.getItem("_ihywbd") != null,
  },

  actions: {
    async Login(loginData: ILoginCredentials) {
      this.error = null;
      this.loading = true;
      const {data, error} = await AuthRepository.auth(loginData);

      if (error != null) {
        await this.setAuthTokens(data.value);
        window.location.reload();
      }

      this.error = error?.value?.data.detail;
      this.loading = false;
    },
    async Register(registerData: IRegisterCredentials) {
      this.error = null;
      this.loading = true;
      const {data, error} = await AuthRepository.register(registerData);

      if (error === null) {
        await this.setAuthTokens(data.value);
        window.location.reload();
      }

      this.error = error?.value?.data.detail;
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
      this.user = data;
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