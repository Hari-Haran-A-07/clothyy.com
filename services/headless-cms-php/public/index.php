<?php
declare(strict_types=1);

require_once __DIR__ . '/../src/ContentRepository.php';
require_once __DIR__ . '/../src/CmsController.php';

use Clothyyy\Cms\CmsController;

$controller = new CmsController();
$controller->handleRequest($_SERVER['REQUEST_URI'] ?? '/', $_SERVER['REQUEST_METHOD'] ?? 'GET');
