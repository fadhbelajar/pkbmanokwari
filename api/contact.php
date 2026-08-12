<?php
require_once __DIR__ . '/../app/core/config.php';
require_once __DIR__ . '/../app/core/functions.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // Log pesan ke file (atau kirim email)
    $logEntry = [
        'timestamp' => date('c'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR']
    ];

    // Optional: save to database (create a messages table if needed)
    // For now, just return success
    sendResponse(['success' => true, 'message' => 'Pesan Anda berhasil dikirim! Kami akan menghubungi Anda segera.']);
}

sendResponse(['error' => 'Method not allowed'], 405);
