import {
    ADD_TASKLIST,
    EDIT_TASK,
    REMOVE_TASK,
    REMOVE_TASKLIST
} from './actions';

const initialState = {
    tasklists: []
};

function makeInitTasksFromHourBounds(leftBound, rightBound) {
    const N = (rightBound - leftBound) * 60 / 20 + 1;
    let tasksArr = [];

    for (let i = 0; i < N; i++) {
        const minutes = (leftBound * 60 + i * 20);
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;

        tasksArr[i] = {taskName: '', taskTime: `${hour}:${minute ? minute : '00'}`};
    }

    return tasksArr;
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_TASKLIST:
            let tempChange = '';
            let tempTasks = [];

            if (payload.tasklistChange === 'day') {
                tempChange = 'Дневная смена';
                tempTasks = [...makeInitTasksFromHourBounds(8, 14)];
            }
            else if (payload.tasklistChange === 'evening') {
                tempChange = 'Вечерняя смена';
                tempTasks = [...makeInitTasksFromHourBounds(14, 20)];
            }
            else tempChange = 'Unknown';

            return {
                ...state,
                tasklists: [
                    ...state.tasklists,
                    {
                        tasklistDay: payload.tasklistDay,
                        tasklistChange: tempChange,
                        tasks: tempTasks
                    }
                ]
            };

        case REMOVE_TASKLIST:
            const removedTasklist = state.tasklists[payload];
            const tasklists = state.tasklists.filter(
                tasklist => tasklist !== removedTasklist
            );

            return {
                ...state,
                tasklists: tasklists
            };

        case EDIT_TASK:
            return {
                ...state,
                tasklists: state.tasklists.map(
                    (tasklist, index) => index !== payload.tasklistId
                        ? { ...tasklist }
                        : {
                            ...tasklist,
                            tasks: tasklist.tasks.map(
                                (task, taskIndex) => {
                                    if(taskIndex === payload.taskId) {
                                        task.taskName = payload.newTaskName;
                                    }

                                    return task;
                                }
                            ) 
                        } 
                )
            };

        case REMOVE_TASK:
            const removedTask = state.tasklists[payload.tasklistId].tasks[payload.taskId];
            const tasks = state.tasklists[payload.tasklistId].tasks.map(
                (task) => {
                    if (task === removedTask) {
                        task.taskName = '';    
                    }

                    return task;
                }
            );

            return {
                ...state,
                tasklists: state.tasklists.map(
                    (tasklist, index) => index !== payload.tasklistId 
                    ? {
                        ...tasklist
                    }
                    : { 
                        ...tasklist,
                        tasks 
                    }
                )
            };  
            
        default:
            return state;    
    }
}