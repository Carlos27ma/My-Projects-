// Initialize todo items from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM Elements
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const onlineStatus = document.getElementById('online-status');
const simulateBtn = document.getElementById('simulate-offline');

// Simulation state
let isSimulatingOffline = false;

// Online/Offline status handling
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    if (navigator.onLine && !isSimulatingOffline) {
        onlineStatus.textContent = 'Online';
        onlineStatus.className = 'online';
        simulateBtn.textContent = 'Simulate Offline';
        simulateBtn.className = 'simulate-btn';
    } else {
        onlineStatus.textContent = 'Offline';
        onlineStatus.className = 'offline';
        simulateBtn.textContent = 'Simulate Online';
        simulateBtn.className = 'simulate-btn offline';
    }
}

// Simulate offline/online toggle
simulateBtn.addEventListener('click', () => {
    isSimulatingOffline = !isSimulatingOffline;
    updateOnlineStatus();
});

// Initialize online status
updateOnlineStatus();

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    
    // Save to localStorage
    saveTodos();
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({
            text: text,
            completed: false,
            timestamp: new Date().getTime()
        });
        todoInput.value = '';
        renderTodos();
    }
}

// Toggle todo completion
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Handle Enter key in input
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
renderTodos(); 