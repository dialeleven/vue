<template>
   <h1 class="app-header">VueTODO LIST</h1>
   {{ message }}
   <TodoList />
</template>


<script setup>
import TodoList from './components/TodoList.vue';

const message = '';
</script>

<!-- 
<script>
import TodoList from './components/TodoList.vue';

export default {
   data() {
      return {
         // message: 'test'
      }
   },

   components: {
      TodoList
   }
}
</script>
-->


<style>
</style>