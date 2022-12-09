// Import Axios & Express
const axios = require('axios');
const expess = require('express');
const app = express();
const PORT = 8000;
app.listen(PORT, () =>('Tutoring Dashboard is up.'));

//Post Requests
axios.post('/api/user', {
    "aggieID": 800800,
    "firstname": "Bill",
    "lastname": "Bo",
    "password": "12345",
    "birthdate": "2003-1-20",
    "email": "fooo@bar.com",
    "role": "t",
    "gender": "t",
    "bio": "My name is Bill.",
    "deptID": 342324,
    "subject": "MATH"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.post('/api/schedule', {
    "scheduleID": 4,
    "scheduledTutorID": 493458463,
    "meetTime": "2022-11-25 10:30:00",
    "endTime": "2022-11-25 12:30:00",
    "building": "Science Hall",
    "roomNumber": "SH 118A",
    "notes": "Please come five minutes early."  
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.post('/api/booking', {
    "appointmentID": 10,
    "studentAggieID": 478214179,
    "tutorAggieID": 493458463,
    "schedulingID": 4,
    "bookDate": "2022-11-14",
    "bookTime": " 4:30:00"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  //Get Requests
  axios.get('/api/userDetails')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/tutorDetails/:aggieId')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/studentDetails/:aggieId')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/listSchedules')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/listBookings/:aggieId')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  //PUT Requests 
  axios.put('/api/updateUser', {
    "aggieID": 800800,
    "firstname": "Bill",
    "lastname": "Bo",
    "password": "12345",
    "birthdate": "2003-1-20",
    "email": "fooo@bar.com",
    "role": "t",
    "gender": "t",
    "bio": "My name is Bill.",
    "deptID": 342324,
    "subject": "MATH"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.put('/api/updateSchedule/:scheduleID', {
    "scheduleID": 4,
    "scheduledTutorID": 493458463,
    "meetTime": "2022-11-25 10:30:00",
    "endTime": "2022-11-25 12:30:00",
    "building": "Science Hall",
    "roomNumber": "SH 118A",
    "notes": "Please come five minutes early."  
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  // axios.put('/api/updateBooking', {
  //   "appointmentID": 10,
  //   "studentAggieID": 478214179,
  //   "tutorAggieID": 493458463,
  //   "schedulingID": 4,
  //   "bookDate": "2022-11-14",
  //   "bookTime": " 4:30:00"
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });