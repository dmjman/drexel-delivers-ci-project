"use strict";

// Sign Up Page
$(function() {
    $('input[name="acct"]').click(function () {
        let account = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            address_street: $('#street').val(),
            address_city: $('#city').val(),
            address_state: $('#state').val(),
            address_zip: $('#zip').val(),
            phone_number: $('#phone').val(),
            birthday: $('#birthday').val(),
        };
        $.post('/signup/create_account', account, function(data, status){})
    });
});