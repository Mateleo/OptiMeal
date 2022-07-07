<script setup lang="ts">
const props = withDefaults(defineProps<{ color: string; progress: number }>(), {
  color: "violet",
  progress: 0.4,
});

</script>

<template>
  <div class="bg-black/70 rounded-full w-full h-[10px]">
    <div class="rounded-full h-[10px]" :class="props.color" :style="{width:props.progress*100+'%'}"></div>
  </div>
</template>

<style scoped>


.yellow{
    background-color: yellow;

}
.red{
    background-color: red;
}
.green{
    background-color: green;
}
.blue{
    background-color: blue;
}
.violet{
    background-color: purple;
}
</style>
