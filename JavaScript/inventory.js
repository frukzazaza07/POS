let toggleRoportMain = document.querySelector("#toggleRoportMain");
let toggleReportGroup = document.querySelector("#toggleReportGroup");
let btnInsert = document.querySelector("#product_insert");
let btnNew_template = document.querySelector("#template_new");
let btnEdit_template = document.querySelector("#template_edit");
let bodyProduct_template;
var emptyCheck = true;
btnNew_template.addEventListener("click", function () {
    productlist = 1;
    lastProductList = 0;
    listProduct = [];
    countDelete = 0;
    backupNo = 1;
    insertId = 0;
    $(".body-template").remove();
    bodyProduct_template =
        " <div class='body-template'>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>เลขที่ใบสั่งซื้อ/ใบเสร็จ</label>\
        <input type='text' class='form-control' id='product_receipt' aria-describedby='' placeholder='ระบุเลขที่ใบสั่งซื้อ'>\
        <small id='error_receipt' class='form-text text-danger'></small>\
    </div>\
    <div class='form-product-content'>\
        <div class='form-product-item' id='item1'>\
            <h3 class='display-5 text-secondary'>Product 1</h3>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>ชื่อสินค้า</label> <a href='#' class='text-danger' id='closeNewProduct' onclick='closeProduct(1)' style='float: right;'>X</a>\
                <input type='text' class='form-control' id='product_name1' aria-describedby='' autofocus placeholder='ระบุชื่อสินค้า'>\
                <small id='error_name1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>ราคาสินค้า</label>\
                <input type='text' class='form-control' id='product_price1' aria-describedby='' placeholder='ระบุราคาสินค้า'>\
                <small id='error_price1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>จำนวนสินค้า</label>\
                <input type='text' class='form-control' id='product_quantity1' aria-describedby='' placeholder='ระบุจำนวนสินค้า'>\
                <small id='error_quantity1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group'>\
                <select class='form-control' id='product_unit1'>\
        <option value='error_unit'>ระบุหน่วยสินค้า</option>\
        <option value='product_kilokram'>กิโลกรัม</option>\
        <option value='product_kram'>กรัม</option>\
        <option value='product_cc'>CC</option>\
        <option value='product_piece'>ชิ้น/อัน/ลูก</option>\
    </select>\
                <small id='error_unit1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group'>\
                <select class='form-control' id='product_vat1'>\
        <option value='error_vat'>ระบุ Vat</option>\
        <option value='vat_include'>รวม Vat</option>\
        <option value='vat_exclude'>ไม่รวมรวม Vat</option>\
    </select>\
                <small id='error_vat1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group' style='border-bottom: 1px solid #979799;'>\
                <label for='type'>ประเภทสินค้า</label>\
                <select class='form-control' id='product_type1'>\
        <option value='1'>ปิ้ง/ย่าง</option>\
        <option value='2'>ทอด</option>\
        <option value='3'>นึ่ง</option>\
    </select>\
                <small id='example' class='form-text text-danger'>ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
                <small id='error_type1' class='form-text text-danger'></small>\
            </div>\
        </div>\
    </div>\
    <center><button class='btn btn-primary btn-lg' onclick='addNewProduct()' id='product_new'>เพิ่มสินค้า +</button></center>\
    <div class='form-group'>\
        <label for='exampleFormControlTextarea1'>หมายเหตุเพิ่มเติม</label>\
        <textarea class='form-control' id='product_note' rows='7'></textarea>\
    </div>\
    <div class='form-group'>\
        <button class='btn btn-success btn-lg btn-block' onclick='insertProduct()' id='product_insert'>บันทึกรายการ</button>\
    </div></div>";
    $("article").append(bodyProduct_template);
    let productName = document.querySelector("#product_name" + productlist);
    let productPrice = document.querySelector("#product_price" + productlist);
    let productQuantity = document.querySelector(
        "#product_quantity" + productlist
    );
    let productUnit = document.querySelector("#product_unit" + productlist);
    let productVat = document.querySelector("#product_vat" + productlist);
    let productType = document.querySelector("#product_type" + productlist);
    listProduct["item" + productlist] = {
        product_name: productName.value,
        product_price: productPrice.value,
        product_quantity: productQuantity.value,
        product_unit: productUnit.value,
        product_vat: productVat.value,
        product_type: productType.value,
    };
});
btnEdit_template.addEventListener("click", function () {
    productlist = 1;
    lastProductList = 0;
    listProduct = [];
    countDelete = 0;
    backupNo = 1;
    insertId = 0;
    console.log("te");
    $(".body-template").remove();
    bodyProduct_template =
        "<div class='body-template'>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>เลขที่ใบสั่งซื้อ/ใบเสร็จ</label>\
        <input type='text' class='form-control' id='product_receipt' aria-describedby='' placeholder='ระบุเลขที่ใบสั่งซื้อ'disabled>\
        <small id='error_receipt' class='form-text text-danger'></small>\
    </div>\
    <div class='form-product-content'>\
        <div class='form-product-item' id='item1'>\
            <h3 class='display-5 text-secondary'>รายการที่ 1</h3>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>ชื่อสินค้า</label> <a href='#' class='text-danger' id='closeNewProduct' onclick='closeProduct(1)' style='float: right;'>X</a>\
                <input type='text' class='form-control' id='product_name1' aria-describedby='' autofocus placeholder='ระบุชื่อสินค้า'disabled>\
                <small id='error_name1' class='form-text text-danger'></small>\
                <small id='tutorial' class='form-text text-success'>*เลือกสินค้าที่ต้องการรับเข้าวัตถุดิบของสินค้า ให้กดปุ่ม 'เลือกสินค้า'</small>\
            </div>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>ราคาสินค้า</label>\
                <input type='text' class='form-control' id='product_price1' aria-describedby='' placeholder='ระบุราคาสินค้า' disabled>\
                <small id='error_price1' class='form-text text-danger'></small>\
                <small id='tutorial' class='form-text text-success'>*เป็นราคาขายปัจจุบันของร้าน</small>\
            </div>\
            <div class='form-group'>\
                <label for='exampleInputEmail1'>จำนวนสินค้า</label>\
                <input type='text' class='form-control' id='product_quantity1' aria-describedby='' placeholder='ระบุจำนวนสินค้า' disabled>\
                <small id='error_quantity1' class='form-text text-danger'></small>\
                <small id='tutorial' class='form-text text-success'>*ให้ระบุจำนวนวัตถุดิบที่ซื้อมาเพิ่ม</small>\
            </div>\
            <div class='form-group'>\
                <select class='form-control' id='product_unit1' disabled>\
        <option value='error_unit'>ระบุหน่วยสินค้า</option>\
        <option value='product_kilokram'>กิโลกรัม</option>\
        <option value='product_kram'>กรัม</option>\
        <option value='product_cc'>CC</option>\
        <option value='product_piece'>ชิ้น/อัน/ลูก</option>\
    </select>\
                <small id='error_unit1' class='form-text text-danger'></small>\
                <small id='tutorial' class='form-text text-success'>*ให้ระบุหน่วยของวัตถุดิบให้ถูกต้อง ระบบจะแปลงเป็นหน่วยที่เล็กที่สุดเพื่อตัดสต็อก</small>\
            </div>\
            <div class='form-group'>\
                <select class='form-control' id='product_vat1' disabled>\
        <option value='error_vat'>ระบุ Vat</option>\
        <option value='vat_include'>รวม Vat</option>\
        <option value='vat_exclude'>ไม่รวมรวม Vat</option>\
    </select>\
                <small id='error_vat1' class='form-text text-danger'></small>\
            </div>\
            <div class='form-group' style='border-bottom: 1px solid #979799;'>\
                <label for='type'>ประเภทสินค้า</label>\
                <select class='form-control' id='product_type1' disabled>\
        <option value='1'>ปิ้ง/ย่าง</option>\
        <option value='2'>ทอด</option>\
        <option value='3'>นึ่ง</option>\
    </select>\
                <small id='example' class='form-text text-danger'>ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
                <small id='error_type1' class='form-text text-danger'></small>\
            </div>\
        </div>\
    </div>\
    <center><button class='btn btn-primary btn-lg ' id='product_search'data-toggle='modal' data-target='#exampleModal' data-whatever='@fat'>เลือกสินค้า +</button></center>\
    <div class='form-group'>\
        <label for='exampleFormControlTextarea1'>หมายเหตุเพิ่มเติม</label>\
        <textarea class='form-control' id='product_note' rows='7'></textarea>\
    </div>\
    <div class='form-group'>\
        <button class='btn btn-success btn-lg btn-block' onclick='getDataFromForm()' id='product_update'>บันทึกรายการ</button>\
    </div></div>";
    $("article").append(bodyProduct_template);
});
toggleRoportMain.addEventListener("click", function () {
    toggleReportGroup.classList.toggle("toggle-report-group-active");
    toggleRoportMain.classList.toggle("head-effect-active");
});
let empty = true;
var productlist = 1;
let btnProductNew = document.querySelector("#product_new");
var lastProductList = 0;
var listProduct = new Array();
let countDelete = 0;
var backupNo = 1;
var insertId = 1;
listProduct["item" + productlist] = {
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_unit: "",
    product_vat: "",
    product_type: "",
};

