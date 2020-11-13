$("#formSearch").submit(function(event) {
    var txtFirstDate = document.getElementById("firstDate").value;
    var txtEndDate = document.getElementById("endDate").value;
    //alert(txtFirstDate);
    //alert(txtEndDate);
    //alert("form click5555555555555555");
    $.ajax({
        url: "php/deletebill.php",
        type: "GET",
        data: {
            deleteStatus: "delete",
            firstDate: txtFirstDate,
            endDate: txtEndDate
        },
        cache: false,

        success: function(dataResult) {
            var data = JSON.parse(dataResult);
            //alert(data["dataOrders"]);
            // alert(data.dataOrders);
            $('.section-item-11').remove();

            for (var i = 0; i < data["dataOrders"].length; i++) { // เครื่องหมาย ' "" จำให้ดีเลย
                var templateBillId = "<div class='section-item-11'><a href='#' class='a-bill-id' id='" + data["dataOrders"][i][0] + "' value='' onclick=" + "showDetailFromBill('" + data["dataOrders"][i][0] + "')" + ">" + data["dataOrders"][i][0] + "</a></div>";

                $('.bill-item').append(templateBillId); //เวลา onclick ="test('id')" ต้องทำให้อยู่รูปแบบนี้ เครื่องหมาย ' ""มีผล 
            }
            // var templateBtnDelete = "  <button class='btn btn-primary' type='submit' onclick='deleteBillFromBillId(+ data["dataOrders"][i][0] +)' id='btn-discount-submit'>ลบรายการ</button>";



        }
    });

    event.preventDefault();
});

var orderBillId;

function showDetailFromBill(billId) {
    orderBillId = billId;
    //alert(billId);
    //var ordersId = document.getElementById("billId");
    //document.getElementById("billId").style.backgroundColor = "#979797";
    //document.getElementsByClassName("a-bill-id").style.backgroundColor = "red";
    $('.delete-grid-detail').remove();

    document.getElementById("div-delete-detail").innerHTML = "";
    $(".a-bill-id").css('background-color', '');
    document.getElementById("" + billId + "").style.backgroundColor = "#979797";


    $.ajax({
        url: "php/deletebill.php",
        type: "GET",
        data: {
            deleteStatus: "deleteDetail",
            billId: billId,
        },
        cache: false,

        success: function(dataResult) {
            var data = JSON.parse(dataResult);
            //alert(data["status"]);
            //alert(dataResult);
            var divDeleteDetail = document.createElement("div");
            divDeleteDetail.setAttribute("class", "delete-grid-detail");
            $('.bill-content').append(divDeleteDetail);
            var templateBillDetailId = "<div class='bill-detail-id' id='billId'>" + data["dataOrdersDetail_id"] + "</div>";
            $('.div-delete-detail').append(templateBillDetailId);
            //<div class='bill-detail-menu'>ข้าว</div><div class='bill-detail-total'>1000</div>
            for (i = 0; i < data["dataOrders"].length; i++) {
                for (j = 0; j < data["dataOrders"][i].length; j++) {
                    var templateBillDetail = "<div class='bill-detail-detail' id='bill-detail-id'>" + data["dataOrders"][i][j] + "(" + data["dataOrders"][i][1] + ")</div><div>" + data["dataOrders"][i][2] + "</div><div>" + data["dataOrders"][i][3] + "</div>";
                    $('.delete-grid-detail').append(templateBillDetail);
                    j += 3;

                }
            }
            var templateBillDetailId = "<div class='bill-detail-total'><b>ราคารวม: </b>" + data["dataOrdersDetail_total"] + "</div>"
            $('.div-delete-detail').append(templateBillDetailId);
            window.location.hash = '#billId';
            //alert(data["dataOrders"]);
            //alert(data["dataOrders"]);
            // alert(data.dataOrders);



        }
    });

}

function deleteBillFromBillId(billId) {
    var result = confirm("ต้องการลบเลขที่บิล: " + billId + " ใช่หรือไม่");
    if (result) {
        $.ajax({
            url: "php/deletebill.php",
            type: "GET",
            data: {
                deleteStatus: "confirm",
                billId: billId,
            },
            cache: false,

            success: function(dataResult) {
                alert(dataResult);
                location.reload();


            }
        });
    } else {

    }

}