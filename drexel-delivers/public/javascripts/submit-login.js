"use strict";

// Log In Page
$(function() {
    $('input[name="submit"]').click(function () {
        let login = {
            email: $('#email').val(),
            password: $('#pass').val(),
        };
        $.post('/login/submit_login', login, function(data, status){});
    });
});