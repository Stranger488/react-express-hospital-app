const ADD_TASKLIST = 'ADD_TASKLIST';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const MOVE_TASK_BACK = 'MOVE_TASK_BACK';
const MOVE_TASK_FORWARD = 'MOVE_TASK_FORWARD';
const REMOVE_TASK = 'REMOVE_TASK';

const addTasklistAction = (tasklistName) => ({
    type: ADD_TASKLIST,
    payload: tasklistName
});

const addTaskAction = ({ taskName, tasklistId }) => ({
    type: ADD_TASK,
    payload: {
        tasklistId,
        taskName
    }
});

const editTaskAction = ({ tasklistId, taskId, newTaskName }) => ({
    type: EDIT_TASK,
    payload: {
        tasklistId,
        taskId,
        newTaskName
    }
});

const moveTaskBackAction = ({ tasklistId, taskId }) => ({
    type: MOVE_TASK_BACK,
    payload: {
        tasklistId,
        taskId
    }
});

const moveTaskForwardAction = ({ tasklistId, taskId }) => ({
    type: MOVE_TASK_FORWARD,
    payload: {
        tasklistId,
        taskId
    }
});

const removeTaskAction = ({ tasklistId, taskId }) => ({
    type: REMOVE_TASK,
    payload: {
        tasklistId,
        taskId
    }
});

export {
    ADD_TASKLIST,
    ADD_TASK,
    EDIT_TASK,
    MOVE_TASK_BACK,
    MOVE_TASK_FORWARD,
    REMOVE_TASK,
    addTasklistAction,
    addTaskAction,
    editTaskAction,
    moveTaskBackAction,
    moveTaskForwardAction,
    removeTaskAction
};
