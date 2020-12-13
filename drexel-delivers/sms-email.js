/*
    Combination of currentTime, sendEmail, and SMSRelay functions.
    I combined these functions so that checkout.hbs could access a single caller function.
    This function should only be accessed via the main() method.
*/
function currentTime(){
    "use strict";

    let time = new Date();

    let month = `${time.getMonth() + 1}`;
    let day = `${time.getDate()}`;
    let year = `${time.getFullYear()}`;
    let hour = `${time.getHours() % 12}`;
    let minute = `${time.getMinutes()}`;
    let seconds = `${time.getSeconds()}`;

    // Test if AM or PM
    let condition = time.getHours() > 12;
    let twelvehour = condition ? "PM" : "AM";

    // Formatting of minutes and seconds
    condition = time.getMinutes() < 10;
    minute = condition ? `0${minute}` : minute;
    condition = time.getSeconds() < 10;
    seconds = condition ? `0${seconds}` : seconds;

    // Final part of email heading (current time formatted correctly)
    return month + "/" + day + "/" + year + " at " + hour + ":" + minute + ":" + seconds + " " + twelvehour;

}

function sendEmail(body, toEmail) {
    "use strict";

    const nodemailer = require('nodemailer');
    const userEmail = "";  // REDACTED

    // Declare email to send from
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${userEmail}`,
            pass: "" // REDACTED
        }
    });

    let mailOptions = {
        from: `${userEmail}`,
        to: `${toEmail}`,
        subject: `DrexelDelivers Order Confirmation - ${currentTime()}`,
        text: `${body}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

function SMSRelay(message) {
    "use strict";

    // Twilio credentials
    const accountSid = '';  // REDACTED
    const authToken = '';  // REDACTED

    // Require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);
    const MessagingResponse = require('twilio').twiml.MessagingResponse;

    const phoneNumbers = [];  // REDACTED
    const fromNumber = '';  // REDACTED
    let toMessage = message;

    phoneNumbers.forEach(function (element) {
        client.messages
            .create({
                to: `'${element}'`,
                from: `'${fromNumber}'`,
                body: `'${toMessage}'`,
            })
            .then(message => console.log(message.sid));
    });

    // Send Confirmation
    const response = new MessagingResponse();
    response.message('Order Confirmed');
    console.log(response.toString());

}

function main(message, body, toEmail) {
    SMSRelay(message);
    sendEmail(body, toEmail);
}

module.exports.main = main;