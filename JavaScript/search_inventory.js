let btnConflim = document.querySelector("#btnConflim");
var numberAllProduct = 0;
var listProductSearch = new Array();
var productId_forDelete = new Array();
var numberAllProduct_curlent = 0;
var productForInsert = new Array();
//var countDelete = 0;

function searchProduct(val) {
    //let txtSearchProduct = document.querySelector("#search-product-name");
    $.ajax({
        url: "php/search_product.php",
        type: "POST",
        //"txtData=" + val,
        data: {
            txtData: val,
            send: "search",
        },
        /*{
                    txtData: val,
                    //searchProduct: "search"
                },*/
        cache: false,
        beforeSend: function () {
            $(".error-info").remove();
            $(".rows-data").remove();
        },
        success: function (dataResult) {
            var data = JSON.parse(dataResult);

            // $("tbody").append("<tbody></tbody>");
            if (data["status"] == 201) {
                let templates_notfound =
                    "<span class='form-text text-danger error-info' id='notFound'>" +
                    data["error"] +
                    "</span>";
                $("tbody").append(templates_notfound);
            } else {
                // $("tbody").remove();
                console.log(data["data"]);
                for (let i = 0; i < data["data"].length; i++) {
                    // console.log(i);
                    //  let idProduct_string = String(data["data"][i][1]);
                    let templates =
                        '<tr class="rows-data" style="cursor:pointer;" id="' +
                        data["data"][i][1] +
                        '" onclick="selectData(\'' +
                        data["data"][i][1] +
                        '\')"><th style"text-align:cente">' +
                        data["data"][i][1] +
                        '</th><td style"text-align:cente">' +
                        data["data"][i][2] +
                        '</td><td style="text-align:center;"> ' +
                        data["data"][i][4] +
                        "</td> </tr>";
                    $("tbody").append(templates);
                }
            }
        },
    });
}
var countClick = 0;
var productClick = new Array();

function selectData(id) {
    let indexProduct = 0;
    let elemProduct = document.getElementById(id);
    //console.log(id);
    for (var i = 0; i < productClick.length; i++) {
        if (productClick[i] == id) {
            countClick++;
            indexProduct = productClick.indexOf(id);
        } else {}
    }
    //  console.log(productClick);
    console.log("นอกif" + countClick);
    //console.log(elemProduct);
    if (countClick == 0) {
        let errorInfo = document.querySelector("#error-info");
        errorInfo.innerHTML = "";
        productClick.push(id);
        //console.log(countClick);
        countClick = 0;
        elemProduct.style.backgroundColor = "#979797";
        elemProduct.classList.toggle("rows-data");
        /*$("#" + id).hover(function() {
                    $(this).css("opacity", "1");
                    
                });*/
        console.log(productClick);
    } else {
        productClick[indexProduct] = [];
        // console.log(productClick);
        countClick = 0;
        /* $("#" + id).hover(function() {
                     $(this).css("opacity", "0.5");
                 });*/
        elemProduct.classList.toggle("rows-data");
        elemProduct.style.backgroundColor = "";
        console.log(productClick);
    }
}

btnConflim.addEventListener("click", function () {
    let errEmpty = 0;
    for (let i = 0; i < productClick.length; i++) {
        if (productClick[i] == "") {} else {
            errEmpty++;
        }
    }
    if (errEmpty > 0) {
        $("#btnConflim").attr("data-dismiss", "modal");
        conflimSelect(productClick);
    } else {
        checkSelectEmpty();
    }
});

function checkSelectEmpty() {
    let errorInfo = document.querySelector("#error-info");
    errorInfo.innerHTML = "*โปรดเลือกสินค้า";
}

