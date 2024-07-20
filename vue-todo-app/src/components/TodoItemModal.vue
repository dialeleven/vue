<template>
   <div class="modal-backdrop">
      <div class="modal">
         <div class="modal-header">
            <h2>{{addEditMode}} Todo</h2>
            <button class="close-button" @click="handleClose">×</button>
         </div>
         <div class="modal-body">
            <input
               type="text"
               v-model="todoTextInput"
               value={text}
            />

            <div class="modal-date">
               <label>Due Date (Optional):</label>
               <input
                  type="datetime-local"
                  v-model="todoDueDateInput"
                  value={dateTime}
                  class="modal-date-time"
               />
            </div>
            <!-- 
            <input
               type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Enter todo item"
               onKeyDown={handleKeyPress}
               required
               autoFocus
            />

            <div class="modal-date">
               <label>Due Date (Optional):</label>
               <input
                  type="datetime-local"
                  value={dateTime}
                  class="modal-date-time"
                  onChange="{(e) => setDateTime(e.target.value)}
                  onKeyDown={handleKeyPress}"
               />
            </div>
             -->
         </div>
         <div class="modal-footer">
            <button class="modal-button" @click="handleSubmit" REACTonClick={handleSubmit}>{{addEditMode}}</button>
            <button class="modal-button-close" @click="handleClose">Close</button>
            <!-- {/* expression to conditionally render the 'New' button */} -->
            <!-- {
               isNewButtonHidden ? null : <button class="modal-button" onClick={() => setIsNewButtonHidden(true)}>New</button>
            } -->
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'TodoItemModal',
   // props: ['task', 'deleteTask', 'toggleCompleted', 'updateTask', 'editItemModal']

   data() {
      return {
         todoTextInput: null,
         todoDueDateInput: null
      }
   },

   props: {
      task: {
         type: Array,
         required: false
      },

      addEditMode: {
         type: String,
         required: true,
      }
   },

   mounted() {
      //alert('app mounted, task: ', this.task);
   },


   methods: {
      // function to toggle the completion status of a todo item
      handleClose() {
         // alert('handleClose from TodoItemModal.vue');
         
         // clear out text input and date/time input
         this.todoTextInput = null;
         this.todoDueDateInput = null;
         
         // this.$emit('handleClose');
         this.$emit('toggle-modal');

      },

      // user clicks the edit button to edit the todo item
      handleSubmit() {
         // alert('handleSubmit, addEditMode: ' + this.addEditMode + ', text: ' + this.todoTextInput + ', dateTime: ' + this.todoDueDateInput);

         switch (this.addEditMode) {
            case 'Edit':
               //alert('edit mode logic');
               let formattedDateTime = ''; // set to empty string to prevent error

               formattedDateTime = this.dateTime.replace("T", " ");
               
               updateTask(currentTaskId, text, formattedDateTime);
               handleClose(); // Close the modal after updating
               break;

            default:
               // if text is not empty, add the new task
               if (this.todoTextInput !== null)
               {
                  // alert(this.todoDueDateInput);

                  // if date/time is not null, replace the 'T' in the date/time with a space and set the date/time
                  if (this.todoDueDateInput !== null)
                  {
                     // replace the 'T' in the date/time with a space and set the date/time
                     const formattedDateTime = this.todoDueDateInput.replace("T", " ");
                     
                     this.todoDueDateInput = "";
                  }
                  // addTask({text, dateTime: formattedDateTime});       // Call the addTask function to add the new task
                  this.todoTextInput = "";         // Reset the text state to an empty string
                  this.handleClose();
               }
               else {
                  alert('Please enter some text.');
               }
         }

         // console.log(this.task.id);
         // console.log(this.task.text);
         // console.log(this.task.duedate);
         // console.log('task in editItemModal2: ', this.task);
         //this.editItemModal(this.task.id);
      }
   }
}
</script>


<style>
.modal-backdrop {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
}

.modal {
   background-color: #fff;
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   width: 300px;
   display: flex;
   flex-direction: column;
}

.modal-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 10px;
}

.modal-header h2 {
   margin: 0;
}

.close-button {
   background: none;
   padding: 0px;
   border: 0px solid #000;
   font-size: 25px;
   cursor: pointer;
}

.modal-body {
   margin-bottom: 10px;
}

.modal-body input[type="text"] {
   width: 100%;
   padding: 5px;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.modal-date {
   display: flex;
   flex-direction: column;
   margin-top: 10px;
}

.modal-date label {
   font-size: small;
   /* font-style: italic; */
   color: #555;
   margin-bottom: 5px;
}

.modal-date-time {
   width: calc(68%); /* Adjust the width to fit within the modal */
   padding: 5px;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.modal-footer {
   display: flex;
   /* justify-content: flex-end; */
}

.modal-button {
   padding: 8px 16px;
   margin-right: 10px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   background-color: #007bff;
   color: white;
}

.modal-button-close {
   padding: 8px 16px;
   margin-right: 10px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   background-color: #888;
   color: white;
}
</style>