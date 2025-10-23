document.addEventListener('DOMContentLoaded', () => {

   
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

   
    
});