<!--
  - Copyright (C) Simpleo - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
    <div id="loading-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="text-center relative w-full max-w-md max-h-full text-white">
            <div class="relative grid grid-cols-1 justify-items-stretch gap-3">
                <Spinner class="justify-self-center" />
                <p class="animate-pulse">{{text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from "~/components/utils/Spinner.vue";

export default {
    name: "LoadingModal",
    components: {Spinner},
    data() {
        return {
            text: "",
            modal: null
        }
    },
    mounted() {
        this.modal = new Modal(document.getElementById(`loading-modal`), {
            closable: false,
        });
    },
    methods: {
        show(text = "") {
            this.text = text;
            this.modal.show();
        },
        hide() {
            this.modal.hide();
        },
        toggle() {
            this.modal.toggle();
        }
    }
}
</script>

<style scoped>

</style>