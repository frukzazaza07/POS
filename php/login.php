<?php
session_start();
require("connect.php");
$txtUsername = mysqli_real_escape_string($mysqli,$_POST["txtUsername"]);
$txtPassword = mysqli_real_escape_string($mysqli,$_POST["txtPassword"]);
$admin = "admin";
$adminP = "1234";
$_SESSION["login"] = 0;
/*
$sql = "SELECT * FROM member WHERE username = '".$txtUsername."' and password = '".$txtPassword."' " ; 
$stmt = $mysqli->prepare($sql); 
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result(); // get the mysqli result
$user = $result->fetch_assoc();
if(mysqli_num_rows($stmt)== 0) {
    echo json_encode(array("statusCode"=>200,"loginstatus"=>"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" , "error"=>$mysqli -> error));
}
else{
    echo json_encode(array("statusCode"=>200,"loginstatus"=>"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" , "error"=>$mysqli -> error));
}*/

$stmt = $mysqli->prepare("SELECT * FROM member WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $txtUsername,$txtPassword);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0){
    echo json_encode(array("statusCode"=>200,"loginalert"=>"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง","loginstatus"=>false));
}else if($result->num_rows > 0){
    session_destroy();
    while($rows = $result->fetch_assoc()) {
    $arr[] = $rows;
}
$_SESSION["sessionU"] = $arr[0]["username"];
$_SESSION["sessionFn"] = $arr[0]["name"];
$_SESSION["sessionLn"] = $arr[0]["lastname"];
$_SESSION["sessionT"] = $arr[0]["type"];
$_SESSION["sessionP"] = $arr[0]["position"];
$_SESSION["login"] = 1;
echo json_encode(array("statusCode"=>200,"data"=>$arr,"loginstatus"=>true,"usertype"=>$_SESSION["sessionT"],"sessionU"=>$_SESSION["sessionU"],"sessionFn"=>$_SESSION["sessionFn"],"sessionLn"=>$_SESSION["sessionLn"],"sessionP"=>$_SESSION["sessionP"],"sessionLogin"=>$_SESSION["login"]));
}
else{
    $stmt->error;
    echo json_encode(array("statusCode"=>202,"error"=>$mysqli -> error));
}

//var_export($name);
$stmt->close();
//echo json_encode(array("statusCode"=>200,"loginstatus"=>"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"));
//5681994 พี่หญิง
?>