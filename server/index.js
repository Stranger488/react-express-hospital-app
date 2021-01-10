const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');
const port = 4321;
const hostname = 'localhost';

let daylists = [];


// ------------- Middlewares ---------------

// Middleware разрешения CORS-запросов
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware для логирования запросов 
app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

// Middleware для правильного представления request.body
app.use(express.json());


// ------------- Routing ---------------

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/daylists', async (request, response) => {
    daylists = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.json(daylists);
});

app.post('/daylists', async (request, response) => {
    daylists.push(request.body);
    await writeData(daylists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Daylist '${request.body.daylistDate}' was successfully added`
    });
});

app.patch('/daylists/:daylistId/patients/:patientId', async (request, response) => {
    const { newPatientName } = request.body;
    const daylistId = Number(request.params.daylistId);
    const patientId = Number(request.params.patientId);

    let oldPatientName = daylists[daylistId].patients[patientId].patientName;
    daylists[daylistId].patients[patientId].patientName = newPatientName;
    await writeData(daylists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Patient '${oldPatientName}' was successfully changed in daylist
        '${daylists[daylistId].daylistDate}' to '${newPatientName}'`
    });
});

app.delete('/daylists/:daylistId', async (request, response) => {
    const daylistId = Number(request.params.daylistId);

    for (let i = 0; i < daylists[daylistId].length; i++) {
        if (daylists[daylistId].patients[i].patientName) {
            response.setHeader('Content-Type', 'application/json');
            response.status(403).json({
                error: `Can't delete non-empty daylist '${daylists[daylistId].daylistDate}'`
            });
        }
    }

    const removedDaylist = daylists[daylistId];
    daylists = daylists.filter(
        (daylist, index) => index !== daylistId
    );
    await writeData(daylists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Daylist '${removedDaylist.daylistDate}' was successfully deleted`
    });
});

app.delete('/daylists/:daylistId/patients/:patientId', async (request, response) => {
    const daylistId = Number(request.params.daylistId);
    const patientId = Number(request.params.patientId);
    
    const removedPatientName = daylists[daylistId].patients[patientId].patientName;
    daylists[daylistId].patients = daylists[daylistId].patients.map(
        (patient, index) => {
            if (index === patientId) {
                patient.patientName = '';    
            }

            return patient;
        }
    );

    await writeData(daylists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Patient '${removedPatientName}' was successfully deleted from daylist
        '${daylists[daylistId].daylistDate}'`
    });
});


app.listen(port, hostname, (err) => {
    if (err) {
        console.error('Error: ', err);
    }

    console.log(`Server is working on ${hostname}:${port}`);
});