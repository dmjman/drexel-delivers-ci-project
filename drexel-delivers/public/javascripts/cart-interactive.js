"use strict";

let cart = [];

$(function() {

   $(".atc").click(function () {
       let id = $(this).attr("data-itemid");
       addToCart(id);
   });
});

function getItemName(id) {
    return $("p.itemName[data-itemid='" + id + "']").text();
}

function getItemPrice(id) {
    return $("p.itemPrice[data-itemid='" + id + "']").text();
}

function addToCart(id) {
    cart.push(id);
    console.log(cart);
    updateCart();
}

function removeFromCart(id) {
    for (let i = 0; i < cart.length; i++){
        if (id === cart[i]) {
            cart.splice(i, 1);
            break;
        }
    }
    updateCart();
}

function updateCart() {
    if (cart.length <= 0) {
        $(function() {
            $(".cart-table").addClass("invisible");
        });
    } else {
        $(function() {
            let $cartTable = $(".cart-table");
            if ($cartTable.hasClass("invisible")) {
                $cartTable.removeClass("invisible")
            }
            $(".cart-table tbody").empty();
            for (let i = 0; i < cart.length; i ++) {
                $(".cart-table tbody").append(generateItemHTML(cart[i]));
            }
        });
    }
    $(function() {
        $("input[name='cart']").attr("value", cart.toString());
    });
}

function generateItemHTML(id) {
    console.log("generate id:" + id + "\n");
    return "<tr><td>" + getItemName(id) + "</td><td>" + getItemPrice(id) + "</td><td>" + "<button onclick='removeFromCart(" + id + ")'>-</button>" + "</td></tr>";
}