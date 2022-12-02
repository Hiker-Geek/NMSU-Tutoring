const express = require('express');
const path = require("path");

var app = express();

const staticSite = __dirname + '/public';

app.use(express.json());
app.use(express.static(staticSite));

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

// READ
app.get('/listTutors', async (req, res, next) => {
    try {
        const tutorsReturned = await tutorDB.select(['FullName', 'Major', 'StudentYear', 'Subjects', 'Bio', 'Schedule', 'Locations'])
            .from('tutor');
        res.json(tutorsReturned);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// CREATE
app.post('/createTutor', async (req, res, next) => {
    try {
        const {FullName, Major, StudentYear, Subjects, Bio, Schedule, Locations} = req.body;
        await tutorDB('tutor').insert({FullName, Major, StudentYear, Subjects, Bio, Schedule, Locations});
        res.status(201).send(`New User: ${req.body.FullName} has been created`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});