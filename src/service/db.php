<?php
function db_connect() {
	try {
		$db = new PDO('', '', '');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $e) {
		die($e->getMessage());
	}
	return $db;
}