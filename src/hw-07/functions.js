//* Тут функції для роботи зі сторінкої в цілому

import { save, load } from "./storage.js";

const STORAGE_KEY = 'tasks';

const myInput = document.getElementById('myInput');
let currentId = 0;

function addNewTask() {
  const inputValue = myInput.value.trim();
  if (inputValue === '') {
    alert('You must type something!');
    return;
  }
  createLi(inputValue);
  myInput.value = '';
  addTaskToStorage(inputValue);
}
// Creates Li element
function createLi(text, isDone = false, id = currentId) {
  const liEl = document.createElement('Li');

  const liText = document.createTextNode(text);
  liEl.appendChild(liText);
// це можно також зробити через liEl.textContent = text;

  liEl.dataset.id = id;
  if (isDone) liEl.className = 'checked';
  
  myUL.appendChild(liEl);
  addCloseButton(liEl);

}

// Creates a "close" button and append it to each list item
function addCloseButton(li) {

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
}
// toggles each list item at click on "li", removes "li" at click on span "cross"
// also finds by index proper task in storage and changes its class 'checked' via isDone
function handleTaskBehaviour({ target }) {
  const currentState = load(STORAGE_KEY);

  if (target.tagName === 'LI') {
    target.classList.toggle('checked');
    const taskIndex = currentState.findIndex(taskObj =>
      +taskObj.id === +target.dataset.id);
    currentState[taskIndex].isDone = !currentState[taskIndex].isDone;

  } else if (target.classList.contains("close")) {
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(taskObj =>
      +taskObj.id === +target.parentNode.dataset.id);
    currentState.splice(taskIndex, 1);
  } 
  save(STORAGE_KEY, currentState);
}

// creates an object of data to be stored
const createTaskObject = (text, isDone) => ({text, isDone, id: currentId});

// saves task to storage
function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  const newTask = createTaskObject(text, isDone);
  if (currentState === undefined) {
    save(STORAGE_KEY, [newTask])
  } else {
    currentState.push(newTask);
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}

// gets data from storage and creates Li-s of the data
function fillTasksList() {

  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(({ text, isDone, id }) => createLi(text, isDone, id));
    currentId = currentState[currentState.length - 1].id + 1;
  }
}


export {addNewTask, handleTaskBehaviour, fillTasksList};