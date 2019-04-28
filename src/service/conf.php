<?php
include_once "db.php";
$db = db_connect();
$debug = true;

function selectAll($table, $columns, $orderBy = 0) {
	global $db;
	try {
		$archetypes = array();
		$query = 'SELECT ' . join(', ', $columns) . ' FROM ' . $table;
		if ($orderBy) {
			$query .= ' ORDER BY ' . $orderBy;
		}
		$st = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$st->execute();
		
		while ($res = $st->fetch(PDO::FETCH_ASSOC)) {
			$index = count($archetypes);
			foreach ($columns as $column) {
				$archetypes[$index][$column] = $res[$column];
			}
		}
		
		return $archetypes;
	} catch (Exception $e) {
		die('Exceção capturada: '.  $e->getMessage() . "\n");
	}
}

function selectWhere($table, $columns, $where) {
	global $db;
	try {
		$archetypes = array();
		$query = 'SELECT ' . join(', ', $columns) . ' FROM ' . $table . ' WHERE ' . $where;
		$st = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$st->execute();

		while ($res = $st->fetch(PDO::FETCH_ASSOC)) {
			$index = count($archetypes);
			foreach ($columns as $column) {
				$archetypes[$index][$column] = $res[$column];
			}
		}

		return $archetypes;
	} catch (Exception $e) {
		die('Exceção capturada: '.  $e->getMessage() . "\n");
	}
}

function returnJson($array) {
	global $debug;
	try {
		if ($debug) {
			$json = json_encode($array, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK );
		} else {
			$json = json_encode($array, JSON_NUMERIC_CHECK );
		}

		if ($json === FALSE) {
			die('JSON error! Error code: ' . json_last_error() . '; error message: "' . json_last_error_msg() . '".');
		}

		if ($debug) {
			header("Access-Control-Allow-Origin: *");
		}
		header('Content-Type: application/json');
		echo $json;
	} catch (Exception $e) {
		die('Exceção capturada: '.  $e->getMessage() . "\n");
	}
}