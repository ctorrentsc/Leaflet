<?php
header('Access-Control-Allow-Origin: *'); //CORS encabezado de respuesta HTTP. Permet la comunicació entre diferents servidors
/*                                        //El comodín de asterisco permite que los scripts alojados en cualquier sitio carguen nuestros recursos; enumerar uno específico <base URI>permitirá que los scripts alojados en el sitio especificado, y no en otros, carguen nuestros recursos.
Trataremos los datos deacuerdo con la especificación 
*/
include("_db.php");//Consulta que fem

$sql = "SELECT * FROM restaurants"; //Consulta
$result = $mysqli->query($sql);//Resultat igual a la connexió (mysqli) i li passem el query amb la consulta declarada abans ($sql). La query és l'string de la consulta.

$numrows = $result->num_rows; //Files (resgistres) que retorna com a r/ la consulta

$datos = array(); 

$datos = $result->fetch_all(MYSQLI_ASSOC); //fetch_all(): Obtiene todas las filas a la vez y devuelve un array con todos.

echo json_encode($datos); //Mostrem els resultats en format JSON (The json_encode() function is used to encode a value to JSON format.)

?>
		