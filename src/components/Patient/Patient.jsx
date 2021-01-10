import React, { memo } from 'react';
import { connect } from 'react-redux';
import { editPatient as editPatientServer, 
    removePatient as removePatientServer 
} from '../../models/AppModel';
import {
    editPatientAction,
    removePatientAction
} from '../../store/actions';

const Patient = ({
    patientName,
    patientTime,
    patientId,
    daylistId,
    editPatientDispatch,
    removePatientDispatch
}) => {
    const editPatient = async () => {
        let newPatientName = prompt('Введите фамилию пациента...', patientName);

        if (!newPatientName) return;

        newPatientName = newPatientName.trim();

        if (!newPatientName || newPatientName === patientName) return;

        const info = await editPatientServer({ daylistId, patientId, newPatientName });
        console.log(info);

        editPatientDispatch({ daylistId, patientId, newPatientName });
    };

    const removePatient = async () => {
        if (patientName) {    
            // eslint-disable-next-line no-restricted-globals
            if (confirm(`Пациент '${patientName}' будет удален из расписания. Продолжить?`)) {
                const info = await removePatientServer({ daylistId, patientId });
                console.log(info);

                removePatientDispatch({ daylistId, patientId });
            }
        }
    };

    return (
        <div className="card-task">
            <div className="card-task-text">
                <span className="card-task-time">{patientTime}</span> 
                {patientName && <span>{patientName}</span>}
            </div>
            <div className="card-task-icons">
                <div className="card-task-icons-first-row">
                    <span 
                        className="card-task-icon card-task-icon-edit"
                        onClick={editPatient}
                    >
                    </span>
                </div>
                <div className="card-task-icons-second-row">
                    <span 
                        className="card-task-icon card-task-icon-delete"
                        onClick={removePatient}
                    >
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch =>({
    editPatientDispatch: ({ daylistId, patientId, newPatientName }) =>
        dispatch(editPatientAction({ daylistId, patientId, newPatientName })),
    removePatientDispatch: ({ daylistId, patientId }) => 
        dispatch(removePatientAction({ daylistId, patientId }))
});

export default connect(
    null, 
    mapDispatchToProps
)(memo(Patient));