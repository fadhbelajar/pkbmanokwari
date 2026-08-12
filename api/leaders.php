<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM leaders WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) sendError('Leader tidak ditemukan', 404);
        $row['order'] = (int)$row['order_num'];
        unset($row['order_num']);
        $row['partyNumber'] = $row['party_number'];
        unset($row['party_number']);
        sendResponse($row);
    }

    $stmt = $pdo->query("SELECT * FROM leaders ORDER BY order_num ASC, name ASC");
    $rows = $stmt->fetchAll();
    $result = array_map(function($row) {
        $row['order'] = (int)$row['order_num'];
        unset($row['order_num']);
        $row['partyNumber'] = $row['party_number'];
        unset($row['party_number']);
        return $row;
    }, $rows);
    sendResponse($result);
}

if ($method === 'POST') {
    $data = $input;
    $stmt = $pdo->prepare("INSERT INTO leaders (id, name, position, photo, bio, order_num, party_number) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['id'],
        $data['name'],
        $data['position'],
        $data['photo'] ?? null,
        $data['bio'] ?? null,
        $data['order'] ?? 0,
        $data['partyNumber'] ?? null,
    ]);
    sendResponse(['success' => true, 'message' => 'Leader berhasil ditambahkan']);
}

if ($method === 'PUT') {
    if (!$id) sendError('ID leader diperlukan', 400);
    $data = $input;
    $stmt = $pdo->prepare("UPDATE leaders SET name = ?, position = ?, photo = ?, bio = ?, order_num = ?, party_number = ? WHERE id = ?");
    $stmt->execute([
        $data['name'],
        $data['position'],
        $data['photo'] ?? null,
        $data['bio'] ?? null,
        $data['order'] ?? 0,
        $data['partyNumber'] ?? null,
        $id,
    ]);
    sendResponse(['success' => true, 'message' => 'Leader berhasil diperbarui']);
}

if ($method === 'DELETE') {
    if (!$id) sendError('ID leader diperlukan', 400);
    $stmt = $pdo->prepare("DELETE FROM leaders WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(['success' => true, 'message' => 'Leader berhasil dihapus']);
}

sendError('Method tidak didukung', 405);
