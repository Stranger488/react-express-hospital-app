import {
    DOWNLOAD_DAYLISTS,
    ADD_DAYLIST,
    EDIT_PATIENT,
    REMOVE_PATIENT,
    REMOVE_DAYLIST,
} from './actions';

const initialState = {
    daylists: []
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case DOWNLOAD_DAYLISTS:
            return {
                ...state,
                daylists: payload
            };

        case ADD_DAYLIST:
            return {
                ...state,
                daylists: [
                    ...state.daylists,
                    {
                        daylistDate: payload.daylistDate,
                        daylistChange: payload.daylistChange,
                        patients: payload.patients
                    }
                ]
            };

        case REMOVE_DAYLIST:
            const removedDaylist = state.daylists[payload];
            const daylists = state.daylists.filter(
                daylist => daylist !== removedDaylist
            );

            return {
                ...state,
                daylists: daylists
            };

        case EDIT_PATIENT:
            return {
                ...state,
                daylists: state.daylists.map(
                    (daylist, index) => index !== payload.daylistId
                        ? { ...daylist }
                        : {
                            ...daylist,
                            patients: daylist.patients.map(
                                (patient, patientIndex) => {
                                    if(patientIndex === payload.patientId) {
                                        patient.patientName = payload.newPatientName;
                                    }

                                    return patient;
                                }
                            ) 
                        } 
                )
            };

        case REMOVE_PATIENT:
            const patients = state.daylists[payload.daylistId].patients.map(
                (patient, index) => {
                    if (index === payload.patientId) {
                        patient.patientName = '';    
                    }

                    return patient;
                }
            );

            return {
                ...state,
                daylists: state.daylists.map(
                    (daylist, index) => index !== payload.daylistId 
                    ? {
                        ...daylist
                    }
                    : { 
                        ...daylist,
                        patients 
                    }
                )
            };  
            
        default:
            return state;    
    }
}