<?php


$app->get('/', 'IndexController:index');
$app->post('/auth/submit', 'AuthController:submit');