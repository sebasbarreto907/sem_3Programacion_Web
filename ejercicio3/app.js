const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

function updateEmptyState() {
  emptyState.hidden = taskList.children.length > 0;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) {
    taskInput.focus();
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskLabel = document.createElement("span");
  taskLabel.className = "task-text";
  taskLabel.textContent = taskText;

  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  const completeButton = document.createElement("button");
  completeButton.className = "task-action task-action--complete";
  completeButton.type = "button";
  completeButton.dataset.action = "complete";
  completeButton.setAttribute("aria-label", `Marcar como completada: ${taskText}`);
  completeButton.textContent = "✓";

  const deleteButton = document.createElement("button");
  deleteButton.className = "task-action task-action--delete";
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.setAttribute("aria-label", `Eliminar tarea: ${taskText}`);
  deleteButton.textContent = "🗑️";

  taskActions.append(completeButton, deleteButton);
  taskItem.append(taskLabel, taskActions);
  taskList.append(taskItem);

  taskForm.reset();
  taskInput.focus();
  updateEmptyState();
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    taskInput.value = "";
  }
});

taskList.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton || !taskList.contains(actionButton)) {
    return;
  }

  const taskItem = actionButton.closest(".task-item");
  if (!taskItem) {
    return;
  }

  if (actionButton.dataset.action === "complete") {
    const isCompleted = taskItem.classList.toggle("task-item--completed");
    actionButton.setAttribute("aria-pressed", String(isCompleted));
    actionButton.setAttribute(
      "aria-label",
      `${isCompleted ? "Marcar como pendiente" : "Marcar como completada"}: ${taskItem.querySelector(".task-text").textContent}`,
    );
  } else if (actionButton.dataset.action === "delete") {
    taskItem.remove();
    updateEmptyState();
  }
});

updateEmptyState();