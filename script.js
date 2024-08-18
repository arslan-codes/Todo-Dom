document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("text").value = "";
  document.getElementById("type").value = "";
  const Addbutton = document.getElementById("btn");
  const taskTableBody = document.querySelector("#taskTable tbody");
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Load tasks from local storage on page load
  display();

  // Add Task
  Addbutton.addEventListener("click", () => {
    const texttodo = document.getElementById("text").value;
    const typetodo = document.getElementById("type").value;
    if (texttodo.trim() !== "") {
      todos.push({
        title: texttodo,
        type: typetodo,
      });
      updateLocalStorage();
      display();
      document.getElementById("text").value = ""; // Clear the input after adding a todo
      document.getElementById("type").value = ""; // Clear the input after adding a todo
    }
  });

  // Display Tasks
  function display() {
    taskTableBody.innerHTML = ""; // Clear existing content
    todos.forEach((todo, index) => {
      const newRow = document.createElement("tr");
      newRow.classList.add("task-row");
      newRow.innerHTML = `
        <td class="task-title">${todo.title}</td>
        <td class="task-type">${todo.type}</td>
        <td><button class="edit-btn">Edit</button></td>
        <td><button class="delete-btn">Delete</button></td>
      `;

      // Add Event Listener for Delete Button
      newRow.querySelector(".delete-btn").addEventListener("click", () => {
        todos.splice(index, 1);
        updateLocalStorage();
        display();
      });

      // Add Event Listener for Edit Button
      newRow.querySelector(".edit-btn").addEventListener("click", () => {
        const updatedTitle = prompt("Edit Task Title:", todo.title);
        const updatedType = prompt("Edit Task Type:", todo.type);
        if (updatedTitle && updatedType) {
          todos[index] = { title: updatedTitle, type: updatedType };
          updateLocalStorage();
          display();
        }
      });

      taskTableBody.appendChild(newRow);
    });
  }

  // Update Local Storage
  function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Display the current date
  const date = new Date();
  document.getElementById("date").innerHTML += date.toDateString();
});
