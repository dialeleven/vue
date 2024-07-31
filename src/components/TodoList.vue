<template>
   <div class="container">
      <div class="header">
         <button class="top-add-todo-button" @click="handleShow('Add', null)">Add Todo</button>

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
         <draggable v-model="tasks" item-key="id" @end="onEnd" handle=".drag-handle">
            <!--
            TodoListItem comments:
            
            Function: v-if checks if the element (current task) exists in the filteredTasks array. 
            The .some method returns true if at least one task in filteredTasks has an id matching element.id. 
            If true, the TodoListItem is rendered; otherwise, it is not.

            `task.id === element.id`: A comparison that checks if the id of the task 
            in filteredTasks matches the id of the current element.
            -->
            <template #item="{ element }">
               <TodoListItem
                  v-if="filteredTasks.some(task => task.id === element.id)"
                  :key="element.id"
                  :task="element"
                  @delete-task="deleteTask"
                  @toggle-completed="toggleCompleted"
                  @edit-task="editTask"
                  @add-task="addTask"
                  @edit-item-modal="editItemModal" />
            </template>
         </draggable>
         
         <!-- Original TodoListItem component without draggable -->
         <!-- 
         <TodoListItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @delete-task="deleteTask"
            @toggle-completed="toggleCompleted"
            @edit-task="editTask"
            @add-task="addTask"
            @edit-item-modal="editItemModal" />
         -->

         <!-- <TodoListItem v-for="task in tasks" :key="task.id" :task="task" /> -->
          
         <!--
         :task="task"
            This binds the current task object in the iteration to the task prop of <TodoListItem>. 
            Each instance of <TodoListItem> will receive a task prop with the corresponding task 
            object from the tasks array to handle clicking the edit button.
         -->
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
         
         <div class="footerButtonContainer">
            <div class="footerButtonContainerLeft">
               <button class="add-todo-button-footer" @click="handleShow('Add', null)">Add Todo</button>
            </div>
            <div class="footerButtonContainerRight">
               <button class="load-default-todos-button" value="Load Default Tasks" @click="loadDefaultTasks($event)">
                  Load Default Tasks (Reset LocalStorage)
               </button>
            </div>
         </div>
      </div>
      
      <TodoListModal
         v-show="showModal"
         :addEditMode="addEditMode"
         :task="currentTask"
         :tasks="tasks"
         :showModal="showModal"
         @add-task="addTask"
         @edit-task="editTask"
         @toggle-modal="toggleModalVisibility"
      />
      <!--
      <TodoAddItemModal
            showModal={showModal}
            addEditMode={addEditMode}
            addTask={addTask}
            updateTask={updateTask}
            currentTaskId={currentTaskId}
            toggleModalVisibility={toggleModalVisibility}
      />
      -->
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import draggable from 'vuedraggable';

import TodoListItem from './TodoListItem.vue';
import TodoListHero from './TodoListHero.vue';
import TodoListModal from './TodoListModal.vue';

// Data properties
const tasks = ref([]);
const showModal = ref(false);
const currentTask = ref(null);
const filterType = ref('tasks-all');
const addEditMode = ref('Add');
const drag = ref(false);

// Computed properties
const filteredTasks = computed(() => {
   switch (filterType.value) {
     case 'tasks-checked':
        return tasks.value.filter(task => task.completed);
     case 'tasks-unchecked':
        return tasks.value.filter(task => !task.completed);
     default:
        return tasks.value;
   }
});

const completedTasks = computed(() => {
   return tasks.value.filter(task => task.completed).length;
});

const totalTasks = computed(() => {
   return tasks.value.length;
});

// Methods
const onEnd = (event) => {
   const updatedTasksList = JSON.stringify(tasks.value);
   localStorage.setItem('tasks', updatedTasksList);
   console.log('Drag ended:', event);
};

const toggleCompleted = (id) => {
   tasks.value = tasks.value.map(task => {
     if (task.id === id) {
        return { ...task, completed: !task.completed };
     } else {
        return task;
     }
   });

   const updatedTasksList = JSON.stringify(tasks.value);
   localStorage.setItem('tasks', updatedTasksList);
};

const handleShow = (mode, task) => {
   addEditMode.value = mode;
   currentTask.value = task;
   showModal.value = true;
};

const toggleModalVisibility = () => {
   showModal.value = !showModal.value;
   if (!showModal.value) {
     currentTask.value = null;
   }
};

