<template>
   <div>
      My TodoList
   </div>


   <div className="container">
      <div className="header">
         <button className="top-add-todo-button" onClick="{handleShow}">Add Todo</button>
         <TodoHero completedTasks={completedTasks} totalTasks="{totalTasks}" />
         <div className="filter-container">
            <select className="filter-select" onChange="{handleFilterChange}">
               <option value="tasks-all">All</option>
               <option value="tasks-checked">Checked</option>
               <option value="tasks-unchecked">Unchecked</option>
            </select>
         </div>
      </div>
      
      
      <div className="todo-list">
      <SortableContext
         items="{tasks}"
         strategy="{verticalListSortingStrategy}"
         >
         {getFilteredTasks().map(task => (
               <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompletedAnonFunc}
                  updateTask={updateTask}
                  editItemModal={editItemModal}
               />
         ))}
         <div className="footerButtonContainer">
            <div className="footerButtonContainerLeft">
               <button className="add-todo-button-footer" onClick="setShowModal(true)">Add Todo</button>
            </div>
            <div className="footerButtonContainerRight">
               <button className="load-default-todos-button" onClick="loadDefaultTasks(defaultTasks)">
                  Load Default Tasks (Reset LocalStorage)
               </button>
            </div>
         </div>
         </SortableContext>
      </div>
      
      <TodoAddItemModal
         showModal={showModal}
         handleClose={handleClose}
         addTask={addTask}
         updateTask={updateTask}
         addEditMode={addEditMode}
         currentTaskId={currentTaskId}
      />
   </div>
</template>

<script>
export default {
   // props: ['foodName', 'foodDesc', 'isFavorite']
   props: {
   },
   data() {
      return {
         
      }
   },
   methods: {
   }
}
</script>

<style>

</style>