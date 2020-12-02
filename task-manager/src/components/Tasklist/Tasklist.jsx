import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    addTaskAction
} from '../../store/actions';
import Task from '../Task/Task';

const Tasklist = ({
    tasklistName,
    tasklistId,
    tasks,
    addTaskDispatch
}) => {
    const addTask = () => {
        let newTaskName = prompt('Введите описание задачи...');

        if (!newTaskName) return;

        newTaskName = newTaskName.trim();

        if (!newTaskName) return;

        addTaskDispatch({ tasklistId, taskName: newTaskName });
    }; 

    return (
        <div className="element-container">
            <div className="card">
                <div className="card-header">
                    {tasklistName}
                </div>
                <div className="card-tasks-container">
                    {tasks.map((task, index) => (
                        <Task
                            taskName={task}
                            taskId={index}
                            tasklistId={tasklistId}
                            key={`list${tasklistId}-task${index}`}
                        />
                    ))}
                </div>
                <span
                    className="card-add-new"
                    onClick={addTask}
                >
                    Добавить карточку...
                </span>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addTaskDispatch: ({ tasklistId, taskName }) =>
        dispatch(addTaskAction({ taskName, tasklistId }))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Tasklist));
