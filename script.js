document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addElement() {
    const input = document.getElementById("myInput");
    const value = input.value.trim();

    if (value === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(value, false);
    saveTask(value, false);
    input.value = "";
}

function createTaskElement(taskText, completed) {
    const ul = document.getElementById("myul");
    const li = document.createElement("li");
    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }

    // Toggle complete on click
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const span = document.createElement("span");
    span.textContent = "❌";
    span.className = "delete-btn";
    span.onclick = function (e) {
        e.stopPropagation(); // prevent toggle on delete
        li.remove();
        updateLocalStorage();
    };

    li.appendChild(span);
    ul.appendChild(li);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#myul li").forEach((li) => {
        const taskText = li.childNodes[0].textContent.trim();
        const isCompleted = li.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
    });
}
