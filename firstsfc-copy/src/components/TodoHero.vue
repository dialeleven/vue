<template>
   <div className="todo-hero">
      <div className="todo-progress-text">Tasks Done:</div>
      <div className="todo-count">{{ completedTasks }} / {{ totalTasks }}</div>
   </div>
</template>

<script>
export default {
   name: 'TodoHero',
   // components: {
   //    TodoItem
   // },

   props: {
      totalTasks: {
         type: Number,
         required: true
      },

      completedTasks: {
         type: Number,
         required: true
      }
   },
   
   // Methods are functions that belong to the vue instance under the 'methods' property
   // Tip: We need to write `this.` as prefix to refer to a data property from inside a method.
   methods: {
   }
}
</script>

<style>
.todo-hero {
   display: flex;
   align-items: center;
   gap: 5px;
   padding: 0 10px;
 }
 
.todo-count {
   display: inline-block;
   padding: 5px 10px;
   background-color: #4caf50;
   color: white;
   border-radius: 18px;
   text-align: center;
   max-width: 150px; /* limit width for very large numbers */
   overflow: hidden; /* overflowed content is hidden */
   text-overflow: ellipsis; /* adds ellipses to truncated long text */
 }

.todo-progress-text {
   font-size: 0.9rem;
   font-weight: bold;
   color: #777;
   text-align: center;
}
</style>