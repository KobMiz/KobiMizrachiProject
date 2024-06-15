const tasks = document.querySelector(".tasks");

function addTitle() {
    const input = document.querySelector('input');

    if (!input.value) {
        return;
    }

    const newTitleContainer = document.createElement('div');
    tasks.appendChild(newTitleContainer);

    const newTitle = document.createElement('h1');
    newTitle.innerText = input.value;
    newTitleContainer.appendChild(newTitle);
    newTitle.contentEditable = true;

    const titleButtonContainer = document.createElement('div');
    newTitleContainer.appendChild(titleButtonContainer);

    const deleteTitleBtn = document.createElement('button');
    deleteTitleBtn.className = 'delete-title-btn';
    deleteTitleBtn.innerText = 'מחק כותרת';
    deleteTitleBtn.addEventListener('click', deleteTitle);
    titleButtonContainer.appendChild(deleteTitleBtn);
    deleteTitleBtn.style.width = '90px';
    input.value = '';
}

function addTask() {
    const input = document.querySelector('input');

    if (!input.value) {
        return;
    }

    const li = document.createElement('li');
    tasks.appendChild(li);

    const div = document.createElement('div');
    div.innerText = input.value;
    li.appendChild(div);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '<img src="edit-icon.png" alt="ערוך" title="ערוך משימה">';
    editBtn.addEventListener('click', editTask);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<img src="delete-icon.png" alt="מחק" title="מחק משימה">';
    deleteBtn.addEventListener('click', deleteTask);
    li.appendChild(deleteBtn);

    input.value = '';
}


function keyup(ev) {
    if (ev.key === 'Enter') {
        addTask();
    }
}

function deleteTask() {
    const isAllowed = confirm(`האם אתה בטוח כי ברצונך למחוק את המשימה?`);
    if (isAllowed) {
        this.parentElement.remove();
    }
}

function deleteTitle() {
    const isAllowed = confirm(`האם אתה בטוח כי ברצונך למחוק את הכותרת?`);
    if (isAllowed) {
        this.parentElement.parentElement.remove();
    }
}

function editTask() {
    const taskContent = this.parentElement.querySelector('div');
    taskContent.contentEditable = true;
}

const addTaskButton = document.getElementById('add-task-btn');
addTaskButton.addEventListener('click', addTask);

const addTitleButton = document.getElementById('add-title-btn');
addTitleButton.addEventListener('click', addTitle);

const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        deleteTask.call(this);
    });
});

const deleteTitleBtns = document.querySelectorAll('.delete-title-btn');
deleteTitleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        deleteTitle.call(this);
    });
});
