<?php
require("connect.php");
//echo"hello Report";
$fDate = mysqli_real_escape_string($mysqli,$_POST["fDate"]);
$eDate = mysqli_real_escape_string($mysqli,$_POST["eDate"]);
$type = mysqli_real_escape_string($mysqli,$_POST["type"]);
$yearData = mysqli_real_escape_string($mysqli,$_POST["yearData"]);
$test = "%2020%";
$test1 = "07";
if($type == "year"){
    dataYear($mysqli,$fDate);
}
else if($type == "month"){
    dataMonth($mysqli,$fDate,$yearData);
}
else{
    dataDay($mysqli,$fDate,$eDate);
}
//SUBSTRING(order_date,'-', 1)
//$arr = array();
//CONCAT(SUBSTRING_INDEX(order_date, '-', -2)) ใช้เลือกข้อมูลจากฐานข้อมูลตามที่ต้องการ

//$resultLastBill = $mysqli -> query("SELECT * FROM orders_detail WHERE CONCAT(SUBSTRING_INDEX(order_date, '-', 2))  = $test   ")or die($mysqli->error); //ORDER BY order_date AND  
//while($rowOrders = $resultLastBill -> fetch_row()){
 //       $arr[] = $rowOrders;
 // echo($arr);
  //echo"<br>";
    /*echo json_encode(array("order_quantitySell"=>$rowOrders[0],"order_productTotal"=>$rowOrders[1],"order_productName"=>$rowOrders[2],"order_productPrice"=>$rowOrders[3], "error"=>$mysqli -> error)); ใช้*/
