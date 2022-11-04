const express = require('express');
const path = require("path");
const app = express();
const OpenApiValidator = require('express-openapi-validator');

const staticSite = __dirname + '/public';

app.use(express.json());
app.use(express.static(staticSite));

const apiSpec = path.join(__dirname, 'OpenAPI.yaml');
app.use(OpenApiValidator.middleware({
        apiSpec,
        validateResponses: true,
    }),
);

app.get('/', function (req, res) {
    res.sendFile(staticSite + "/index.html");
});

//Connection to db
const tutorDB = require('knex')({
    client: 'sqlite3',
    debug: true,
    connection: {
        filename: './db/tutor.db'
    },
    useNullAsDefault: true
});

//Basic endpoint for all the userInfo
//example: http://localhost:8000/api/userDetails/478214179
app.get('/api/userDetails/:aggieID', async (req, res, next) => {
    try {
        const aggieID = req.params.aggieID;
        const userDetails = await tutorDB.select(['u.firstname', 'u.lastname', 'u.birthdate', 'u.email', 'u.role', 'u.gender', 'u.bio', 'u.subject'])
            .from('users as u')
            .where('u.aggieid', `${aggieID}`);
        res.json(userDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get a tutors' information for checking their profile.
//Example: http://localhost:8000/api/tutorDetails/493458463
app.get('/api/tutorDetails/:aggieId', async (req, res, next) => {
    try {
        const userAggieId = req.params.aggieId;
        const scheduleDetails = await tutorDB("users as u")
            .select(['u.firstName', 'u.lastname', 'u.email', 'u.gender', 'u.bio', 'u.subject', 'u.deptID'])
            .where('u.aggieID', `${userAggieId}`);
        res.json(scheduleDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get a students' information for checking their profile.
//Example: http://localhost:8000/api/studentDetails/478214179
app.get('/api/studentDetails/:aggieID', async (req, res, next) => {
    try {
        const userStudentID = req.params.aggieID;
        const studentDetails = await tutorDB("users as u")
            .select(['u.firstName', 'u.lastname', 'u.email', 'u.gender', 'u.bio'])
            .where('u.aggieID', `${userStudentID}`);
        res.json(studentDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get all the available calendar appointments that have not been taken.
//Example: http://localhost:8000/api/listSchedules
app.get('/api/listSchedules', async (req, res, next) => {
    try {
        const schedule = await tutorDB.select(['FirstName', 'LastName', 'DeptID', 'Subject', 'meetTime', 'endTime', 'building', 'roomNumber', 'notes', 'email'])
            .from('schedules')
            .leftOuterJoin('booking', 'schedules.scheduleID', 'booking.schedulingID')
            .join('users', 'users.aggieID', 'schedules.scheduledTutorID')
            .where("booking.appointmentID", "is", null);
        res.json(schedule);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get the information for all the appointments you have booked with any tutor. All you need is that students aggieID
//Example: http://localhost:8000/api/listBookings/478214179
app.get('/api/listBookings/:aggieId', async (req, res, next) => {
    try {
        const studentAggieId = req.params.aggieId;
        const bookingData = await tutorDB.select(['FirstName', 'LastName', 'DeptID', 'Subject', 'meetTime', 'endTime', 'building', 'roomNumber', 'notes', 'email'])
            .from('booking')
            .join('users', 'users.aggieID', 'booking.tutorAggieID')
            .join('schedules', 'schedules.scheduleID', 'booking.schedulingID')
            .where("booking.studentAggieID", "=", studentAggieId);
        res.json(bookingData);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

app.listen(8000, () => console.log('Tutoring Dashboard is up.'));
module.exports = app;

