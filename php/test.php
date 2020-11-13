<?php

function dataMonth(){
  require("connect.php");
 $fDate = "%".$fDate;
 $t = "%2020-07%";
 $stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE order_date  LIKE ?")or die($mysqli->error);
 $stmt->bind_param("s", $t);
 $stmt->execute();
 $resultLastBill = $stmt->get_result();
 if($resultLastBill->num_rows === 0){
     echo json_encode(array("statusCode"=>201));
 }else{
 while($rowOrders = $resultLastBill -> fetch_row()){
         $arr[] = $rowOrders;
 }
 
 
 //$i ;
 $dayNetPrice =array();
 $dayBeforNet = array();
 $dayDiscountTotal = array();
 //$testarray = array();
 //print_r($arr);
 //echo count($arr);
 $daySelect ;
 $newDaySelect = substr($t,1,7);
 $BeforNet = 0;
 $discountTotal =0;
 $NetPrice = 0;
 for($j = 1; $j<32;$j++){
  if($j < 10){
    $daySelect = $newDaySelect."-0".$j;
   }
   else if($j >= 10){
     $daySelect = $newDaySelect."-".$j;
   }
           $dayData["day".$j][ ] = 0 ;
          /* echo"<br>";
           echo$daySelect;*/
           
     for($i = 0; $i<count($arr);$i++){
        /*echo"<br>";
        echo $i;*/
          if($arr[$i][3] ==  $daySelect){
            $BeforNet+=$arr[$i][2];

            if($arr[$i][5] > 0){
              $discountTotal += $arr[$i][5];
            }
            else if($arr[$i][6] > 0){
              $discountTotal += ($arr[$i][2]-$arr[$i][7]);
            }

            if($arr[$i][6] > 0 || $arr[$i][5] > 0){
              $NetPrice += $arr[$i][7];
            }
            else{
              $NetPrice += $arr[$i][2];
            }
          }
       
     }
     $dayNetPrice["day".$j][ ] = $NetPrice;
     $dayDiscountTotal["day".$j][ ] = $discountTotal;
     $dayBeforNet["day".$j][ ] = $BeforNet;

     $BeforNet =0;
     $discountTotal = 0;
     $NetPrice = 0;
     //echo"<br>";
 }/*
 echo"<br>สุทธิ";
 print_r($dayNetPrice);
 echo"<br>ส่วนลด";
 print_r($dayDiscountTotal);
 echo"<br>ก่อนส่วนลด";
 print_r($dayBeforNet);*/
 echo json_encode(array("statusCode"=>200,/*"data"=>$monthData,*/"netPrice"=>$dayNetPrice,"discount"=>$dayDiscountTotal,"beforNet"=>$dayBeforNet, "error"=>$mysqli -> error));
 }
}


?>