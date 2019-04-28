<?php
include_once "../../conf.php";

$fId = $_REQUEST['fId'];
$sId = $_REQUEST['sId'];
if (is_null($fId) || is_null($sId)) {
	die("parameters not found");
}
returnJson(retrieve_habilities($fId, $sId));

function retrieve_habilities($fId, $sId) {
	global $db;
	/*
	select id, name, requirement, description
	from hability h
	  left join career_hability ch on h.id = ch.fk_hability
	where ch.fk_career in (1, 2)
	*/
	$habilities = array();
	$query = "SELECT DISTINCT id, name, requirement, description"
		. ' FROM hability h'
		. ' LEFT JOIN career_hability ch ON h.id = ch.fk_hability'
		. ' WHERE ch.fk_career IN (' . $fId . ', ' . $sId . ')'
		. ' ORDER BY name';
	$st = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$st->execute();
	while ($res = $st->fetch(PDO::FETCH_ASSOC)) {
		$index = count($habilities);
		$habilities[$index] = array(
			'id' => $res['id'],
			'name' => $res['name'],
			'requirement' => $res['requirement'],
			'description' => $res['description']
			);
	}
	
	return $habilities;
}