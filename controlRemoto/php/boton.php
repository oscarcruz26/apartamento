<?php
	//$ip = $_SERVER["HTTP_HOST"];
	$accion = $_GET["accion"];
	$cadena = strval($accion);
	header ("location: http://192.168.3.102/$cadena");
?>