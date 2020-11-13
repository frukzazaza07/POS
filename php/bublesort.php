<?php
$arr = array(4,8,1,2,0,6,5,3,7,9);
$size = count($arr)-1;
for($i=0;$i<$size;$i++){
    for($j=0;$j<$size;$j++){
        if($arr[$j]>$arr[$j+1]){
           $k = $arr[$j];
           $arr[$j] = $arr[$j+1];
           $arr[$j+1]= $k;  
        }
        print_r($arr);
        echo $i."<br>";
    }
}
echo"จบ";
print_r($arr);
?>