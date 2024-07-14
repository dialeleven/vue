<script>
export default {
   data() {
      return {
         message: 'This is some text'
      }
   },
   methods: {
      alertUser(text) {
         alert('Hello ' + text);}
   }
}
</script>

<template>
   <h1>Food</h1>
   <button v-on:click="alertUser('World!')">Click me</button>
   <div id="wrapper">
      <food-item 
         food-name="Apples"
         food-desc="Apples are a type of fruit that grow on trees."
         v-bind:is-favorite="true"/>
      <food-item 
         food-name="Pizza"
         food-desc="Pizza has a bread base with tomato sauce, cheese, and toppings on top."
         v-bind:is-favorite="false"/>
      <food-item 
         food-name="Rice"
         v-bind:is-favorite="false" />
   </div>
</template>

<style>
#wrapper {
   display: flex;
   flex-wrap: wrap;
}

#wrapper > div {
   border: dashed black 1px;
   margin: 10px;
   padding: 10px;
   background-color: lightgreen;
}
</style>