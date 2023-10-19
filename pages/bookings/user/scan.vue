<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <NuxtLink to="/">
    <button type="button" class="border border-green-500 bg-green-700 text-white rounded p-2.5 mb-2">Назад</button>
  </NuxtLink>
  <h1 class="text-2xl font-bold mb-3">{{ status }}</h1>
  <StreamBarcodeReader class="w-72" @decode="onDecode"></StreamBarcodeReader>
</template>


<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";
</script>

<script>

import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import useAuthedFetch from "~/addons/useAuthedFetch";

const status = ref("Отсканируйте QR код");

export default {
  async setup() {
    const decodedText = ref("");
    const status = ref("Отсканируйте QR код");

    return {decodedText, status}
  },
  methods: {
    async onDecode(text) {
      this.status = "Рассматриваем баги..."
      this.status = await useAuthedFetch("/booking/qr", {
        method: "POST",
        body: JSON.parse(text)
      })
    }
  }
}

</script>

<style scoped>

</style>