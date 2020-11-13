<?php
    
    //echo $file_table;


    function createTable($sqlCommand){
        $conn = myConnect();
        $isSuccess = false;
        if($conn->multi_query($sqlCommand) === TRUE)
        {
            $isSuccess = true;
        }
        else{
            echo"Error".$sqlCommand."<br>".$conn->error;
        }
    }
    
    function showColumnsDatabase($tableName){
        $conn = myConnect();
        $sqlCommand = "SHOW COLUMNS FROM $tableName";
        $result = $conn->query($sqlCommand);
        $colums = array();
        if($result->num_rows >0){
            while($row = $result->fetch_assoc())
            {
                //Field	Type	Null	Key	Default	Extra	
                $columsRows = array("Field"=>$row["Field"]                  ,
                                    "Type"=>$row["Type"]                    ,
                                    "Null"=>$row["Null"]                    ,
                                    "Key"=>$row["Key"]                      ,
                                    "Default"=>$row["Default"]              ,
                                    "Extra"=>$row["Extra"]
                                    );
                array_push($colums,$columsRows);
            }
        
        }
        else{
            echo"0 Result";
        }
        $conn -> close();
        return $colums;
    }

    function myConnect(){
        $hostName = "localhost";
        $hostUsername = "root";
        $hostPassword =  "";
        $database = "learn_expertprograming";

        //$connect = mysqli_connect($hostName,$hostUsername,$hostPassword,$database) or die(mysqli_errno($connect));
        $mysqli = new mysqli($hostName,$hostUsername,$hostPassword,$database);
        return $mysqli;
        if ($mysqli -> connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
        }
            }

    function getTableNameFromFileContent($file_table){
        $lines = explode("\n",$file_table);
        $tableNameTemp = explode(" ",$lines[0]);
        $tableNameTemp = $tableNameTemp[count($tableNameTemp)-1];
        $tableName  = substr($tableNameTemp,1,strlen($tableNameTemp)-4);
        return $tableName;

    }

    function clearFolder(){
        $structure = 'output/';
        $files = glob($structure."*"); // get ไฟล์ทั้งหมดจาก part
        foreach($files as $f){
            if(is_file($f))
            {
                unlink($f); //delete
            }
            if(is_dir($f))
            {
                rmdir($f);
            }
        }
        if(is_dir($structure)){
            rmdir($structure);
        }
   
    }

    function generateCodeFileIndex($tableName,$columns){
        $structure = 'output/';
        if(!mkdir($structure,0777,true)){
            die("Can't to create Folder");
        }
        $toSearch = array("{{TABLE_NAME}}");
        $toReplace = array($tableName);
        $template_content = file_get_contents("index.php") or die("Can't Open File.");
        $file = fopen($structure."index.php","w") or die("Can't Open File.");
    
        $template_content_out = str_replace($toSearch,$toReplace,$template_content);
        $txt = $template_content_out;
        fwrite($file,$txt);
        fclose($file);
    
}

          //ถึงตอน 17นาที
        
          $file_table = file_get_contents("create_table.txt") or die("Can't Open File.");
          $tableName = getTableNameFromFileContent($file_table);
          //echo $tableName;
          //getTableNameFromFileContent($file_table);
          createTable($file_table);
          $columns = showColumnsDatabase($tableName); //$file_table จริงๆไม่ควร fix
          print_r($columns) ;
         clearFolder();
         generateCodeFileIndex($tableName,$columns);
         for($i = 0 ; $i < count($columns); $i++){
             echo $columns[$i]["Field"]."<br/>";
         }
      
?>