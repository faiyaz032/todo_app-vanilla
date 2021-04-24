'use strict';
//Select DOM
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//* Event Listener
window.addEventListener('load', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeOrDelete);
filterOption.addEventListener('click', filterTodo);
//* functions

//! Add elements to the Todo Div
function addTodo(e) {
   e.preventDefault();

   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');
   const newTodo = createNewTodoListItem();
   todoDiv.appendChild(newTodo);
   saveTodoToLocalStorage(todoInput.value);
   //check Mark Button
   const completedButton = createCheckMarkButton();
   todoDiv.appendChild(completedButton);

   //Trash Button
   const trashButton = createTrashButton();
   todoDiv.appendChild(trashButton);

   //Append to ul
   todoList.appendChild(todoDiv);
   todoInput.value = '';
}

//!Create Elements of todo Div
function createNewTodoListItem(todoValue = todoInput.value) {
   const newTodo = document.createElement('li');
   newTodo.innerText = todoValue;
   newTodo.classList.add('todo-item');
   return newTodo;
}

function createCheckMarkButton() {
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fas fa-check"></i>';
   completedButton.classList.add('complete-btn');
   return completedButton;
}

function createTrashButton() {
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn');
   return trashButton;
}
//!---------------------------

function completeOrDelete(e) {
   const item = e.target;
   if (item.classList[0] === 'trash-btn') {
      const todo = item.parentElement;
      todo.classList.add('fall');
      todo.addEventListener('transitionend', function () {
         todo.remove();
      });
   }

   if (item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
   }
}

function filterTodo(e) {
   const todos = todoList.childNodes;
   todos.forEach((todo) => {
      switch (e.target.value) {
         case 'all':
            todo.style.display = 'flex';
            break;

         case 'completed':
            if (todo.classList.contains('completed')) todo.style.display = 'flex';
            else todo.style.display = 'none';
            break;

         case 'uncompleted':
            if (!todo.classList.contains('completed')) todo.style.display = 'flex';
            else todo.style.display = 'none';
            break;
      }
   });
}

//! Working with Local Storage
function saveTodoToLocalStorage(todo) {
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach((todo) => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      const newTodo = createNewTodoListItem(todo);
      todoDiv.appendChild(newTodo);
      //check Mark Button
      const completedButton = createCheckMarkButton();
      todoDiv.appendChild(completedButton);

      //Trash Button
      const trashButton = createTrashButton();
      todoDiv.appendChild(trashButton);

      //Append to ul
      todoList.appendChild(todoDiv);
   });
}
