import onLoad from "./onLoad";
import newTodoForm from "./newTodoForm";
import {
  getProjects,
  setProjects,
  addProject,
  getOneProject,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../controllers/projectController";

export const createTodoList = (pIndex, currProject) => {
  const container = document.querySelector(".container");

  //INPUT TO ADD NEW TODOS
  const addNewTodoButton = document.createElement("button");
  addNewTodoButton.innerHTML = `Add Todo`;
  addNewTodoButton.id = "addNewTodoButton";

  const list = document.createElement("ul");
  list.classList.add("todoList");

  container.appendChild(addNewTodoButton);
  addNewTodoButton.onclick = (e) => {
    e.preventDefault();
    newTodoForm(pIndex, currProject);
  };
  container.appendChild(list);
};

export const populateTodoList = (currProject) => {
  const project = getOneProject(currProject);

  const list = document.querySelector(".todoList");

  list.innerHTML =
    !project || !project.todos.length
      ? `<h4>Nothing to see here yet!</h4>`
      : project.todos
          .map(
            (todo) => `
    <li class="todoList__todo">
      <input class="item-checkbox" data-id=${todo.id} type="checkbox" ${
              todo.completed && "checked"
            }/>
      <div class="todoList__text">
        <h4>${todo.title}</h4>
        <p>${todo.desc}</p>
      </div>
      <div class= "todoList__controls">
        <i class="fas fa-pencil-alt" data-todoid=${todo.id}></i>
        <i class="fas fa-minus-circle" data-todoid=${todo.id}></i>
      </div>
      
    </li>
    `
          )
          .join("");

  ///DELETE CONTROLS
  const deleteButtons = document.querySelectorAll(".fa-minus-circle");
  deleteButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      confirm("ARE YOU SURE? THIS CANT BE UNDONE") &&
        deleteTodo(project.id.toString(), e.target.dataset.todoid.toString());
      populateTodoList(currProject);
    })
  );

  ///TOGGLE CHECKBOX
  const checkboxes = document.querySelectorAll(".item-checkbox");
  checkboxes.forEach((cbox) => {
    cbox.addEventListener("click", (e) => {
      toggleTodoStatus(currProject.id, e.target.dataset.id);
    });
  });
};