//}
function dataYear($mysqli,$fDate){
    $fDate = "%".$fDate."%";
$stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE order_date  LIKE ?")or die($mysqli->error);
$stmt->bind_param("s", $fDate);
$stmt->execute();
$resultLastBill = $stmt->get_result();
if($resultLastBill->num_rows === 0){
    echo json_encode(array("statusCode"=>201));
}else{
while($rowOrders = $resultLastBill -> fetch_row()){
        $arr[] = $rowOrders;
}


//$i ;
$monthData =array();
$testarray = array();
//print_r($arr);
for($i = 0; $i<count($arr);$i++){
    for($j = 1; $j<13;$j++){
      $monthData["month".$j][ ] = 0 ;
         if($arr[$i][3][5] == "0"){
            if($arr[$i][3][6] == $j){
           // echo$j;
           // $monthData["month".$j] =  array_push($monthData,$arr[$i]);
          $testarray[$j][ ]=$arr[$i];
           $monthData["month".$j][ ] =$arr[$i];
            }
         }
         else if($arr[$i][3][5] == "1" && $arr[$i][3][6] == "0"){
            $newMonth = $arr[$i][3][5].$arr[$i][3][6]; 
            $newMonthInt = (int)$newMonth;
            if($newMonthInt == $j){
               // echo$j."เดือน10";
               // $monthData["month".$j] = $arr[$i];
               $testarray[$j][ ]=$arr[$i];
              $monthData["month".$j][ ] =$arr[$i];
                }
         }
         else if($arr[$i][3][5] == "1" && $arr[$i][3][6] == "1"){
            $newMonth = $arr[$i][3][5].$arr[$i][3][6]; 
            $newMonthInt = (int)$newMonth;
            if($newMonthInt == $j){
               // echo$j."เดือน11";
               // $monthData["month".$j] = $arr[$i];
               $testarray[$j][ ]=$arr[$i];
               $monthData["month".$j][ ] =$arr[$i];
                }
         }
         else if($arr[$i][3][5] == "1" && $arr[$i][3][6] == "2"){
            $newMonth = $arr[$i][3][5].$arr[$i][3][6]; 
            $newMonthInt = (int)$newMonth;
            if($newMonthInt == $j){
               // echo$j."เดือน12";
               // $monthData["month".$j] = $arr[$i];
               $monthData["month".$j][ ] =$arr[$i];
               $testarray[$j][ ]=$arr[$i];    
            }
         }
    }
    //echo"<br>";
}
//print_r($test);
//print_r($monthData);
//echo count($monthData["month7"]);
//สำคัญ
/****************array_combine( $keys_array, $values_array )*************** 
 * 
 * Input : $array1 = ("65824", "92547", "12045");
        $array2 = ('1', '2', '3');
Output :
        Array
        (
          [65824] => 1
          [92547] => 2
          [12045] => 3
        )
*/
/**** ตัวที่ 2 กับ 7 */
$monthTotal = 0;
$monthSum = array();
$monthSumDiscount = array();
$monthbeforDiscount = array();
$sumbeforDiscount = 0;
$discountTotal = 0;
//echo count($testarray[0]);;
//print_r($testarray);
for($j = 1; $j < 13;$j++){
    
   /* for($i = 0; $i <  count($monthData["month".$j]);$i++){
        if(is_array($testarray[$j]) && count($testarray[$j]) == 0){
         }
         else{
         if(is_array($testarray[$j])&&$testarray[$j][7] > 0){
             $monthTotal += $testarray[$j][7];
     
         }
         else{ 
             $monthTotal += $testarray[$j][2];
     
         }*/
        /* if (is_array($monthData["month".$j]->handles) && count($monthData["month".$j]->handles) >= $monthData["month".$j]->maxHandles) { 
          echo"ขนาด0";
      }*/
        if(sizeof($monthData["month".$j]) > 0){
    
           for($i = 0; $i <  count($monthData["month".$j],1);$i++){

            $sumbeforDiscount += $monthData["month".$j][$i][2];
         if($monthData["month".$j][$i][5] || $monthData["month".$j][$i][6] > 0){
            if($monthData["month".$j][$i][5] > 0){
                $discountTotal += $monthData["month".$j][$i][5];
                
            }
            else{
                $discountTotal += ($monthData["month".$j][$i][2] - $monthData["month".$j][$i][7]);
            }
          }  

         if(is_array($monthData["month".$j])&&$monthData["month".$j][$i][7] > 0){
             $monthTotal += $monthData["month".$j][$i][7];
     
         }
         else{ 
             $monthTotal += $monthData["month".$j][$i][2];
     
         } 

/*foreach ($monthData["month".$countloop] as &$data) {


      if(is_array($monthData["month".$j]) && count($monthData["month".$j]) == 0){
    }
    else{
    if(is_array($monthData["month".$j])&&$monthData["month".$j][$i][7] > 0){
        $monthTotal += $monthData["month".$j][$i][7];

    }
    else{ 
        $monthTotal += $monthData["month".$j][$i][2];

    }*/
/*for($i = 0; $i <  count($monthData["month".$j]);$i++){
   if(is_array($monthData["month".$j]) && count($monthData["month".$j]) == 0){
    }
    else{
    if(is_array($monthData["month".$j])&&$monthData["month".$j][$i][7] > 0){
        $monthTotal += $monthData["month".$j][$i][7];

    }
    else{ 
        $monthTotal += $monthData["month".$j][$i][2];

    }   */

}
        }
        else{
   
}
$monthSumDiscount["month".$j] = $discountTotal;
$monthbeforDiscount["month".$j] = $sumbeforDiscount;
$monthSum["month".$j] = $monthTotal;
$monthTotal = 0;
$sumbeforDiscount = 0;
$discountTotal = 0;

}
    //echo $monthData["month7"][$i][2];
    //echo "<br>";
    /*for($j = 0; $j < count($monthData["month7"]);$j++){
       
//print_r($monthData["month7"][$j][2]);
}*/

/*echo$discountTotal;
echo"<br>";
echo$sumbeforDiscount;*/
//echo $monthTotal;
/*print_r($monthSum);
echo"<br>ขึ้น";
print_r($monthSumDiscount);
echo"<br>ขึ้น";
print_r($monthbeforDiscount);*/
echo json_encode(array("statusCode"=>200,/*"data"=>$monthData,*/"netPrice"=>$monthSum,"discount"=>$monthSumDiscount,"beforNet"=>$monthbeforDiscount, "error"=>$mysqli -> error));
}

}



