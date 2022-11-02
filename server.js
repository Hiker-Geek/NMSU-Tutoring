const express = require('express');
const path = require("path");
const app = express();
const OpenApiValidator = require('express-openapi-validator');

const staticSite = __dirname + '/public';

app.use(express.json());
app.use(express.static(staticSite));

//TODO: OpenAPI

// const apiSpec = path.join(__dirname, 'OpenAPI.yaml');
// app.use(OpenApiValidator.middleware({
//         apiSpec,
//         validateResponses: true, // default false
//     }),
// );

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
//Example: http://localhost:8000/api/tutorDetails/1
app.get('/api/tutorDetails/:tutorId', async (req, res, next) => {
    try {
        const userTutorID = req.params.tutorId;
        const scheduleDetails = await tutorDB("users as u")
            .join('tutors as t', 't.aID', '=', 'u.aggieID')
            .select(['u.firstName', 'u.lastname', 'u.email', 'u.gender', 'u.bio', 't.subject', 't.deptID'])
            .where('t.userTutorID', `${userTutorID}`);
        res.json(scheduleDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get a students' information for checking their profile.
//Example: http://localhost:8000/api/studentDetails/1
app.get('/api/studentDetails/:studentId', async (req, res, next) => {
    try {
        const userStudentID = req.params.studentId;
        const scheduleDetails = await tutorDB("users as u")
            .join('students as s', 's.aID', '=', 'u.aggieID')
            .select(['u.firstName', 'u.lastname', 'u.email', 'u.gender', 'u.bio'])
            .where('s.userStudentID', `${userStudentID}`);
        res.json(scheduleDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get all the available calendar appointments that have not been taken.
//Example: http://localhost:8000/api/listSchedules
app.get('/api/listSchedules', async (req, res, next) => {
    try {//TODO: Needs work.
        // const scheduleDetails = await tutorDB("tutors as t")//left join
        //     .join('schedules as s', 's.scheduledTutorID', '=', 't.userTutorID')
        //     .select(['t.subject', 's.meetTime', 's.endTime', 's.building', 's.roomnumber', 's.notes'])
        // const scheduleNames = await tutorDB("users as u")
        //     .join('tutors as t', 't.aID', '=', 'u.aggieID')
        //     .select(['u.firstName', 'u.lastname'])
        // const fullQuery = {
        //     ...scheduleNames[0],
        //     ...scheduleDetails[0]
        // }
        const fullQuery = [{
            tutorFirstName: 'Bill',
            tutorLastName: 'Bo',
            meetTime: '2022-11-13 11:30:00',
            endTime: '2022-11-13 12:30:00',
            building: 'Science Hall',
            notes: 'Be there.'
        }, {
            tutorFirstName: 'Michael',
            tutorLastName: 'Jackson',
            meetTime: '2022-11-12 10:30:00',
            endTime: '2022-11-12 11:00:00',
            building: 'Science Hall',
            notes: 'Hi.'
        }];
        res.json(fullQuery);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Used to get the information for all the appointments you have booked with any tutor. All you need is that students aggieID
//Example:
// app.get('/api/listBookings/:aggieId', async (req, res, next) => {
//     try {//TODO: Needs work.
//         const theirBookings = req.params.aggieId;
//        const bookingData = await tutorDB.raw('select u.firstname, u.lastname, u.email, u.gender, t.deptId, t.subject, s.meetTime, s.endTime, s.building, s.roomnumber, s.notes' +
//             'from users AS u, tutors AS t, schedules AS s, booking AS b' +
//             'where u.aggieID = ' + `${theirBookings} AND` + ' b.studentAggieID = u.aggieID AND b.tutorAggieID = t.aID AND b.appointmentID = s.scheduleID');
//         // const userTutorDetails = await tutorDB("users as u")
//         //     .join('booking as b', 'b.studentAggieID', '=', 'u.aggieID')
//         //     .select(['u.firstname', 'u.lastname','u.email','u.gender'])
//         // const tutorInfo = await tutorDB("tutors as t")
//         //     .join('booking as b', 'b.tutorID', '=', 't.userTutorID')
//         //     .select(['t.deptId', 't.subject'])
//         // const getSchedule = await tutorDB("schedules as s")
//         //     .join('booking as b', 'b.appointmentID', '=', 's.scheduleID')
//         //     .select(['s.meetTime', 's.endTime', 's.building', 's.roomnumber', 's.notes']);
//         // const fullQuery = {
//         //     ...userTutorDetails[0],
//         //     ...tutorInfo[0],
//         //     ...getSchedule[0]
//         // }
//         res.json(bookingData);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

app.listen(8000, () => console.log('Tutoring Dashboard is up.'));
module.exports = app;

