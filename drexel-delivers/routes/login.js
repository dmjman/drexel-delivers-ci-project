"use strict";

const express = require('express');
const router = express.Router();
const mysql = require('../mysql-connector');

router.post('/submit_login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let retrievedata = new Promise(function (resolve, reject){
        mysql.executeQuery("SELECT * FROM userinfo WHERE email = '" + email + "'", function (err, results, fields) {
            if (err) throw err;
            console.log(results);
            if (results.rows.length === 1) {
                if(results.rows[0].password === password) {
                    resolve("Login Successful")

                } else {
                    resolve("Incorrect Password")
                }
            } else {
                resolve("User does not exist.")
            }
        });
    });
    retrievedata.then(function(value){
        console.log(value);
    })

});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        userdata: mysql.userinfo
    });
});

module.exports = router;
