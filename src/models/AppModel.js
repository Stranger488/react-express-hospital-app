const port = 4321;
const hostname = 'localhost';

const getDaylists = async () => {
    const response = await fetch(`http://${hostname}:${port}/daylists`);
    const daylists = await response.json();

    return daylists;
};

const addDaylist = async (daylist) => {
    const response = await fetch(`http://${hostname}:${port}/daylists`, {
        method: 'POST',
        body: JSON.stringify(daylist),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();

    return info;
};

const editPatient = async ({ daylistId, patientId, newPatientName }) => {   
   const response = await fetch(`http://${hostname}:${port}/daylists/${daylistId}/patients/${patientId}`, {
        method: 'PATCH',
        body: JSON.stringify({ newPatientName }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();

    return info;
} 

const removeDaylist = async (daylistId) => {
    const response = await fetch(`http://${hostname}:${port}/daylists/${daylistId}`, {
        method: 'DELETE',
    });

    if (response.status !== 200) {
        const { error } = await response.json();
        return Promise.reject(error);
    }

    const { info } = await response.json();

    return info;
} 

const removePatient = async ({ daylistId, patientId }) => {
    const response = await fetch(`http://${hostname}:${port}/daylists/${daylistId}/patients/${patientId}`, {
        method: 'DELETE',
    });

    const { info } = await response.json();

    return info;
} 

export {
    getDaylists,
    addDaylist,
    editPatient,
    removeDaylist,
    removePatient
};
