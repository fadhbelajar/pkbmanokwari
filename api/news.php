<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) sendError('Berita tidak ditemukan', 404);
        $row['autoSharePlatforms'] = jsonToArray($row['auto_share_platforms']);
        $row['sharedTo'] = jsonToArray($row['shared_to']);
        unset($row['auto_share_platforms'], $row['shared_to']);
        sendResponse($row);
    }

    $stmt = $pdo->query("SELECT id, title, excerpt, image, date, category FROM news ORDER BY date DESC");
    $rows = $stmt->fetchAll();
    sendResponse($rows);
}

if ($method === 'POST') {
    $data = $input;
    $stmt = $pdo->prepare("INSERT INTO news (id, title, excerpt, content, image, date, category, slug, auto_share_platforms, shared_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['excerpt'] ?? null,
        $data['content'],
        $data['image'] ?? null,
        $data['date'],
        $data['category'] ?? null,
        $data['slug'] ?? null,
        is_array($data['autoSharePlatforms'] ?? null) ? json_encode($data['autoSharePlatforms']) : null,
        is_array($data['sharedTo'] ?? null) ? json_encode($data['sharedTo']) : null,
    ]);
    sendResponse(['success' => true, 'message' => 'Berita berhasil ditambahkan']);
}

if ($method === 'PUT') {
    if (!$id) sendError('ID berita diperlukan', 400);
    $data = $input;
    $stmt = $pdo->prepare("UPDATE news SET title = ?, excerpt = ?, content = ?, image = ?, date = ?, category = ?, slug = ?, auto_share_platforms = ?, shared_to = ? WHERE id = ?");
    $stmt->execute([
        $data['title'],
        $data['excerpt'] ?? null,
        $data['content'],
        $data['image'] ?? null,
        $data['date'],
        $data['category'] ?? null,
        $data['slug'] ?? null,
        is_array($data['autoSharePlatforms'] ?? null) ? json_encode($data['autoSharePlatforms']) : null,
        is_array($data['sharedTo'] ?? null) ? json_encode($data['sharedTo']) : null,
        $id,
    ]);
    sendResponse(['success' => true, 'message' => 'Berita berhasil diperbarui']);
}

if ($method === 'DELETE') {
    if (!$id) sendError('ID berita diperlukan', 400);
    $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(['success' => true, 'message' => 'Berita berhasil dihapus']);
}

sendError('Method tidak didukung', 405);
