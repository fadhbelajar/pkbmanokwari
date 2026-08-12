<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getRequestBody();

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT data FROM site_settings WHERE id = 'main' LIMIT 1");
    $row = $stmt->fetch();

    if (!$row) {
        $default = json_encode([
            'siteName' => 'DPC PKB Manokwari',
            'tagline' => 'Bersama Membangun Manokwari Sejahtera',
            'logo' => '/images/Logo_PKB_2024.png',
            'primaryColor' => '#008c44',
            'phone' => '(0986) 212-XXX',
            'email' => 'dpc.pkb.manokwari@gmail.com',
            'address' => 'Jl. Brawijaya No. 10, Manokwari, Papua Barat 98312',
            'whatsappNumber' => '6281234567890',
            'vision' => '',
            'mission' => [],
            'aboutText' => '',
            'chairmanName' => '',
            'chairmanPosition' => '',
            'chairmanPhoto' => '',
            'chairmanMessage' => '',
            'socialMedia' => ['facebook' => '', 'instagram' => '', 'youtube' => '', 'tiktok' => '', 'twitter' => '']
        ]);
        sendResponse(['data' => jsonToArray($default)]);
    }

    sendResponse(['data' => jsonToArray($row['data'])]);
}

if ($method === 'POST' || $method === 'PUT') {
    $data = $input['data'] ?? null;
    if ($data === null) {
        sendError('Data pengaturan tidak ditemukan');
    }

    $jsonData = is_array($data) ? json_encode($data) : $data;

    $stmt = $pdo->prepare("SELECT id FROM site_settings WHERE id = 'main' LIMIT 1");
    $stmt->execute();
    $exists = $stmt->fetch();

    if ($exists) {
        $stmt = $pdo->prepare("UPDATE site_settings SET data = ? WHERE id = 'main'");
        $stmt->execute([$jsonData]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO site_settings (id, data) VALUES ('main', ?)");
        $stmt->execute([$jsonData]);
    }

    sendResponse(['success' => true, 'message' => 'Pengaturan berhasil disimpan']);
}

sendError('Method tidak didukung', 405);
