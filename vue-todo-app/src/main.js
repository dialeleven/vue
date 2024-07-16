import { createApp } from 'vue'

import App from './App.vue'
//import FoodItem from './components/FoodItem.vue'
import TodoList from './components/TodoList.vue'


// createApp(App).mount('#app')
const app = createApp(App)
app.component('todo-list', TodoList)
app.mount('#app')
