$(document).ready(function() {
    var productNameHTML = document.getElementById('product-name');
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

    $.ajax({
        url: "php/products.php",

        cache: false,

        success: function(dataResult) {
            var data = JSON.parse(dataResult);
            if (data.statusCode == 200) {


                var getInput = data.billId;
                //alert(getInput);
                localStorage.setItem("billId", getInput);
                //location.href = "bill.html";
                window.open("bill.html");
                location.reload();
                // alert(data.billRc);
                //  alert(data.good);
                //location.href = "index.php";

            } else if (data.statusCode == 201) {

            }

        }
    });

    var product = [{
            productId: "0",
            productName: "ปูไข่ดอง",
            productPrice: 200,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        }, {
            productId: "1",
            productName: "กุ้งเผา",
            productPrice: 500,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "2",
            productName: "ข้าวผัดกุ้ง",
            productPrice: 100,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "3",
            productName: "ปูเผา",
            productPrice: 300,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "4",
            productName: "ปลาหมึกย่าง",
            productPrice: 350,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {

            productId: "5",
            productName: "หอยหวาน",
            productPrice: 200,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "6",
            productName: "หอยแมลงภู่นิวซีแลนด์",
            productPrice: 80,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "7",
            productName: "น้ำเปล่า",
            productPrice: 30,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {

            productId: "8",
            productName: "test",
            productPrice: 200,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "9",
            productName: "test",
            productPrice: 80,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "10",
            productName: "test",
            productPrice: 30,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {

            productId: "11",
            productName: "test",
            productPrice: 200,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "12",
            productName: "test",
            productPrice: 80,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "13",
            productName: "test",
            productPrice: 30,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {

            productId: "14",
            productName: "test",
            productPrice: 200,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "15",
            productName: "test",
            productPrice: 80,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },
        {
            productId: "16",
            productName: "test",
            productPrice: 30,
            productQuantity: 1,
            productTotal: productPrice * productQuantity,
            productDelete: productDelete
        },

    ];

    /*$(document).ready(function() {
                $('.my_button').click(function() {
                    alert($(this).val());
                });*/

    // /คือการให้ String ขึ้นบรรทัดใหม่ได้


    //*******เป็นการใช้ฟังชั่น replace แทนค่า String */
    // var template = "<div class='div-btn-menu'> \
    //<button id='btn-menu' class='btnmenu btn-secondary' value='" + product[i].productId + "'>" + product[i].productName + "</button></div> ";
    for (var i = 0; i < product.length; i++) {
        //var that_product = template;
        //that_product = that_product.replace("เมนูต่าง ๆ", product[i].productName);
        //that_product = document.getElementsById("btn-menu").setAttribute("value", "product[i].productId");
        // that_product = that_product.replace("---productid---", product[i].productId);
        var template = "<div class='div-btn-menu'> \
<button id='btn-menu' class='btnmenu btn-secondary' value='" + product[i].productId + "'>" + product[i].productName + "</button></div> ";
        $("#grid-menu-button").append(template);
        // console.log($("#btn-menu").val(i));
        //console.log(product[i].productId + " " + product[i].productName);
        //console.log(template);

    }


    // 2 อันนี้ย้ายออกมาจาก addPropertyForMenu() นี้
    var menuCheck = new Array();
    var menuQuantity = new Array();
    var sumTotalPrice;
    var sumTotalPrice_discount;
    var discountValue = false;
    var finish = false;
    var txtdiscount;
    //เรียกดูค่า value ของปุ่มที่กด  ตอนแรกใช้เป็นไอดีไม่ได้ แต่พอเปลี่ยนเป็นใช้คลาสได้
    function addPropertyForMenu() {
        $(".aside-grid-item-detail").css("grid-template-rows", "repeat(12, 30px)");
    }

    var valueOfText1;
    var valueOfText;
    var count1 = 0;
    var totalAddPrice = new Array();





    //console.log(valueOfTextNumber1);

    var count = 0;


    //ใช้ดูดค่า value ปุ่มที่ถูกกด

    $('.btnmenu').click(function() {

        var valueOfButton = $(this).val();
        valueOfButtonInt = parseInt(valueOfButton);
        var templateAddMenu = "<div class='grid-item-blox-menu' id='group-" + product[valueOfButton].productId + "' > <div class='grid-item-head menu'  value='" + product[valueOfButton].productId + "'>\
            <span id='product-name' value='" + product[valueOfButton].productId + "'>" + product[valueOfButton].productName + "</span>\
        </div>\
        <div class='grid-item-head' >\
            <span id='product-price'>" + product[valueOfButton].productPrice + "</span>\
        </div>\
        <div class='grid-item-head div-menu-productId' id='' onclick='' name= '' >\
            <input id='" + valueOfButton + "' name='quantity" + valueOfButton + "' min = '1' onchange='' class='product-quantity' type='number' value='1' autofocus></div>\
            <div class='grid-item-head'>\
            <span id='productTotalId-" + product[valueOfButton].productId + "' class='testchange'></span>\
        </div>\
        <div class='grid-item-head'>\
            <span id='product-delete' ><a href='#' class='delete-product' id='" + valueOfButton + "'  value='" + product[valueOfButton].productId + "'>X</a></span> </div></div>";

        var valueOfQuantity;
        var valueOfQuantityInt;
        for (var i = 0; i < menuCheck.length; i++) {
            if (menuCheck[i] == valueOfButton) {
                count++;
            }
            //console.log(menuCheck);
        }
        //console.log(menuCheck);
        if (count > 0) {
            count = 0;

            var valueOfTextNumber = $("#" + valueOfButton).val();
            //console.log(test);
            //console.log(valueOfTextNumber);
            valueOfTextNumber = parseInt(valueOfTextNumber);
            //console.log(valueOfTextNumber);
            var textNumber = document.getElementById(valueOfButton);


            textNumber.value = valueOfTextNumber += 1;

            valueOfQuantity = $("input[name=quantity" + valueOfButton + "]").val();
            valueOfQuantityInt = parseInt(valueOfQuantity);
            menuQuantity.splice(valueOfButtonInt, 1, valueOfQuantityInt += 1 - 1);
            //console.log(menuQuantity);

        } else {



            count1++;
            //console.log(count1);
            totalAddPrice[valueOfButton] = 0;

            // console.log(totalAddPrice);
            menuCheck.push(valueOfButton); //W************** ใช้ push
            //menuCheck[valueOfButton] = valueOfButton;
            // valueOfTextNumber = $("#" + valueOfButton).val();
            //textTotalPrice = document.getElementById("productTotalId-" + valueOfButtonInt);
            //valueOfTextNumber = parseInt(valueOfTextNumber);
            //textTotalPrice.innerHTML = quantityTotal;
            console.log(menuCheck);
            $(".aside-grid-item-detail").append(templateAddMenu);

            valueOfQuantity = $("input[name=quantity" + valueOfButton + "]").val();
            valueOfQuantityInt = parseInt(valueOfQuantity);

            menuQuantity[valueOfButton] = valueOfQuantityInt;
            // console.log(valueOfQuantity);
            // menuQuantity.splice(valueOfButtonInt, 1, valueOfQuantityInt);
            //console.log(menuQuantity);
            //console.log(templateAddMenu);


            //break;
        }



        /*for (var i = 0; i < totalAddPrice.length; i++) {
            console.log(totalAddPrice[i]);
            test1 += totalAddPrice[i];
            console.log(test1);
            //var test2 = test2 + test1;
        }*/
        //discount();
        calPriceOnButtonClick(valueOfButtonInt);
        addPropertyForMenu();
        deleteProduct();
        onInputQuantityChange();

        // console.log(valueOfButton);
    });

    /*************************   เป็นการ set value เวลาคลิก
     * <input type="button" value="Set Value" onclick="calc.input.value='Set Value'"> ***************************
     * 
     */




    function onInputQuantityChange() {
        $('.product-quantity').click(function() {


            var valueOfText = $(this).attr('id')
                //var valueOfText = $(this).val();
                //console.log(valueOfText);
            valueOfTextInt = parseInt(valueOfText);

            valueOfQuantity = $("input[name=quantity" + valueOfTextInt + "]").val();
            valueOfQuantityInt = parseInt(valueOfQuantity);

            //console.log(valueOfTextInt);
            menuQuantity.splice(valueOfTextInt, 1, valueOfQuantityInt += 1 - 1);
            console.log(menuQuantity);

            valueOfTextNumber = $("#" + valueOfText).val();
            valueOfTextNumberInt = parseInt(valueOfTextNumber);


            //console.log(valueOfTextNumberInt);

            if (valueOfTextNumberInt < 1) {
                document.getElementById(valueOfTextInt).value = "1";
                valueOfTextNumberInt = 1;
            }
            var textTotalPrice = document.getElementById("productTotalId-" + valueOfTextInt);
            var totalOfPrice = product[valueOfTextInt].productPrice * valueOfTextNumberInt;
            textTotalPrice.innerHTML = totalOfPrice;

            totalAddPrice.splice(valueOfTextInt, 1, totalOfPrice);
            sumTotalPrice = 0;
            // console.log(totalAddPrice);
            totalAddPrice.forEach(testforeach);
            calTotalEndPrice(sumTotalPrice);
        });
        $('.product-quantity').change(function() {

            var valueOfText = $(this).attr('id')
                //var valueOfText = $(this).val();

            valueOfTextInt = parseInt(valueOfText);
            // console.log(valueOfTextInt);
            valueOfQuantity = $("input[name=quantity" + valueOfTextInt + "]").val();
            valueOfQuantityInt = parseInt(valueOfQuantity);

            //console.log(valueOfTextInt);
            menuQuantity.splice(valueOfTextInt, 1, valueOfQuantityInt += 1 - 1);
            //console.log(menuQuantity);

            valueOfTextNumber = $("#" + valueOfText).val();
            valueOfTextNumberInt = parseInt(valueOfTextNumber);

            /*menuQuantity.splice(valueOfTextNumberInt, 1, valueOfTextNumber += 1 - 1);
            console.log(menuQuantity);*/
            //console.log(valueOfTextNumberInt);
            if (valueOfTextNumberInt < 1) {
                document.getElementById(valueOfTextInt).value = "1";
                valueOfTextNumberInt = 1;
            }
            var textTotalPrice = document.getElementById("productTotalId-" + valueOfTextInt);
            var totalOfPrice = product[valueOfTextInt].productPrice * valueOfTextNumberInt;
            textTotalPrice.innerHTML = totalOfPrice;
            totalAddPrice.splice(valueOfTextInt, 1, totalOfPrice);
            sumTotalPrice = 0;
            //console.log(totalAddPrice);
            totalAddPrice.forEach(testforeach);
            calTotalEndPrice(sumTotalPrice);
        });

    }






    function calPriceOnButtonClick(valueOfButtonInt) {


        // $('.btn-secondary').click(function() {

        //var valueOfButtonInt;
        //var valueOfButton;
        var valueOfTextNumber
        var valueOfButtonForPrice;
        var quantityTotal;
        var textTotalPrice;

        //valueOfButton = $(this).val();
        // console.log(valueOfButtonInt);
        //valueOfButtonInt = parseInt(valueOfButton);
        valueOfQuantityTotal = $("#" + valueOfButtonInt).val();
        //console.log(valueOfQuantityTotal);
        //valueOfButtonForPrice = $(this).val();
        quantityTotal = product[valueOfButtonInt].productPrice * valueOfQuantityTotal;

        //console.log(valueOfQuantityTotal);
        //console.log(quantityTotal);
        valueOfTextNumber = $("#" + valueOfButtonInt).val();
        //console.log(valueOfButtonInt);
        textTotalPrice = document.getElementById("productTotalId-" + valueOfButtonInt);
        /*console.log(valueOfButtonInt);
        console.log(textTotalPrice);
        console.log(quantityTotal);*/
        valueOfTextNumber = parseInt(valueOfTextNumber);
        textTotalPrice.innerHTML = quantityTotal;



        //*************************ต้องทำตรงนี้ต่อวิธีรวม */
        /*
        valueOfText = $('.testchange').text()
        valueOfText1 = parseInt(valueOfText);
        test3 = test3 + valueOfText1;
        valueOfText1 = 0;
        console.log(test3);
        */

        //อันนี้ เป็นวิธีแอดอาเรย์โดยใช้คีย์

        //totalAddPrice["productId" + valueOfButtonInt] = quantityTotal;
        totalAddPrice.splice(valueOfButtonInt, 1, quantityTotal);
        /* ใช้
        for (var i = 0; i < count1; i++) {

            test3 += totalAddPrice["productId" + i];
            console.log(test3);
        }
        console.log(totalAddPrice);
        calTotalEndPrice(test3)
        console.log(test3);
        สินสุด*/
        sumTotalPrice = 0;
        //console.log(totalAddPrice);
        totalAddPrice.forEach(testforeach);


        calTotalEndPrice(sumTotalPrice);
        //totalAddPrice.splice(valueOfButtonInt, 1, quantityTotal);

    }
    //ตอนแรกเอา function นี้ไว้ใน function calPriceOnButtonClick บรรทัด 318
    function testforeach(item) {

        sumTotalPrice += item;
        //console.log(sumTotalPrice);
        return sumTotalPrice;

    }
    //********************** ตรงนี้ calPriceOnButtonClick();
    //console.log(test3);
    //calTotalEndPrice(test1);

    /*  ใช้ใช้ *****************
         totalAddPrice.forEach(testforeach);
        function testforeach(item) {

            test3 += item;
            console.log(test3);

        }
    */
    function calTotalEndPrice(totalPrice) {
        /*var totalPriceEnd = [];
        totalPriceEnd = totalPrice;
        var test = 0;
        for (var i = 0; i < totalPriceEnd.length; i++) {
            test += totalPriceEnd[i];
        }*/

        var discount1 = document.getElementById("discount1").checked;
        var discount2 = document.getElementById("discount2").checked;
        var discountFrom = 0;
        var totalPriceInt = parseInt(totalPrice);

        //console.log(totalPriceInt);
        //var discount = discount();
        var totalPriceAfterDiscount;
        var texttotalPriceAfterDiscount = document.getElementById("total-after-discount");
        var textTotalbeforeVat = document.getElementById("total-beforeVat");
        var textTotalVat = document.getElementById("total-vat");
        var textTotalafterVat = document.getElementById("total-afterVat");
        var textTotalPay = document.getElementById("total-pay");
        var textTotalCashBack = document.getElementById("total-cashBack");
        var texttotaldiscount = document.getElementById("total-discount");
        texttotaldiscount.innerHTML = 0 + " บาท";
        if (discount1 == true) {
            discountFrom = $("#hiddenDiscount").val();
            discountValue = true;
            txtdiscount = discountFrom;
            totalPriceAfterDiscount = totalPrice - (totalPrice * discountFrom / 100);
            texttotaldiscount.innerHTML = discountFrom + " %";
            sumTotalPrice_discount = totalPriceAfterDiscount;
            texttotalPriceAfterDiscount.innerHTML = totalPriceAfterDiscount + " บาท";
            sumTotalPrice = totalPrice;
            //console.log(sumTotalPrice);
            $("#hiddenDiscount").val(0);
        } else if (discount2 == true) {
            discountFrom = $("#hiddenDiscount").val();
            txtdiscount = discountFrom;
            totalPriceAfterDiscount = totalPrice - discountFrom;
            sumTotalPrice_discount = totalPriceAfterDiscount;
            //console.log(sumTotalPrice);
            discountValue = true;
            texttotalPriceAfterDiscount.innerHTML = totalPriceAfterDiscount + " บาท";
            texttotaldiscount.innerHTML = discountFrom + " บาท";
            sumTotalPrice = totalPrice;
            //console.log(sumTotalPrice);
            $("#hiddenDiscount").val(0);
        } else {
            totalPriceAfterDiscount = totalPrice - discountFrom;
            texttotalPriceAfterDiscount.innerHTML = totalPriceAfterDiscount + " บาท";
        }
        //sumTotalPrice = totalPriceAfterDiscount;


        textTotalbeforeVat.innerHTML = totalPrice - (totalPrice * 7 / 100) + " บาท";
        textTotalVat.innerHTML = totalPrice * 7 / 100 + " บาท";
        textTotalafterVat.innerHTML = totalPrice + " บาท";
        //discount();


    }

    $('#total-pay').change(function() {
        if (discountValue == true) {
            totalPayCashBack(sumTotalPrice_discount);
        } else {
            totalPayCashBack(sumTotalPrice);
        }
        //   console.log(totalPriceInt);
    });

    function totalPayCashBack(sumTotalPrice) {
        var totalPay = $('#total-pay').val();
        //console.log(sumTotalPrice);
        var totalCashBack = document.getElementById("total-cashBack");
        var backgroundCashBack = document.getElementById("grid-item-cashback");
        var totalChange = 0;
        var errorPay = document.getElementById("error-pay");
        if (totalPay < 1 || totalPay < sumTotalPrice) {
            document.getElementById("total-pay").value = "";
            errorPay.style.color = "red";
            errorPay.innerHTML = "เงินไม่พอชำระ!!";
            totalCashBack.innerHTML = "";
            backgroundCashBack.style.backgroundColor = "silver";

        } else if (totalPay >= sumTotalPrice) {
            /*console.log(totalPay);
            console.log(sumTotalPrice);*/
            finish = true;
            errorPay.innerHTML = "";
            totalChange = totalPay - sumTotalPrice;
            backgroundCashBack.style.fontSize = "20px";
            backgroundCashBack.style.backgroundColor = "#7FFF00";
            totalCashBack.innerHTML = totalChange;
        }
    }


    function deleteProduct() {
        $('.delete-product').click(function() {
            var deleteId1 = $(this).attr('id');
            deleteId1 = parseInt(deleteId1);
            console.log(deleteId1);
            var arrayIndex = menuCheck.indexOf("" + deleteId1);
            console.log(arrayIndex);
            $('#group-' + deleteId1).remove();
            totalAddPrice.splice(deleteId1, 1, 0);
            if (arrayIndex >= 0) {
                menuCheck.splice(arrayIndex, 1);
            } else {

            }
            //menuCheck.remove(arrayIndex);
            console.log(menuCheck);
            sumTotalPrice = 0;
            //console.log(totalAddPrice);
            //console.log(menuCheck);
            //console.log(totalAddPrice);
            totalAddPrice.forEach(testforeach);
            calTotalEndPrice(sumTotalPrice);
            deleteId1 = "";
            arrayIndex = "";

        });

    }
    discount()

    function discount() {
        var discount1;
        var discount2;
        var count = 0;
        $('#discount1').on("click", function(e) {
            discount1 = document.getElementById("discount1").checked;

            if (discount1 == true && count == 0) {
                count++;
                document.getElementById('txtDiscount1').readOnly = false;
                document.getElementById('txtDiscount2').readOnly = true;
                document.getElementById('txtDiscount1').value = "";
                /*$("#txtDiscount1").keydown(function() {
                    txtDiscount2 = $("#txtDiscount2").val();
                    errorDiscount1 = document.getElementById("error-discount1")
                    errorDiscount2 = document.getElementById("error-discount2")
                    if (isNaN(txtDiscount1) || isNaN(txtDiscount2)) {
                        errorDiscount1.innerHTML = "ระบุตัวเลข";
                    }
                });*/
            } else if (discount1 == true && count > 0) {
                document.getElementById('txtDiscount1').readOnly = false;
                document.getElementById('txtDiscount2').readOnly = true;
                document.getElementById('txtDiscount1').value = "";
                document.getElementById('txtDiscount2').value = "";
            }

        });
        $('#discount2').on("click", function(e) {
            discount2 = document.getElementById("discount2").checked;
            if (discount2 == true && count == 0) {
                count++;
                document.getElementById('txtDiscount2').readOnly = false;
                document.getElementById('txtDiscount1').readOnly = true;
                document.getElementById('txtDiscount2').value = "";
            } else if (discount1 == true && count > 0) {
                document.getElementById('txtDiscount2').readOnly = false;
                document.getElementById('txtDiscount1').readOnly = true;
                document.getElementById('txtDiscount2').value = "";
                document.getElementById('txtDiscount1').value = "";
            }
        });

        $('#btn-discount-submit').on("click", function(e) {
            discount1 = document.getElementById("discount1").checked;
            discount2 = document.getElementById("discount2").checked;
            txtDiscount1 = $("#txtDiscount1").val();
            txtDiscount2 = $("#txtDiscount2").val();
            var hiddenDiscount = document.getElementById("hiddenDiscount");
            errorDiscount1 = document.getElementById("error-discount1")
            errorDiscount2 = document.getElementById("error-discount2")
            if (txtDiscount1 == "" || txtDiscount2 == "") {
                if (discount1 == true) {
                    errorDiscount1.innerHTML = "*ระบุตัวเลข";
                    errorDiscount2.innerHTML = "";

                } else {
                    errorDiscount2.innerHTML = "*ระบุตัวเลข";
                    errorDiscount1.innerHTML = "";
                }
            } else if (isNaN(txtDiscount1) || isNaN(txtDiscount2)) {
                if (discount1 == true) {
                    errorDiscount1.innerHTML = "*ระบุตัวเลข";
                    errorDiscount2.innerHTML = "";
                } else {
                    errorDiscount2.innerHTML = "*ระบุตัวเลข";
                    errorDiscount1.innerHTML = "";
                }
            } else if ((!isNaN(txtDiscount1) || !isNaN(txtDiscount2)) && (txtDiscount1 != "" || txtDiscount2 != "")) {
                if (discount1 == true) {
                    //document.getElementById("btn-discount-submit").setAttribute("data-toggle", "modal");
                    $('#myModal').modal('hide');
                    document.getElementById("total-discount").innerHTML = txtDiscount1 + " บาท";
                    //discount1(txtDiscount1);
                    //console.log($("#txtDiscount1").val());
                    document.getElementById("hiddenDiscount").value = txtDiscount1; // sumTotalPrice * txtDiscount1 / 100
                    calTotalEndPrice(sumTotalPrice);
                    //console.log(sumTotalPrice);
                    //$("#txtDiscount1").val(0);
                    //$("#hiddenDiscount").val(txtDiscount1);
                    //return $("#txtDiscount1").val();
                } else {
                    $('#myModal').modal('hide');
                    document.getElementById("total-discount").innerHTML = txtDiscount2 + " บาท";
                    //discount1(txtDiscount2);
                    //console.log(txtDiscount2);
                    //return $("#txtDiscount2").val();
                    document.getElementById("hiddenDiscount").value = txtDiscount2;
                    //console.log(sumTotalPrice);
                    calTotalEndPrice(sumTotalPrice);
                    //$("#txtDiscount2").val(0);
                    //$("#hiddenDiscount").val(txtDiscount2);
                }

            }

        });
    }

    /*function discount1(discount) {
        return discount;
    }*/

    $("#btn-confirm").on("click", function(e) {

        if (finish == true && discountValue == true) {
            var menuCheckPhp = JSON.stringify(menuCheck);
            var menuQuantityPhp = JSON.stringify(menuQuantity);
            var totalAddPricePhp = JSON.stringify(totalAddPrice);

            $.ajax({
                url: "php/insert.php",
                type: "POST",
                data: {
                    sumTotalPrice: sumTotalPrice,
                    sumTotalPriceDiscount: sumTotalPrice_discount,
                    sellMenu: menuCheckPhp,
                    quantityMenu: menuQuantityPhp,
                    totalAddPrice: totalAddPricePhp,
                    txtDiscount: txtdiscount,
                    discountValue: discountValue,

                },
                cache: false,

                success: function(dataResult) {
                    //alert(dataResult);
                    //location.href = "index.php";
                    var data = JSON.parse(dataResult); // เหมือน function แปลงค่าเป็นตัวเลขมั้ง เพื่อนนำมาใช้เปรียบเทียบที่ if else

                    //alert(dataResult);
                    if (data.statusCode == 200) {


                        var getInput = data.billId;
                        //alert(getInput);
                        localStorage.setItem("billId", getInput);
                        //location.href = "bill.html";
                        window.open("bill.html");
                        location.reload();
                        // alert(data.billRc);
                        //  alert(data.good);
                        //location.href = "index.php";

                    } else if (data.statusCode == 201) {
                        alert(data.error);
                        //  alert("ไม่สามารถบันทึกข้อมูลการขายได้" + data.error);
                    }
                    /*
                            var dataResult = JSON.parse(dataResult);
                            if (dataResult.statusCode == 200) {
    
                                //location.href = "index.php";
    
                            } else if (dataResult.statusCode == 201) {
                                alert("Error occured !");
                            } else if (dataResult.statusCode == 202) {
                                errorUsername.innerHTML = "ชื่อผู้ใช้ซ้ำ!!";
                                $('#txt_username').focus()
                            }*/

                }
            });
        } else if (finish == true && discountValue == false) {
            var menuCheckPhp = JSON.stringify(menuCheck);
            var menuQuantityPhp = JSON.stringify(menuQuantity);
            var totalAddPricePhp = JSON.stringify(totalAddPrice);

            $.ajax({
                url: "php/insert.php",
                type: "POST",
                data: {
                    sumTotalPrice: sumTotalPrice,
                    sellMenu: menuCheckPhp,
                    quantityMenu: menuQuantityPhp,
                    totalAddPrice: totalAddPricePhp,
                },
                cache: false,

                success: function(dataResult) {
                    //location.href = "index.php";
                    //alert(dataResult);
                    var data = JSON.parse(dataResult); // เหมือน function แปลงค่าเป็นตัวเลขมั้ง เพื่อนนำมาใช้เปรียบเทียบที่ if else

                    //alert(dataResult);
                    if (data.statusCode == 200) {


                        var getInput = data.billId;
                        //alert(getInput);
                        localStorage.setItem("billId", getInput);
                        //location.href = "bill.html";
                        window.open("bill.html");
                        location.reload();
                        // alert(data.billRc);
                        //  alert(data.good);
                        //location.href = "index.php";

                    } else if (data.statusCode == 201) {
                        alert(data.error);
                        //  alert("ไม่สามารถบันทึกข้อมูลการขายได้" + data.error);
                    }
                    /*
                            var dataResult = JSON.parse(dataResult);
                            if (dataResult.statusCode == 200) {
    
                                //location.href = "index.php";
    
                            } else if (dataResult.statusCode == 201) {
                                alert("Error occured !");
                            } else if (dataResult.statusCode == 202) {
                                errorUsername.innerHTML = "ชื่อผู้ใช้ซ้ำ!!";
                                $('#txt_username').focus()
                            }*/

                }
            });
        } else {
            if (discountValue == true) {
                totalPayCashBack(sumTotalPrice_discount);
            } else {
                totalPayCashBack(sumTotalPrice);
            }

        }
    });
});


/*
function calPriceOnTextChange() {
    /*Jquery $( ".target" ).change(function() {
  alert( "Handler for .change() called." );
});

    $('.btn-secondary').click(function() {
        var valueOfButton = $(this).val();

        $("#productQuantityId-" + product[valueOfButton].productId).change(function() {
            valueOfTextNumber = $("#productQuantityId-" + valueOfButtonInt).val();
            valueOfTextNumberInt = parseInt(valueOfTextNumber);
            var test = valueOfTextNumberInt * product[valueOfButton].productPrice;
            console.log(valueOfTextNumberInt);
            console.log(product[valueOfButton].productPrice);
            console.log(test);

            // 200 500 100
        });
    });
}*/
/*
     $("#productQuantityId-" + valueOfButtonInt).change(function() {
         var valueOfTextNumber = $(this).val();
         console.log(valueOfTextNumber);
         valueOfTextNumber = parseInt(valueOfTextNumber);
         var valueOfQuantityTotal = $("#productQuantityId-" + valueOfButtonInt).val();
         console.log(valueOfQuantityTotal);
         var valueOfButtonForPrice = $(this).val();
         var quantityTotal = product[valueOfButtonForPrice].productPrice * valueOfQuantityTotal;
         //console.log(valueOfQuantityTotal);
         console.log(quantityTotal);
         var valueOfTextNumber = $("#productQuantityId-" + valueOfButtonInt).val();
         var textNumber = document.getElementById("productTotalId-" + valueOfButtonInt);
         valueOfTextNumber = parseInt(valueOfTextNumber);
         textNumber.innerHTML = quantityTotal;
         //var templateTotalPrice = " <span id='product-total'>" + quantityTotal + "</span>";
         // $(".agrid-item-head").append(templateTotalPrice);
         //console.log(templateTotalPrice);
         // document.getElementById("product-total").innerHTML = quantityTotal;
         //return $('#product-total').innerHTML = quantityTotal;
         //document.write(quant

         var valueOfButton = $(this).val();
         console.log(document.getElementById("productQuantityId-" + product[valueOfButton].productId));
         //.onchange = function() { calPriceOnTextChange };
     });*/





/*$(document).ready(function() {
});*/



/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/