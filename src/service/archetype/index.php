<?php
include_once "../conf.php";
returnJson(selectAll('archetype', array('id', 'name', 'description')));