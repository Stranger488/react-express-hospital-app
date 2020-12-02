import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    editTaskAction,
    moveTaskBackAction,
    moveTaskForwardAction,
    removeTaskAction
} from '../../store/actions';

const Task = ({
    taskName,
    taskId,
    tasklistId,
    editTaskDispatch,
    moveTaskBackDispatch,
    moveTaskForwardDispatch,
    removeTaskDispatch
}) => {
    const editTask = () => {
        let newTaskName = prompt('Введите новое описание задачи...', taskName);

        if (!newTaskName) return;

        newTaskName = newTaskName.trim();

        if (!newTaskName || newTaskName === taskName) return;

        editTaskDispatch({ tasklistId, taskId, newTaskName });
    };

    const removeTask = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Задача '${taskName}' будет удалена. Продолжить?`)) {
            removeTaskDispatch({ tasklistId, taskId });
        }
    };

    return (
        <div className="card-task">
            <div className="card-task-text">
                {taskName}
            </div>
            <div className="card-task-icons">
                <div className="card-task-icons-first-row">
                    <span 
                        className="card-task-icon card-task-icon-left"
                        onClick={() => moveTaskBackDispatch({ tasklistId, taskId })}    
                    >
                    </span>
                    <span 
                        className="card-task-icon card-task-icon-right"
                        onClick={() => moveTaskForwardDispatch({ tasklistId, taskId })}
                    >
                    </span>
                </div>
                <div className="card-task-icons-second-row">
                    <span 
                        className="card-task-icon card-task-icon-edit"
                        onClick={editTask}
                    >
                    </span>
                    <span 
                        className="card-task-icon card-task-icon-delete"
                        onClick={removeTask}
                    >
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch =>({
    editTaskDispatch: ({ tasklistId, taskId, newTaskName }) =>
        dispatch(editTaskAction({ tasklistId, taskId, newTaskName })),
    moveTaskBackDispatch: ({ tasklistId, taskId }) => 
        dispatch(moveTaskBackAction({ tasklistId, taskId })),
    moveTaskForwardDispatch: ({ tasklistId, taskId }) => 
        dispatch(moveTaskForwardAction({ tasklistId, taskId })),
    removeTaskDispatch: ({ tasklistId, taskId }) => 
        dispatch(removeTaskAction({ tasklistId, taskId })),
});

export default connect(
    null, 
    mapDispatchToProps
)(memo(Task));