<?php
// Root-level admin entry point for shared hosting
// Routes /admin/* to app/admin/ files
// Usage:
//   http://domain.com/admin/         -> admin panel (redirect to login if not auth'd)
//   http://domain.com/admin/login.php -> login form
//   http://domain.com/admin/logout.php -> logout handler

// Handle login form POST (submitted to /admin.php after rewrite)
if ($_POST && isset($_POST['password'])) {
    include __DIR__ . '/app/admin/login.php';
    exit();
}

// Handle logout (via ?action=logout or POST logout)
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    include __DIR__ . '/app/admin/logout.php';
    exit();
}

if (isset($_POST['logout'])) {
    include __DIR__ . '/app/admin/logout.php';
    exit();
}

// Parse URI to determine which admin file to serve
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$path = trim(str_replace('/admin', '', $uri), '/');

// Serve login.php
if ($path === 'login.php' || $path === 'login') {
    include __DIR__ . '/app/admin/login.php';
    exit();
}

// Serve logout.php
if ($path === 'logout.php' || $path === 'logout') {
    include __DIR__ . '/app/admin/logout.php';
    exit();
}

// Default: admin panel
include __DIR__ . '/app/admin/index.php';
