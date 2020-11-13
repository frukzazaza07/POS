$(document).ready(function() {
    $('#discount1').on("click", function(e) {
        discount1 = document.getElementById("discount1").checked;
        if (discount1 == true) {
            document.getElementById('txtDiscount1').readOnly = false;
            document.getElementById('txtDiscount2').readOnly = true;
            document.getElementById('txtDiscount1').value = "";
        }
    });

    $('#discount2').on("click", function(e) {
        discount2 = document.getElementById("discount2").checked;
        if (discount2 == true) {
            document.getElementById('txtDiscount2').readOnly = false;
            document.getElementById('txtDiscount1').readOnly = true;
            document.getElementById('txtDiscount2').value = "";
        }
    });

    $('#btn-discount-submit').on("click", function(e) {
        alert("test");
    });
});