<?php
include_once "../../conf.php";

$fId = $_REQUEST['fId'];
$sId = $_REQUEST['sId'];
if (is_null($fId) || is_null($sId)) {
	die("parameters not found");
}
returnJson(retrieve_magic($fId, $sId));

function retrieve_magic($fId, $sId) {
	global $db;
	$magic = array();
	$query = "SELECT DISTINCT id, name, cst, alc, pod, man, ofe, description"
		. ' FROM magic m'
		. ' LEFT JOIN career_magic cm ON m.id = cm.fk_magic'
		. ' WHERE cm.fk_career IN (' . $fId . ', ' . $sId . ')'
		. ' ORDER BY name';
	$st = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$st->execute();
	while ($res = $st->fetch(PDO::FETCH_ASSOC)) {
		$index = count($magic);
		$magic[$index] = array(
			'id' => $res['id'],
			'name' => $res['name'],
			'cst' => $res['cst'],
			'alc' => $res['alc'],
			'pod' => $res['pod'],
			'man' => $res['man'],
			'ofe' => $res['ofe'],
			'description' => $res['description']
		);
	}
	
	return $magic;
}