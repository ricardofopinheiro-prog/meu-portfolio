const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value;

  if (text === "") {
    alert("Write a task");
    return;
  }

  const li = document.createElement("li");
  li.textContent = text;

  list.appendChild(li);

  input.value = "";
});