<?php
require_once __DIR__ . '/../app/core/config.php';
require_once __DIR__ . '/../app/core/functions.php';

header('Content-Type: application/json');
header('Content-Disposition: attachment; filename="pkbmanokwari-backup-' . date('Ymd-His') . '.json"');

global $pdo;

$settings = getSettings();
$stmt = $pdo->query("SELECT * FROM leaders ORDER BY order_num ASC");
$leaders = $stmt->fetchAll();
$stmt = $pdo->query("SELECT * FROM news ORDER BY date DESC");
$news = $stmt->fetchAll();
$stmt = $pdo->query("SELECT * FROM gallery_items ORDER BY date DESC");
$gallery = $stmt->fetchAll();
$stmt = $pdo->query("SELECT * FROM video_links ORDER BY created_at DESC");
$videos = $stmt->fetchAll();
$stmt = $pdo->query("SELECT id, username, email, role FROM accounts ORDER BY created_at DESC");
$accounts = $stmt->fetchAll();

$backup = [
    'settings' => $settings,
    'leaders' => $leaders,
    'news' => $news,
    'gallery' => $gallery,
    'videoLinks' => $videos,
    'accounts' => $accounts,
    'timestamp' => date('c')
];

echo json_encode($backup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