function conflimSelect(id) {
    let newProductList = new Array();
    newProductList = [];

    for (let i = 0; i < id.length; i++) {
        indexOfId = productId_forDelete.indexOf(id[i]);
        if (indexOfId >= 0) {
            id[i] = [];
        } else {}
        if (id[i] == "") {} else {
            //  console.log("asdasdasd");
            newProductList.push(id[i]);
        }
    }

    if (newProductList.length == 0) {} else {
        let listProductJson = JSON.stringify(newProductList);
        $.ajax({
            url: "php/search_product.php",
            type: "POST",
            data: {
                productList: listProductJson,
                send: "conflimSelect",
            },
            cache: false,
            beforeSend: function () {
                $("#product_search").text("Loading...");
                //btnConflim.innerHTML = "Loading...";
                //console.log(firstDate);
            },
            success: function (dataResult) {
                if (listProductSearch.length <= 0 && productId_forDelete.length <= 0) {
                    $(".form-product-item").remove();
                } else {}
                setTimeout(function () {
                    $("#product_search").text("เลือกสินค้า +");
                    let data = JSON.parse(dataResult);
                    let txtProductReceipt = document.querySelector("#product_receipt");
                    txtProductReceipt.disabled = false;

                    /* backupNo += 1;
                                         productlist += 1;
                                         productlist = productlist + countDelete;
                                         insertId = productlist;*/
                    if (
                        listProductSearch.length <= 0 &&
                        productId_forDelete.length <= 0
                    ) {
                        numberAllProduct = 0;
                        for (let i = 0; i < data["data"].length; i++) {
                            numberAllProduct++;
                            numberAllProduct_curlent++;
                            //listProductSearch[i] = [data["data"][i].product_id, data["data"][i].product_name, data["data"][i].product_price, data["data"][i].product_quantity];
                            listProductSearch.push(data["data"][i]);
                            productId_forDelete.push(data["data"][i].product_id);
                            //  console.log(productId_forDelete);
                            // console.log(data["data"][i]["product_id"]);
                            bodyProduct_template =
                                '<div class="form-product-item" id="item' +
                                data["data"][i]["product_id"] +
                                '">\
                <h3 class="display-5 text-secondary" id="head' +
                                data["data"][i]["product_id"] +
                                '">รายการที่ ' +
                                (i + 1) +
                                '</h3>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">ชื่อสินค้า</label> <a href="#" class="text-danger" id="closeNewProduct" onclick="closeProduct_search(\'' +
                                data["data"][i]["product_id"] +
                                '\')" style="float: right;">X</a>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_name"] +
                                '" id="name_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby=" autofocus placeholder="ระบุชื่อสินค้า"disabled>\
                    <small id="err_nameid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*เลือกสินค้าที่ต้องการรับเข้าวัตถุดิบของสินค้า ให้กดปุ่ม "ค้นหาสินค้า"</small>\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">ราคาสินค้า</label>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_price"] +
                                '" id="price_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby="" placeholder="ระบุราคาสินค้า" disabled>\
                    <small id="err_priceid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*เป็นราคาขายปัจจุบันของร้าน</small>\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">จำนวนสินค้า</label>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_quantity"] +
                                '" id="quantity_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby=" placeholder="ระบุจำนวนสินค้า" >\
                    <small id="err_quantityid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*ให้ระบุจำนวนวัตถุดิบที่ซื้อมาเพิ่ม</small>\
                </div>\
                <div class="form-group">\
                    <select class="form-control" id="unit_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="">ระบุหน่วยสินค้า</option>\
            <option value="product_kilokram">กิโลกรัม</option>\
            <option value="product_kram">กรัม</option>\
            <option value="product_cc">CC</option>\
            <option value="product_piece">ชิ้น/อัน/ลูก</option>\
        </select>\
                    <small id="error_unit' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*ให้ระบุหน่วยของวัตถุดิบให้ถูกต้อง ระบบจะแปลงเป็นหน่วยที่เล็กที่สุดเพื่อตัดสต็อก</small>\
                </div>\
                <div class="form-group">\
                    <select class="form-control" id="vat_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="">ระบุ Vat</option>\
            <option value="vat_include">รวม Vat</option>\
            <option value="vat_exclude">ไม่รวมรวม Vat</option>\
        </select>\
                    <small id = "error_vat' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                </div>\
                <div class="form-group" style="border-bottom: 1px solid #979799;">\
                    <label for="type">ประเภทสินค้า</label>\
                    <select class="form-control" id="type_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="1">ปิ้ง/ย่าง</option>\
            <option value="2">ทอด</option>\
            <option value="3">นึ่ง</option>\
        </select>\
                    <small id="example" class="form-text text-danger">ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
                    <small id = "error_type' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                </div>\
            </div>';
                            $(".form-product-content").append(bodyProduct_template);
                            // console.log(listProductSearch);
                            //console.log(productId_forDelete);
                        }
                    } else {
                        //if (data["data"].length > 0) {
                        for (let i = 0; i < data["data"].length; i++) {
                            numberAllProduct++;
                            numberAllProduct_curlent++;
                            //listProductSearch[i] = [data["data"][i].product_id, data["data"][i].product_name, data["data"][i].product_price, data["data"][i].product_quantity];
                            listProductSearch.push(data["data"][i]);
                            productId_forDelete.push(data["data"][i].product_id);
                            //  console.log(data["data"][i]["product_id"]);
                            bodyProduct_template =
                                '<div class="form-product-item" id="item' +
                                data["data"][i]["product_id"] +
                                '">\
                <h3 class="display-5 text-secondary" id="head' +
                                data["data"][i]["product_id"] +
                                '">รายการที่ ' +
                                numberAllProduct_curlent +
                                '</h3>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">ชื่อสินค้า</label> <a href="#" class="text-danger" id="closeNewProduct" onclick="closeProduct_search(\'' +
                                data["data"][i]["product_id"] +
                                '\')" style="float: right;">X</a>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_name"] +
                                '" id="name_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby=" autofocus placeholder="ระบุชื่อสินค้า"disabled>\
                    <small id="err_nameid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*เลือกสินค้าที่ต้องการรับเข้าวัตถุดิบของสินค้า ให้กดปุ่ม "ค้นหาสินค้า"</small>\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">ราคาสินค้า</label>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_price"] +
                                '" id="price_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby="" placeholder="ระบุราคาสินค้า" disabled>\
                    <small id="err_priceid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*เป็นราคาขายปัจจุบันของร้าน</small>\
                </div>\
                <div class="form-group">\
                    <label for="exampleInputEmail1">จำนวนสินค้า</label>\
                    <input type="text" class="form-control" value="' +
                                data["data"][i]["product_quantity"] +
                                '" id="quantity_id' +
                                data["data"][i]["product_id"] +
                                '" aria-describedby=" placeholder="ระบุจำนวนสินค้า" >\
                    <small id="err_quantityid' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*ให้ระบุจำนวนวัตถุดิบที่ซื้อมาเพิ่ม</small>\
                </div>\
                <div class="form-group">\
                    <select class="form-control" id="unit_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="">ระบุหน่วยสินค้า</option>\
            <option value="product_kilokram">กิโลกรัม</option>\
            <option value="product_kram">กรัม</option>\
            <option value="product_cc">CC</option>\
            <option value="product_piece">ชิ้น/อัน/ลูก</option>\
        </select>\
                    <small id="error_unit' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                    <small id="tutorial" class="form-text text-success">*ให้ระบุหน่วยของวัตถุดิบให้ถูกต้อง ระบบจะแปลงเป็นหน่วยที่เล็กที่สุดเพื่อตัดสต็อก</small>\
                </div>\
                <div class="form-group">\
                    <select class="form-control" id="vat_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="">ระบุ Vat</option>\
            <option value="vat_include">รวม Vat</option>\
            <option value="vat_exclude">ไม่รวมรวม Vat</option>\
        </select>\
                    <small id = "error_vat' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                </div>\
                <div class="form-group" style="border-bottom: 1px solid #979799;">\
                    <label for="type">ประเภทสินค้า</label>\
                    <select class="form-control" id="type_id' +
                                data["data"][i]["product_id"] +
                                '" >\
            <option value="1">ปิ้ง/ย่าง</option>\
            <option value="2">ทอด</option>\
            <option value="3">นึ่ง</option>\
        </select>\
                    <small id="example" class="form-text text-danger">ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
                    <small id = "error_type' +
                                data["data"][i]["product_id"] +
                                '" class="form-text text-danger"></small>\
                </div>\
            </div>';
                            $(".form-product-content").append(bodyProduct_template);
                        }
                        //}
                    }
                    // console.log(data["data"]);
                }, 1000);
                countDelete = 0;
            },
        });
    }
}
/*
function addNewProduct() {


    backupNo += 1;
    productlist += 1;

    productlist = productlist + countDelete;
    insertId = productlist;
    //lastProductList += 1;
    let productListIdForDelete = "item" + productlist;
    let templateAddNewProduct = "<div class='form-product-item' id='item" + productlist + "'><h1 class='display-5 text-secondary' id='head" + productlist + "'>test</h1> <div class='form-product-item'>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>ชื่อสินค้า</label> <a href='#' class='text-danger' onclick=" + "closeProduct('" + productlist + "')" + " id='closeNewProduct'" + productlist + " style='float: right;'>X</a>\
        <input type='text' class='form-control' id='product_name" + productlist + "' value='' aria-describedby=''  placeholder='ระบุชื่อสินค้า' autofocus>\
        <small id='error_name" + productlist + "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>ราคาสินค้า</label>\
        <input type='text' class='form-control' id='product_price" + productlist + "' aria-describedby='' placeholder='ระบุราคาสินค้า'>\
        <small id='error_price" + productlist + "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>จำนวนสินค้า</label>\
        <input type='text' class='form-control' id='product_quantity" + productlist + "' aria-describedby='' placeholder='ระบุจำนวนสินค้า'>\
        <small id='error_quantity" + productlist + "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <select class='form-control' id='product_unit" + productlist + "'>\
    <option value='error_unit'>ระบุหน่วยสินค้า</option>\
    <option value='product_kilokram'>กิโลกรัม</option>\
    <option value='product_kram'>กรัม</option>\
    <option value='product_cc'>CC</option>\
    <option value='product_piece'>ชิ้น/อัน/ลูก</option>\
</select>\
        <small id='error_unit" + productlist + "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <select class='form-control' id='product_vat" + productlist + "'>\
    <option value='error_vat'>ระบุ Vat</option>\
    <option value='vat_include'>รวม Vat</option>\
    <option value='vat_exclude'>ไม่รวมรวม Vat</option>\
</select>\
        <small id='error_vat" + productlist + "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group' style='border-bottom: 1px solid #979799;'>\
        <label for='type'>ประเภทสินค้า</label>\
        <select class='form-control' id='product_type" + productlist + "'>\
    <option value='1'>ปิ้ง/ย่าง</option>\
    <option value='2'>ทอด</option>\
    <option value='3'>นึ่ง</option>\
</select>\
        <small id='example' class='form-text text-danger'>ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
        <small id='error_type" + productlist + "' class='form-text text-danger'></small>\
    </div>\
</div></div>";

    $('.form-product-content').append(templateAddNewProduct);
    // listProduct.push(productlist);
    let productName = document.querySelector("#product_name" + productlist);
    let productPrice = document.querySelector("#product_price" + productlist);
    let productQuantity = document.querySelector("#product_quantity" + productlist);
    let productUnit = document.querySelector("#product_unit" + productlist);
    let productVat = document.querySelector("#product_vat" + productlist);
    let productType = document.querySelector("#product_type" + productlist);
    listProduct["item" + productlist] = {
        product_name: productName.value,
        product_price: productPrice.value,
        product_quantity: productQuantity.value,
        product_unit: productUnit.value,
        product_vat: productVat.value,
        product_type: productType.value
    };
    console.log(listProduct);
    console.log(productName.value);
    let productH = document.getElementById("head" + productlist);
    if (lastProductList == 0) {
        productH.innerHTML = "Product " + productlist;
    } else if (lastProductList > 0) {
        // lastProductList += 1;
        lastProductList++;
        productH.innerHTML = "Product " + lastProductList;
    }

    console.log(lastProductList);


}
*/

