const listContainer = document.querySelector(".todo-list ul");
const modalInput = document.querySelector(".modal-input");

let TODO_LIST = [
  { id: 123456, data: "Create TODO List", checked: false },
  { id: 548794, data: "Do Something New", checked: false },
];

window.addEventListener("load", updateTodoList());

document.querySelector(".addTodo-btn").addEventListener("click", addTodo);

function removeListHandler(e) {
  const todoId = e.target.closest("li").getAttribute("data-id");
  const updatedTodos = TODO_LIST.filter((todo) => todo.id != todoId);
  TODO_LIST = updatedTodos;
  const element = e.target.closest("li");
  element.remove();
  setLocalStorage();
}

function listClickHandler(e) {
  const todoId = e.target.closest("li").getAttribute("data-id");
  const toBeUpdateTodo = TODO_LIST.findIndex((todo) => todo.id == todoId);
  if (toBeUpdateTodo != -1) {
    TODO_LIST[toBeUpdateTodo].checked = !TODO_LIST[toBeUpdateTodo].checked;
  }
  if (e.target.classList.contains("checked")) {
    e.target.classList.remove("checked");
  } else {
    e.target.classList.add("checked");
  }
  setLocalStorage();
}

function updateTodoList() {
  listContainer.innerHTML = "";
  TODO_LIST.forEach((todo) => {
    const todoElement = document.createElement("li");
    todoElement.setAttribute("data-id", todo.id);
    todoElement.innerHTML = `<div onclick="listClickHandler(event)" class="todo-text">${todo.data}</div>
            <div class="todo-btns">
            <span class="edit-btn" onclick="updatedTodoHandler(event)"
            ><i class="fa-solid fa-pen-to-square"></i></span>
            <span class="remove-btn" onclick="removeListHandler(event)"
            ><i class="fa-solid fa-xmark"></i></span> </div>`;
    listContainer.appendChild(todoElement);
  });
  setLocalStorage();
}

function addTodo() {
  const todoData = document.querySelector("#todo-input");
  const todo = {
    id: Math.floor(Math.random() * 100000),
    data: todoData.value,
    checked: false,
  };
  TODO_LIST.push(todo);
  updateTodoList();
  todoData.value = "";
}

function updatedTodoHandler(e) {
  const listElement = e.target.closest("li");
  const todoId = listElement.getAttribute("data-id");
  const todo = listElement.querySelector(".todo-text").innerText;
  modalInput.value = todo;
  modalInput.setAttribute("data-todo-id", todoId);
  document.querySelector(".modal").classList.add("open");
}

function confirmUpdateTodoHandler() {
  const todo = modalInput.value;
  const todoId = modalInput.getAttribute("data-todo-id");
  TODO_LIST.map((t, index) => {
    if (t.id == todoId) {
      TODO_LIST[index].data = todo;
    }
  });
  document.querySelector(".modal").classList.remove("open");
  updateTodoList();
  setLocalStorage();
}

function closeModalHandler(e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("fa-xmark")
  ) {
    modalInput.setAttribute("data-todo-id", '');
    document.querySelector(".modal").classList.remove("open");
  }
}

function setLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(TODO_LIST));
}
