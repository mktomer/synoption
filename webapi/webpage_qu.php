<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header("Content-type: application/json");



require_once( 'config.php' );
//include("config.php");


	
	if(file_get_contents('php://input'))
	{
		

		$json = file_get_contents('php://input');
		$uData=json_decode($json, true);
		
		$qr1='';
		$whr="";
		$res1="";
		
		if($uData['command']=='getQuery')
		{
		
			currentView($uData['targate']);
		}
		else if($uData['command']=='setQuery')
		{
			setData($uData['product']);
		}
		else if($uData['command']=='updateQuery')
		{
			updateData($uData);
		}
		
	}
	else
	{
	echo json_encode(array("msg"=>"Sory... Something is rong."));
				
	}




/////////////////////////////////////////////////
////////////////////////////////////////////////

function currentView($targate)
{
	
	$qr1="SELECT * FROM ".$targate;	
	
	$result = new DBClass();
	$ar=$result->query($qr1);
	
	
	if ($result->numRows($ar)>0)
	{
		
		while($row = $result->fetchAssoc($ar))
		{
			
			$rows[] = $row;
		}
	
	 echo json_encode(array("status"=>"success", "msg"=>"", "result"=> $rows));
	}
	else
	{
		echo json_encode(array("status"=>"fail","msg"=>"Sory... Something is rong..."));
	}
	
}



function setData($item)
{
	//$item['name']
		
	$qr1="INSERT INTO cart (name,mrp,price,image,detail,quantity) VALUES ('".$item['name']."', '".$item['mrp']."', '".$item['price']."', '".$item['image']."', '".$item['detail']."',1)";

	$result = new DBClass();
	$ar=$result->query($qr1);
	
	$lastRow = $result->lastInsertedID();
	echo $lastRow;
	
	
}

function updateData($item)
{
	$whr = "";
	if($item['id']!="all")
	{
		$whr = "WHERE id = ".$item['id'];
	}
	$qr1="DELETE FROM cart ".$whr;

	$result = new DBClass();
	$ar=$result->query($qr1);
	
	$lastRow = $result->lastInsertedID();

	currentView($item['targate']);
	
}



?>