function closeProduct_search(id) {
    let elemProduct = document.getElementById(id);
    elemProduct.classList.toggle("rows-data");
    countClick = 0;
    indexProduct = productClick.indexOf(id);
    productClick[indexProduct] = [];
    elemProduct.style.backgroundColor = "";
    console.log(id);
    // console.log(listProductSearch);
    numberAllProduct_curlent--;
    //numberAllProduct--;
    let indexOfId;
    indexOfId = productId_forDelete.indexOf(id);
    productId_forDelete[indexOfId] = [];
    for (let i = 0; i < listProductSearch.length; i++) {
        if (listProductSearch[i].product_id == id) {
            listProductSearch[i] = [];
        }
    }
    let countDelete_search = 0;
    countDelete_search++;
    let NOproduct_Present = numberAllProduct - countDelete_search;
    let headCount = 1;
    console.log(listProductSearch);
    $("#item" + id).remove();
    // console.log(listProduct);
    /*listProduct["item" + id] = [];
        lastProductList = backupNo;*/
    for (var i = 0; i <= numberAllProduct; i++) {
        if ($("#head" + productId_forDelete[i]).text() != "") {
            $("#head" + productId_forDelete[i]).text("รายการที่ " + headCount);
            headCount++;
            /*  if (headCount <= NOproduct_Present) {
            
                          }*/
            // console.log(lastProductList);
        } else {}

        console.log(listProductSearch);
    }

    /*
            console.log("newInt" + newIdInt);
            insertId = newIdInt;
            backupNo--;
            lastProductList = backupNo;
            productlist -= 1;
            newIdInt = 0;
    
            console.log(listProduct);
            if (id < listProduct.find(element => element > id) || id == listProduct[listProduct.length - 1]) {
                listProduct.pop();
                indexOfId = listProduct.indexOf(id);
                console.log(listProduct);
                //console.log(listProduct.find(element => element > id));
            }
    
            for (var i = indexOfId; i < listProduct.length; i++) {
                // console.log(listProduct[i]);
    
                $("#head" + listProduct[i]).text("Product " + listProduct[i]);
    
            }
            console.log(listProduct);
            console.log(productlist);
        */
}

