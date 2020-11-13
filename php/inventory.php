<?php
error_reporting(0);
require("connect.php");
$type = $_POST["typeOfPost"];
$checkUpdateError = array();
$inventory_detail_totalPrice = 0;
$productRc = mysqli_real_escape_string($mysqli, $_POST["productrc"]);
//$dataForInsertProduct = mysqli_real_escape_string($mysqli,$_POST["product_data"]);
$dataForInsertProduct = json_decode($_POST['product_data'], true);
$productNote = mysqli_real_escape_string($mysqli, $_POST["productnote"]);
$numberOfData = mysqli_real_escape_string($mysqli, $_POST["numberOfData"]);
$test2 = $_POST['product_data'];
$productIdTemplate = "";
//print_r($dataForInsertProduct);
//echo json_encode(array("statusCode"=>200,"data"=>$_POST["product_data"]));
if ($type == "new") {
  $sql_product = $mysqli->query("SELECT * FROM product  ORDER BY  product_no   DESC  LIMIT 1;    ") or die($mysqli->error); //ORDER BY order_date AND  
  $rs_product = $sql_product->fetch_array() or die($sql_product->error);
  if ($rs_product->num_rows === 0) {
    //print_r($rs_product);
  } else {
    $productIdTemplate = createNO_Product($rs_product, $dataForInsertProduct);
  }


  /*
$productNo = strlen($rs[0]);
if($productNo == 1){
   $productId = $rs[0]+=2;
   $productIdTemplate = "0000".$productId;
   echo $productIdTemplate;
}
else if($productNo == 2){
    $productId = $rs[0]+=2;
    $productIdTemplate = "000".$productId;
    echo $productIdTemplate;
}
else if($productNo == 3){
    $productId = $rs[0]+=2;
    $productIdTemplate = "00".$productId;
    echo $productIdTemplate;
}
else if($productNo == 4){
    $productId = $rs[0]+=2;
    $productIdTemplate = "0".$productId;
    echo $productIdTemplate;
}
else if($productNo == 5){
    $productId = $rs[0]+=2;
    $productIdTemplate = $productId;
    echo $productIdTemplate;
}*/
  $dateInvoid = date("Ymd");
  $dateToday = date("Y-m-d");
  if (count($dataForInsertProduct) == 1) {
    $stmt_product = $mysqli->prepare("INSERT INTO product (product_id, product_name, product_price,product_quantity,product_group,product_unit) VALUES (?, ?,?,?,?,?)");
    $inventory_detail_totalPrice +=   ($dataForInsertProduct[0]["product_price"] * $dataForInsertProduct[0]["product_quantity"]);
    $stmt_product->bind_param("ssiiss", $productIdTemplate, $dataForInsertProduct[0]["product_name"], $dataForInsertProduct[0]["product_price"], $dataForInsertProduct[0]["product_quantity"], $dataForInsertProduct[0]["product_type"], $dataForInsertProduct[0]["product_unit"]);
    $stmt_product->execute();
    if ($stmt_product === false) {
      $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
    } else {
    }
    $stmt_product->close();
  } else {
    $stmt_product = $mysqli->prepare("INSERT INTO product (product_id, product_name, product_price,product_quantity,product_group,product_unit) VALUES (?, ?,?,?,?,?)");

    for ($i = 0; $i < count($dataForInsertProduct); $i++) {
      $inventory_detail_totalPrice += ($dataForInsertProduct[$i]["product_price"] * $dataForInsertProduct[$i]["product_quantity"]);
      $stmt_product->bind_param("ssiiss", $productIdTemplate[$i], $dataForInsertProduct[$i]["product_name"], $dataForInsertProduct[$i]["product_price"], $dataForInsertProduct[$i]["product_quantity"], $dataForInsertProduct[$i]["product_type"], $dataForInsertProduct[$i]["product_unit"]);
      $stmt_product->execute();
      if ($stmt_product === false) {
        $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
      } else {
      }
    }
    $stmt_product->close();
  }
}

//$stmt_product = $mysqli->prepare("INSERT INTO product (product_id, product_name, product_price,product_quantity,product_group,product_unit) VALUES (?, ?,?,?,?,?)");

