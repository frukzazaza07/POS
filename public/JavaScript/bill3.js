$(document).ready(function() {

    billId = localStorage.getItem("billId");
    $.ajax({
        url: "php/selectBill.php",
        type: "POST",
        data: {
            orderId: billId
        },
        cache: false,

        success: function(dataResult) {
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
            calBeforVat(data["dataOrders_detail_orderTotal"], data["dataOrders_detail_discounttotal"], data["dataOrders_detail_discounttext"]);
            calEnd(data["dataOrders_detail_orderTotal"], data["dataOrders_detail_discounttext"]);
            calVat(data["dataOrders_detail_orderTotal"]);
            calDiscount(data["dataOrders_detail_discounttotal"], data["dataOrders_detail_discounttext"])
        }
    });

    function calEnd(sumTotal, txtDiscount) {
        document.getElementById("calTotal").innerHTML = sumTotal;
        document.getElementById("calEnd").innerHTML = sumTotal - txtDiscount; //ต้องแก้ลบ discount
        //return 
    }

    function calBeforVat(sumTotal, sumTotalDiscount, txtDiscount) {


        if (sumTotal > 0 && txtDiscount > 0) {
            document.getElementById("callBeforVat").innerHTML = sumTotalDiscount - (sumTotalDiscount * 0.07);
        } else {
            document.getElementById("callBeforVat").innerHTML = sumTotal - (sumTotal * 0.07);
        }
        //return 
    }

    function calDiscount(sumTotal, txtDiscount) {
        if (sumTotal > 0 && txtDiscount > 0) {
            document.getElementById("calDiscount").innerHTML = txtDiscount;
            document.getElementById("calAfterDiscount").innerHTML = sumTotal;
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

    function calVat(sumTotal) {
        document.getElementById("calVat").innerHTML = parseFloat(sumTotal * 0.07).toFixed(2);
    }


});