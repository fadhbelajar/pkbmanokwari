<?php
// Konfigurasi database MySQL
// Ganti nilai di bawah dengan kredensial phpMyAdmin Anda

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 3600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$DB_HOST = 'localhost';
$DB_NAME = 'pkbmanokwari';
$DB_USER = 'root';
$DB_PASS = '';
$DB_CHARSET = 'utf8mb4';

try {
    $dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}

function getRequestBody() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function jsonToArray($json) {
    if (!$json) return null;
    if (is_string($json)) {
        return json_decode($json, true);
    }
    return $json;
}

function arrayToJson($arr) {
    if ($arr === null) return null;
    if (is_array($arr)) return json_encode($arr);
    return $arr;
}
