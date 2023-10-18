/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {ofetch} from "ofetch";
import {IAuthTokens} from "~/api/interfaces/auth.interface";

async function refreshAccessToken() {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();
    const refresh_token = localStorage.getItem("_ihywbd");
    return await ofetch<IAuthTokens>("/login/refresh-token", {
        baseURL: config.public.baseURL,
        method: "POST",
        body: {"refresh_token": refresh_token},
        async onResponseError({response}) {
            console.log("[Auth] Refresh token is invalid. Forcing logout...");
            await authStore.Logout();
            window.location.reload();
            return Promise.reject(response);
        }
    });
}

const useAuthedFetch = async <T>(url: string, options: object = {}) => {
    let new_resp = null;
    const resp = await $fetch<T>(url, {
        ...options,
        baseURL: useRuntimeConfig().public.baseURL,
        headers: {"Authorization": `Bearer ${localStorage.getItem("_silya")}`},
        onResponse: async (context) => {
            if (context.response.status == 200) return ;
            if (context.response.status != 401) {
                return Promise.reject(context.error);
            }

            await refreshAccessToken().then(async (data) => {
                const authStore = useAuthStore();
                await authStore.setAuthTokens(data);
            });

            const res: any = await useAuthedFetch(url, {
                baseURL: useRuntimeConfig().public.baseURL,
                headers: {"Authorization": `Bearer ${localStorage.getItem("_silya")}`},
            });
            context.response = res;
            new_resp = res;
        },
    });
    return new_resp?new_resp:resp;
};

export default useAuthedFetch