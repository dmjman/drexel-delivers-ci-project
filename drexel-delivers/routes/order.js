"use strict";

const express = require('express');
const router = express.Router();
const connector = require('../mysql-connector');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('order',{
        venues: connector.foodlist,
        userinfo: connector.userinfo
    });
});

module.exports = router;
