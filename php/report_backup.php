<?php
require("connect.php");
//echo"hello Report";
$fDate = mysqli_real_escape_string($mysqli,$_POST["fDate"]);
$eDate = mysqli_real_escape_string($mysqli,$_POST["eDate"]);
$test = "%2020%
";
$test1 = "07";
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

$stmt = $mysqli->prepare("SELECT * FROM orders_detail WHERE order_date  LIKE ?")or die($mysqli->error);
$stmt->bind_param("s", $test);
$stmt->execute();
$resultLastBill = $stmt->get_result();
while($rowOrders = $resultLastBill -> fetch_row()){
        $arr[] = $rowOrders;
 
}

$i ;
$monthData =array();
$test;
$testarray = array();
//print_r($arr);
for($i = 0; $i<count($arr);$i++){
    for($j = 1; $j<13;$j++){
         if($arr[$i][3][5] == "0"){
            if($arr[$i][3][6] == $j){
           // echo$j;
           // $monthData["month".$j] =  array_push($monthData,$arr[$i]);
          $testarray[]=$arr[$i];
           $monthData["month".$j][ ] =$arr[$i];
            }
         }
         else if($arr[$i][3][5] == "1" && $arr[$i][3][6] == "0"){
            $newMonth = $arr[$i][3][5].$arr[$i][3][6]; 
            $newMonthInt = (int)$newMonth;
            if($newMonthInt == $j){
               // echo$j."เดือน10";
               // $monthData["month".$j] = $arr[$i];
               $testarray[]=$arr[$i];
              $monthData["month".$j][ ] =$arr[$i];
                }
         }
         else if($arr[$i][3][5] == "1" && $arr[$i][3][6] == "1"){
            $newMonth = $arr[$i][3][5].$arr[$i][3][6]; 
            $newMonthInt = (int)$newMonth;
            if($newMonthInt == $j){
               // echo$j."เดือน11";
               // $monthData["month".$j] = $arr[$i];
               $testarray[]=$arr[$i];
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
               $testarray[]=$arr[$i];    
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
$sumbeforDiscount = 0;
$discountTotal = 0;
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
    
    for($i = 0; $i <  count($testarray);$i++){
        if(is_array($monthData["month".$j]) && count($monthData["month".$j]) == 0){
         }
         else{
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
$monthSum["monthTotal".$j] = $monthTotal;
$monthTotal = 0;

}
    //echo $monthData["month7"][$i][2];
    //echo "<br>";
    /*for($j = 0; $j < count($monthData["month7"]);$j++){
       
//print_r($monthData["month7"][$j][2]);
}*/

echo$discountTotal;
echo"<br>";
echo$sumbeforDiscount;
//echo $monthTotal;
print_r($monthSum);

//echo json_encode(array("statusCode"=>200,"data"=>$monthData,"dataSum"=>$monthSum, "error"=>$mysqli -> error));






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







?>