const request = require('supertest');
const app = require('./server.js');

test('Get details about a tutor', async () => {
    await request(app)
        .get('/api/tutorDetails/493458463')
        .expect(200);
});

 test('Testing for 400 when input for aggieId is a string', async () => {
     await request(app)
         .get('/api/tutorDetails/GIVEME400')
         .expect(400);
 });

test('Get details about a student', async () => {
    await request(app)
        .get('/api/studentDetails/478214179')
        .expect(200);
});

test('Get all schedules', async () => {
    await request(app)
        .get('/api/listSchedules')
        .expect(200);
});

test('Get back home page', async () => {
    await request(app)
        .get('/')
        .expect(200);
});


test('Get back all users', async () => {
    await request(app)
        .get('/api/userDetails/478214179')
        .expect(200);
});

test('Get back all schedules', async () => {
    await request(app)
        .get('/api/listSchedules')
        .expect(200);
});

test('Get back all bookings from a specific student', async () => {
    await request(app)
        .get('/api/listBookings/478214179')
        .expect(200);
});