const handleFilterChange = (e) => {
   filterType.value = e.target.value;
};

const addTask = (newTask) => {
   tasks.value.push(newTask);
   const updatedTasksList = JSON.stringify(tasks.value);
   localStorage.setItem('tasks', updatedTasksList);
};

const editItemModal = (currentTaskId) => {
   const task = tasks.value.find(task => task.id === currentTaskId);
   if (task) {
     handleShow('Edit', task);
   } else {
     console.error(`Task with id ${currentTaskId} not found`);
   }
};

const editTask = (currentTaskId, updatedTask) => {
   const index = tasks.value.findIndex(task => task.id === currentTaskId);
   if (index !== -1) {
     tasks.value.splice(index, 1, updatedTask);
   }
   const updatedTasksList = JSON.stringify(tasks.value);
   localStorage.setItem('tasks', updatedTasksList);
};

const deleteTask = (currentTaskId) => {
   tasks.value = tasks.value.filter(task => task.id !== currentTaskId);
   const updatedTasksList = JSON.stringify(tasks.value);
   localStorage.setItem('tasks', updatedTasksList);
};

const loadDefaultTasks = (event = null) => {
   if (event && !confirm('Load default tasks?')) { return false; }

   const defaultTasks = [
     { id: 1, text: "Edit item   - watch out for long text lines that wrap", duedate: "2099-01-01 12:00", completed: true, position: 1 },
     { id: 2, text: "Add todo item", duedate: "", completed: true, position: 2 },
     { id: 3, text: "Delete todo item", duedate: "", completed: true, position: 3 },
     { id: 4, text: "localStorage save/read of todo items", duedate: "", completed: true, position: 4 },
     { id: 5, text: "Drag and drop reordering of todo items", duedate: "2024-08-01 12:00", completed: false, position: 5 }
   ];

   const updatedTasksList = JSON.stringify(defaultTasks);
   localStorage.setItem('tasks', updatedTasksList);
   tasks.value = defaultTasks;

    return defaultTasks;
};

// Lifecycle hooks
onMounted(() => {
   const storedTasks = localStorage.getItem('tasks');
   if (storedTasks) {
     tasks.value = JSON.parse(storedTasks);
   } else {
     tasks.value = loadDefaultTasks();
   }
});
</script>


<!-- regular <script> version -->
<!--  
<script>
import draggable from 'vuedraggable';

import TodoListItem from './TodoListItem.vue';
import TodoListHero from './TodoListHero.vue';
import TodoListModal from './TodoListModal.vue';

