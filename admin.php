<?php
// Root-level admin entry point for shared hosting
// Routes /admin/* to app/admin/ files
// Usage: http://domain.com/admin/  -> admin panel
//        http://domain.com/admin/login.php  -> login page

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve login.php and logout.php directly from app/admin/
$adminFile = __DIR__ . '/app' . $uri;
if (in_array(basename($uri), ['login.php', 'logout.php']) && file_exists($adminFile)) {
    include $adminFile;
    exit();
}

// Serve admin/index.php for all other admin routes
include __DIR__ . '/app/admin/index.php';
