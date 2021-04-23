'use strict';
//Select DOM
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//* Event Listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeOrDelete);
//* functions

//! Add elements to the Todo Div
function addTodo(e) {
   e.preventDefault();

   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');
   const newTodo = createNewTodoListItem();
   todoDiv.appendChild(newTodo);

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
function createNewTodoListItem() {
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
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
