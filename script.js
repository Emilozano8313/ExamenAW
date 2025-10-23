document.addEventListener('DOMContentLoaded', () => {

   
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDateInput = document.getElementById('task-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const taskListContainer = document.getElementById('task-list');
    const feedbackMessage = document.getElementById('feedback-message');

    
    loadTasks();

    
