<template>
   <div class="container" @keydown.esc="handleClose">
      <div class="header">
         <button class="top-add-todo-button" @click="handleShow">Add Todo</button>

         <TodoListHero :completedTasks="completedTasks" :totalTasks="totalTasks" />

         <div class="filter-container">
            <select class="filter-select" @change="handleFilterChange($event)">
               <option value="tasks-all">All</option>
               <option value="tasks-checked">Checked</option>
               <option value="tasks-unchecked">Unchecked</option>
            </select>
         </div>
      </div>
      
      <div class="todo-list">
         <!--
         :task="task"
            This binds the current task object in the iteration to the task prop of <TodoListItem>. 
            Each instance of <TodoListItem> will receive a task prop with the corresponding task 
            object from the tasks array.
         -->
         <TodoListItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @delete-task="deleteTask"
            @edit-task="editTask"
            @add-task="addTask" />
         <!-- <TodoListItem v-for="task in tasks" :key="task.id" :task="task" /> -->
         
         <!--
         * Original React component code
         <TodoListItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompletedAnonFunc}
            updateTask={updateTask}
            editItemModal={editItemModal} />
         -->


         <!--
         <ol>
            <li v-for="task in tasks" v-bind:key="task.id">
               {{ task.id }} {{ task.text }} {{ task.duedate }} {{ task.completed }} {{ task.position }}
            </li>
         </ol>
         -->
         
         <div class="footerButtonContainer">
            <div class="footerButtonContainerLeft">
               <button class="add-todo-button-footer" @click="handleShow">Add Todo</button>
            </div>
            <div class="footerButtonContainerRight">
               <button class="load-default-todos-button" value="Load" @click="loadDefaultTasks($event)">
                  Load Default Tasks (Reset LocalStorage)
               </button>
            </div>
         </div>
      </div>
      
      <TodoListModal
         v-show="showModal"
         :handleClose="handleClose"
         :addEditMode="addEditMode"
         @toggle-modal="emitFromModalClose"
      />
      <!--
      <TodoListModalReact
         showModal={showModal}
         @handleClose="handleClose"
         @addTask="addTask"
         @updateTask="updateTask"
         :addEditMode="addEditMode"
         :currentTaskId="currentTaskId"
      />
      -->
   </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue';
import TodoListHero from './TodoListHero.vue';
import TodoListModal from './TodoListModal.vue';

export default {
   name: 'TodoList',

   // register our components
   components: {
      TodoListItem, 
      TodoListHero,
      TodoListModal
   },

   props: {
      // pass data (default value of 'Add'to our TodoListModal component via props
      addEditMode: {
         type: String,
         required: false,
         default: 'Add'
      }
   },
   
   data() {
      return {
         tasks: [],
         showModal: false,
         filterType: 'tasks-all', // default filter type
      }
   },

   /*
   Computed properties are:
      - like data properties, except they depend on other properties.

      - written like methods, but they do not accept any input arguments.

      - updated automatically when a dependency changes, while methods are 
        called on when something happens like with event handling for example

      - used when outputting something that depends on something else
   */
   computed: {
      filteredTasks() {
         switch (this.filterType) {
            case 'tasks-checked':
               return this.tasks.filter(task => task.completed);

            case 'tasks-unchecked':
               return this.tasks.filter(task => !task.completed);

            default:
               return this.tasks;
         }
      },
      
      completedTasks() {
         return this.tasks.filter(task => task.completed).length
      },
      
      totalTasks() {
         return this.tasks.length;
      },
   },
   
   // mounted lifecycle hook happens after the Vue component is mounted to the DOM
   mounted() {
      // initialize tasks array from local storage or default tasks array
      this.loadDefaultTasks();
   },

   // Methods are functions that belong to the vue instance under the 'methods' property
   // Tip: We need to write `this.` as prefix to refer to a data property from inside a method.
   methods: {
      // receive emit from TodoListModal
      emitFromModalClose() {
         // alert('receiveEmit in TodoList.vue');
         this.showModal = false;
      },

      // display the add/edit todo modal window
      handleShow() {
         this.showModal = true;
         //alert('handleShow');
      },

      // hide modal window
      handleClose() {
         alert('handleClose from TodoList.vue');

         // TODO: clear out text input and date/time input
         this.showModal = false;
      },

      handleKeyPress() {
         this.showModal = false;
         //alert('handleKeyPress');
      },

      handleFilterChange(e) {
         
         this.filterType = e.target.value;
         
         //alert('handleFilterChange, event value: ' + e.target.value);
      },

      addTask(e) {
         //alert('addTask, event value: ' + e.target.value);
      },

      editTask(currentTaskId) {
         alert('editTask in TodoList.vue. Task id: ' + currentTaskId);
      },

      deleteTask(currentTaskId) {
         // alert('deleteTask in TodoList.vue. Task id: ');
         this.tasks = this.tasks.filter(task => task.id !== currentTaskId);
         //alert('deleteTask, event value: ' + e.target.value);
      },

      loadDefaultTasks(e) {
         //alert('loadDefaultTasks, event value: ' + e.target.value);

         const defaultTasks = [
            {
               id: 1,
               text: "Edit item  - watch out for long text lines that wrap",
               duedate: "2099-01-01 12:00",
               completed: true,
               position: 1
            },
            {
               id: 2,
               text: "Filter tasks menu logic",
               duedate: "2024-12-31 09:00",
               completed: true,
               position: 2
            },
            {
               id: 3,
               text: "Add todo item",
               duedate: "",
               completed: false,
               position: 3
            },
            {
               id: 4,
               text: "Edit todo item",
               duedate: "",
               completed: false,
               position: 4
            },
            {
               id: 5,
               text: "Delete todo item",
               duedate: "",
               completed: true,
               position: 5
            },
            {
               id: 6,
               text: "localStorage save/read of todo items",
               duedate: "",
               completed: false,
               position: 6
            }
         ];

         const savedTasks = JSON.parse(localStorage.getItem('tasks'));

         if (savedTasks && savedTasks.length) {
            this.tasks = savedTasks;
         } else {
            this.tasks = defaultTasks;
         }
         // this.totalTasks = this.tasks.length;
         // this.completedTasks = this.tasks.filter(task => task.completed).length;
      }
   }
};
</script>

