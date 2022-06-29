<script lang="ts" setup>
import router from "@/router";
import { useStore } from "@/stores/store";
import Header from "./Header.vue";
const store = useStore();

function nextStep() {
  console.log(store.getUsername);
  if (!store.getUsername) {
    router.push("login")
  } else {
    router.push("mypanel")
  }
}
store.fetchProfile();
</script>
<template>
  <Header></Header>
  <main class="text-4xl mt-5 text-center flex flex-wrap w-[100%] sm:w-[70%] m-auto">
    <div class="w-full text-center text-2xl sm:text-4xl font-bold my-5">
      The best recipes for the best dishes<br />
    </div>
    <div class="w-[80%] md:w-1/2 text-lg m-auto text-justify pr-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eaque labore quia
      sequi, velit excepturi, aut ea sapiente numquam eveniet delectus minima dolor nihil
      magnam minus unde fuga harum cumque officiis reprehenderit ipsam facilis maxime.
      Consectetur numquam in velit ullam!
    </div>
    <div class="hidden md:block w-1/2">
      <img class="m-auto" src="https://picsum.photos/600" alt="" />
    </div>
    <div class="w-full mt-10">
      <button
        @click="nextStep"
        class="m-auto bg-yellow-500 rounded-2xl p-3 font-bold text-2xl shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
      >
        Next Step
      </button>
    </div>
  </main>
</template>
