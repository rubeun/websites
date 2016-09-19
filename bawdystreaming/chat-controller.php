<?php
//creating Event stream 
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$name=strip_tags($_GET['name']);
$msg=strip_tags($_GET['msg']);
$msg = stripslashes($msg);

function sendMsg($msg) {
	echo "data: $msg" . PHP_EOL;
	ob_flush();
	flush();
}
if(!empty($name) && !empty($msg)){
	$fp = fopen("_chatlog.txt", 'a');  
	fwrite($fp, '<div class="chatmsg"><b>'.$name.'</b>: '.$msg.'<br/></div>'.PHP_EOL);  
	fclose($fp);  
}

if(file_exists("_chatlog.txt") && filesize("_chatlog.txt") > 0){  
	$arrhtml=array_reverse(file("_chatlog.txt"));
//	$html=$arrhtml[0]; 
	$html= implode(" ",$arrhtml); 
}

if(filesize("_chatlog.txt") > 100000){
 unlink("_chatlog.txt");
}


sendMsg($html);