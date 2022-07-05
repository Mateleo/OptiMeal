<script setup lang="ts"></script>

<template>
  <div class="fixed top-0 left-0 right-0 z-10">
    <div
      class="pt-1 flex flex-wrap md:flex-nowrap justify-between mb-3 md:pr-4 md:pl-3 px-1 bg-gradient-to-r from-[#414345] to-[#232526]"
    >
      <div class="flex m-auto">
        <router-link
          to="/"
          class="font-dmserif text-5xl w-full text-center md:w-auto md:text-left flex"
          >
          <div class="w-[50px] h-[50px] mr-2"><img src="../assets/LOGO.png" alt=""></div>
          OptiMeal</router-link
        >
      </div>
      <nav
        class="self-center flex flex-wrap justify-center md:justify-end text-sm sm:text-xl w-full grow"
      >
        <router-link to="/eat" class="md:mr-2 mr-1 link-underline">
          EAT</router-link>
        <router-link to="/contact" class="md:mx-2 mx-1 link-underline"
          >CONTACT</router-link
        >
        <router-link to="/mypanel" class="md:ml-2 ml-1 link-underline"
          >ACCOUNT</router-link
        >
      </nav>
    </div>
  </div>
  <div class="md:h-[70px] h-[90px]"></div>
</template>
<style>
.link-underline {
  border-bottom-width: 0;
  background-image: linear-gradient(transparent, transparent),
    linear-gradient(rgb(238, 255, 0), rgb(238, 255, 0));
  background-size: 0 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
}

.link-underline:hover {
  background-size: 100% 3px;
  background-position: 0 100%;
}
</style>
