const request = require('supertest');
const app = require('./server.js');

test('Get details about a tutor', async () => {
    await request(app)
        .get('/api/tutorDetails/1')
        .expect(200);
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