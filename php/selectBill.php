
<?php
session_start();
$_SESSION["login"] = false;
require("connect.php");
$orderId = mysqli_real_escape_string($mysqli,$_POST["orderId"]);

$orderId1 = "RC200702/0001";
if(isset($orderId)){
$sqlOrders = "select product.product_name, product.product_price ,orders.order_quantity_sell ,orders.order_producttotal from orders INNER JOIN product on orders.order_productid = product.product_no where orders.order_id = '".$orderId."' ";

$sqlOrders_detail = "select orders_detail.order_id, orders_detail.order_total, orders_detail.order_date, orders_detail.order_discounttext,orders_detail.order_discount_percen , orders_detail.order_discounttotal from orders_detail INNER JOIN orders on orders_detail.order_id = orders.order_id where orders_detail.order_id = '".$orderId."' ";
//where order_id = '".$orderId."'
$resultOrders = $mysqli -> query($sqlOrders)or die($mysqli->error);


$resultOrders_detail = $mysqli -> query($sqlOrders_detail)or die($mysqli->error);
$rowOrder_detail = $resultOrders_detail -> fetch_array()or die($resultOrders_detail->error);
//echo $rowOrder_detail[0]; 

while($rowOrders = $resultOrders -> fetch_row()){
    $arr[] = $rowOrders;
    /*echo json_encode(array("order_quantitySell"=>$rowOrders[0],"order_productTotal"=>$rowOrders[1],"order_productName"=>$rowOrders[2],"order_productPrice"=>$rowOrders[3], "error"=>$mysqli -> error)); ใช้*/
}
echo json_encode(array("dataOrders"=>$arr,"dataOrders_detail"=>$rowOrder_detail[0],"dataOrders_detail_orderTotal"=>$rowOrder_detail[1],"dataOrders_detail_orderDate"=>$rowOrder_detail[2],"dataOrders_detail_discounttext"=>$rowOrder_detail[3],"dataOrders_detail_discount_percen"=>$rowOrder_detail[4],"dataOrders_detail_discounttotal"=>$rowOrder_detail[5]));
}


//echo json_encode(array("order_billId"=>$rowOrder_detail[0], "error"=>$mysqli -> error)); ใช้


//echo $row;
/*echo json_encode(array("order_quantitySell"=>$rowOrders[0],"order_productName"=>$rowOrders[1],"order_productPrice"=>$rowOrders[1], "error"=>$mysqli -> error));
*/

?>