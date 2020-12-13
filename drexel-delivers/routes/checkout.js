"use strict";

const express = require('express');
const router = express.Router();
const connector = require('../mysql-connector');
const smsEmail = require('../sms-email');


router.post('/', function(req, res, next) {

    let cartitems = [];
    let cartprices = [];
    let emailMessage = "";
    let smsMessage = `David at 3320 Powelton Ave - `;
    let toEmail;

    let items = req.body.cart.split(",");

    let userinfo = connector.userinfo;
    let foodlist = connector.foodlist;
    let venues = Object.keys(foodlist);
    let name = Object.keys(userinfo);

    // User Login
    emailMessage += `Items:\n`;

    for (let i = 0; i < venues.length; i ++) {
        for (let j = 0; j < foodlist[venues[i]].length; j ++) {
            for (let k = 0; k < items.length; k ++) {
                if (foodlist[venues[i]][j].itemid == items[k]) {  // DO NOT CHANGE
                    let item = foodlist[venues[i]][j];
                    cartitems.push(item.item);
                    cartprices.push(item.price);
                    emailMessage += `${String(item.item)} from ${venues[i]},\n`;
                    smsMessage += `${String(item.item)}-${venues[i]},`;
                }
            }
        }
    }

    let subtotal = eval(cartprices.join("+"));
    let tax = subtotal * 0.08;
    let totalPrice = subtotal + tax + 2.99;

     // Change with variables once submit and login works
    emailMessage += `Total: ${totalPrice}`;
    emailMessage += `\nTo be sent to David Bicer Jr. at 3320 Powelton Ave within 45 minutes of order time.`;

    res.render('checkout', {
        items: cartitems,
        prices: cartprices,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        price: totalPrice.toFixed(2),
        main: smsEmail.main(smsMessage, emailMessage, toEmail)
    });
});

module.exports = router;