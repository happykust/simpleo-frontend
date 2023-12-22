/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import useAuthedFetch from "~/addons/useAuthedFetch";
import {
    INews,
    INewsCreate,
    INewsDeleteResponse
} from "~/api/interfaces/news.interface";

import {UUID} from "crypto";

export default {
    async getAllNews() {
        return useAuthedFetch<INews[]>("/news/", {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "GET",
            retry: 10,
        }).then((data: INews[]) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    },
    async createNews(news: INewsCreate) {
        return useAuthedFetch<INews>(`/news/`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "POST",
            body: news
        }).then((data: INews) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    },
    async deleteNews(news_uuid: UUID) {
        return useAuthedFetch<INewsDeleteResponse>(`/news/${news_uuid}`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "DELETE",
        }).then((data: INewsDeleteResponse) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    }
}