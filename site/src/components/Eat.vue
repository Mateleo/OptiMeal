<script setup lang="ts">
import { useStore } from "@/stores/store";
import Header from "./Header.vue";
import Progress from "./Progress.vue";
const store = useStore();

const weekname = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const teenNormal = {
  Calories: 2700,
  proteines: 101,
  glucide: 280,
  lipide: 105,
};

const teenGain = {
  Calories: 3000,
  proteines: 121,
  glucide: 280,
  lipide: 105,
};

const teenLose = {
  Calories: 2000,
  proteines: 101,
  glucide: 200,
  lipide: 80,
};

const adultNormal = {
  Calories: 2200,
  proteines: 72,
  glucide: 220,
  lipide: 76,
};

const adultGain = {
  Calories: 2900,
  proteines: 125,
  glucide: 280,
  lipide: 105,
};
</script>
<template>
  <Header></Header>

  <main>
    <div class="flex flex-col m-auto w-[97%]">
      <div v-for="(day, index) in store.weekMenu" class="m-auto w-full sm:w-[70%]">
        <h1 class="font-bold text-2xl text-center mb-1">{{ weekname[index] }}</h1>
        <div class="bg-white rounded-lg md:rounded-xl p-2 md:p-4 mb-5 text-black">
          <div>
            <h2 class="text-xl font-semibold mb-2">Petit dejeuner</h2>
            <div class="flex">
              <button
                v-for="petitdej in store.getPetitDej(index)"
                class="bg-black/20 p-2 rounded-lg flex flex-col mr-1 md:mr-3 hover:bg-sky-400 transition-colors ease-in w-[100px] h-[190px] md:w-[200px] md:h-[270px]"
              >
              <div class=" h-[60px] w-full flex justify-center items-center">
                <h3 class="text-center text-xs md:font-normal font-bold w-full leading-3 md:leading-5 md:text-base">{{ petitdej.name }}</h3>
                </div>
                <div class="aspect-square w-[50px] md:w-[100px] m-auto mb-2">
                  <img :src="petitdej.Image" alt="" />
                </div>
                <Progress
                  class="mb-1"
                  :progress="petitdej.apports.Calories / store.weekApport[index].Calories"
                  :color="'violet'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="
                    petitdej.apports.proteines / store.weekApport[index].proteines
                  "
                  :color="'red'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="petitdej.apports.glucide / store.weekApport[index].glucide"
                  :color="'blue'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="petitdej.apports.lipide / store.weekApport[index].lipide"
                  :color="'yellow'"
                ></Progress>
              </button>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-2 mt-4">dejeuner</h2>
            <div class="flex">
              <button
                v-for="dejeuner in store.getDej(index)"
                class="bg-black/20 p-2 rounded-lg flex flex-col mr-1 md:mr-3 hover:bg-sky-400 transition-colors ease-in w-[100px] h-[190px] md:w-[200px] md:h-[270px]"
              >
              <div class=" h-[60px] w-full flex justify-center items-center">
                <h3 class="text-center text-xs md:font-normal font-bold w-full leading-3 md:leading-5 md:text-base">{{ dejeuner.name }}</h3>
                </div>
                <div class="aspect-square w-[50px] md:w-[120px] m-auto mb-2">
                  <img :src="dejeuner.Image" alt="" />
                </div>
                <Progress
                  class="mb-1"
                  :progress="dejeuner.apports.Calories / store.weekApport[index].Calories"
                  :color="'violet'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="
                    dejeuner.apports.proteines / store.weekApport[index].proteines
                  "
                  :color="'red'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="dejeuner.apports.glucide / store.weekApport[index].glucide"
                  :color="'blue'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="dejeuner.apports.lipide / store.weekApport[index].lipide"
                  :color="'yellow'"
                ></Progress>
              </button>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-2 mt-4">diner</h2>
            <div class="flex">
              <button
                v-for="diner in store.getDiner(index)"
                class="bg-black/20 p-2 rounded-lg flex flex-col mr-1 md:mr-3 hover:bg-sky-400 transition-colors ease-in w-[100px] h-[190px] md:w-[200px] md:h-[270px]"
              >
              <div class=" h-[60px] w-full flex justify-center items-center">
                <h3 class="text-center text-xs md:font-normal font-bold w-full leading-3 md:leading-5 md:text-base">{{ diner.name }}</h3>
                </div>
                <div class="aspect-square w-[50px] md:w-[100px] m-auto mb-2">
                  <img :src="diner.Image" alt="" />
                </div>
                <Progress
                  class="mb-1"
                  :progress="diner.apports.Calories / store.weekApport[index].Calories"
                  :color="'violet'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="diner.apports.proteines / store.weekApport[index].proteines"
                  :color="'red'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="diner.apports.glucide / store.weekApport[index].glucide"
                  :color="'blue'"
                ></Progress>
                <Progress
                  class="mb-1"
                  :progress="diner.apports.lipide / store.weekApport[index].lipide"
                  :color="'yellow'"
                ></Progress>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
