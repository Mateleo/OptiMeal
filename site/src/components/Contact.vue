<script lang="ts" setup>
import Header from "./Header.vue";
</script>

<template>
  <Header></Header>
  <h1 class="w-full text-center text-4xl font-bold">Our Team</h1>
  <main class="grid lg:grid-cols-2 gap-8 w-[90%] sm:w-[70%] m-auto text-center">
    <div class="flex flex-col">
      <h2 class="text-center">Matéo Dominguez</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/Matéo.png" alt="" />
      </div>
      <p>mateo.dominguez@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Adam-Myn Handouchi</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/Adam.png" alt="" />
      </div>
      <p>adam-myn.handouchi@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Rémy Ricochin</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/remy.png" alt="" />
      </div>
      <p>remy.ricochin@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Corentin Henrion</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/corentin.jpg" alt="" />
      </div>
      <p>corentin.henrion@efrei.net</p>
    </div>
  </main>
</template>
