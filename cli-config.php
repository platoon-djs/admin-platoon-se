<?php
/**
 * Doctrine command line tool settings
 */
use Doctrine\ORM\Tools\Console\ConsoleRunner;

require_once 'app/bootstrap/bootstrap.php';
return ConsoleRunner::createHelperSet($em);