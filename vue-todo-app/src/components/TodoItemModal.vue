<template>
   <div className="modal-backdrop">
      <div className="modal">
         <div className="modal-header">
            <h2>{{addEditMode}} Todo</h2>
            <button className="close-button" @click="handleClose">×</button>
         </div>
         <div className="modal-body">
            <input
               type="text"
               value={text}
            />

            <div className="modal-date">
               <label>Due Date (Optional):</label>
               <input
                  type="datetime-local"
                  value={dateTime}
                  className="modal-date-time"
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

            <div className="modal-date">
               <label>Due Date (Optional):</label>
               <input
                  type="datetime-local"
                  value={dateTime}
                  className="modal-date-time"
                  onChange="{(e) => setDateTime(e.target.value)}
                  onKeyDown={handleKeyPress}"
               />
            </div>
             -->
         </div>
         <div className="modal-footer">
            <button className="modal-button" onClick={handleSubmit}>{{addEditMode}}</button>
            <button className="modal-button-close" @click="handleClose">Close</button>
            <!-- {/* expression to conditionally render the 'New' button */} -->
            <!-- {
               isNewButtonHidden ? null : <button className="modal-button" onClick={() => setIsNewButtonHidden(true)}>New</button>
            } -->
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'TodoItemModal',
   // props: ['task', 'deleteTask', 'toggleCompleted', 'updateTask', 'editItemModal']

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
         // this.showModal = false;
         this.$emit('handleClose');

         //alert('handleClose');
      },

      // user clicks the edit button to edit the todo item
      handleSubmit() {
         //alert('hi');
         // console.log(this.task.id);
         // console.log(this.task.text);
         // console.log(this.task.duedate);
         // console.log('task in editItemModal2: ', this.task);
         this.editItemModal(this.task.id);
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