<?php
session_start();
require("connect.php");
$maxProduct = 20;
$pageNumber = $_GET["pageNumber"];
$page = $sumData / $maxProduct;
$firstData = ($pageNumber*$maxProduct)-$maxProduct;
$select1 = "SELECT * FROM product LIMIT ".$firstData.", ".$maxProduct." ";
$resultLoad = $mysqli->query($select1);
while($rowsProducts =  $resultLoad ->fetch_array()){
	$arr[] = $rowsProducts;

}

echo json_encode(array("data"=>$arr));


?>