var productName = document.getElementById('product-name');
var productPrice = $("#product-price").text(); //method text คือการดูดข้อมูลจาก tag ID ที่อ้างถึง
var productQuantity = $("#product-quantity").val();
var productDelete = document.getElementById('product-delete');
var customerQuantity = document.getElementById('customer-quantity');
var totalBeforeVat = document.getElementById('total-beforeVat');
var totalVat = document.getElementById('total-vat');
var totalAfterVat = document.getElementById('total-afterVat');
var totalPay = document.getElementById('total-pay');
var totalCashBack = document.getElementById('total-cashBack');
var btnVoid = document.getElementById('btn-void');
var btnNote = document.getElementById('btn-note');
var btnDiscount = document.getElementById('btn-discount');
var btnConfirm = document.getElementById('btn-confirm');
var btnMenu1 = document.getElementById('btn-menu-1');
var btnMenu2 = document.getElementById('btn-menu-2');

var product = [{
        productId: "1",
        productName: "ปูไข่ดอง",
        productPrice: 200,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    }, {
        productId: "2",
        productName: "กุ้งเผา",
        productPrice: 500,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "3",
        productName: "ข้าวผัดกุ้ง",
        productPrice: 100,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "4",
        productName: "ปูเผา",
        productPrice: 300,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "5",
        productName: "ปลาหมึกย่าง",
        productPrice: 350,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "1",
        productId: "6",
        productName: "หอยหวาน",
        productPrice: 200,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "7",
        productName: "หอยแมลงภู่นิวซีแลนด์",
        productPrice: 80,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },
    {
        productId: "8222",
        productName: "น้ำเปล่า",
        productPrice: 30,
        productQuantity: 1,
        productTotal: productPrice * productQuantity,
        productDelete: productDelete
    },

];
//ตัวอักษร \ คือการให้ String ขึ้นบรรทัดใหม่
$(document).ready(function() {
    console.log("ready!");

    var template = "<div class='div-btn-menu'> \
<button id='btn-menu-1' onclick='' class='btnmenu btn-secondary' value='---productid---'>เมนูต่าง ๆ</button></div>";
    for (var i = 0; i < product.length; i++) {
        var that_product = template;
        that_product = that_product.replace("เมนูต่าง ๆ", product[i].productName);
        that_product = that_product.replace("---productid---", product[i].productId);
        $("#grid-menu-button").append(that_product);
        console.log(i);
    }
});

function test() {
    productName.innerHTML = product.productName;
}
console.log(product);
console.log(productPrice);
console.log(productQuantity);
/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

(function() {
    "use strict";

    // Shortcut to get elements
    var el = function(element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator; // Batman

    // When: Number is clicked. Get the current number selected
    var setNum = function() {
        if (resultNum) { // If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number

    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function() {

        // Convert string input to numbers
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

                // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = theNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
                resultNum = "You broke it!";
            } else { // If result is infinity, set off by dividing by zero
                resultNum = "Look at what you've done";
                el('#calculator').classList.add("broken"); // Break calculator
                el('#reset').classList.add("show"); // And show reset button
            }
        }

        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;

    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

    // Add click event to reset button
    el("#reset").onclick = function() {
        window.location = window.location;
    };

}());