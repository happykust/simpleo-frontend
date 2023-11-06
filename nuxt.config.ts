/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  router: {
    options: {
      linkActiveClass: '!text-blue-500'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://backend.morio.io/api/v1',
      S3BaseURL: process.env.S3_BASE_URL || 'http://localhost:9001'
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    cssPath: '~/assets/css/input.css'
  },
  app: {
    baseURL: "/",
    rootTag: "cybezone",
    head: {
      link: [
        {rel:"preconnect", href:"https://fonts.googleapis.com"},
        {rel:"preconnect", href:"https://fonts.gstatic.com", crossorigin:"anonymous"},
        {rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"},
      ],
      script: [
        {src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"},
        {src: "https://unpkg.com/html5-qrcode"}
      ]
    },
  },
})
