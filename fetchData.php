<?php 
	// PHP for Day 4 Task 2.1
	// Student number: 201578549


	//Returns JSON data to Javascript file
	header("Content-type:application/json");
	
	//Connect to db 
	$pgsqlOptions = "host='dialogplus.leeds.ac.uk' dbname='geog5871' user='geog5871student' password='Geibeu9b'";
	$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
	
	//Define sql query
	$query = "SELECT * FROM gy21km_eq WHERE latitude<5.57 AND latitude> -11.6  AND longitude< 141 AND longitude>93.45 ";


	//Execute query
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());
	
	//Define new array to store results
	$indoData = array();

	//Loop through query results 
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
	
		//Populate indoData array 
		$indoData[] = array("date"=> $row["date"],"days"=>$row["days"],"magnitude" => $row["mag"],"lat"=>$row["latitude"],"lon"=>$row["longitude"]);
	}

	
	//Encode tweetData array in JSON
	echo json_encode($indoData); 

	
	//Close db connection
	pg_close($dbconn);
?>
