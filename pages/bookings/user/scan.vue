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
  <div id="qrcode" class="w-72"></div>
</template>

<script>

import { ref } from "vue";
import useAuthedFetch from "~/addons/useAuthedFetch";

const status = ref("Отсканируйте QR код");

export default {
  async setup() {
    const decodedText = ref("");
    const status = ref("Отсканируйте QR код");

    return {decodedText, status}
  },
  mounted() {
    const html5QrcodeScanner = new Html5QrcodeScanner('qrcode', {
      rememberLastUsedCamera: false,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    });
    html5QrcodeScanner.render(this.onDecode);
  },
  methods: {
    async onDecode(text, _) {
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