function getDataFromForm() {
    let btnUpdate = document.querySelector("#product_update");
    let txtProduct_receipt = document.querySelector("#product_receipt");
    let txtProduct_note = document.querySelector("#product_note");
    for (let i = 0; i < listProductSearch.length; i++) {
        if (listProductSearch[i] == "") {} else {
            console.log(listProductSearch[i].product_id);

            let txtProduct_name = document.getElementById(
                "name_id" + listProductSearch[i].product_id
            );
            let txtProduct_price = document.getElementById(
                "price_id" + listProductSearch[i].product_id
            );
            let txtProduct_quantity = document.getElementById(
                "quantity_id" + listProductSearch[i].product_id
            );
            let txtProduct_unit = document.getElementById(
                "unit_id" + listProductSearch[i].product_id
            );
            let txtProduct_vat = document.getElementById(
                "vat_id" + listProductSearch[i].product_id
            );
            let txtProduct_type = document.getElementById(
                "type_id" + listProductSearch[i].product_id
            );
            productForInsert[i] = {
                product_id: listProductSearch[i].product_id,
                product_name: txtProduct_name.value,
                product_price: txtProduct_price.value,
                product_quantity: listProductSearch[i].product_quantity + parseInt(txtProduct_quantity.value),
                new_quantity: txtProduct_quantity.value,
                product_unit: txtProduct_unit.value,
                product_vat: txtProduct_vat.value,
                product_type: txtProduct_type.value,
            };
        }
    }
    let productForUpdate_json = JSON.stringify(productForInsert);
    let lastCheck_search = checkTxtEmpty_search(productForInsert, txtProduct_receipt.value);
    sizeOfArray = 0;
    if (lastCheck_search == false) {} else if (lastCheck_search == true) {

        $.ajax({
            url: "php/update_inventory.php",
            type: "POST",
            data: {
                productRc: txtProduct_receipt.value,
                productNote: txtProduct_note.value,
                product_data: productForUpdate_json,
                typeOfPost: "update",
            },
            cache: false,
            beforeSend: function () {
                document.querySelector("#product_update").innerHTML = "Loading";

                //console.log(firstDate);
            },
            success: function (dataResult) {
                //var data = JSON.parse(dataResult);
                template_insertComplete =
                    '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
                  <div div class = "modal-dialog modal-dialog-centered" id = "testmodal" role = "document" > \
                      <div class="modal-content">\
                          <div class="modal-header">\
                              <h5 class="modal-title" id="exampleModalCenterTitle">แจ้งเตือน</h5>\
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                  <span aria-hidden="true">&times;</span>\
                              </button>\
                          </div>\
                          <div class="modal-body">\
                             ' + dataResult + '\
      </div>\
                          <div class="modal-footer">\
                              <button type = "button" id = "closeAlert" onclick = "closeData()" class="btn btn-primary" data-dismiss="modal">ปิด</button>\
                          </div>\
                      </div>\
                  </div>\
              </div>';
                $("body").append(template_insertComplete);
                setTimeout(function () {
                    $("#exampleModalCenter").modal();
                    // window.location.href = '#testmodal';
                    //console.log(dataResult);
                    // console.log(data);
                    document.querySelector("#product_update").innerHTML = "บันทึกรายการ";
                    //console.log(dataResult);
                }, 1000);
            },
        });
        console.log(productForInsert);
    }
}

