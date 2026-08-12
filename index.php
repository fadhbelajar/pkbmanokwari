<?php
require_once __DIR__ . '/app/core/config.php';
require_once __DIR__ . '/app/core/functions.php';

// Routing sederhana
$url = $_GET['url'] ?? 'home';
$url = rtrim($url, '/');
if (empty($url)) $url = 'home';

// Parse URL segments
$segments = explode('/', $url);
$page = $segments[0] ?? 'home';
$slug = $segments[1] ?? null;

$settings = getSettings();

// Route mapping
$pageFiles = [
    'home' => 'home.php',
    'profil' => 'profil.php',
    'berita' => $slug ? 'berita-detail.php' : 'berita.php',
    'galeri' => 'galeri.php',
    'kontak' => 'kontak.php',
];

$pageFile = $pageFiles[$page] ?? null;
$pageTitleMap = [
    'home' => 'Beranda',
    'profil' => 'Profil',
    'berita' => $slug ? null : 'Berita & Kegiatan',
    'galeri' => 'Galeri',
    'kontak' => 'Hubungi Kami',
];

$page_title = $pageTitleMap[$page] ?? $settings['siteName'];
$current_page = $page;

if ($slug && $page === 'berita') {
    $article = getNewsBySlug($slug);
    if (!$article) {
        http_response_code(404);
        $page_title = 'Berita Tidak Ditemukan';
        include __DIR__ . '/app/pages/404.php';
        exit();
    }
    $page_title = $article['title'];
    include __DIR__ . '/app/pages/' . ($pageFiles[$page] ?? '404.php');
} elseif ($pageFile) {
    include __DIR__ . '/app/pages/' . $pageFile;
} else {
    http_response_code(404);
    include __DIR__ . '/app/pages/404.php';
}
