<?php

date_default_timezone_set('Europe/Stockholm');

// Paths
define('ROOT_PATH', __DIR__ . '/../../');
define('VENDOR_PATH', __DIR__ . '/../../vendor/');
define('APP_PATH', __DIR__ . '/../../app/');
define('CONFIG_PATH', __DIR__ . '/../../app/config/');
define('TEMPLATE_PATH', __DIR__ . '/../../web/views/');
define('PUBLIC_PATH', __DIR__ . '/../../public/');

// Password hasing
define("PBKDF2_HASH_ALGORITHM", "sha256");
define("PBKDF2_ITERATIONS", 1000);
define("PBKDF2_SALT_BYTE_SIZE", 24);
define("PBKDF2_HASH_BYTE_SIZE", 24);

define("HASH_SECTIONS", 4);
define("HASH_ALGORITHM_INDEX", 0);
define("HASH_ITERATION_INDEX", 1);
define("HASH_SALT_INDEX", 2);
define("HASH_PBKDF2_INDEX", 3);

// Registrer autoloaders
require VENDOR_PATH . 'autoload.php';

// Load environment variables
try {
	(new Dotenv\Dotenv(ROOT_PATH))->load();
} catch (Exception $e) {
	echo $e;
}

$config = [
	'path.root' => ROOT_PATH,
	'path.public' => PUBLIC_PATH,
	'path.app' => APP_PATH,
];

require CONFIG_PATH . 'slim.php';
require CONFIG_PATH . 'doctrine.php';

$setup = Doctrine\ORM\Tools\Setup::createYAMLMetadataConfiguration([
	APP_PATH . 'models/schemas',
], getenv('APP_DEBUG'));
$em = \Service\Registry::set('em', Doctrine\ORM\EntityManager::create($config['doctrine'], $setup));

$app = \Service\Registry::set('slim', new \Slim\Slim($config['slim']));

require APP_PATH . 'routes.php';
return $app;
