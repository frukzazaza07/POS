<?php
error_reporting(E_ALL ^ E_NOTICE);
$hostName = "localhost";
$hostUsername = "root";
$hostPassword =  "";
$database = "pos1";

//$connect = mysqli_connect($hostName,$hostUsername,$hostPassword,$database) or die(mysqli_errno($connect));
$mysqli = new mysqli($hostName, $hostUsername, $hostPassword, $database);

if ($mysqli->connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  exit();
}
