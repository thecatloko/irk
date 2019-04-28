<?php
include_once "../conf.php";
returnJson(selectAll('race', array('id', 'name')));