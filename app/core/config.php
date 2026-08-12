<?php
// Konfigurasi database MySQL
define('DB_HOST', 'localhost');
define('DB_NAME', 'pkbmanokwari');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Konfigurasi aplikasi
define('APP_NAME', 'DPC PKB Manokwari');
define('APP_TAGLINE', 'Bersama Membangun Manokwari Sejahtera');
define('APP_URL', 'http://localhost:8080');
define('ADMIN_PASSWORD', 'admin123');

// Session & error reporting
session_start();
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);

// Timezone
date_default_timezone_set('Asia/Makassar');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed']));
}
