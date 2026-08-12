<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM video_links WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) sendError('Video tidak ditemukan', 404);
        sendResponse($row);
    }

    $stmt = $pdo->query("SELECT * FROM video_links ORDER BY created_at DESC");
    sendResponse($stmt->fetchAll());
}

if ($method === 'POST') {
    $data = $input;
    $stmt = $pdo->prepare("INSERT INTO video_links (id, title, url, thumbnail) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['url'],
        $data['thumbnail'] ?? null,
    ]);
    sendResponse(['success' => true, 'message' => 'Video berhasil ditambahkan']);
}

if ($method === 'PUT') {
    if (!$id) sendError('ID video diperlukan', 400);
    $data = $input;
    $stmt = $pdo->prepare("UPDATE video_links SET title = ?, url = ?, thumbnail = ? WHERE id = ?");
    $stmt->execute([
        $data['title'],
        $data['url'],
        $data['thumbnail'] ?? null,
        $id,
    ]);
    sendResponse(['success' => true, 'message' => 'Video berhasil diperbarui']);
}

if ($method === 'DELETE') {
    if (!$id) sendError('ID video diperlukan', 400);
    $stmt = $pdo->prepare("DELETE FROM video_links WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(['success' => true, 'message' => 'Video berhasil dihapus']);
}

sendError('Method tidak didukung', 405);
