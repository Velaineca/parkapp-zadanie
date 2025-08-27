<template>
  <section>
    <slot />
    <div v-if="globalError" class="fixed bottom-0 w-full bg-[#FF0000] text-white">
      <p>{{ globalError.message }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';

const globalError = ref<Error | null>(null);
const setGlobalError = (err: Error) => {
  globalError.value = err;
};

provide('globalError', globalError);
provide('setGlobalError', setGlobalError);
</script>

<style scoped></style>
