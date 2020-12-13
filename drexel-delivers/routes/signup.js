"use strict";

const express = require('express');
const router = express.Router();
const mysql = require('../mysql-connector');

router.post('/create_account', function(req, res, next) {
    let account = req.body;
    let hasAccount = false;
    let emailCheck = "SELECT email FROM userinfo";
    let query = "INSERT INTO userinfo(name, email, password, address_street, address_city, address_state, address_zip, " +
        "phone_number, birthday) VALUES('" + account.name + "', '" + account.email + "', '" + account.password + "', '" + account.address_street + "', " +
        "'" + account.address_city + "', '" + account.address_state + "', '" + account.address_zip + "', '" + account.phone + "', '" + account.birthday + "' )";

    let retrieveData = new Promise(function (resolve, reject) {  // Promises make sure this happens before anything else
        mysql.executeQuery(emailCheck, function (err, results, fields) {
            if (err) throw err;
            if (account.email === results.rows[0].email) {
                hasAccount = true;
                console.log("Already has account");
            }
            resolve();
        });
    });
    retrieveData.then(function(){
        if (hasAccount) res.render('signup');
    });
    if (!hasAccount) {
        let retrieveData2 = new Promise(function (resolve, reject){
            mysql.executeQuery(query, function (err, results, fields) {
                if (err) throw (err);
                console.log("User added");
                resolve();
            });
        });
        retrieveData2.then(function(){
            res.render('signup');
        });
    }
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup');
});

module.exports = router;
