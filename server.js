const express = require('express');
const path = require("path");
const app = express();
const OpenApiValidator = require('express-openapi-validator');

const staticSite = __dirname + '/public';

app.use(express.json());
app.use(express.static(staticSite));

// const apiSpec = path.join(__dirname, 'OpenAPI.yaml');
// app.use(OpenApiValidator.middleware({
//         apiSpec,
//         validateResponses: true, // default false
//     }),
// );

app.get('/', function (req,res) {
    res.sendFile(staticSite + "/index.html");
});

const tutorDB = require('knex')({
    client: 'sqlite3',
    debug: true,
    connection: {
        filename: '../db/tutor.db'
    },
    useNullAsDefault: true
});

app.get('/api/listTutors', async (req, res, next) => {
    try {
        res.json([{foo: 'bar'}]);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

app.listen(4000, () => console.log('Movie server is up.'));

module.exports = app;

