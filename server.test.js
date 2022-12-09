const request = require('supertest');
const app = require('./server.js');

test('Get details about a tutor', async () => {
    await request(app)
        .get('/api/tutorDetails/1')
        .expect(200);
});

 test('Testing for 400 when input for aggieId is a string', async () => {
     await request(app)
         .get('/api/tutorDetails/GIVEME400')
         .expect(400);
 });

test('Get details about a student', async () => {
    await request(app)
        .get('/api/studentDetails/1')
        .expect(200);
});

test('Get all schedules', async () => {
    await request(app)
        .get('/api/listSchedules')
        .expect(200);
});

// test('Get back home page', async () => {
//     await request(app)
//         .get('/')
//         .expect(200);
// });


test('Get back all users', async () => {
    await request(app)
        .get('/api/userDetails/1')
        .expect(200);
});

test('Get back all schedules', async () => {
    await request(app)
        .get('/api/listSchedules')
        .expect(200);
});

test('Get back all bookings from a specific student', async () => {
    await request(app)
        .get('/api/listBookings/2')
        .expect(200);
});

//delete,put

test('Create a user', async () => {
    const payloader = {
            "aggieID": 42,
             "firstname": "Joe",
             "lastname": "King",
             "password": "12345",
             "birthdate": "1999-1-1",
             "email": "fooo@bar.com",
             "role": "s",
             "gender": "m",
             "bio": "I am Joe King.",
             "deptID": 342324,
             "subject": "GOLF"
    }
    await request(app)
        .post('/api/user')
        .send(payloader)
        .expect(201);
});

test('Create a schedule', async () => {
    const payloader = {
            "scheduleID": 42,
             "scheduledTutorID": 1,
             "meetTime": "2022-11-25 10:30:00",
             "endTime": "2022-11-25 12:30:00",
             "building": "Golf Hall",
             "roomNumber": "GL 420A",
             "notes": "Bring your own golf balls."
    }
    await request(app)
        .post('/api/schedule')
        .send(payloader)
        .expect(201);
});

test('Create a booking', async () => {
    const payloader = {
            "studentAggieID": 42,
            "tutorAggieID": 1,
            "schedulingID": 42,
            "bookDate": "2022-11-14",
            "bookTime": " 4:30:00"
    }
    await request(app)
        .post('/api/booking')
        .send(payloader)
        .expect(201);
});

test('Update a user', async () => {
    const payloader = {
        "subject": "Golf Course Management"
    }
    await request(app)
        .put('/api/updateUser/42')
        .send(payloader)
        .expect(200);
});

test('Update a schedule', async () => {
    const payloader = {
        "notes": "Don't worry about bringing golf balls."
    }
    await request(app)
        .put('/api/updateSchedule/42')
        .send(payloader)
        .expect(200);
});

test('Update a booking', async () => {
    const payloader = {
        "meetTime": "2022-12-25 10:30:00",
        "endTime": "2022-12-25 12:30:00",
        "building": "Golfing Hall",
        "roomNumber": "GL 480A",
    }
    await request(app)
        .put('/api/updateSchedule/42')
        .send(payloader)
        .expect(200);
});

test('Delete a user', async () => {
    await request(app)
        .delete('/api/deleteUser/42')
        .expect(200);
});

test('Delete a schedule', async () => {
    await request(app)
        .delete('/api/deleteSchedule/42')
        .expect(200);
});