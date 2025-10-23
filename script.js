window.addEventListener('load', () => {

   
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDateInput = document.getElementById('task-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const taskListContainer = document.getElementById('task-list');
    const feedbackMessage = document.getElementById('feedback-message');

    
    loadTasks();

    
    taskForm.addEventListener('submit', (e) => {
        
        e.preventDefault();

        if (taskTitleInput.value === '' || taskDateInput.value === '') {
            showFeedback('Por favor, completa todos los campos.', 'red');
            return;
        }

        
        const task = {
            id: Date.now(), 
            title: taskTitleInput.value,
            date: taskDateInput.value,
            priority: taskPriorityInput.value,
            completed: false
        };

        
        renderTask(task);
        
        
        saveTaskToStorage(task);

       
        showFeedback('¡Tarea añadida con éxito!', 'green');

       
        taskForm.reset();
    });

   
    taskListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
           
            const taskElement = e.target.closest('article');
            const taskId = Number(taskElement.dataset.id);

            
            taskElement.classList.toggle('completed');

            
            toggleTaskCompletedStorage(taskId);
        }
    });

   
    function showFeedback(message, color) {
        feedbackMessage.textContent = message;
        feedbackMessage.style.color = color;

       
        setTimeout(() => {
            feedbackMessage.textContent = '';
        }, 3000);
    }

   
    function renderTask(task) {
       
        const taskElement = document.createElement('article');
        taskElement.dataset.id = task.id; 
        taskElement.classList.add(`priority-${task.priority}`);

        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>Fecha Límite: ${task.date} | Prioridad: ${task.priority}</p>
            </div>
            <button class="complete-btn">${task.completed ? 'Deshacer' : 'Completar'}</button>
        `;

        taskListContainer.appendChild(taskElement);
    }

    
    function getTasksFromStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    
    function saveTaskToStorage(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => {
            renderTask(task);
        });
    }

    
    function toggleTaskCompletedStorage(id) {
        const tasks = getTasksFromStorage();
        
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});