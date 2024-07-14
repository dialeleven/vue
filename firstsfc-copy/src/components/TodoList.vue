<template>
   <div>
      My TodoList
   </div>


   <div className="container">
      <div className="header">
         <button className="top-add-todo-button" onClick={handleShow}>Add Todo</button>
         <TodoHero completedTasks={completedTasks} totalTasks={totalTasks} />
         <div className="filter-container">
            <select className="filter-select" onChange={handleFilterChange}>
               <option value="tasks-all">All</option>
               <option value="tasks-checked">Checked</option>
               <option value="tasks-unchecked">Unchecked</option>
            </select>
         </div>
      </div>
      
      
      <div className="todo-list">
      <SortableContext
         items={tasks}
         strategy={verticalListSortingStrategy}
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
         {/* original output of tasks array with no filtering
         {tasks.map(task => (
            <TodoItem
               key={task.id}
               task={task}
               deleteTask={deleteTask}
               toggleCompleted={toggleCompleted}
               updateTask={updateTask}
            />
         ))} */}
         <div className="footerButtonContainer">
            <div className="footerButtonContainerLeft">
               <button className="add-todo-button-footer" onClick=setShowModal(true)>Add Todo</button>
            </div>
            <div className="footerButtonContainerRight">
               <button className="load-default-todos-button" onClick=loadDefaultTasks(defaultTasks)>Load Default Tasks (Reset LocalStorage)</button>
            </div>
         </div>
         </SortableContext>
      </div>
<!-- 
      {/* 
      The <TodoAddItemModal> component is being used in the TodoList component. Here's an explanation of the props being passed to <TodoAddItemModal>:

      1. showModal: This prop is passing the showModal state variable to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js component. It allows the modal window to know whether it should be displayed or not based on the value of showModal.

      2. handleClose: This prop is passing the handleClose function to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js) component. It enables the modal window to call the handleClose function when needed, typically to close the modal window.

      3. addTask: This prop is passing the [addTask] (\src\components\TodoList.js) function to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js) component. It allows the modal window to call the [addTask] (\src\components\TodoList.js) function when a new task needs to be added based on user input within the modal.
      */} -->
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