<?php
session_start();
require("connect.php");
$sellMenu = json_decode(stripslashes($_POST['sellMenu']));
$quantityMenu = json_decode(stripslashes($_POST['quantityMenu']));
$totalAddPrice = json_decode(stripslashes($_POST['totalAddPrice']));
$sumTotalPrice = $_POST['sumTotalPrice'];
$sumTotalPriceDiscount = $_POST["sumTotalPriceDiscount"];
$txtDiscount = $_POST["txtDiscount"];
$discountValue = $_POST["discountValue"];
$typeOfDiscount = $_POST["typeOfDiscount"];
$dateRc = date("ymd");
$presentQuantity = 0;
$dateToDay = date("Y-m-d");
$_SESSION["login"] = false;
//echo $date;
for ($i = 0; $i < count($sellMenu); $i++) {
   $mysql_selectQuantity = "SELECT product_quantity FROM product WHERE product_no = $sellMenu[$i]";
   $query_selectQuantity = mysqli_query($mysqli, $mysql_selectQuantity);
   $rs_selectQuantity = $query_selectQuantity->fetch_array() or die($query_selectQuantity->error);
   //  echo $rs_selectQuantity["product_quantity"];
   $presentQuantity = $rs_selectQuantity["product_quantity"] - $quantityMenu[(int)$sellMenu[$i]];
   /* echo $presentQuantity;
   echo "<br>";*/
   $mysql_updateQuantity = "UPDATE product SET product_quantity = $presentQuantity WHERE product_no=$sellMenu[$i]";
   mysqli_query($mysqli, $mysql_updateQuantity);
   $presentQuantity = 0;
}

if (mysqli_num_rows($mysqli->query("SELECT * FROM orders_detail ")) == 0) {
   $numberRc = 0;

   /*echo "อยู่ที่เดิม";
   echo $resultLastBill1;*/
} else {
   $resultLastBill = $mysqli->query("SELECT order_numberRc, order_date FROM orders_detail ORDER BY  order_date AND order_numberRc  DESC  
LIMIT 1;   ") or die($mysqli->error); //ORDER BY order_date AND  
   $rowLastBill = $resultLastBill->fetch_array() or die($resultLastBill->error);
   /*echo $rowLastBill["order_date"];
echo $rowLastBill["order_numberRc"];
echo $dateToDay;
echo $rowLastBill["order_numberRc"];*/
   //echo $rowLastBill["order_numberRc"];
   if ($rowLastBill["order_date"] == $dateToDay) {
      // echo "if1";
      $numberRc = $rowLastBill["order_numberRc"];
   } else {
      //echo "else2";
      $numberRc = 0;
   }
}

//echo $numberRc;

//echo $rowLastBill["order_numberRc"];
//echo $rowLastBill["order_date"];

$numberRc +=  1;
//echo $numberRc;
$numberRcString = (string)$numberRc;
//echo $numberRcString;
$numberRcString = strlen($numberRcString);

$numberRcStringlength = (int)$numberRcString;
//echo $numberRcStringlength;
$numberRcStringTemplate = "";
if ($numberRcStringlength == 1) {
   $numberRcStringTemplate = "000" . $numberRc;
} else if ($numberRcStringlength == 2) {
   $numberRcStringTemplate = "00" . $numberRc;
} else if ($numberRcStringlength == 3) {
   $numberRcStringTemplate = "0" . $numberRc;
} else if ($numberRcStringlength == 4) {
   $numberRcStringTemplate = $numberRc;
}
//echo $numberRcStringTemplate;
$templateRc = "RC" . $dateRc . "/" . $numberRcStringTemplate;
//echo $templateRc;
//$myvar = array('statusCode'=>200,'statusCode'=>201);


if ($discountValue == false) {

   $mysqli->query("INSERT INTO orders_detail(order_id, order_numberRc,order_total,order_date,order_sale_id,order_discounttext,order_discounttotal) VALUES ('" . $templateRc . "', '" . $numberRc . "','" . $sumTotalPrice . "','" . $dateToDay . "','2',0,0)");
   if (is_array($sellMenu) || is_object($sellMenu)) {

      foreach ($sellMenu as $s) {
         $sqlCommand = "INSERT INTO orders(order_id, order_productid, order_discountid, order_quantity_sell,order_producttotal) VALUES ('" . $templateRc . "','" . $s . "','" . $sumTotalPrice . "','" . $quantityMenu[$s] . "','" . $totalAddPrice[$s] . "')";
         $query = $mysqli->query($sqlCommand);
      }
      if ($query) {
         //echo("Error description: " . $mysqli -> error);
         echo json_encode(array("statusCode" => 200, "billId" => $templateRc, "totalPrice" => $sumTotalPrice));

         //echo json_encode(array("error".$mysql -> error));
      } else {
         echo json_encode(array("statusCode" => 201, "error" => $mysqli->error));
         //echo json_encode(array("statusCode"=>2200));
         //echo json_encode($myvar);
         //echo json_encode(array("good"=>"good"));
      }
   }
}
if ($discountValue == true) {
   if ($typeOfDiscount == "percen") {
      $mysqli->query("INSERT INTO orders_detail(order_id, order_numberRc,order_total,order_date,order_sale_id,order_discount_percen,order_discounttotal) VALUES ('" . $templateRc . "', '" . $numberRc . "','" . $sumTotalPrice . "','" . $dateToDay . "','2','" . $txtDiscount . "','" . $sumTotalPriceDiscount . "')");
   } else {
      $mysqli->query("INSERT INTO orders_detail(order_id, order_numberRc,order_total,order_date,order_sale_id,order_discounttext,order_discounttotal) VALUES ('" . $templateRc . "', '" . $numberRc . "','" . $sumTotalPrice . "','" . $dateToDay . "','2','" . $txtDiscount . "','" . $sumTotalPriceDiscount . "')");
   }
   if (is_array($sellMenu) || is_object($sellMenu)) {

      foreach ($sellMenu as $s) {
         $sqlCommand = "INSERT INTO orders(order_id, order_productid, order_discountid, order_quantity_sell,order_producttotal) VALUES ('" . $templateRc . "','" . $s . "','" . $sumTotalPrice . "','" . $quantityMenu[$s] . "','" . $totalAddPrice[$s] . "')";
         $query = $mysqli->query($sqlCommand);
      }
      if ($query) {
         //echo("Error description: " . $mysqli -> error);
         echo json_encode(array("statusCode" => 200, "billId" => $templateRc, "totalPrice" => $sumTotalPrice, "txtDiscount" => $txtDiscount, "sumTotalPriceDiscount" => $sumTotalPriceDiscount));

         //echo json_encode(array("error".$mysql -> error));
      } else {
         echo json_encode(array("statusCode" => 201, "error" => $mysqli->error));
         //echo json_encode(array("statusCode"=>2200));
         //echo json_encode($myvar);
         //echo json_encode(array("good"=>"good"));
      }
   }
}
/*$sql = "INSERT INTO orders(order_id, order_productid) VALUES('11','333')"; 
if(mysqli_query($connect,$sql)){
   echo"บันทึกข้อมูลเรียบร้อย";
}else{
   echo"ไม่สามารถบันทึกข้อมูลได้";
}


/*
foreach($sellMenu as $s){
}
if(mysqli_query($connect,$sql)or die(mysqli_errno($connect))){
   echo"บันทึกข้อมูลเรียบร้อย";
}else{
   echo"ไม่สามารถบันทึกข้อมูลได้";
}*/