function checkTxtEmpty_search(product_data, productRc) {
    /*console.log("checkTxtEmpty");
      console.log(elemId);
      console.log(productName);
      console.log(productPrice);
      console.log(productQuantity);
      console.log(productUnit);
      console.log(productVat);
      console.log(productRc);*/
    let err_Rc = document.querySelector("#error_receipt");
    let valid = 0;
    let notValid = 0;
    valid = 0;
    notValid = 0;

    /*product_name: productName.value,
          product_price: parseInt(productPrice.value),
          product_quantity: parseInt(productQuantity.value),
          product_unit: productUnit.value,
          product_vat: productVat.value,
          product_type: productType.value,
          idForCheckEmpty: i*/
    for (let i = 0; i < product_data.length; i++) {
        let error_name = document.querySelector(
            "#err_nameid" + product_data[i]["product_id"]
        );
        let error_price = document.querySelector(
            "#err_priceid" + product_data[i]["product_id"]
        );
        let error_quantity = document.querySelector(
            "#err_quantityid" + product_data[i]["product_id"]
        );
        let error_unit = document.querySelector(
            "#error_unit" + product_data[i]["product_id"]
        );
        let error_vat = document.querySelector(
            "#error_vat" + product_data[i]["product_id"]
        );
        //console.log(product_data[i]);
        //console.log(product_data[i]["idForCheckEmpty"]);
        if (product_data[i]["product_name"] == "") {
            error_name.innerHTML = "ระบุชื่อสินค้า";
            valid++;
        }
        if (product_data[i]["product_price"] == "") {
            console.log("เข้า if VAT");
            error_price.innerHTML = "ระบุราคาสินค้า";
            valid++;
        }
        if (product_data[i]["product_quantity"] == "") {
            error_quantity.innerHTML = "ระบุจำนวนสินค้า";
            valid++;
        }
        if (product_data[i]["product_unit"] == "") {
            error_unit.innerHTML = "ระบุหน่วยสินค้า";
            valid++;
        }
        if (product_data[i]["product_vat"] == "") {
            error_vat.innerHTML = "ระบุ Vat สินค้า";
            valid++;
        }

        if (productRc == "") {
            err_Rc.innerHTML = "ระบุเลขที่ใบเสร็จ";
            valid++;
        }

        /* กรอกข้อมูลแล้ว */
        if (product_data[i]["product_name"] != "") {
            error_name.innerHTML = "";
            notValid--;
        }
        if (product_data[i]["product_price"] != "") {
            // console.log("เข้า if NotVAT");
            let NOorNotNo_price = checkNumber_price_search(product_data[i]["product_price"]);
            if (NOorNotNo_price == false) {
                console.log("NOorNotNo_price=false");
                valid++;
                error_price.innerHTML = "ระบุตัวเลข";
            } else {
                notValid--;
                error_price.innerHTML = "";
            }
        }
        if (product_data[i]["product_quantity"] != "") {
            let NOorNotNo_quantity = checkNumber_quantity_search(product_data[i]["new_quantity"]);
            if (NOorNotNo_quantity == false) {
                console.log("NOorNotNo_quantity=false");
                valid++;
                error_quantity.innerHTML = "ระบุตัวเลข";
            } else {
                notValid--;
                error_quantity.innerHTML = "";
            }
        }
        if (product_data[i]["product_unit"] != "") {
            error_unit.innerHTML = "";
            notValid--;
        }
        if (product_data[i]["product_vat"] != "") {
            error_vat.innerHTML = "";
            notValid--;
        }
        if (productRc != "") {
            err_Rc.innerHTML = "";
            notValid--;
        }
    }
    // console.log("valid=" + valid);

    // console.log("not valid=" + notValid);
    if (valid > 0) {
        valid = 0;
        notValid = 0;
        return false;
    } else if (valid == 0 && notValid <= 0) {
        valid = 0;
        notValid = 0;
        return true;
    }
}

