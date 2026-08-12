<?php
// Router for PHP built-in server
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files from the correct locations
$staticMappings = [
    '/assets/img/'  => '/app/assets/img/',
    '/assets/css/'  => '/app/assets/css/',
    '/assets/js/'   => '/app/assets/js/',
    '/images/'      => '/public/images/',
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

// Serve admin PHP files directly
if (strpos($uri, '/admin/') === 0) {
    $file = __DIR__ . '/app' . $uri;
    if (file_exists($file)) {
        include $file;
        exit();
    }
}

// Set url parameter for index.php routing
if ($uri !== '/' && $uri !== '/index.php') {
    $_GET['url'] = ltrim($uri, '/');
}

// Fallback to index.php for all other routes
require_once __DIR__ . '/index.php';
