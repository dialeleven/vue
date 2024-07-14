<script>
export default {
   data() {
      return {
         message: 'This is some text'
      }
   },
   methods: {
   }
}
</script>

<template>
   <h1 className="app-header">TODO LIST</h1>
   {{ message }}
   <!-- this should be in kebab-case (e.g. '<todo-list />' instead of '<todoList />' because the naming
    convention for components in templates is to use kebab-case) -->
   <todo-list />
</template>

<style>
</style>