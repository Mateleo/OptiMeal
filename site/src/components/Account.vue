<script lang="ts" setup>
import Header from "./Header.vue";
import { useStore } from "@/stores/store";
import { ref } from "vue";
const store = useStore();

let age = ref();
let profile = ref();

age.value = store.getAge;
profile.value = store.getProfile;

function save() {
  store.updateUserProfile({
    _id: store.getUserId,
    age: age.value,
    profile: profile.value,
  });
}

function changeAge(ageName: any) {
  store.userData.age = ageName;
  age.value = ageName;
}

function changeProfile(ProfileName: any) {
  store.userData.profile = ProfileName;
  profile.value = ProfileName;
}

console.log(store.getProfile);
</script>
<template>
  <Header></Header>
  <main
    class="bg-white w-[95%] md:w-1/2 flex flex-col rounded-xl p-2 sm:p-5 text-black m-auto h-full"
  >
    <div class="flex m-auto mb-5">
      <div class="w-[50px] md:w-full mr-5">
        <img class="rounded-full" :src="store.getAvatar" alt="" />
      </div>
      <h1 class="text-3xl md:text-5xl m-auto">{{ store.getUsername }}</h1>
    </div>
    <div class="m-auto">
      <h2>My profile</h2>
      <div class="flex justify-center w-full">
        <button
          :class="store.getAge == 'teen' ? ['bg-sky-500'] : ['bg-sky-200']"
          @click="changeAge('teen')"
          class="grow px-4 py-2 font-bold text-white mr-4 hover:bg-sky-700 transition-colors ease-in rounded-sm"
        >
          TEEN
        </button>
        <button
          @click="changeAge('adult')"
          :class="store.getAge == 'adult' ? ['bg-green-600'] : ['bg-green-200']"
          class="grow px-4 py-2 font-bold text-white hover:bg-green-800 transition-colors ease-in rounded-sm"
        >
          ADULT
        </button>
      </div>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="flex flex-col">
          <h3>Weight gain</h3>
          <button
            @click="changeProfile('Gain')"
            :class="store.getProfile === 'Gain' ? ['bg-red-500'] : ['bg-red-200']"
            class="aspect-[2/3] rounded-lg hover:bg-red-700 transition-colors ease-in"
          >
            💪
          </button>
        </div>
        <div class="flex flex-col">
          <h3>Classic</h3>
          <button
            @click="changeProfile('Normal')"
            :class="store.getProfile === 'Normal' ? ['bg-gray-600'] : ['bg-gray-200']"
            class="aspect-[2/3] rounded-lg hover:bg-gray-700 transition-colors ease-in"
          >
            ✨
          </button>
        </div>
        <div class="flex flex-col">
          <h3>Weight loss</h3>
          <button
            @click="changeProfile('Lose')"
            :class="store.getProfile === 'Lose' ? ['bg-pink-600'] : ['bg-pink-200']"
            class="aspect-[2/3] rounded-lg hover:bg-pink-700 transition-colors ease-in"
          >
            ☁️
          </button>
        </div>
      </div>
      <div class="w-full flex">
        <button
          @click="save"
          class="w-full mt-5 bg-yellow-500 rounded-2xl p-3 font-bold text-2xl shadow-lg group hover:outline hover:outline-4 hover:outline-red-200 hover:bg-gradient-to-br hover: from-fuchsia-600 hover:to-orange-600 hover:text-white transition-all ease-in duration-75"
        >
          SAVE
        </button>
      </div>
    </div>
  </main>
</template>
