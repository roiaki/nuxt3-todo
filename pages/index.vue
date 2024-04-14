<template>
  index<br>
  <NuxtLink to="/about">about</NuxtLink>
  <BaseHeader />
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  console.log(`コンポーネントがマウントされました。`)
})

onBeforeMount(() => {
  console.log("before mount");
});

onMounted(() => {
  console.log("mounted");
});

onUnmounted(() => {
  console.log("unmounted")
});
</script>

<style>

</style>