function checkNumber_price_search(number) {
    let newNumberArray = number.split('');
    let nomberNotString = 0;
    console.log(newNumberArray);
    for (let i = 0; i < newNumberArray.length; i++) {
        if (newNumberArray[i] == "0" || newNumberArray[i] == "1" || newNumberArray[i] == "2" || newNumberArray[i] == "3" || newNumberArray[i] == "4" || newNumberArray[i] == "5" || newNumberArray[i] == "6" || newNumberArray[i] == "7" || newNumberArray[i] == "8" || newNumberArray[i] == "9") {
            nomberNotString++;
            // console.log("nomberNotString++");

        } else {
            nomberNotString--;
            // console.log("nomberNotString--");
        }
    }
    //  console.log(nomberNotString);
    if (nomberNotString == newNumberArray.length) {
        nomberNotString = 0;
        return true;
    } else {
        nomberNotString = 0;
        return false;
    }
}

function checkNumber_quantity_search(number) {
    let newNumberArray = number.split('');
    let nomberNotString = 0;
    console.log(newNumberArray);
    for (let i = 0; i < newNumberArray.length; i++) {
        if (newNumberArray[i] == "0" || newNumberArray[i] == "1" || newNumberArray[i] == "2" || newNumberArray[i] == "3" || newNumberArray[i] == "4" || newNumberArray[i] == "5" || newNumberArray[i] == "6" || newNumberArray[i] == "7" || newNumberArray[i] == "8" || newNumberArray[i] == "9") {
            nomberNotString++;
            // console.log("nomberNotString++");

        } else {
            nomberNotString--;
            // console.log("nomberNotString--");
        }
    }
    if (nomberNotString == newNumberArray.length) {
        nomberNotString = 0;
        return true;
    } else {
        nomberNotString = 0;
        return false;
    }
}