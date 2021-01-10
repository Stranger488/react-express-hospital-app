const DOWNLOAD_DAYLISTS = 'DOWNLOAD_DAYLISTS';
const ADD_DAYLIST = 'ADD_DAYLIST';
const REMOVE_DAYLIST = 'REMOVE_DAYLIST';
const EDIT_PATIENT = 'EDIT_PATIENT';
const REMOVE_PATIENT = 'REMOVE_PATIENT';

const downloadDaylistsAction = (daylists) => ({
    type: DOWNLOAD_DAYLISTS,
    payload: daylists
});

const addDaylistAction = ({ daylistDate, daylistChange, patients }) => ({
    type: ADD_DAYLIST,
    payload: {
        daylistDate,
        daylistChange,
        patients
    }
});

const removePatientlistAction = daylistId => ({
    type: REMOVE_DAYLIST,
    payload: daylistId
});

const editPatientAction = ({ daylistId, patientId, newPatientName }) => ({
    type: EDIT_PATIENT,
    payload: {
        daylistId,
        patientId,
        newPatientName
    }
});

const removePatientAction = ({ daylistId, patientId }) => ({
    type: REMOVE_PATIENT,
    payload: {
        daylistId,
        patientId
    }
});

export {
    DOWNLOAD_DAYLISTS,
    ADD_DAYLIST,
    REMOVE_DAYLIST,
    EDIT_PATIENT,
    REMOVE_PATIENT,
    downloadDaylistsAction,
    addDaylistAction,
    removePatientlistAction,
    editPatientAction,
    removePatientAction
};
