<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <img :src="useRuntimeConfig().public.S3BaseURL + this.src" :alt="this.alt">
</template>

<script>

export default {
  props: {
    src: String,
    alt: String
  },
}
</script>