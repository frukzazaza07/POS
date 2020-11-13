<?php
require_once("connect.php");
$type = $_POST["typeOfPost"];
$productRc = $_POST["productRc"];
$productNote = $_POST["productNote"];
$product_data = json_decode($_POST["product_data"], true);
$checkUpdateError = array();
$inventory_detail_totalPrice = 0;
/* สร้าง เลขที่ PO*/

$productIdTemplate = "";
$dateInvoid = date("Ymd");
$dateToday = date("Y-m-d");
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
/**/


if ($type = "update") {
  //print_r($product_data);
  /* $mysqli = $mysql;
   $newreceiveNo = $newreceive;
   $template_inventory = $template;
   $dateToday = $date;
   $productRc = $Rc;*/

  $stmt_product = $mysqli->prepare("UPDATE product SET product_name = ?,product_price = ?,product_quantity = ?,product_unit = ?,product_group = ? WHERE product_id = ?;");

  for ($i = 0; $i < count($product_data); $i++) {
    //print_r($product_data);
    $inventory_detail_totalPrice += ($product_data[$i]["product_price"] * $product_data[$i]["new_quantity"]);
    $stmt_product->bind_param("siisis", $product_data[$i]["product_name"], $product_data[$i]["product_price"], $product_data[$i]["product_quantity"], $product_data[$i]["product_unit"], $product_data[$i]["product_type"], $product_data[$i]["product_id"]);
    $stmt_product->execute();


    if ($stmt_product === false) {
      $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
    } else {
    }
  }
  $stmt_product->close();
  //$mysqli->close();

  insertTo_inventory_detail($newreceiveNo, $template_inventory, $dateToday, $productRc, $mysqli, $productNote, $checkUpdateError, $inventory_detail_totalPrice);
  insertTo_inventory($newreceiveNo, $template_inventory, $product_data, $dateToday, $productRc, $mysqli, $checkUpdateError);
  if (count($checkUpdateError) > 0) {
    // echo "Update Error";
  } else {
    // echo "Update Success";
  }
  //$query = ;
  /*
if($mysqli->query($sql)or die($mysqli->error)){
echo "Update -ข้อมูลเรียบร้อย";
}
else{
    echo"ไม่สามารถ Update ข้อมูลได้".$mysqli->error;
}
*/
}

function insertTo_inventory($newreceiveNo, $template_inventory, $product_data, $dateToday, $productRc, $mysqli, $checkUpdateError)
{
  $stmt_inventory = $mysqli->prepare("INSERT INTO inventory(receive_no, receive_no_id, receive_id,product_id, product_price, product_quantity, receive_vat, product_group, product_unit, receive_date) VALUES(?,?,?,?,?,?,?,?,?,?);");
  for ($i = 0; $i < count($product_data); $i++) {
    // มาทำตรงนี้ insert ไม่วนรูป
    /* $insertSql = "INSERT INTO inventory(receive_no, receive_no_id, receive_id,product_id, product_price, product_quantity, receive_vat, product_group, product_unit, receive_date) VALUES($newreceiveNo ,$template_inventory, $productRc,$product_data[$i]['product_id'],$product_data[$i]['product_price'] ,$product_data[$i]['product_quantity'], $product_data[$i]['product_vat'],$product_data[$i]['product_type'], $product_data[$i]['product_unit'],$dateToday)";
        $query = mysqli_query($mysqli,$insertSql);*/
    $stmt_inventory->bind_param("isssiissss", $newreceiveNo, $template_inventory, $productRc, $product_data[$i]["product_id"], $product_data[$i]["product_price"], $product_data[$i]["product_quantity"], $product_data[$i]["product_vat"], $product_data[$i]["product_type"], $product_data[$i]["product_unit"], $dateToday);
    $stmt_inventory->execute();
    if ($stmt_inventory === false) {
      $checkUpdateError[$i] = trigger_error("ไม่สามารถเพิ่มข้อมูลได้", E_USER_ERROR);
    } else {
    }
  }
  $stmt_inventory->close();
  //$mysqli->close();
  if (count($checkUpdateError) > 0) {
    // echo "Insert Error";
  } else {
    // echo "Insert Success";
  }
}

function insertTo_inventory_detail($newreceiveNo, $template_inventory, $dateToday, $productRc, $mysqli, $productNote, $checkUpdateError, $inventory_detail_totalPrice)
{
  /*echo $newreceiveNo;
  echo $template_inventory;
  echo $dateToday;
  echo $productRc;*/
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
if (count($checkUpdateError) > 0) {
  echo "ไม่สามารถเพิ่มสินค้าได้";
} else {
  echo "เพิ่มสินค้าเรียบร้อยเลขที่เอกสาร " . $template_inventory;
}
