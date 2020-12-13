"use strict";

const mysql = require('mysql');

// Connect to MySQL
let pool;

// Drexel Delivers database pool info
pool = mysql.createPool({
    connectionLimit: 10,
    host     : '',  // REDACTED
    user     : '',  // REDACTED
    password : '',  // REDACTED
    database : '',  // REDACTED
    debug    : false
});

// Create connection
module.exports.executeQuery=function(query, callback){
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(query, function(err,rows){
            connection.release();
            if(!err) {
                callback(null, {rows: rows});
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
};

let retrieveData = new Promise(function(resolve, reject) {  // Promises make sure this happens before anything else
    module.exports.executeQuery("SELECT * FROM foods", function (err, results, fields) {
        if (err) throw err;
        let res = {};

        for (let i = 0; i < results.rows.length; i++) {
            let venue = results.rows[i].venue;
            if (!res.hasOwnProperty(venue)) {  // check if venue exists in res
                res[venue] = [];  // set property venue of res to a blank array
            }
            res[venue].push({  // add item data to array
                //venue: results.rows[i].venue,
                item: results.rows[i].item,
                price: results.rows[i].price.toFixed(2),
                itemid: results.rows[i].itemid
            });
        }
        resolve(res);
    });
})
    .then(function(results){
        module.exports.foodlist = results;
        console.log("Food System Connected");
    });

let retrieveData2 = new Promise(function(resolve, reject){
    module.exports.executeQuery("SELECT * FROM userinfo", function(err, results, fields){
        if (err) throw err;
        let res2 = {};

        for (let i = 0; i < results.rows.length; i++){
            let name = results.rows[i].name;
            if (!res2.hasOwnProperty(name)){
                res2[name] = [];
            }
            res2[name].push({
                email: results.rows[i].email,
                password: results.rows[i].password,
                street: results.rows[i].address_street,
                city: results.rows[i].address_city,
                state: results.rows[i].address_state,
                zip: results.rows[i].address_zip,
                phone: results.rows[i].phone_number,
                birthday: results.rows[i].birthday
            })
        }
        resolve(res2);
    });
})
    .then(function(results){
        module.exports.userinfo = results;
        console.log("Login System Connected");
    });
