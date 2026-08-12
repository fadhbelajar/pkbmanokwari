<?php
require_once __DIR__ . '/../core/config.php';
require_once __DIR__ . '/../core/functions.php';

if (!isLoggedIn()) {
    header('Location: /admin/login.php');
    exit();
}

$page = $_GET['page'] ?? 'dashboard';
$settings = getSettings();
$leaders = getLeaders();
$news = getNews();
$gallery = getGallery();
$videos = getVideos();
$accounts = [];
global $pdo;
$stmt = $pdo->query("SELECT id, username, email, role FROM accounts ORDER BY created_at DESC");
$accounts = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | DPC PKB Manokwari</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        .sidebar { min-height: 100vh; }
        .nav-link.active { color: #008c44 !important; background: #008c4410 !important; }
        .badge-admin { background: linear-gradient(135deg, #008c44 0%, #f59e0b 100%); }
    </style>
</head>
<body class="bg-light">
<div class="container-fluid">
    <div class="row">
        <nav class="col-md-3 col-lg-2 sidebar d-flex flex-column p-0">
            <div class="p-3 text-center border-bottom">
                <img src="/assets/img/Logo_PKB_2024.png" alt="Logo" width="40" class="me-2">
                <span class="fw-bold text-white">Admin Panel</span>
            </div>
            <div class="nav flex-column flex-grow-1 p-2">
                <a href="?page=dashboard" class="nav-link <?= $page === 'dashboard' ? 'active fw-bold' : '' ?>"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a>
                <a href="?page=settings" class="nav-link <?= $page === 'settings' ? 'active fw-bold' : '' ?>"><i class="bi bi-gear me-2"></i>Pengaturan</a>
                <a href="?page=news" class="nav-link <?= $page === 'news' ? 'active fw-bold' : '' ?>"><i class="bi bi-newspaper me-2"></i>Berita</a>
                <a href="?page=leaders" class="nav-link <?= $page === 'leaders' ? 'active fw-bold' : '' ?>"><i class="bi bi-people me-2"></i>Pengurus</a>
                <a href="?page=gallery" class="nav-link <?= $page === 'gallery' ? 'active fw-bold' : '' ?>"><i class="bi bi-images me-2"></i>Galeri</a>
                <a href="?page=videos" class="nav-link <?= $page === 'videos' ? 'active fw-bold' : '' ?>"><i class="bi bi-play-circle me-2"></i>Video</a>
                <a href="?page=accounts" class="nav-link <?= $page === 'accounts' ? 'active fw-bold' : '' ?>"><i class="bi bi-shield-lock me-2"></i>Akun</a>
                <a href="?page=backup" class="nav-link <?= $page === 'backup' ? 'active fw-bold' : '' ?>"><i class="bi bi-database me-2"></i>Backup & Restore</a>
            </div>
            <div class="p-3 border-top">
                <a href="/admin/logout.php" class="nav-link text-danger"><i class="bi bi-box-arrow-right me-2"></i>Logout</a>
            </div>
        </nav>

        <main class="col-md-9 col-lg-10 ms-auto py-4">
            <?php
            $pageFile = __DIR__ . "/pages/{$page}.php";
            if (file_exists($pageFile)) {
                include $pageFile;
            } else {
                include __DIR__ . '/pages/dashboard.php';
            }
            ?>
        </main>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/js/main.js"></script>
</body>
</html>
