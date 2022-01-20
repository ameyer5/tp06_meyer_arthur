<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/yaml"), $isDevMode);
$conn = array(
    'host' => 'abul.db.elephantsql.com',
    'driver' => 'pdo_pgsql',
    'user' => 'nrfboezp',
    'password' => 'v4S4WcRg3vVDZquwPdVQo84hjWfmIr8-',
    'dbname' => 'nrfboezp',
    'port' => '5432'
);

// postgres://nrfboezp:v4S4WcRg3vVDZquwPdVQo84hjWfmIr8-@abul.db.elephantsql.com/nrfboezp

$entityManager = EntityManager::create($conn, $config);