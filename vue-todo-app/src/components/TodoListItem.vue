<template>
   <div class="todo-item">
      <span class="drag-handle">☰</span>
      <div class="todo-content">
         <input type="checkbox" v-model="task.completed" />
         <div class="todo-text-container">
            <div class="todo-text">
               {{task.text}}
            </div>
            <div class="due-date">{{task.duedate}}</div>
         </div>
         <button class="edit-button" @click="handleEdit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" alt="Edit">
               <title>Edit</title>
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
         </button>
         <button class="delete-button" @click="handleDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" alt="Delete">
               <title>Delete</title>
               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
         </button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'TodoListItem',
   // props: ['task', 'deleteTask', 'toggleCompleted', 'updateTask', 'editItemModal']

   props: {
      task: {
         type: Object,
         required: true
      }
   },

   mounted() {
      //alert('app mounted, task: ', this.task);
   },


   methods: {

      // function to toggle the completion status of a todo item
      handleChange() {
         this.toggleCompleted(this.task.id);
      },

      // confirm todo deletion and call deleteTask() if confirmed
      handleDelete() {
         if (window.confirm(`Delete todo: ${this.task.text}?`))
         {
            // alert('current task id: ' + this.task.id);
            this.$emit('delete-task', this.task.id);
         }
      },

      // user clicks the edit button to edit the todo item
      handleEdit() {
         // alert('editItemModal2, current task id: ' + this.task.id);
         // console.log(this.task.id);
         // console.log(this.task.text);
         // console.log(this.task.duedate);

         this.$emit('edit-task', this.task.id);
      }
   }
}
</script>

<style></style>

<!-- import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function TodoListItem({ task, deleteTask, toggleCompleted, updateTask, editItemModal }) {
   // useSortable hook for dnd kit 
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id,
   });

   // style for dnd kit
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   // function to toggle the completion status of a todo item
   function handleChange() {
      toggleCompleted(task.id);
   }

   // confirm todo deletion and call deleteTask() if confirmed
   function handleDelete() {
      if (window.confirm(`Delete todo: ${task.text}?`))
         deleteTask(task.id);
   }

   // user clicks the edit button to edit the todo item
   function editItemModal2() {
      //alert('hi');
      // console.log(task.id);
      // console.log(task.text);
      // console.log(task.duedate);
      // console.log('task in editItemModal2: ', task);
       console.log('task.id in editItemModal2: ', task.id);

      // call editItemModal() from TodoList.js, passing in the task object being edited
      editItemModal(task.id);
   }

   return ( -->