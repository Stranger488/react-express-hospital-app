import React, { memo } from 'react';
import { connect } from 'react-redux';
import { removeDaylist as removeDaylistServer } from '../../models/AppModel';
import {
    removePatientlistAction
} from '../../store/actions';
import Patient from '../Patient/Patient';

const Daylist = ({
    daylistDate,
    daylistChange,
    daylistId,
    patients = [],
    removePatientlistDispatch
}) => {
    const removePatientlist = async () => {
        for (let i = 0; i < patients.length; i++) {
            if (patients[i].patientName) {
                alert("На день назначены приемы. Невозможно удалить.");
                return;
            }
        }

        try {
            const info = await removeDaylistServer(daylistId);
            console.log(info);

            // eslint-disable-next-line no-restricted-globals
            if (confirm(`День '${daylistDate}' будет удален. Продолжить?`)) {
                removePatientlistDispatch(daylistId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="element-container">
            <div className="card">
                <span className="card-task-icon card-task-icon-delete card-task-icon-remove-daylist"
                      onClick={removePatientlist}
                ></span>

                <div className="card-header">
                    {daylistDate} | {daylistChange}
                </div>
                <div className="card-patients-container">
                    {patients.map((patient, index) => (
                        <Patient
                            patientName={patient.patientName}
                            patientTime={patient.patientTime}
                            patientId={index}
                            daylistId={daylistId}
                            key={`list${daylistId}-patient${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removePatientlistDispatch: daylistId => 
        dispatch(removePatientlistAction(daylistId))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Daylist));
