const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // Editable array

// This function deletes one of the TO-DO list elements when delete button is pressed
function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveTodos();
}

// This function saves TO-DO list after converting into string format
function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// This function shows elements in TO-DO list
// 1. Add list, button, and span to HTML using "createElement()"
// 2. Assign id to each element to enable "delete" funciton
// 3. When delete button is pressed, it calls deleteTodo()
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveTodos();
}

// When submission occurs, this function
// 1. Prevents refreshment of the page
// 2. Updates "currentValue" with given input from the form
// 3. Calls paintToDo() with "currentValue"
// 4. Reset toDoInput
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// This function checks if an array is empty
// If not, calls paintToDo() for each element
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // Convert an object to text
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

// This function calls loadToDos() and handleSubmit() when submission occurs
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
