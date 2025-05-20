$(document).ready(function () {
    // Load tasks from localStorage and render them
    function loadTodos() {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      $('#todo-list').empty();

      todos.forEach((todo, index) => {
        const li = $('<li>').addClass('list-group-item todo-item d-flex justify-content-between align-items-start')
          .toggleClass('completed', todo.completed);

        const content = $('<div>').addClass('flex-grow-1').css('cursor', 'pointer');
        content.html(`<strong>${todo.text}</strong><br><small class="text-muted">${todo.category}</small>`);

        // Toggle completion on click
        content.on('click', function () {
          todos[index].completed = !todos[index].completed;
          localStorage.setItem('todos', JSON.stringify(todos));
          loadTodos();
        });

        // Edit button
        // Edit button

        // Delete button
        const delBtn = $('<button>').addClass('btn btn-sm btn-outline-danger btn-icon').html('<i class="bi bi-trash"></i>');
        delBtn.on('click', function (e) {
          e.stopPropagation();
          todos.splice(index, 1);
          localStorage.setItem('todos', JSON.stringify(todos));
          loadTodos();
        });

        const btnGroup = $('<div>').addClass('d-flex');
        btnGroup.append(delBtn);

        li.append(content, btnGroup);
        $('#todo-list').append(li);
      });
    }

    // Add new task
    $('#add-btn').on('click', function () {
      const input = $('#todo-input');
      const category = $('#category-input').val();
      const text = input.val().trim();
      if (text !== '') {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: text, category: category, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        input.val('');
        loadTodos();
      }
    });

    // Enter key adds task
    $('#todo-input').keypress(function (e) {
      if (e.which === 13) {
        $('#add-btn').click();
      }
    });

    // Toggle light/dark theme
    $('#theme-toggle').click(function () {
      $('body').toggleClass('light-mode dark-mode');
      const icon = $(this).find('i');
      icon.toggleClass('bi-moon bi-brightness-high');
    });

    // Initial load
    loadTodos();
  });