///***********************ใช้้ */

/*
if($stmt_product->execute()){
//echo "เพิ่มสินค้าเรียบร้อย";
}
else{
  //  echo"เพิ่มสินค้าไม่สำเร็จ: ". $mysqli->error;
}
*/
$sqlcommand_inventory = $mysqli->query("SELECT receive_no, receive_date FROM inventory ORDER BY receive_date  AND receive_no  DESC  LIMIT 1;   ") or die($mysqli->error); //ORDER BY order_date AND  
$rs_inventory = $sqlcommand_inventory->fetch_array() or die($sqlcommand_inventory->error);
//$result = $sqlcommand->get_result();
//print_r($rs_inventory);
$receiveNo;
$newreceiveNo = 0;
if ($rs_inventory["receive_date"] == $dateToday) {
  $receiveNo = $rs_inventory["receive_no"];
  $template_inventory = createNO_Inventory($receiveNo, 1);

  $template_inventory = "PO" . $dateInvoid . "/" . $template_inventory;
  // echo $template_inventory;
  $newreceiveNo = $receiveNo + 1;
} else {
  $receiveNo = 0;
  $template_inventory = createNO_Inventory($receiveNo, $receiveNo);
  $template_inventory = "PO" . $dateInvoid . "/" . $template_inventory;
  //$receiveNo +=1;
  // echo "gg";
  $newreceiveNo = $receiveNo + 1;
}
$newreceiveNo = (int)$newreceiveNo;
/*
if($result->num_rows === 0){
    echo"inventory 0";
}
else{
    $template_inventory = createNO_Inventory($rs_inventory,0);
    $template_inventory = "PO".$dateInvoid."/".$template_inventory;
}*/
//$dataForInsertProduct[$i]["product_id"]
$productNo = strlen($rs[0]);

if (count($dataForInsertProduct) == 1) {
  $stmt_inventory = $mysqli->prepare("INSERT INTO inventory(receive_no,receive_no_id, receive_id, product_id, product_price, product_quantity, receive_vat, product_group, product_unit,receive_date) VALUES (?,?,?,?,?,?, ?,?,?,?)");
  $stmt_inventory->bind_param("isssiissss", $newreceiveNo, $template_inventory, $productRc, $productIdTemplate, $dataForInsertProduct[0]["product_price"], $dataForInsertProduct[0]["product_quantity"], $dataForInsertProduct[0]["product_vat"], $dataForInsertProduct[0]["product_type"], $dataForInsertProduct[0]["product_unit"], $dateToday);
  $stmt_inventory->execute();
  if ($stmt_inventory === false) {
    $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
  } else {
  }
  $stmt_inventory->close();
} else {
  $stmt_inventory = $mysqli->prepare("INSERT INTO inventory(receive_no,receive_no_id, receive_id, product_id, product_price, product_quantity, receive_vat, product_group, product_unit,receive_date) VALUES (?,?,?,?,?,?, ?,?,?,?)");
  //$stmt_inventory->bind_param("isssiisssss", $newreceiveNo, $template_inventory, $productRc, $productIdTemplate, $productPrice, $productQuantity, $productVat, $productType, $productUnit, $productNote, $dateToday);
  for ($i = 0; $i < count($dataForInsertProduct); $i++) {
    $stmt_inventory->bind_param("isssiissss", $newreceiveNo, $template_inventory, $productRc, $productIdTemplate[$i], $dataForInsertProduct[$i]["product_price"], $dataForInsertProduct[$i]["product_quantity"], $dataForInsertProduct[$i]["product_vat"], $dataForInsertProduct[$i]["product_type"], $dataForInsertProduct[$i]["product_unit"], $dateToday);
    $stmt_inventory->execute();
    if ($stmt_inventory === false) {
      $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
    } else {
    }
  }
  $stmt_inventory->close();
}
insertTo_inventory_detail($newreceiveNo, $template_inventory, $dateToday, $productRc, $mysqli, $productNote, $checkUpdateError, $inventory_detail_totalPrice);
/*if ($stmt_inventory->execute()) {
  //echo "เพิ่มสินค้าเรียบร้อย. เลขที่ใบรับสินค้า: ".$template_inventory;
} else {
  //   echo"เพิ่มสินค้าไม่สำเร็จ: ". $mysqli->error;
}*/
function insertTo_inventory_detail($newreceiveNo, $template_inventory, $dateToday, $productRc, $mysqli, $productNote, $checkUpdateError, $inventory_detail_totalPrice)
{
  $stmt_inventory_detail = $mysqli->prepare("INSERT INTO inventory_detail(receive_no, receive_no_id, receive_id, total_price, receive_detail, receive_date) VALUES(?,?,?,?,?,?);");
  $stmt_inventory_detail->bind_param("ississ", $newreceiveNo, $template_inventory, $productRc, $inventory_detail_totalPrice, $productNote, $dateToday);
  $stmt_inventory_detail->execute();

  if ($stmt_inventory_detail === false) {
    $checkUpdateError[] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
  } else {
  }
  $stmt_inventory_detail->close();
  //$mysqli->close();
  if (count($checkUpdateError) > 0) {
    //echo "Insert_detail Error";
  } else {
    //echo "Insert_detail Success";
  }
  $inventory_detail_totalPrice = 0;
}

