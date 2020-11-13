<?php
$hostName = "localhost";
$hostUsername = "root";
$hostPassword =  "";
$database = "pos";

//$connect = mysqli_connect($hostName,$hostUsername,$hostPassword,$database) or die(mysqli_errno($connect));
$mysqli = new mysqli($hostName,$hostUsername,$hostPassword,$database);

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>