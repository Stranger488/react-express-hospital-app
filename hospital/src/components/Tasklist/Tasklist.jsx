import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    removeTasklistAction
} from '../../store/actions';
import Task from '../Task/Task';

const Tasklist = ({
    tasklistDay,
    tasklistChange,
    tasklistId,
    tasks = [],
    removeTasklistDispatch
}) => {
    const removeTasklist = () => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskName) {
                alert("На день назначены приемы. Невозможно удалить.");
                return;
            }
        }

        // eslint-disable-next-line no-restricted-globals
        if (confirm(`День '${tasklistDay}' будет удален. Продолжить?`)) {
            removeTasklistDispatch(tasklistId);
        }
    }

    return (
        <div className="element-container">
            <div className="card">
                <span className="card-task-icon card-task-icon-delete card-task-icon-remove-tasklist"
                      onClick={removeTasklist}
                ></span>

                <div className="card-header">
                    {tasklistDay} | {tasklistChange}
                </div>
                <div className="card-tasks-container">
                    {tasks.map((task, index) => (
                        <Task
                            taskName={task.taskName}
                            taskTime={task.taskTime}
                            taskId={index}
                            tasklistId={tasklistId}
                            key={`list${tasklistId}-task${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removeTasklistDispatch: tasklistId => 
        dispatch(removeTasklistAction(tasklistId))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Tasklist));
