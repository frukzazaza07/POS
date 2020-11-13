$(document).ready(function () {

    billId = localStorage.getItem("billId");
    //alert(billId);
    $.ajax({
        url: "php/selectBill.php",
        type: "POST",
        data: {
            orderId: billId
        },
        cache: false,

        success: function (dataResult) {
            var data = JSON.parse(dataResult);

            //alert(data["dataOrders_detail_discounttext"]);
            //alert(data["dataOrders_detail_discounttotal"]);
            //location.href = "bill.html";

            // or simply
            //alert(data["data"][0]["ID"]);

            var templateSection1 = "<div class='section-item-1'>" + data["dataOrders_detail"] + "</div>";
            $('.section-content-1').append(templateSection1);



            /* for (var x in data["dataOrders"]) {
                 for (var y in data["dataOrders"][x]) {
                     console.log(data["dataOrders"][x][y]);

                     var templateSection2 = "<div class='section-item-2'>" + data["dataOrders"][x][y] + "</div>\
                                     <div class='section-item-2'>" + data["dataOrders"][x][y + 1] + "</div>\
                                     <div class='section-item-2'>" + data["dataOrders"][x][y + 2] + "</div>\
                                     <div class='section-item-2'>" + data["dataOrders"][x][y + 3] + "</div>";

                     $('.section-content-2').append(templateSection2);
                 }
             }*/

            for (var x = 0; x < data["dataOrders"].length; x++) {
                for (var y = 0; y < data["dataOrders"][x].length; y++) {
                    console.log(data["dataOrders"][x][y]);

                    var templateSection2 = "<div class='section-item-2'>" + data["dataOrders"][x][y] + "</div>";


                    $('.section-content-2').append(templateSection2);
                }
            }
            calBeforVat(data["dataOrders_detail_orderTotal"], data["dataOrders_detail_discounttotal"], data["dataOrders_detail_discounttext"], data["dataOrders_detail_discount_percen"]);
            calEnd(data["dataOrders_detail_orderTotal"], data["dataOrders_detail_discounttext"], data["dataOrders_detail_discount_percen"]);
            calVat(data["dataOrders_detail_orderTotal"], data["dataOrders_detail_discounttotal"]);
            calDiscount(data["dataOrders_detail_discounttotal"], data["dataOrders_detail_discounttext"], data["dataOrders_detail_discount_percen"])
        }
    });

    function calEnd(sumTotal, txtDiscountBath, txtDiscountPercen) {
        document.getElementById("calTotal").innerHTML = sumTotal + " บาท";
        if (sumTotal > 0 && txtDiscountBath > 0) {
            document.getElementById("calEnd").innerHTML = sumTotal - txtDiscountBath + " บาท";
        } else if (sumTotal > 0 && txtDiscountPercen > 0) {
            document.getElementById("calEnd").innerHTML = ((sumTotal * txtDiscountPercen) / 100) + " บาท";
        } else {
            document.getElementById("calEnd").innerHTML = sumTotal + " บาท";
        }


        //return 
    }

    function calBeforVat(sumTotal, sumTotalDiscount, txtDiscountBath, txtDiscountPercen) {
        if (sumTotalDiscount > 0 && txtDiscountBath > 0 || sumTotalDiscount > 0 && txtDiscountPercen > 0) {
            document.getElementById("callBeforVat").innerHTML = parseFloat(sumTotalDiscount - (sumTotalDiscount * 0.07)).toFixed(2) + " บาท";
        } else {
            document.getElementById("callBeforVat").innerHTML = parseFloat(sumTotal - (sumTotal * 0.07)).toFixed(2) + " บาท";
        }
        //return 
    }

    function calDiscount(sumTotalDiscount, txtDiscountBath, txtDiscountPercen) {
        if (sumTotalDiscount > 0 && txtDiscountBath > 0) {
            document.getElementById("calDiscount").innerHTML = txtDiscountBath + " บาท";
            document.getElementById("calAfterDiscount").innerHTML = sumTotalDiscount + " บาท";
        } else if (sumTotalDiscount > 0 && txtDiscountPercen > 0) {
            document.getElementById("calDiscount").innerHTML = txtDiscountPercen + " %";
            document.getElementById("calAfterDiscount").innerHTML = sumTotalDiscount + " บาท";
        } else {
            //document.getElementById("calDiscount_txt").innerHTML = "";
            $(".discount").remove();
            // document.getElementsByClassName("section-content-3").style.gridTemplateRows = "repeat(5, 1fr)"; ใช้ไม่ได้
            $(".section-content-3").css("grid-template-rows", "repeat(5, 1fr)"); //ใช้ได้

            /*document.getElementById("calAfterDiscount_txt").innerHTML = "";
            document.getElementById("calDiscount").innerHTML = "";
            document.getElementById("calAfterDiscount").innerHTML = "";*/
        }
        //return sumTotal - (sumTotal * 0.07); //ยังไม่ทำ
    }

    function calVat(sumTotal, sumTotalDiscount) {
        if (sumTotalDiscount > 0) {
            document.getElementById("calVat").innerHTML = parseFloat(sumTotalDiscount * 0.07).toFixed(2) + " บาท";
        } else {
            document.getElementById("calVat").innerHTML = parseFloat(sumTotal * 0.07).toFixed(2) + " บาท";
        }
    }


});