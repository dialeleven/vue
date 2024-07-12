<script>
export default {
  data() {
    return {
      message: 'This is some text'
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
  <food-item food-name="Apples"/>
  <food-item food-name="Pizza"/>
  <food-item food-name="Rice" />
</template>

<style>
#app > div {
  border: dashed black 1px;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  background-color: lightgreen;
}

#app > div:hover {
  cursor: pointer;
}
</style>