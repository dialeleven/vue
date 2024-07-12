<template>
   <div v-on:click="countClicks">
      <h2>{{ foodName }}</h2>
   </div>
</template>

<script>
export default {
   props: [
      'foodName'
   ]
}
</script>

<style>
</style>