<?php
require("connect.php");
$search = mysqli_real_escape_string($mysqli,"%{$_POST['searchProduct']}%") ;
$txtData = mysqli_real_escape_string($mysqli,"%{$_POST['txtData']}%") ;
$send = $_POST["send"];
$t = "ป";
/*
$stmt = $mysqli->prepare("SELECT * FROM product WHERE product_id LIKE ? OR product_name LIKE ? ");
$stmt->bind_param("ss", $txtData,$txtData);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows > 0){
  echo json_encode(array("status"=>201,"error"=>"ไม่พบข้อมูล"));
}
else{
  echo"g";
}
*/
if($send == "search"){
$sql = "SELECT * FROM product WHERE product_id LIKE '%".$txtData."%' OR product_name LIKE '%".$txtData."%' ";
$query = mysqli_query($mysqli,$sql)or die($mysqli->error) ;

if(mysqli_num_rows($query) > 0){
  while($rowOrders = $query -> fetch_row()){
    $arr[] = $rowOrders;
  
}
echo json_encode(array("status"=>"200","data"=>$arr));
  //  echo json_encode(array("status"=>201,"error"=>"ไม่พบข้อมูล"));
  //echo json_encode(array("status"=>201, "error"=>$mysqli -> error));   
    $mysqli -> close();

}else{
  echo json_encode(array("status"=>201,"error"=>"ไม่พบข้อมูล"));
       //echo"else";
      //ใช้ 
     //  print_r($arr);
     $mysqli -> close();

}
}
/*
    $sql = "SELECT * FROM product WHERE product_id LIKE '%".$t."%' OR product_name LIKE '%".$t."%' ";
    $query = $mysqli -> query($sql)or die($mysqli->error);
    $rs_productName = $query -> fetch_array()or die($query->error);
      $num =  $mysqli ->$num($query); // mysqli_num_rows($query) ;
      printf($num);
        if($num > 0){  
          while($rowOrders = $query -> fetch_row()){
            $arr[] = $rowOrders;
          
       }
       echo json_encode(array("status"=>"200","data"=>$arr));
          //  echo json_encode(array("status"=>201,"error"=>"ไม่พบข้อมูล"));
          //echo json_encode(array("status"=>201, "error"=>$mysqli -> error));   
            $mysqli -> close();
        }
        
      //echo "  <tbody>span class='form-text text-danger info' id='notFound'>ไม่พบข้อมูล</span></tbody>";
  else{
    echo json_encode(array("status"=>201,"error"=>"ไม่พบข้อมูล"));
       //echo"else";
      //ใช้ 
     //  print_r($arr);
     $mysqli -> close();
    }
    */

    if($send == "conflimSelect"){
      //$te = $_POST['productList'];
      $dataForSelectProduct = json_decode($_POST['productList'], true);
     // echo(count($dataForSelectProduct)); 
      $sqlCmd = "SELECT product_id, product_name,product_price,product_quantity,product_unit,product_group FROM product WHERE product_id = ?";
      $stmt = $mysqli->prepare($sqlCmd);
      for($i = 0; $i < count($dataForSelectProduct); $i++){
      $stmt->bind_param("s", $dataForSelectProduct[$i]);
      $stmt->execute();
      $result = $stmt->get_result();
      //$result = $stmt->get_result();
      while($data = $result->fetch_assoc()) {
        //  echo $data["product_id"];
         $arr[] =$data;
        // echo $data['product_id'];
         /*echo "ggg";
         print_r($data);*/
      }
   // echo "ttt";
    }
   // echo ($arr);
   echo json_encode(array("status"=>"200","data"=>$arr));
    }
?>