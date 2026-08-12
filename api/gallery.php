<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM gallery_items WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) sendError('Item galeri tidak ditemukan', 404);
        sendResponse($row);
    }

    $stmt = $pdo->query("SELECT * FROM gallery_items ORDER BY date DESC");
    sendResponse($stmt->fetchAll());
}

if ($method === 'POST') {
    $data = $input;
    $stmt = $pdo->prepare("INSERT INTO gallery_items (id, title, image, date) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['id'],
        $data['title'],
        $data['image'],
        $data['date'] ?? null,
    ]);
    sendResponse(['success' => true, 'message' => 'Item galeri berhasil ditambahkan']);
}

if ($method === 'DELETE') {
    if (!$id) sendError('ID item diperlukan', 400);
    $stmt = $pdo->prepare("DELETE FROM gallery_items WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(['success' => true, 'message' => 'Item galeri berhasil dihapus']);
}

sendError('Method tidak didukung', 405);
