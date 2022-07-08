<script setup lang="ts">
import { useStore } from "@/stores/store";
import Header from "./Header.vue";
const store = useStore();
</script>
<template>
  <Header></Header>
  <div class="m-auto bg-white rounded-xl text-black flex flex-col p-4 w-[90%]">
    <h1 class="2xl font-bold text-center">Recette</h1>
    <p>{{store.getRecete($route.params.recettelink)}}</p>
  </div>
</template>
