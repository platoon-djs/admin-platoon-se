<?php

$app->post('/auth/submit', 'AuthController:submit');

// Angular forwarding
$app->get('/(:controller(/:action+))', 'IndexController:index');
