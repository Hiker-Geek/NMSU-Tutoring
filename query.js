
const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");
const { response } = require("express");
const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);

    console.log("success!")
});

axios.get("https://random-data-api.com/api/users/random_user")
     .then((response)=>{
        const { data } = response;
        const {first_name} = data;
        const {last_name} = data;
        const {username} = data; 
        const {date_of_birth} = data;
        const {email} = data;
        const {gender} = data;

    //     const sql = 'INSERT INTO student(first_name, last_name, username, date_of_birth, email, gender) VALUES(?,?,?,?,?,?)';
    //     db.run(sql, [first_name, last_name, username, date_of_birth, email,gender], (err)=>{
    //         if (err) return console.error(err.message);

    //         console.log("A new row has been created");
    //     });
     })
        .catch((error) => {
            if (error) return console.error(error);
        });

    

// const sql = 'SELECT * FROM student';
// db.all(sql, [], (err,rows)=>{
//     if (err) return console.error(err.message);

//     rows.forEach(row=>{
//         console.log(row);
//     });
// });





db.close((err)=>{
    if (err) return console.error(err.message);
});