"use strict";

const express = require('express');
const router = express.Router();
const connector = require('../mysql-connector');
const smsEmail = require('../sms-email');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Drexel Delivers" });
});

module.exports = router;