//print_r(count($rs));
//print_r($rs);
/*while($i < count($arr)-1){
    //echo $arr[$i];
}*/

/*$stmt = $mysqli->prepare("SELECT CONCAT(SUBSTRING_INDEX(order_date, '-', 1)) AS newDate FROM orders_detail WHERE newDate  = ?");
$stmt->bind_param("s", $test);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0){
echo "0";
}
 else if($result->num_rows > 0){
    while($rows = $result->fetch_assoc()) {
    $arr[] = $rows;
    print_r($arr);
    echo $rows;
}
}
else{
    echo"0<";
}*/



/*$mysqli> SELECT SUBSTRING_INDEX('www.mysql.com', '.', 2);
-> 'www.mysql';*/

/*$stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE  SUBSTRING_INDEX(order, '.', 2) = ?");
$stmt->bind_param("s", $txtUsername,$txtPassword);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0){
    echo json_encode(array("statusCode"=>200,"loginalert"=>"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง","loginstatus"=>false));
}else if($result->num_rows > 0){
    session_destroy();
    while($rows = $result->fetch_assoc()) {
    $arr[] = $rows;
}
}*/

//echo$fDate;
//echo "test: ".$fDate;
/*
$str = "2020-07-03";
print_r (explode("-",$str));*/
//0echo$eDate;


function dataMonth($mysqli,$fDate,$yearData){
    //2020 กุมภา = 29
   $date = "%".$yearData."-".$fDate."%";
   //$t = "%2020-07%";
   $dayOfMonth = 0;
   if($fDate === "08"){
    $dayOfMonth = 31+1; 
   }
   else if($yearData % 2==0 && $yearData % 4==0 && $fDate =="02"){
    $dayOfMonth = 29+1; 
   }
   else if($fDate =="02"){
    $dayOfMonth = 28+1; 
   }
   else if($fDate % 2==0){
    $dayOfMonth = 30+1;
   }else{
    $dayOfMonth = 31+1; 
   }
   $stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE order_date  LIKE ?")or die($mysqli->error);
   $stmt->bind_param("s", $date);
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
   $dayDetail = array();
   //$testarray = array();
   //print_r($arr);
   //echo count($arr);
   $daySelect = "" ;
   $newDaySelect = substr($date,1,7);
   $BeforNet = 0;
   $discountTotal =0;
   $NetPrice = 0;
   for($j = 1; $j<$dayOfMonth;$j++){
    if($j < 10){
      $daySelect = $newDaySelect."-0".$j;
     }
     else if($j >= 10){
       $daySelect = $newDaySelect."-".$j;
     }
             $dayData["day".$j][ ] = 0 ;
             $dayDetail[] =$daySelect;
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
   echo json_encode(array("statusCode"=>200,/*"data"=>$monthData,*/"netPrice"=>$dayNetPrice,"discount"=>$dayDiscountTotal,"beforNet"=>$dayBeforNet,"dayDetail"=>$dayDetail, "error"=>$mysqli -> error));
   }
  }

  function dataDay($mysqli,$fDate,$eDate){
    //2020 กุมภา = 29
   //$fDate = "%".$fDate."%";
   //$fDate = "%".$eDate."%";
   //$t = "%2020-07%";

   $stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE order_date BETWEEN ? AND ?")or die($mysqli->error);
   $stmt->bind_param("ss", $fDate,$eDate);
   $stmt->execute();
   $resultLastBill = $stmt->get_result();
   if($resultLastBill->num_rows === 0){
       echo json_encode(array("statusCode"=>201));
   }else{
   while($rowOrders = $resultLastBill -> fetch_row()){
           $arr[] = $rowOrders;
   }
echo json_encode(array("statusCode"=>200,"data"=>$arr, "error"=>$mysqli -> error));
   }
  }

?>