function createNO_Inventory($rs, $newday)
{
  $productNo = strlen($rs[0]);
  $newid = "";

  if ($newday == 0) {
    $productId = $newday + 1;
    $newid = "0000" . $productId;
    return $newid;
  } else {
    if ($productNo == 1) {
      $productId = $rs + 1;
      $newid = "0000" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 2) {
      $productId = $rs + 1;
      $newid = "000" . $productId;
    } else if ($productNo == 3) {
      $productId = $rs + 1;
      $newid = "00" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 4) {
      $productId = $rs + 1;
      $newid = "0" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 5) {
      $productId = $rs + 1;
      $newid = $productId;
      //  echo $productIdTemplate;
    }
    return $newid;
  }
}


function createNO_Product($rs, $dataCheckNo)
{

  if (count($dataCheckNo) > 1) {
    $newidArr = array();
    $countProductId = 2;
    for ($i = 0; $i < count($dataCheckNo); $i++) {
      $lastProductId = $rs[0];

      $productNo = strlen($rs[0]);
      $newid = "";
      if ($i > 0) {
        $countProductId = 1;
      }
      if ($productNo == 1) {
        $productId = $rs[0] += $countProductId;
        $newid = "0000" . $productId;
        $newidArr[] = $newid;
      } else if ($productNo == 2) {
        $productId = $rs[0] += $countProductId;
        $newid = "000" . $productId;
        $newidArr[] = $newid;
      } else if ($productNo == 3) {
        $productId = $rs[0] += $countProductId;
        $newid = "00" . $productId;
        $newidArr[] = $newid;
      } else if ($productNo == 4) {
        $productId = $rs[0] += $countProductId;
        $newid = "0" . $productId;
        $newidArr[] = $newid;
      } else if ($productNo == 5) {
        $productId = $rs[0] += $countProductId;
        $newid = $productId;
        $newidArr[] = $newid;
      }
    }
    return $newidArr;
  } else {
    $productNo = strlen($rs[0]);
    $newid = "";
    if ($productNo == 1) {
      $productId = $rs[0] += 2;
      $newid = "0000" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 2) {
      $productId = $rs[0] += 2;
      $newid = "000" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 3) {
      $productId = $rs[0] += 2;
      $newid = "00" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 4) {
      $productId = $rs[0] += 2;
      $newid = "0" . $productId;
      //  echo $productIdTemplate;
    } else if ($productNo == 5) {
      $productId = $rs[0] += 2;
      $newid = $productId;
      //  echo $productIdTemplate;
    }
    return $newid;
  }
}

if (count($checkUpdateError) > 0) {
  echo "ไม่สามารถเพิ่มสินค้าได้";
} else {
  echo "เพิ่มสินค้าเรียบร้อยเลขที่เอกสาร " . $template_inventory;
}
