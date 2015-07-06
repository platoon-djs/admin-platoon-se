<?php

date_default_timezone_set('Europe/Stockholm');

// Paths
define('ROOT_PATH'    , __DIR__.'/../../');
define('VENDOR_PATH'  , __DIR__.'/../../vendor/');
define('APP_PATH'     , __DIR__.'/../../app/');
define('CONFIG_PATH'  , __DIR__.'/../../app/config/');
define('TEMPLATE_PATH', __DIR__.'/../../webb/templates/');
define('PUBLIC_PATH'  , __DIR__.'/../../public/');

// Registrer autoloaders
require VENDOR_PATH.'autoload.php';

// Load environment variables
try {
	(new Dotenv\Dotenv(ROOT_PATH))->load();
} catch (Exception $e) {
	echo $e;
}


$config = [
    'path.root'   => ROOT_PATH,
    'path.public' => PUBLIC_PATH,
    'path.app'    => APP_PATH
];

require CONFIG_PATH.'slim.php';
require CONFIG_PATH.'doctrine.php';


$setup = Doctrine\ORM\Tools\Setup::createYAMLMetadataConfiguration([
		'Entities' => APP_PATH.'/models/schemas'
	], getenv('APP_DEBUG'));
$em = Doctrine\ORM\EntityManager::create($config['doctrine'], $setup);

$app = new \Slim\Slim($config['slim']);

require APP_PATH.'routes.php';
return $app;
