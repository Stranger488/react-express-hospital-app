import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    editTaskAction,
    removeTaskAction
} from '../../store/actions';

const Task = ({
    taskName,
    taskTime,
    taskId,
    tasklistId,
    editTaskDispatch,
    removeTaskDispatch
}) => {
    const editTask = () => {
        let newTaskName = prompt('Введите фамилию пациента...', taskName);

        if (!newTaskName) return;

        newTaskName = newTaskName.trim();

        if (!newTaskName || newTaskName === taskName) return;

        editTaskDispatch({ tasklistId, taskId, newTaskName });
    };

    const removeTask = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Пациент '${taskName}' будет удален из расписания. Продолжить?`)) {
            removeTaskDispatch({ tasklistId, taskId });
        }
    };

    return (
        <div className="card-task">
            <div className="card-task-text">
                <span className="card-task-time">{taskTime}</span> 
                {taskName && <span>{taskName}</span>}
            </div>
            <div className="card-task-icons">
                <div className="card-task-icons-first-row">
                    <span 
                        className="card-task-icon card-task-icon-edit"
                        onClick={editTask}
                    >
                    </span>
                </div>
                <div className="card-task-icons-second-row">
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
    removeTaskDispatch: ({ tasklistId, taskId }) => 
        dispatch(removeTaskAction({ tasklistId, taskId }))
});

export default connect(
    null, 
    mapDispatchToProps
)(memo(Task));