<?php

$app = require('../app/bootstrap/bootstrap.php');


$user = new \Entities\TestUser();
echo '<pre>';
var_dump($user);die;

$app->run();