function addNewProduct() {
    backupNo += 1;

    productlist += 1;
    productlist = productlist + countDelete;
    insertId = productlist;

    // lastProductList += 1;
    let productListIdForDelete = "item" + productlist;
    let templateAddNewProduct =
        "<div class='form-product-item' id='item" +
        productlist +
        "'><h3 class='display-5 text-secondary' id='head" +
        productlist +
        "'>test</h3> <div class='form-product-item'>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>ชื่อสินค้า</label> <a href='#' class='text-danger' onclick=" +
        "closeProduct('" +
        productlist +
        "')" +
        " id='closeNewProduct'" +
        productlist +
        " style='float: right;'>X</a>\
        <input type='text' class='form-control' id='product_name" +
        productlist +
        "' value='' aria-describedby=''  placeholder='ระบุชื่อสินค้า' autofocus>\
        <small id='error_name" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>ราคาสินค้า</label>\
        <input type='text' class='form-control' id='product_price" +
        productlist +
        "' aria-describedby='' placeholder='ระบุราคาสินค้า'>\
        <small id='error_price" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <label for='exampleInputEmail1'>จำนวนสินค้า</label>\
        <input type='text' class='form-control' id='product_quantity" +
        productlist +
        "' aria-describedby='' placeholder='ระบุจำนวนสินค้า'>\
        <small id='error_quantity" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <select class='form-control' id='product_unit" +
        productlist +
        "'>\
    <option value=''>ระบุหน่วยสินค้า</option>\
    <option value='product_kilokram'>กิโลกรัม</option>\
    <option value='product_kram'>กรัม</option>\
    <option value='product_cc'>CC</option>\
    <option value='product_piece'>ชิ้น/อัน/ลูก</option>\
</select>\
        <small id='error_unit" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group'>\
        <select class='form-control' id='product_vat" +
        productlist +
        "'>\
    <option value=''>ระบุ Vat</option>\
    <option value='vat_include'>รวม Vat</option>\
    <option value='vat_exclude'>ไม่รวมรวม Vat</option>\
</select>\
        <small id='error_vat" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
    <div class='form-group' style='border-bottom: 1px solid #979799;'>\
        <label for='type'>ประเภทสินค้า</label>\
        <select class='form-control' id='product_type" +
        productlist +
        "'>\
    <option value='1'>ปิ้ง/ย่าง</option>\
    <option value='2'>ทอด</option>\
    <option value='3'>นึ่ง</option>\
</select>\
        <small id='example' class='form-text text-danger'>ต้องเป็นสินค้าที่มีวัตถุดิบอย่างเดียว เช่น *กุ้งเผา* *ปลาหมึกย่าง* *หอยหวาน* เพื่อให้ระบบตัดสต็อกการขายได้ถูกต้อง</small>\
        <small id='error_type" +
        productlist +
        "' class='form-text text-danger'></small>\
    </div>\
</div></div>";

    $(".form-product-content").append(templateAddNewProduct);
    // listProduct.push(productlist);
    let productName = document.querySelector("#product_name" + productlist);
    let productPrice = document.querySelector("#product_price" + productlist);
    let productQuantity = document.querySelector(
        "#product_quantity" + productlist
    );
    let productUnit = document.querySelector("#product_unit" + productlist);
    let productVat = document.querySelector("#product_vat" + productlist);
    let productType = document.querySelector("#product_type" + productlist);
    listProduct["item" + productlist] = {
        product_name: productName.value,
        product_price: productPrice.value,
        product_quantity: productQuantity.value,
        product_unit: productUnit.value,
        product_vat: productVat.value,
        product_type: productType.value,
    };
    console.log(listProduct);
    console.log(productName.value);
    let productH = document.getElementById("head" + productlist);
    if (lastProductList == 0) {
        lastProductList++;
        productH.innerHTML = "Product " + lastProductList;
    } else if (lastProductList > 0) {
        // lastProductList += 1;
        lastProductList++;
        productH.innerHTML = "Product " + lastProductList;
    }

    console.log(lastProductList);
    countDelete = 0;
    firstAdd = 0;
}

