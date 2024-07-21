import React from 'react';
import './TodoListHero.css';


function TodoListHero({ completedTasks, totalTasks }) {
   return (
      <div className="todo-hero">
         <div className="todo-progress-text">Tasks Done:</div>
         <div className="todo-count">{completedTasks} / {totalTasks}</div>
      </div>
   );
}

export default TodoListHero;