<style>
/* App.css */
body {
   font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
   background-color: #cce8f3;
}

textarea, input {
   font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

input[type="checkbox"] {
   transform: scale(1.5);
   cursor: pointer;
}


.container {
   width: 450px;
   /* border: 3px solid #000; */
   margin: auto; /* center the container horizontally */
}

.header {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-bottom: 10px;
   margin: 0 auto;
   /* border: 3px solid #be02f2; */
}

.todo-list {
   margin: 0 auto;
   padding-bottom: 30px;
}


.todo-item {
   display: flex;
   align-items: center;
   padding: 12px;
   background-color: #f8f9fa;
   color: #333;
   border-radius: 4px;
   margin-bottom: 8px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }


.top-add-todo-button {
   background-color: #007bff;
   color: white;
   border: none;
   padding: 8px 10px;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.3s ease;
}

.filter-select {
   padding: 7px 0 7px 10px;
   border-radius: 4px;
   border: 1px solid #ccc;
   margin-left: auto;
}


h1 {
   max-width: 400px;
   margin: 0 auto;
   text-align: center;
   color: #555;
   margin-top: 15px;
   margin-bottom: 15px;
}

.edit-input {
   text-align: left;
   width: 90%;
   border-radius: 3px;
}

.todo-text {
   /* cursor: pointer; */
}
 

 /* Drag handle for dnd kit sortable */
.drag-handle {
   cursor: grab;
   padding-right: 5px;
   margin-right: 5px;
   touch-action: none;
}

/* Increase drag handle size on mobile devices */
@media (max-width: 600px) {
   .drag-handle {
     padding-right: 15px; /* Increase padding for easier touch interaction */
     margin-right: 10px; /* Increase margin if needed */
     font-size: 1.5rem; /* Increase font size if there's text inside the handle */
     touch-action: none;
   }
 }
 
.todo-content {
   display: flex;
   align-items: center;
   width: 100%;
}

.todo-content:has(:checked) .todo-text {
   color: #666;
   text-decoration: line-through;
}

.todo-content {
   display: flex;
   justify-content: space-between;
   width: 100%;
}

.todo-text-container {
   display: flex;
   flex-direction: column;
   padding: 0 5px 0 0;
}

.due-date {
   padding-top: 2px;
   font-size: 0.85rem;
   color: #888;
}

/* left algin todo items */
.todo-item div {
   flex: 1;
   margin: 0;
}
 
.todo-item div.completed {
   text-decoration: line-through;
   color: #888;
}

.todo-item .edit-button {
   background-color: #888;
   color: white;
   border: none;
   padding: 6px 12px;
   border-radius: 4px;
   margin-right: 5px;
   cursor: pointer;
   transition: background-color 0.1s ease;
}

.todo-item .edit-button:hover {
   background-color: #007cf9bf;
}
 
.todo-item .delete-button {
   background-color: #888;
   color: white;
   border: none;
   padding: 6px 12px;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.1s ease;
}
 
.todo-item .delete-button:hover {
   background-color: #af2432;
}

.todo-item input[type="checkbox"] {
   margin-right: 12px;
}

.new-todo-input {
   width: 100%;
   max-width: 400px;
   margin: 0 auto;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
   margin-bottom: 20px;
}


.footerButtonContainer {
   /* border: 1px solid #000; */
   display: flex;
   justify-content: space-between;
    /* Ensure the container takes the full width */
}
 
.add-todo-button-footer, .load-default-todos-button {
   padding: 10px;
   margin: 0;
   box-sizing: border-box;
}
 
.footerButtonContainerLeft {
   display: flex;
   justify-content: flex-start;
}
 
.footerButtonContainerRight {
   display: flex;
   justify-content: flex-end;
}



.add-todo-button-footer {
   background-color: #007bff;
   color: white;
   border: none;
   padding: 8px 10px;
   margin: 2px 0 0 0;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.3s ease;
}

.load-default-todos-button {
   background-color: #730584;
   color: white;
   border: none;
   padding: 8px 10px;
   margin: 2px 0 0 10px;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.3s ease;
}
</style>