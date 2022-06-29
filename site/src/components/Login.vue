<script lang="ts" setup>
import { useStore } from "@/stores/store";
import Header from "./Header.vue";

const store = useStore();

function auth(connection: string) {
  window.location.href = store.auth(connection);
}
</script>
<template>
  <main class="flex flex-col h-full w-full absolute">
    <button
      @click="$router.push('/')"
      class="bg-yellow-400 px-4 py-2 rounded-xl text-2xl ml-4 mr-auto mt-4 hover:bg-yellow-600"
    >
      BACK
    </button>
    <div class="bg-white rounded-xl p-4 text-black m-auto">
      <h2 class="text-center mb-4 font-bold">Login or Register</h2>
      <button
        @click="auth('google')"
        class="px-2 py-4 shadow-black border-2 border-blue-500 rounded-sm hover:outline-blue-300 hover:bg-blue-400 shadow-lg group hover:outline hover:outline-4 transition-all ease-in duration-75"
      >
        Sign in with Google
      </button>
    </div>
  </main>
</template>
