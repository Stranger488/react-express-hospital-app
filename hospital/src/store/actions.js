const ADD_TASKLIST = 'ADD_TASKLIST';
const REMOVE_TASKLIST = 'REMOVE_TASKLIST';
const EDIT_TASK = 'EDIT_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

const addTasklistAction = ({tasklistDay, tasklistChange}) => ({
    type: ADD_TASKLIST,
    payload: {
        tasklistDay,
        tasklistChange
    }
});

const removeTasklistAction = tasklistId => ({
    type: REMOVE_TASKLIST,
    payload: tasklistId
});

const editTaskAction = ({ tasklistId, taskId, newTaskName }) => ({
    type: EDIT_TASK,
    payload: {
        tasklistId,
        taskId,
        newTaskName
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
    REMOVE_TASKLIST,
    EDIT_TASK,
    REMOVE_TASK,
    addTasklistAction,
    removeTasklistAction,
    editTaskAction,
    removeTaskAction
};
