<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT id, username, email, role FROM accounts WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) sendError('Akun tidak ditemukan', 404);
        sendResponse($row);
    }

    $stmt = $pdo->query("SELECT id, username, email, role FROM accounts ORDER BY created_at DESC");
    sendResponse($stmt->fetchAll());
}

if ($method === 'POST') {
    $data = $input;
    $stmt = $pdo->prepare("INSERT INTO accounts (id, username, password, email, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['id'],
        $data['username'],
        $data['password'],
        $data['email'] ?? null,
        $data['role'] ?? 'admin',
    ]);
    sendResponse(['success' => true, 'message' => 'Akun berhasil ditambahkan']);
}

if ($method === 'PUT') {
    if (!$id) sendError('ID akun diperlukan', 400);
    $data = $input;
    $stmt = $pdo->prepare("UPDATE accounts SET username = ?, password = ?, email = ?, role = ? WHERE id = ?");
    $stmt->execute([
        $data['username'],
        $data['password'],
        $data['email'] ?? null,
        $data['role'] ?? 'admin',
        $id,
    ]);
    sendResponse(['success' => true, 'message' => 'Akun berhasil diperbarui']);
}

if ($method === 'DELETE') {
    if (!$id) sendError('ID akun diperlukan', 400);
    $stmt = $pdo->prepare("DELETE FROM accounts WHERE id = ?");
    $stmt->execute([$id]);
    sendResponse(['success' => true, 'message' => 'Akun berhasil dihapus']);
}

if ($method === 'POST' && isset($input['action']) && $input['action'] === 'reset_password') {
    $id = $input['id'] ?? null;
    $newPassword = $input['password'] ?? null;
    if (!$id || !$newPassword) sendError('ID dan password baru diperlukan');
    $stmt = $pdo->prepare("UPDATE accounts SET password = ? WHERE id = ?");
    $stmt->execute([$newPassword, $id]);
    sendResponse(['success' => true, 'message' => 'Password berhasil direset']);
}

sendError('Method tidak didukupi', 405);
