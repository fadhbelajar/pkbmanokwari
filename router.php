<?php
// Router for PHP built-in server
// Untuk shared hosting: gunakan .htaccess (ini file hanya untuk dev)
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files
$staticMappings = [
    '/app/assets/img/'  => '/app/assets/img/',
    '/app/assets/css/'  => '/app/assets/css/',
    '/app/assets/js/'   => '/app/assets/js/',
    '/images/'          => '/public/images/',
    '/assets/img/'      => '/app/assets/img/',
    '/assets/css/'      => '/app/assets/css/',
    '/assets/js/'       => '/app/assets/js/',
];

foreach ($staticMappings as $urlPrefix => $dirPrefix) {
    if (strpos($uri, $urlPrefix) === 0) {
        $file = __DIR__ . $dirPrefix . substr($uri, strlen($urlPrefix));
        if (file_exists($file)) {
            $mimes = [
                '.css' => 'text/css', '.js' => 'application/javascript',
                '.png' => 'image/png', '.jpg' => 'image/jpeg', '.jpeg' => 'image/jpeg',
                '.gif' => 'image/gif', '.svg' => 'image/svg+xml', '.ico' => 'image/x-icon',
            ];
            $ext = strtolower(strrchr($file, '.'));
            $mime = $mimes[$ext] ?? 'application/octet-stream';
            header('Content-Type: ' . $mime);
            readfile($file);
            exit();
        }
    }
}

// Serve admin login/logout directly
if (strpos($uri, '/admin/login.php') === 0 || strpos($uri, '/admin/logout.php') === 0) {
    include __DIR__ . '/app' . $uri;
    exit();
}

// Route /admin/ to admin.php or admin panel
if (strpos($uri, '/admin') === 0) {
    if (basename($uri) === 'admin.php') {
        include __DIR__ . '/admin.php';
        exit();
    }
    // Redirect to admin.php
    $_SERVER['REQUEST_URI'] = '/admin.php';
    include __DIR__ . '/admin.php';
    exit();
}

// Set url parameter for index.php routing
if ($uri !== '/' && $uri !== '/index.php') {
    $_GET['url'] = ltrim($uri, '/');
}

// Fallback to index.php for all other routes
require_once __DIR__ . '/index.php';