function closeProduct(id) {
    countDelete++;
    //backupNo -= 1;
    lastProductList = backupNo;
    let newIdInt = productlist + countDelete;
    newIdInt += 1;
    $("#item" + id).remove();
    console.log(listProduct);
    listProduct["item" + id] = [];
    //console.log(listProduct + "GGG");

    lastProductList = backupNo;
    for (var i = newIdInt; i > 0; i--) {
        // console.log(listProduct[i]);
        if ($("#head" + i).text() != "") {
            // console.log("item" + i);

            lastProductList--;
            $("#head" + i).text("Product " + lastProductList);

            console.log(lastProductList);
        } else {}
    }
    console.log("newInt" + newIdInt);
    insertId = newIdInt;
    //lastProductList = productlist;
    //lastProductList -= 1;
    backupNo--;
    lastProductList = backupNo;
    productlist -= 1;
    newIdInt = 0;
    console.log(productlist);
    //productlist =  - 1;
    /*
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
/*function closeProduct(id) {
    // console.log(id);
    productlist -= 1;
    let indexOfId = 0;
    $("#item" + listProduct[listProduct.length - 1]).remove();
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

}
*/

function insertProduct() {
    insertNewProduct();
    /* checkemty();
       if (empty === true) {
           console.log(empty);
          
       }*/
}

async function insertNewProduct() {
    let listProduct_ForSend = new Array();
    let productRc = document.querySelector("#product_receipt");
    let productNote = document.querySelector("#product_note");
    let productName = "";
    let productPrice = "";
    let productQuantity = "";
    let productUnit = "";
    let productVat = "";
    let sizeOfArray = 0;
    let checkNumberInsert = 0;
    checkNumberInsert = insertId;
    //console.log(insertId);
    for (var i = insertId; i > 0; i--) {
        //console.log(i);
        // console.log(i);
        if ($("#head" + i).text() != "") {
            console.log(i);
            let productName = document.querySelector("#product_name" + i);
            let productPrice = document.querySelector("#product_price" + i);
            let productQuantity = document.querySelector("#product_quantity" + i);
            let productUnit = document.querySelector("#product_unit" + i);
            let productVat = document.querySelector("#product_vat" + i);
            let productType = document.querySelector("#product_type" + i);
            //checkTxtEmpty(i, productName.value, productPrice.value, productQuantity.value, productUnit.value, productVat.value, productRc.value);
            listProduct["item" + i] = {
                product_name: productName.value,
                product_price: productPrice.value,
                product_quantity: productQuantity.value,
                product_unit: productUnit.value,
                product_vat: productVat.value,
                product_type: productType.value,
                idForCheckEmpty: i
            };

            listProduct_ForSend[sizeOfArray] = listProduct["item" + i];
            sizeOfArray++;
        } else {

        }
        checkNumberInsert = i;

    }
    test = checkTxtEmpty(listProduct_ForSend, productRc.value);
    sizeOfArray = 0;
    // console.log(listProduct_ForSend);
    let listProductJson = JSON.stringify(listProduct_ForSend);
    /* try {
         await checkTxtEmpty(i, productName.value, productPrice.value, productQuantity.value, productUnit.value, productVat.value, productRc.value);
     } catch (error) {
         console.log(error);
     }*/
    if (test == false) {

    } else if (test == true) {
        console.log(emptyCheck);
        console.log(listProductJson);
        $.ajax({
            url: "php/inventory.php",
            type: "POST",
            data: {
                productRc: productRc.value,
                productNote: productNote.value,
                product_data: listProductJson,
                numberOfData: insertId,
                typeOfPost: "new",
            },
            cache: false,
            beforeSend: function () {
                btnInsert.innerHTML = "Loading...";
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
                             ' +
                    dataResult +
                    '\
      </div>\
                          <div class="modal-footer">\
                              <button type = "button" id = "closeAlert" onclick = "closeData()" class="btn btn-primary" data-dismiss="modal">ปิด</button>\
                          </div>\
                      </div>\
                  </div>\
              </div>';
                $("body").append(template_insertComplete);
                setTimeout(function () {
                    // console.log(dataResult);
                    //  console.log(data);
                    $("#exampleModalCenter").modal();
                    btnInsert.innerHTML = "เพิ่มสินค้า";

                    //console.log(dataResult);
                }, 1000);
            },
        });
    }
}

function closeData() {
    location.reload();
}

function checkemty() {
    /* เก็บไว้ใช้
    let valid = 0;
    let productRc = document.querySelector("#product_receipt");
    let errorRc = document.querySelector("#error_receipt");
    let productName = document.querySelector("#product_name");
    let errorName = document.querySelector("#error_name");
    let productPrice = document.querySelector("#product_price");
    let errorPrice = document.querySelector("#error_price");
    let productQuantity = document.querySelector("#product_quantity");
    let errorQuantity = document.querySelector("#error_quantity");
    let productUnit = document.querySelector("#product_unit");
    let errorUnit = document.querySelector("#error_unit");
    let productVat = document.querySelector("#product_vat");
    let errorVat = document.querySelector("#error_vat");
    let productNote = document.querySelector("#product_note");



    if (productRc.value === "") {
        errorRc.innerHTML = "ระบุเลขที่ใบสั่งซื้อ/ใบเสร็จ";
        valid += 1;
    } else {
        errorRc.innerHTML = "";
        valid -= 1;
    }

    if (productName.value === "") {
        errorName.innerHTML = "ระบุชื่อสินค้า";
        valid += 1;
    } else {
        errorName.innerHTML = "";
        valid -= 1;
    }

    if (productUnit.value === "error_unit") {
        errorUnit.innerHTML = "ระบุหน่วยสินค้า";
        valid += 1;
    } else {
        errorUnit.innerHTML = "";
        valid -= 1;
    }

    if (productVat.value === "error_vat") {
        errorVat.innerHTML = "ระบุ Vat";
        valid += 1;
    } else {
        errorVat.innerHTML = "";
        valid -= 1;
    }

    if (productPrice.value === "") {
        errorPrice.innerHTML = "ระบุราคา";
        valid += 1;
    } else if (isFinite(productPrice.value) === false) {
        errorPrice.innerHTML = "ระบุตัวเลข";
        valid += 1;
    } else {
        errorPrice.innerHTML = "";
        valid += 2;
    }

    if (productQuantity.value === "") {
        errorQuantity.innerHTML = "ระบุราคา";
        valid += 1;
    } else if (isFinite(productQuantity.value) === false) {
        errorQuantity.innerHTML = "ระบุตัวเลข";
        valid += 1;
    } else {
        errorQuantity.innerHTML = "";
        valid += 2;
    }
    if (valid == 0) {
        console.log(valid);
        return empty = true;


    } else {
        console.log(valid);
        return empty = false;

    }
*/
}

/*
------*------
-----***-----
----*****----
---*---
*/

/* if (productRc.value === "") {
        errorRc.innerHTML = "ระบุเลขที่ใบสั่งซื้อ/ใบเสร็จ";
        empty = false;
    } else {
        errorRc.innerHTML = "";
        empty = true;
    }

    if (productName.value === "") {
        errorName.innerHTML = "ระบุชื่อสินค้า";
        empty = false;
    } else {
        errorName.innerHTML = "";
        empty = true;
    }

    if (productUnit.value === "error_unit") {
        errorUnit.innerHTML = "ระบุหน่วยสินค้า";
        empty = false;
    } else {
        errorUnit.innerHTML = "";
        empty = true;
    }

    if (productVat.value === "error_vat") {
        errorVat.innerHTML = "ระบุ Vat";
        empty = false;
    } else {
        errorVat.innerHTML = "";
        empty = true;
    }

    if (productPrice.value === "") {
        errorPrice.innerHTML = "ระบุราคา";
        empty = false;
    } else if (isFinite(productPrice.value) === false) {
        errorPrice.innerHTML = "ระบุตัวเลข";
        empty = false;
    } else {
        errorPrice.innerHTML = "";
        empty = true;
    }

    if (productQuantity.value === "") {
        errorQuantity.innerHTML = "ระบุราคา";
        empty = false;
    } else if (isFinite(productQuantity.value) === false) {
        errorQuantity.innerHTML = "ระบุตัวเลข";
        empty = false;
    } else {
        errorQuantity.innerHTML = "";
        empty = true;
    }
    console.log(empty);
*/
function checkTxtEmpty(product_data, productRc) {
    /*console.log("checkTxtEmpty");
    console.log(elemId);
    console.log(productName);
    console.log(productPrice);
    console.log(productQuantity);
    console.log(productUnit);
    console.log(productVat);
    console.log(productRc);*/
    let err_Rc = document.querySelector("#error_receipt")
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
        let error_name = document.querySelector("#error_name" + product_data[i]["idForCheckEmpty"]);
        let error_price = document.querySelector("#error_price" + product_data[i]["idForCheckEmpty"]);
        let error_quantity = document.querySelector("#error_quantity" + product_data[i]["idForCheckEmpty"]);
        let error_unit = document.querySelector("#error_unit" + product_data[i]["idForCheckEmpty"]);
        let error_vat = document.querySelector("#error_vat" + product_data[i]["idForCheckEmpty"]);
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
            let NOorNotNo_price = checkNumber_price(product_data[i]["product_price"]);
            if (NOorNotNo_price == false) {
                console.log("NOorNotNo_price=false")
                valid++;
                error_price.innerHTML = "ระบุตัวเลข";
            } else {
                notValid--;
                error_price.innerHTML = "";
            }
        }
        if (product_data[i]["product_quantity"] != "") {
            let NOorNotNo_quantity = checkNumber_quantity(product_data[i]["product_quantity"]);
            if (NOorNotNo_quantity == false) {
                console.log("NOorNotNo_quantity=false")
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

function checkNumber_quantity(number) {
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

function checkNumber_price(number) {
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