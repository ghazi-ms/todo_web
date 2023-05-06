/* JavaScript for the ToDo website */
const deleteTaskBtns = document.querySelectorAll('.delete-btn');

for (const btn of deleteTaskBtns) {
  btn.addEventListener('click', function (event) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (!confirmDelete) {
      event.preventDefault();
    }
  });
}

const editTaskBtns = document.querySelectorAll('.edit-btn');

for (const btn of editTaskBtns) {
  btn.addEventListener('click', function (event) {
    const taskId = event.target.dataset.taskId;
    const taskTitle = document.querySelector(`#task-title-${taskId}`).textContent.trim();
    const taskDescription = document.querySelector(`#task-description-${taskId}`).textContent.trim();
    const editForm = document.querySelector('#edit-form');
    const editFormTitle = editForm.querySelector('#title');
    const editFormDescription = editForm.querySelector('#description');
    const editFormTaskId = editForm.querySelector('#task-id');

    editFormTitle.value = taskTitle;
    editFormDescription.value = taskDescription;
    editFormTaskId.value = taskId;
  });
}

const closeModalBtns = document.querySelectorAll('.close-modal');

for (const btn of closeModalBtns) {
  btn.addEventListener('click', function (event) {
    const modal = event.target.closest('.modal');
    modal.style.display = 'none';
  });
}

const cancelBtns = document.querySelectorAll('.cancelbtn');

for (const btn of cancelBtns) {
  btn.addEventListener('click', function (event) {
    const modal = event.target.closest('.modal');
    modal.style.display = 'none';
  });
}

const taskForms = document.querySelectorAll('.task-form');

for (const form of taskForms) {
  form.addEventListener('submit', function (event) {
    const title = form.querySelector('#title').value;
    const description = form.querySelector('#description').value;

    if (!title || !description) {
      alert('Title and description are required.');
      event.preventDefault();
    }
  });
}

const editForm = document.querySelector('#edit-form');

if (editForm) {
  editForm.addEventListener('submit', function (event) {
    const title = editForm.querySelector('#title').value;
    const description = editForm.querySelector('#description').value;

    if (!title || !description) {
      alert('Title and description are required.');
      event.preventDefault();
    }
  });
}
