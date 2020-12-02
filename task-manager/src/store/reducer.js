import {
    ADD_TASKLIST,
    ADD_TASK,
    EDIT_TASK,
    MOVE_TASK_BACK,
    MOVE_TASK_FORWARD,
    REMOVE_TASK
} from './actions';

const initialState = {
    tasklists: []
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_TASKLIST:
            return {
                ...state,
                tasklists: [
                    ...state.tasklists,
                    {
                        tasklistName: payload,
                        tasks: []
                    }
                ]
            };

        case ADD_TASK:
            return {
                ...state,
                tasklists: state.tasklists.map(
                    (tasklist, index) => index !== payload.tasklistId
                        ? { ...tasklist }
                        : { ...tasklist, tasks: [...tasklist.tasks, payload.taskName] } 
                )
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
                                (task, taskIndex) => taskIndex === payload.taskId
                                 ? payload.newTaskName
                                 : task
                            ) 
                        } 
                )
            };

        case MOVE_TASK_BACK:
            if (payload.tasklistId === 0) return state;

            const movedBackTask = state.tasklists[payload.tasklistId].tasks[payload.taskId];
            const backTasks = state.tasklists[payload.tasklistId].tasks.filter(
                task => task !== movedBackTask
            );

            return {
                ...state,
                tasklists: state.tasklists.map((tasklist, index) => {
                    if (index === payload.tasklistId - 1) {
                        return {
                            ...tasklist,
                            tasks: [...tasklist.tasks, movedBackTask]
                        };
                    }

                    if (index === payload.tasklistId) {
                        return {
                            ...tasklist,
                            tasks: backTasks
                        };
                    }

                    return { ...tasklist };
                })
            };  

        case MOVE_TASK_FORWARD:
            if (payload.tasklistId === state.tasklists.length - 1) return state;

            const movedForwardTask = state.tasklists[payload.tasklistId].tasks[payload.taskId];
            const forwardTasks = state.tasklists[payload.tasklistId].tasks.filter(
                task => task !== movedForwardTask
            );

            return {
                ...state,
                tasklists: state.tasklists.map((tasklist, index) => {
                    if (index === payload.tasklistId + 1) {
                        return {
                            ...tasklist,
                            tasks: [...tasklist.tasks, movedForwardTask]
                        };
                    }

                    if (index === payload.tasklistId) {
                        return {
                            ...tasklist,
                            tasks: forwardTasks
                        };
                    }

                    return { ...tasklist };
                })
            };  

        case REMOVE_TASK:
            const removedTask = state.tasklists[payload.tasklistId].tasks[payload.taskId];
            const tasks = state.tasklists[payload.tasklistId].tasks.filter(
                task => task !== removedTask
            );

            return {
                ...state,
                tasklists: state.tasklists.map(
                    (tasklist, index) => index === payload.tasklistId 
                    ? {
                        ...tasklist,
                        tasks
                    }
                    : { ...tasklist }
                )
            };  
            
        default:
            return state;    
    }
}