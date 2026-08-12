<?php
require_once __DIR__ . '/config.php';

function getSettings(): array {
    global $pdo;
    $stmt = $pdo->query("SELECT data FROM site_settings WHERE id = 'main' LIMIT 1");
    $row = $stmt->fetch();
    if (!$row) return getDefaultSettings();
    return json_decode($row['data'], true) ?: getDefaultSettings();
}

function getDefaultSettings(): array {
    return [
        'siteName' => 'DPC PKB Manokwari',
        'tagline' => 'Bersama Membangun Manokwari Sejahtera',
        'logo' => '/assets/img/Logo_PKB_2024.png',
        'primaryColor' => '#008c44',
        'phone' => '(0986) 212-1234',
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
        'socialMedia' => [
            'facebook' => 'https://facebook.com/dpcpkbmanokwari',
            'instagram' => 'https://instagram.com/dpcpkbmanokwari',
            'youtube' => 'https://youtube.com/@dpcpkbmanokwari',
            'tiktok' => 'https://tiktok.com/@dpcpkbmanokwari',
            'twitter' => 'https://twitter.com/dpcpkbmanokwari'
        ]
    ];
}

function getLeaders(): array {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM leaders ORDER BY order_num ASC, name ASC");
    return $stmt->fetchAll();
}

function getNews(int $limit = 0): array {
    global $pdo;
    $sql = "SELECT id, title, excerpt, image, date, category, slug FROM news ORDER BY date DESC";
    if ($limit > 0) $sql .= " LIMIT $limit";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function getNewsBySlug(string $slug): ?array {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM news WHERE slug = ? LIMIT 1");
    $stmt->execute([$slug]);
    return $stmt->fetch();
}

function getNewsById(string $id): ?array {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ? LIMIT 1");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function getGallery(): array {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM gallery_items ORDER BY date DESC");
    return $stmt->fetchAll();
}

function getVideos(): array {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM video_links ORDER BY created_at DESC");
    return $stmt->fetchAll();
}

function formatDate(string $date): string {
    return date('d F Y', strtotime($date));
}

function escape(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function isLoggedIn(): bool {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function login(string $password): bool {
    if ($password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        return true;
    }
    return false;
}

function logout(): void {
    session_destroy();
    header('Location: ' . APP_URL);
    exit();
}

function getYouTubeId(string $url): ?string {
    $patterns = [
        '/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/',
        '/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/',
        '/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/',
    ];
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $url, $matches)) {
            return $matches[1];
        }
    }
    return null;
}
