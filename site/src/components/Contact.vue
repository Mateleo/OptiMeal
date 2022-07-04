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
        <img class="max-w-[300px]" src="../assets/Pics/Theo.png" alt="" />
      </div>
      <p>adam-myn.handouchi@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Marc Bernard</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/Marc.jpg" alt="" />
      </div>
      <p>marc.bernard@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Nicolas Blanchard</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/nico.png" alt="" />
      </div>
      <p>nicolas.blanchard19@efrei.net</p>
    </div>
    <div class="flex flex-col">
      <h2 class="text-center">Aliette Vanié</h2>
      <div class="m-auto">
        <img class="max-w-[300px]" src="../assets/Pics/aliette.png" alt="" />
      </div>
      <p>aliette.vanié@efrei.net</p>
    </div>
  </main>
</template>
