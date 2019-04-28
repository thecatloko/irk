<?php
include_once "../../conf.php";

$id = $_REQUEST['id'];
try {
returnJson(
	selectWhere(
		'archetype_benefit',
		array('id', 'name', 'description'), 
		'fk_archetype = ' . $id));
} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}
/*
$return = retrieve_archetype_benefits($id);

$json = json_encode($return, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK );

if ($json === FALSE) {
	echo 'JSON error! Error code: ' . json_last_error() . '; error message: "' . json_last_error_msg() . '".';
	die();
}

echo $json;

function retrieve_archetype_benefits($id) {
	global $db;
	
	$archetypes = array();
	$query = 'SELECT * FROM archetype_benefit WHERE fk_archetype = ' . $id;
	$st = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$st->execute();
	
	while ($res = $st->fetch(PDO::FETCH_ASSOC)) {
		$index = count($archetypes);
		$archetypes[$index] = array(
			'id' => $res['id'],
			'name' => $res['name'],
			'description' => $res['description']
			);
	}
	
	return $archetypes;
}
*/

