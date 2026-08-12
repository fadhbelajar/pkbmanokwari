<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();

if ($method === 'POST' && isset($input['action'])) {
    if ($input['action'] === 'backup') {
        $tables = ['site_settings', 'leaders', 'news', 'gallery_items', 'video_links', 'accounts'];
        $backup = [];
        foreach ($tables as $table) {
            $stmt = $pdo->query("SELECT * FROM `$table`");
            $backup[$table] = $stmt->fetchAll();
        }
        $backup['timestamp'] = date('c');

        $stmt = $pdo->prepare("INSERT INTO site_backup (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP");
        $stmt->execute([uniqid(), json_encode($backup)]);

        sendResponse(['success' => true, 'backup' => json_encode($backup)]);
    }

    if ($input['action'] === 'restore') {
        $data = $input['data'] ?? null;
        if (!$data) sendError('Data restore tidak ditemukan');

        $restoreData = is_string($data) ? json_decode($data, true) : $data;
        if (!is_array($restoreData)) sendError('Format data tidak valid');

        $tables = ['site_settings', 'leaders', 'news', 'gallery_items', 'video_links', 'accounts'];
        $restored = 0;
        foreach ($tables as $table) {
            if (isset($restoreData[$table])) {
                $pdo->prepare("DELETE FROM `$table`")->execute();
                foreach ($restoreData[$table] as $row) {
                    $cols = array_keys($row);
                    $placeholders = str_repeat('?,', count($cols) - 1) . '?';
                    $colList = implode(',', array_map(fn($c) => "`$c`", $cols));
                    $stmt = $pdo->prepare("INSERT INTO `$table` ($colList) VALUES ($placeholders)");
                    $stmt->execute(array_values($row));
                }
                $restored++;
            }
        }

        sendResponse(['success' => true, 'message' => "Restore selesai: $restored tabel"));
    }
}

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT data FROM site_backup ORDER BY created_at DESC LIMIT 1");
    $row = $stmt->fetch();
    if (!$row) {
        sendResponse(['data' => null]);
    }
    sendResponse(['data' => json_decode($row['data'], true)]);
}

sendError('Method tidak didukung', 405);
