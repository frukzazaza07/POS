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
    //เรียกดูค่า value ของปุ่มที่กด  ตอนแรกใช้เป็นไอดีไม่ได้ แต่พอเปลี่ยนเป็นใช้คลาสได้
    function addPropertyForMenu() {
        $(".aside-grid-item-detail").css("grid-template-rows", "repeat(12, 30px)");
    }

    var valueOfText1;
    var valueOfText;
    var count1 = 0;
    var totalAddPrice = new Array();



    function addMenuTest() {}
    var menuCheck = new Array();
    var count = 0;


    //ใช้ดูดค่า value ปุ่มที่ถูกกด

    $('.btn-secondary').click(function() {

        var valueOfButton = $(this).val();
        valueOfButtonInt = parseInt(valueOfButton);
        var templateAddMenu = "<div class='grid-item-head menu'  value='" + product[valueOfButton].productId + "'>\
            <span id='product-name' value='" + product[valueOfButton].productId + "'>" + product[valueOfButton].productName + "</span>\
        </div>\
        <div class='grid-item-head' >\
            <span id='product-price'>" + product[valueOfButton].productPrice + "</span>\
        </div>\
        <div class='grid-item-head div-menu-productId' id='' onclick='' name= '' >\
            <input id='" + valueOfButton + "' min = '1' onchange='' class='product-quantity' type='number' value='1' autofocus></div>\
            <div class='grid-item-head'>\
            <span id='productTotalId-" + product[valueOfButton].productId + "' class='testchange'></span>\
        </div>\
        <div class='grid-item-head'>\
            <span id='product-delete'>x</span> </div>";
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



        } else {
            count1++;
            //console.log(count1);
            totalAddPrice[valueOfButton] = 0;
            console.log(totalAddPrice);
            menuCheck.push(valueOfButton);
            // valueOfTextNumber = $("#" + valueOfButton).val();
            //textTotalPrice = document.getElementById("productTotalId-" + valueOfButtonInt);
            //valueOfTextNumber = parseInt(valueOfTextNumber);
            //textTotalPrice.innerHTML = quantityTotal;
            $(".aside-grid-item-detail").append(templateAddMenu);

            //console.log(templateAddMenu);
            // console.log(menuCheck);

            //break;
        }



        /*for (var i = 0; i < totalAddPrice.length; i++) {
            console.log(totalAddPrice[i]);
            test1 += totalAddPrice[i];
            console.log(test1);
            //var test2 = test2 + test1;
        }*/

        calPriceOnButtonClick(valueOfButtonInt);
        addPropertyForMenu();

        onInputQuantityChange()

        // console.log(valueOfButton);
    });

    /*************************   เป็นการ set value เวลาคลิก
     * <input type="button" value="Set Value" onclick="calc.input.value='Set Value'"> ***************************
     * 
     */
    addMenuTest();



    function onInputQuantityChange() {
        $('.product-quantity').click(function() {

            var valueOfText = $(this).attr('id')
                //var valueOfText = $(this).val();
                //console.log(valueOfText);
            valueOfTextInt = parseInt(valueOfText);
            // console.log(valueOfTextInt);
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
        });
        $('.product-quantity').change(function() {

            var valueOfText = $(this).attr('id')
                //var valueOfText = $(this).val();

            valueOfTextInt = parseInt(valueOfText);
            // console.log(valueOfTextInt);
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
        var sumTotalPrice = 0;
        console.log(totalAddPrice);
        totalAddPrice.forEach(testforeach);

        function testforeach(item) {

            sumTotalPrice += item;
            console.log(sumTotalPrice);
            return sumTotalPrice;

        }
        calTotalEndPrice(sumTotalPrice);
        //totalAddPrice.splice(valueOfButtonInt, 1, quantityTotal);

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
        var totalPriceInt = parseInt(totalPrice);
        var textTotalbeforeVat = document.getElementById("total-beforeVat");
        var textTotalVat = document.getElementById("total-vat");
        var textTotalafterVat = document.getElementById("total-afterVat");
        var textTotalPay = document.getElementById("total-pay");
        var textTotalCashBack = document.getElementById("total-cashBack");

        textTotalbeforeVat.innerHTML = totalPrice - (totalPrice * 7 / 100) + " บาท";
        textTotalVat.innerHTML = totalPrice * 7 / 100 + " บาท";
        textTotalafterVat.innerHTML = totalPrice + " บาท";

    }
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



function addMenu() {



    /*productNameHTML.innerHTML = this.product[i].productName;
    console.log(this.product[i].productName);*/

    /*var templateDetail = "<div class='grid-item-head'>\
    <span id='product-name'>" + this.product[i].productName + "</span>\
</div>\
<div class='grid-item-head'>\
    <span id='product-price'>500</span>\
</div>\
<div class='grid-item-head'>\
    <input id='product-quantity' type='number' value='1' autofocus>\
</div>\
<div class='grid-item-head'>\
    <span id='product-total'>500</span>\
</div>\
<div class='grid-item-head'>\
    <span id='product-delete'>x</span></div>";
    $("#aside-grid-item-detail").append(templateDetail);*/

}

/*$(document).ready(function() {
});*/



/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/