<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <Head>
    <Title>Мои брони | Cyberzone</Title>
  </Head>
  <h1 class="text-2xl font-bold mb-3">Мои бронирования</h1>
  <NuxtLink to="/bookings/user/scan">
    <button type="button" class="border border-green-500 bg-green-700 text-white rounded p-2.5 mb-2">Забронировать</button>
  </NuxtLink>
  <div v-if="bookings">
    <div v-for="booking in bookings" class="border border-gray-700 rounded w-64 bg-white p-3">
      <h2 class="text-xl font-bold">Бронь {{ targets.filter(value => value.id === booking.target)[0].name }}</h2>
      <h3 class>Статус: {{ booking.status }}</h3>
    </div>
  </div>
  <div v-else>

  </div>
</template>

<script>
import useAuthedFetch from "~/addons/useAuthedFetch";

export default {
  name: "MyBookings",
  async setup() {
    const bookings = await useAuthedFetch('/booking/my');
    console.log(bookings);
    const targets = [];
    for (let booking in bookings) {
      if (bookings[booking].target_type === "DEVICE") {
        targets.push(await useAuthedFetch(`/device/${bookings[booking].target}`))
      } else {
        targets.push(await useAuthedFetch(`/board_game/${bookings[booking].target}`))
      }
    }
    return {bookings, targets}
  },
  methods: {
    activate(booking_uuid) {

    }
  }
}

</script>

<style scoped>

</style>