export default {
   name: 'TodoList',

   // register our components
   components: {
      draggable, // for vuedraggable
      TodoListItem, 
      TodoListHero,
      TodoListModal
   },

   // props are ready only
   props: {
   },
   
   data() {
      return {
         drag: false, // for vuedraggable
         tasks: [],
         showModal: false,
         currentTask: null,
         filterType: 'tasks-all', // default filter type
         addEditMode: 'Add',
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
      // computed property to filter tasks
      filteredTasks() {
         // console.log('filteredTasks, filterType: ' + this.filterType);

         switch (this.filterType) {
            case 'tasks-checked':
               return this.tasks.filter(task => task.completed);

            case 'tasks-unchecked':
               return this.tasks.filter(task => !task.completed);

            default:
               return this.tasks;
         }
      },
      
      // computed property to return the number of completed tasks
      completedTasks() {
         return this.tasks.filter(task => task.completed).length
      },
      
      // computed property to return the total number of tasks
      totalTasks() {
         return this.tasks.length;
      },
   },
   
   // mounted lifecycle hook happens after the Vue component is mounted to the DOM
   mounted() {
      const storedTasks = localStorage.getItem('tasks');

      // load tasks from localStorage if it exists
      if (storedTasks) {
         this.tasks = JSON.parse(storedTasks);
      }
      // load default tasks
      else {
         this.tasks = this.loadDefaultTasks();
      }
   },

   // Methods are functions that belong to the vue instance under the 'methods' property
   // Tip: We need to write `this.` as prefix to refer to a data property from inside a method.
   methods: {
      // drag and drop end event handler
      onEnd(event) {
         // convert tasks array to JSON string
         const updatedTasksList = JSON.stringify(this.tasks);

         // save reordered tasks to localStorage
         localStorage.setItem('tasks', updatedTasksList);
         console.log('Drag ended:', event);
      },

      // toggle the completion status of a todo item
      toggleCompleted(id) {
         //alert('toggleCompleted in TodoList.vue, id: ' + id);

         this.tasks = this.tasks.map(task => {
            if (task.id === id) {
               return { ...task, completed: !task.completed };
            } else {
               return task;
            }
         });

         const updatedTasksList = JSON.stringify(this.tasks);
         localStorage.setItem('tasks', updatedTasksList);
      },

      // display the add/edit todo modal window
      handleShow(mode, task) {
         // console.log('handleShow in TodoList.vue, mode: ' + mode + ', task: ', task);
         
         this.addEditMode = mode; // adjust 'Add' or 'Edit' label in modal
         this.currentTask = task; // pass task object to modal
         this.showModal = true;   //
      },

      // toggle modal window visibility
      toggleModalVisibility() {
         // alert('toggleModalVisibility from TodoList.vue');
         this.showModal = !this.showModal;

         // clear currentTask if modal is closed
         if (!this.showModal) {
            // alert('clearing currentTask in TodoList.vue');
            
            // Reset currentTask to null if modal is closed to prevent blank form input values
            // on multiple edits on the same task
            this.currentTask = null;
         }
      },

      // filter tasks based on the filter type
      handleFilterChange(e) {
         console.log('handleFilterChange, event value: ' + e.target.value);

         this.filterType = e.target.value;
      },

      // add a new task to the tasks array
      addTask(newTask) {
         //alert('addTask, event value: ' + e.target.value);
         this.tasks.push(newTask);

         const updatedTasksList = JSON.stringify(this.tasks);
         localStorage.setItem('tasks', updatedTasksList);
      },

      // display the edit task modal for the selected task
      editItemModal(currentTaskId, addEditMode) {
         //alert('editItemModal in TodoList.vue. Task id: ' + currentTaskId);
         
         const task = this.tasks.find(task => task.id === currentTaskId);

         if (task) {
            this.handleShow('Edit', task);
         } else {
            console.error(`Task with id ${currentTaskId} not found`);
         }
      },

      // update a task in the tasks array
      editTask(currentTaskId, updatedTask) {
         // console.log(updatedTask);

         // find the index of the task to be updated
         const index = this.tasks.findIndex(task => task.id === currentTaskId);

         // if the task is found, update it with the updatedTask object
         if (index !== -1) {
            this.tasks.splice(index, 1, updatedTask);
         }

         // update localStorage after editing item
         const updatedTasksList = JSON.stringify(this.tasks);
         localStorage.setItem('tasks', updatedTasksList);
      },

      // delete a task from the tasks array
      deleteTask(currentTaskId) {
         // alert('deleteTask in TodoList.vue. Task id: ');
         this.tasks = this.tasks.filter(task => task.id !== currentTaskId);

         // update localStorage after deleting item (convert tasks array to JSON string)
         const updatedTasksList = JSON.stringify(this.tasks.filter(task => task.id !== currentTaskId));
         localStorage.setItem('tasks', updatedTasksList);
      },

      // load default tasks
      loadDefaultTasks(event = null) {
         /*
         !!! WARNING !!! Outputting the console.log output breaks the default loading of tasks on
         initial page load in a new browser session where there is no saved localStorage data.
         */
         // console.log('loadDefaultTasks, event value: ' + e.target.value);
         
         // Confirm if the user wants to load default tasks. 
         // If the event is not defined, the app is being loaded for the first time.
         if (event && !confirm('Load default tasks?')) { return false; }

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
               text: "Add todo item",
               duedate: "",
               completed: true,
               position: 2
            },
            {
               id: 3,
               text: "Delete todo item",
               duedate: "",
               completed: true,
               position: 3
            },
            {
               id: 4,
               text: "localStorage save/read of todo items",
               duedate: "",
               completed: true,
               position: 4
            },
            {
               id: 5,
               text: "Drag and drop reordering of todo items",
               duedate: "2024-08-01 12:00",
               completed: false,
               position: 5
            }
         ];

         // store updated tasks in local storage converting the tasks array of objects to a JSON string
         const updatedTasksList = JSON.stringify(defaultTasks);
         localStorage.setItem('tasks', updatedTasksList);
         
         // Update tasks array with default tasks array, needed for updating the tasks array
         // after modifying the tasks lists and wanting to load default tasks. If we do not,
         // then the tasks list will not display the default tasks.
         this.tasks = defaultTasks;

         return defaultTasks;
      }
   }
};
</script>
-->


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