class TodoApp {
  constructor() {
    this.todos = [];
    this.form = document.getElementById("todo-form");
    this.input = document.getElementById("todo-input");
    this.list = document.getElementById("todo-list");

    this.form.addEventListener("submit", (e) => this.addTodo(e));
    this.render();
  }

  addTodo(event) {
    event.preventDefault();
    const text = this.input.value.trim();
    if (text) {
      this.todos.push({ text, completed: false });
      this.input.value = "";
      this.render();
    }
  }

  toggleTodo(index) {
    this.todos[index].completed = !this.todos[index].completed;
    this.render();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.render();
  }

  render() {
    this.list.innerHTML = "";
    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;

      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.text}</span>
        <button class="delete-btn">×</button>
      `;

      li.querySelector("input").addEventListener("change", () =>
        this.toggleTodo(index)
      );
      li.querySelector(".delete-btn").addEventListener("click", () =>
        this.deleteTodo(index)
      );

      this.list.appendChild(li);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
