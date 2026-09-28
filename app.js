const STORAGE_KEY = "todo-list-tasks";

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const message = document.querySelector("#form-message");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(savedTasks)) return [];

    return savedTasks.filter((task) =>
      task &&
      typeof task.id === "string" &&
      typeof task.title === "string" &&
      task.title.trim().length > 0 &&
      typeof task.completed === "boolean"
    );
  } catch {
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const fragment = document.createDocumentFragment();

  for (const task of tasks) {
    const row = document.createElement("li");
    row.className = `task-row${task.completed ? " is-completed" : ""}`;
    row.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute("aria-label", `Marcar tarefa como concluída: ${task.title}`);

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = task.completed ? "Concluída" : "Pendente";
    status.setAttribute("aria-label", `Estado: ${status.textContent}`);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Excluir";
    deleteButton.setAttribute("aria-label", `Excluir tarefa: ${task.title}`);

    row.append(checkbox, title, status, deleteButton);
    fragment.append(row);
  }

  taskList.replaceChildren(fragment);
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (!title) {
    message.textContent = "Informe um título para a tarefa.";
    titleInput.focus();
    return;
  }

  if (title.length > 100) {
    message.textContent = "O título deve ter no máximo 100 caracteres.";
    titleInput.focus();
    return;
  }

  tasks.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    completed: false,
  });
  saveTasks();
  renderTasks();
  form.reset();
  message.textContent = "";
  titleInput.focus();
});

titleInput.addEventListener("input", () => {
  message.textContent = "";
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest('[data-action="toggle"]');
  if (!checkbox) return;

  const row = checkbox.closest("[data-task-id]");
  const task = tasks.find((item) => item.id === row.dataset.taskId);
  if (!task) return;

  task.completed = checkbox.checked;
  saveTasks();
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest('[data-action="delete"]');
  if (!deleteButton) return;

  const row = deleteButton.closest("[data-task-id]");
  tasks = tasks.filter((task) => task.id !== row.dataset.taskId);
  saveTasks();
  renderTasks();
});

renderTasks();
