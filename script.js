document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

function addTask(taskText, save = true) {
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
}

if (taskText === "") {
            alert("Please enter a task.");
            return;
}

const li = document.createElement('li');
        li.textContent = taskText;

const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = ''; 

if (save) {
            saveTasks();
        }
    }

function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' هنا تعني عدم الحفظ مرة أخرى في Local Storage
    }

addButton.addEventListener('click', () => addTask());

taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
