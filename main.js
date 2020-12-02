document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
});

class App {
    constructor() {
        this.taskLists = [];
    }

    addTask = (taskListId) => {
        let newTaskName = prompt('Опишите задачу');

        if (!newTaskName) return;

        newTaskName = newTaskName.trim();

        if (!newTaskName) return;

        this.taskLists[taskListId].updateTasks([
            ...this.taskLists[taskListId].tasks,
            newTaskName
        ]);

    };

    editTask = ({
        taskId,
        oldTaskName
    }) => {
        let newTaskName = prompt('Введите новое описание задачи', oldTaskName);

        if (!newTaskName) return;

        newTaskName = newTaskName.trim();

        if (!newTaskName || newTaskName === oldTaskName) return;

        document.getElementById(taskId)
            .querySelector('.card-task-text')
            .innerHTML = newTaskName;
    };

    moveTask = ({
        taskId,
        direction
    }) => {
        const [
            taskListIndex,
            taskIndex
        ] = taskId.split('-').map(n => Number(n));

        if (taskListIndex === 0 && direction === 'left') return;
        if (taskListIndex === this.taskLists.length - 1 && direction === 'right') return;

        const movedTask = this.taskLists[taskListIndex].tasks[taskIndex];
        const fromTasks = this.taskLists[taskListIndex].tasks
            .filter(task => task !== movedTask);
        this.taskLists[taskListIndex].updateTasks(fromTasks);

        if (direction === 'left') {
            this.taskLists[taskListIndex - 1].updateTasks([
                ...this.taskLists[taskListIndex - 1].tasks,
                movedTask
            ]);
        }
        else {
            this.taskLists[taskListIndex + 1].updateTasks([
                ...this.taskLists[taskListIndex + 1].tasks,
                movedTask
            ]);
        }
    };

    removeTask = (taskId) => {
        const [
            taskListIndex,
            taskIndex
        ] = taskId.split('-').map(n => Number(n));

        const removedTask = this.taskLists[taskListIndex].tasks[taskIndex];
        const updatedTasks = this.taskLists[taskListIndex].tasks
            .filter(task => task !== removedTask);
        this.taskLists[taskListIndex].updateTasks(updatedTasks);
    };

    start() {
        const addTaskListButton = document.getElementById('add-list-button');
        const addTaskListInput = document.getElementById('add-list-input');
    
        addTaskListButton.addEventListener('click', () => {
            addTaskListButton.style.display = 'none';
            addTaskListInput.style.display = 'inherit';
        });
    
        addTaskListInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.target.value = '';
                addTaskListButton.style.display = 'inherit';
                addTaskListInput.style.display = 'none';
    
                return;
            }
    
            if (event.key === 'Enter') {
                if (event.target.value) {
                    const taskList = new TaskList({
                        taskListName: event.target.value,
                        taskListId: this.taskLists.length,
                        addTask: this.addTask,
                        editTask: this.editTask,
                        moveTask: this.moveTask,
                        removeTask: this.removeTask
                    });

                    taskList.render();
                    this.taskLists.push(taskList);
    
                    event.target.value = '';  
                }
    
                addTaskListButton.style.display = 'inherit';
                addTaskListInput.style.display = 'none';
            }
        });
    }
}

class TaskList {
    constructor({
        taskListName,
        taskListId,
        addTask,
        editTask,
        moveTask,
        removeTask
    }) {
        this.taskListName = taskListName;
        this.taskListId = taskListId;
        this.tasks = [];
        this.addTask = addTask;
        this.editTask = editTask;
        this.moveTask = moveTask;
        this.removeTask = removeTask;
    }

    updateTasks(newTasks) {
        this.tasks = [...newTasks];
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById(`list-${this.taskListId}`);
        const tasksContainer = taskList.querySelector('.card-tasks-container');

        tasksContainer.innerHTML = '';

        this.tasks.forEach((task, index) => {
            tasksContainer.appendChild((new Task({
                taskName: task,
                taskId: `${this.taskListId}-${index}`,
                editTask: this.editTask,
                moveTask: this.moveTask,
                removeTask: this.removeTask
            })).render());
        });
    }

    render() {
        const taskListContainer = document.createElement('div');
        taskListContainer.className = 'element-container';

        const taskList = document.createElement('div');
        taskList.className = 'card';
        taskList.id = `list-${this.taskListId}`;

        taskListContainer.appendChild(taskList);

        const header = document.createElement('div');
        header.className = 'card-header';
        header.innerHTML = this.taskListName;

        taskList.appendChild(header);

        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'card-tasks-container'; 

        taskList.appendChild(tasksContainer);

        const cardAddNew = document.createElement('span');
        cardAddNew.className = 'card-add-new';
        cardAddNew.innerHTML = 'Добавить карточку...';
        
        cardAddNew.addEventListener('click', () => this.addTask(this.taskListId));
        
        taskList.appendChild(cardAddNew);

        document.getElementById('main-content').insertBefore(
            taskListContainer,
            document.querySelector('.element-container:last-child')
        );
    }
}

class Task {
    constructor({
        taskName,
        taskId,
        editTask,
        moveTask,
        removeTask
    }) {
        this.taskName = taskName;
        this.taskId = taskId;
        this.editTask = editTask;
        this.moveTask = moveTask;
        this.removeTask = removeTask;
    }

    render() {
        const task = document.createElement('div');
        task.className = 'card-task';
        task.id = this.taskId;

        const taskText = document.createElement('div');
        taskText.className = 'card-task-text';
        taskText.innerHTML = this.taskName;

        task.appendChild(taskText);

        const controls = document.createElement('div');
        controls.className = 'card-task-icons';

        const arrows = document.createElement('div');
        arrows.className = 'card-task-icons-first-row';

        const left = document.createElement('span');
        left.className = 'card-task-icon card-task-icon-left';
        left.addEventListener('click', () => this.moveTask({
            taskId: this.taskId,
            direction: 'left'
        }));
        arrows.appendChild(left);

        const right = document.createElement('span');
        right.className = 'card-task-icon card-task-icon-right';
        right.addEventListener('click', () => this.moveTask({
            taskId: this.taskId,
            direction: 'right'
        }));
        arrows.appendChild(right);

        controls.appendChild(arrows);

        const editDelete = document.createElement('div');
        editDelete.className = 'card-task-icons-second-row';

        const edit = document.createElement('span');
        edit.className = 'card-task-icon card-task-icon-edit';
        edit.addEventListener('click', () => this.editTask({
            taskId: this.taskId,
            oldTaskName: this.taskName
        }));
        editDelete.appendChild(edit);

        const remove = document.createElement('span');
        remove.className = 'card-task-icon card-task-icon-delete';
        remove.addEventListener('click', () => this.removeTask(this.taskId));
        editDelete.appendChild(remove);

        controls.appendChild(editDelete);

        task.appendChild(controls);

        return task;
    }
}