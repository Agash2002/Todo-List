document.addEventListener("DOMContentLoaded", () => {
    // Grab references to DOM elements
    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    // Initialize todos from localStorage or start with an empty array
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Render the todo list on the page
    function renderTodos() {
        todoList.innerHTML = ""; // Clear existing list items

        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm";

            // Create the inner HTML structure for each todo item
            li.innerHTML = `
                <div class="flex items-center space-x-2">
                    <input type="checkbox" class="todo-checkbox h-5 w-5 text-blue-500" ${todo.completed ? "checked" : ""}>
                    <span class="todo-text ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}">
                        ${todo.text}
                    </span>
                </div>
                <div class="space-x-2">
                    <button class="edit-btn text-blue-700">Edit</button>
                    <button class="delete-btn text-red-700">Delete</button>
                </div>
            `;

            // Checkbox event to mark todo as complete/incomplete
            const checkbox = li.querySelector(".todo-checkbox");
            checkbox.addEventListener("change", () => {
                todo.completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            // Edit button event to update todo text
            const editBtn = li.querySelector(".edit-btn");
            editBtn.addEventListener("click", () => {
                const newText = prompt("Edit task:", todo.text);
                if (newText !== null && newText.trim() !== "") {
                    todo.text = newText.trim();
                    saveTodos();
                    renderTodos();
                }
            });

            // Delete button event to remove the todo
            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            // Append the todo item to the list
            todoList.appendChild(li);
        });
    }

    // Add button event to create a new todo
    addTodoBtn.addEventListener("click", () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = ""; // Clear input field
            saveTodos();
            renderTodos();
        }
    });

    // Initial render of the todo list when page loads
    renderTodos();
});
