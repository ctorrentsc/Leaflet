<?php
header('Access-Control-Allow-Origin: *');

$mysqli = new mysqli('127.0.0.1', 'root', '', 'my_app'); //Connexió = a new mysqli(Servidor, usuari, base de dades on connectem)

if ($mysqli->connect_errno) { //Si la connexió dóna error
    echo "Lo sentimos, este sitio web está experimentando problemas.";
    echo "Error: Fallo al conectarse a MySQL debido a: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    exit;
}
$mysqli->set_charset("utf8");

?>
