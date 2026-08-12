<nav class="navbar navbar-expand-lg navbar-dark bg-white shadow-sm sticky-top" style="border-bottom: 1px solid #e5e7eb;">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
            <img src="<?= $settings['logo'] ?? '/assets/img/Logo_PKB_2024.png' ?>" alt="Logo" class="d-inline-block align-top me-2" width="40" height="40">
            <span class="fw-bold" style="color: #008c44;"><?= htmlspecialchars($settings['siteName'] ?? 'DPC PKB Manokwari') ?></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link <?= ($current_page ?? '') === 'home' ? 'active' : '' ?>" href="/">Beranda</a></li>
                <li class="nav-item"><a class="nav-link <?= ($current_page ?? '') === 'profil' ? 'active' : '' ?>" href="/profil">Profil</a></li>
                <li class="nav-item"><a class="nav-link <?= ($current_page ?? '') === 'berita' ? 'active' : '' ?>" href="/berita">Berita</a></li>
                <li class="nav-item"><a class="nav-link <?= ($current_page ?? '') === 'galeri' ? 'active' : '' ?>" href="/galeri">Galeri</a></li>
                <li class="nav-item"><a class="nav-link <?= ($current_page ?? '') === 'kontak' ? 'active' : '' ?>" href="/kontak">Kontak</a></li>
            </ul>
        </div>
    </div>
</nav>
