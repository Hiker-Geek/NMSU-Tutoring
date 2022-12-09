const gatsbyExpress = require('gatsby-plugin-express');
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

app.use(gatsbyExpress('config/gatsby-express.json', {
    publicDir: 'public/',
  template: 'public/index.html',

  // redirects all /path/ to /path
  // should be used with gatsby-plugin-remove-trailing-slashes
  redirectSlashes: true,
}))

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
//example: http://localhost:8000/api/userDetails/1
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
//Example: http://localhost:8000/api/1
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

//Example: http://localhost:8000/api/deleteUser/800800800
app.delete('/api/deleteUser/:aggieID', async (req, res, next) => {
    try {
        const deleteAccountAggieId = req.params.aggieID;
        await tutorDB('users as u')
            .where('u.aggieID', deleteAccountAggieId)
            .del();
        res.status(200).send(`User with ID: ${deleteAccountAggieId} was Deleted.`)
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example: http://localhost:8000/api/deleteSchedule/5
app.delete('/api/deleteSchedule/:scheduleID', async (req, res, next) => {
    try {
        const deleteScheduleID = req.params.scheduleID;
        await tutorDB('schedules as s')
            .where('s.scheduleID', `${deleteScheduleID}`)
            .del();
        res.status(200).send(`Schedule with ID: ${deleteScheduleID} was deleted.`)
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Create Appointment 
app.post('/api/createAppointment', async (req, res, next) => {
    try {
        const {title, allDay, start, end} = req.body;
        await tutorDB('schedules').insert({title, allDay, start, end,});
        res.status(201).send(`New appointment: ${req.body.title} from ${req.body.start} to ${req.body.end} has been created`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example PAYLOAD at http://localhost:8000/api/user:
//              {
//             "firstname": "Bill",
//             "lastname": "Bo",
//             "password": "12345",
//             "birthdate": "2003-1-20",
//             "email": "fooo@bar.com",
//             "role": "t",
//             "gender": "t",
//             "bio": "My name is Bill.",
//             "deptID": 342324,
//             "subject": "MATH"}

app.post('/api/user', async (req, res, next) => {
    try {
        const {aggieID, firstname, lastname, password, birthdate, email, role, gender, bio, deptID, subject} = req.body;
        await tutorDB('users').insert({aggieID, firstname, lastname,
            password, birthdate, email, role, gender,
            bio, deptID, subject});
        res.status(201).send(`New User: ${req.body.firstname} ${req.body.lastname} has been created`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example PAYLOAD at http://localhost:8000/api/schedule:
//            {
//             "scheduledTutorID": 493458463,
//             "meetTime": "2022-11-25 10:30:00",
//             "endTime": "2022-11-25 12:30:00",
//             "building": "Science Hall",
//             "roomNumber": "SH 118A",
//             "notes": "Please come five minutes early."}

app.post('/api/schedule', async (req, res, next) => {
    try {
        const {scheduleID, scheduledTutorID, meetTime, endTime, building, roomNumber, notes} = req.body;
        await tutorDB('schedules').insert({scheduleID, scheduledTutorID, meetTime, endTime, building, roomNumber, notes});
        res.status(201).send(`New schedule made from tutor ${req.body.scheduledTutorID} from ${req.body.meetTime} to ${req.body.endTime} has been created`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example PAYLOAD at http://localhost:8000/api/booking:
//            {"appointmentID": 10,
//             "studentAggieID": 478214179,
//             "tutorAggieID": 493458463,
//             "schedulingID": 4,
//             "bookDate": "2022-11-14",
//             "bookTime": " 4:30:00"}

app.post('/api/booking', async (req, res, next) => {
    try {
        const {appointmentID, studentAggieID, tutorAggieID, schedulingID, bookDate, bookTime} = req.body;
        await tutorDB('booking').insert({appointmentID, studentAggieID, tutorAggieID, schedulingID, bookDate, bookTime});
        res.status(201).send(`${req.body.studentAggieID} booked a appointment with ${req.body.tutorAggieID} at ${req.body.bookTime} ${req.body.bookDate}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//UpdateAppointment
app.put('/api/updateAppointment/:title', async (req, res, next) => {
    try {
        const changedScheduleID = req.params.scheduleID;
        const {title, allDay, start, end} = req.body;
        await tutorDB('schedules as s').where("s.scheduleID", `${changedScheduleID}`)
            .update({title, allDay, start, end});
        res.status(200).send(`Appointment has been updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example PAYLOAD at http://localhost:8000/api/updateUser/800800:
//     {"firstname": "Billy",
//     "lastname": "Bob",
//     "password": "12345",
//     "birthdate": "2003-1-20",
//     "email": "fooo@bar.com",
//     "role": "t",
//     "gender": "t",
//     "bio": "My name is Billy.",
//     "deptID": 342324,
//     "subject": "MATH"}

app.put('/api/updateUser/:aggieID', async (req, res, next) => {
    try {
        const userID = req.params.aggieID;
        const {firstname, lastname, password, birthdate, email, role, gender, bio, deptID, subject} = req.body;
        await tutorDB('users as u').where("u.aggieID", `${userID}`)
            .update({firstname, lastname, password, birthdate, email, role, gender, bio, deptID, subject});
        res.status(200).send(`User ${req.body.firstname} ${req.body.lastname} information has been updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Example PAYLOAD at http://localhost:8000/api/updateSchedule/4:
//            {"meetTime": "2022-11-25 10:30:00",
//             "endTime": "2022-11-25 12:30:00",
//             "building": "Science Hall",
//             "roomNumber": "SH 116",
//             "notes": "Please come five minutes early."}

app.put('/api/updateSchedule/:scheduleID', async (req, res, next) => {
    try {
        const changedScheduleID = req.params.scheduleID;
        const {meetTime, endTime, building, roomNumber, notes} = req.body;
        await tutorDB('schedules as s').where("s.scheduleID", `${changedScheduleID}`)
            .update({meetTime, endTime, building, roomNumber, notes});
        res.status(200).send(`Schedule has been updated`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

app.listen(8000, () => console.log('Tutoring Dashboard is up.'));
module.exports = app;

