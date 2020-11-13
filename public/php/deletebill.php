
<?php

require("connect.php");
$txtFirstDate = $_GET["firstDate"];
$txtEndDate = $_GET["endDate"];
$deleteStatus = $_GET["deleteStatus"];
$t1="20-07-03";
$t2="20-07-09";
$t3="07/14/2020";
$t4 ="2020-07-09";
$txtFirstDateNew = cutString($txtFirstDate);
$txtEndDateNew = cutString($txtEndDate);
if($deleteStatus == "delete"){
$sql = "SELECT * FROM orders_detail WHERE order_date BETWEEN '".$txtFirstDate."' AND '".$txtEndDate."' ";
$resultOrders_detail = $mysqli -> query($sql)or die($mysqli->error);
//$rowOrder_detail = $resultOrders_detail -> fetch_array()or die($resultOrders_detail->error);
/*echo $rowOrder_detail;
echo "<br>";*/
while($rowOrders = $resultOrders_detail -> fetch_row()){

    $arr[] = $rowOrders;

}
    echo json_encode(array("dataOrders"=>$arr,"status"=>200));
}

if($deleteStatus == "deleteDetail"){
    $billId = $_GET["billId"];
    //echo $billId;
    /*$sql = "SELECT * FROM orders_detail WHERE order_id = '".$billId."' ";
    $sql = "SELECT * FROM orders WHERE order_id = '".$billId."' ";
    $resultOrders_detail = $mysqli -> query($sql)or die($mysqli->error);
    $rowOrders = $resultOrders_detail -> fetch_row();*/
    //echo json_encode(array("data"=>$rowOrders));
    //echo $rowOrders;

    //$rowOrder_detail = $resultOrders_detail -> fetch_array()or die($resultOrders_detail->error);
    /*echo $rowOrder_detail;
    echo "<br>";*/
    
    
    //echo $rowOrders;
    

    $test = "RC200703/0001";
$sqlOrdersDetail = "SELECT * FROM orders_detail WHERE order_id = '".$billId."' ";
$sqlOrders = "select product.product_name, product.product_price ,orders.order_quantity_sell ,orders.order_producttotal from orders INNER JOIN product on orders.order_productid = product.product_no where orders.order_id = '".$billId."' ";
//$sqlOrders = "SELECT * FROM orders WHERE order_id = '".$test."' ";
$resultOrders_detail = $mysqli -> query($sqlOrdersDetail)or die($mysqli->error);
$resultOrders = $mysqli -> query($sqlOrders)or die($mysqli->error);
$rowOrdersDetail = $resultOrders_detail -> fetch_row();

//$rowOrder_detail = $resultOrders_detail -> fetch_array()or die($resultOrders_detail->error);
/*echo $rowOrder_detail;
echo "<br>";*/

while($rowOrders = $resultOrders -> fetch_row()){
    /*echo "<br>";
    print_r($rowOrders);
    echo "<br>"; 1 3 4*/
    $arr[] = $rowOrders;
}
//print_r($arr);
echo json_encode(array("dataOrders"=>$arr,"dataOrdersDetail_id"=>$rowOrdersDetail[0],"dataOrdersDetail_total"=>$rowOrdersDetail[2],"dataOrdersDetail_date"=>$rowOrdersDetail[3]));
}

if($deleteStatus == "confirm"){
    
    $billId = $_GET["billId"];
    $sqlOrdersDetail = "INSERT INTO delete_orders_detail SELECT * FROM orders_detail WHERE order_id = '".$billId."' ";
    $sqlOrders = "INSERT INTO delete_orders SELECT * FROM orders WHERE order_id = '".$billId."'  ";
    
    //$sql = "INSERT INTO delete_orders_detail SELECT * FROM orders_detail WHERE order_id = '".$billId."' ";
    //$sql = "INSERT INTO delete_orders SELECT * FROM orders WHERE order_id = '".$billId."'  ";
//$sqlOrders = "SELECT * FROM orders WHERE order_id = '".$test."' ";
//$resultOrders_detail = $mysqli -> query($test)or die($mysqli->error);
if($mysqli -> query($sqlOrdersDetail) && $mysqli -> query($sqlOrders)) /*&& $mysqli -> query($sqlOrdersDetail)or die($mysqli->error)*/ {
    /*$deleteOrdersDetail = "DELETE FROM orders_detail WHERE order_id = '".$billId."' ";    
    $deleteOrders = "DELETE FROM orders WHERE order_id = '".$billId."'";*/
    $deleteOrdersDetail =  "DELETE FROM orders_detail WHERE order_id = '".$billId."' ";
    $deleteOrders =  "DELETE FROM orders WHERE order_id = '".$billId."'";
    if($mysqli -> query($deleteOrdersDetail) && $mysqli -> query($deleteOrders)){
        echo "ลบเลขที่บิล: '".$billId."' เรียบร้อย";
    }
}else{
    echo "ลบเลขที่บิล: '".$billId."' ไม่สำเร็จ";
}
//$resultOrders = $mysqli -> query($sqlOrders)or die($mysqli->error);
//$rowOrdersDetail = $resultOrders_detail -> fetch_row();
}
function cutString($str){
    $a = substr($str,4,9);
    $b = substr($str,0,3);
    $bInt = (int)$b;
    $bInt -= 2000 ;
    $b = (string)$bInt;
    return $a."".$b;
}
   
?>