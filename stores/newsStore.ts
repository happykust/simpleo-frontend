/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {defineStore} from "pinia";
import {INewsStore} from "~/stores/interfaces/INewsStore";
import repositories from "~/api/repositories";
import {INews, INewsCreate} from "~/api/interfaces/news.interface";

const NewsRepository = repositories.news;

export const useNewsStore = defineStore('news', {
  state: (): INewsStore => ({
    news: null,
    error: null,
    loading: false,
  }),

  actions: {
    async GetNews() {
      this.error = null;
      this.loading = true;
      const {data, error} = await NewsRepository.getAllNews();

      if (error != null) {
        this.error = error;
      }

      this.news = data.reverse();
      this.loading = false;
    },
    async CreateNews(newsData: INewsCreate) {
      this.error = null;
      this.loading = true;
      const {data, error} = await NewsRepository.createNews(newsData);

      if (error != null) {
        this.error = error;
      }

      this.loading = false;
    }
  }
})