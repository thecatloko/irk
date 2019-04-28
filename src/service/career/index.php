<?php
include_once "../conf.php";
returnJson(selectAll('career', array('id', 'name'), 'name'));