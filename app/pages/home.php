<?php
$meta_desc = 'DPC PKB Manokwari - Partai Kebangkitan Bangsa Kabupaten Manokwari, Papua Barat. Bersama Membangun Manokwari Sejahtera.';
include __DIR__ . '/../templates/header.php';
?>

<!-- Hero Section -->
<section class="hero-section d-flex align-items-center text-white mb-5" style="background-image: url('/assets/img/Cover_PKB_Manokwari.png');">
    <div class="container hero-content text-center">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <h1 class="display-4 fw-bold mb-3 text-white">Selamat Datang di DPC PKB Manokwari</h1>
                <p class="lead mb-4"><?= htmlspecialchars($settings['tagline'] ?? 'Bersama Membangun Manokwari Sejahtera') ?></p>
                <div class="d-flex gap-3 justify-content-center">
                    <a href="/profil" class="btn btn-primary btn-lg btn-primary-custom">Kenali Kami</a>
                    <a href="/kontak" class="btn btn-outline-light btn-lg">Hubungi Kami</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sambutan -->
<section class="mb-5">
    <div class="container">
        <div class="row g-5 align-items-center">
            <div class="col-lg-5">
                <?php if (!empty($settings['chairmanPhoto'])): ?>
                    <img src="<?= $settings['chairmanPhoto'] ?>" alt="<?= htmlspecialchars($settings['chairmanName'] ?? '') ?>" class="img-fluid rounded-3 shadow">
                <?php else: ?>
                    <div class="bg-gradient d-flex align-items-center justify-content-center rounded-3 shadow" style="height: 300px; background: linear-gradient(135deg, #008c44, #f59e0b);">
                        <h2 class="text-white fw-bold"><?= substr(htmlspecialchars($settings['chairmanName'] ?? 'DPC PKB'), 0, 1) ?></h2>
                    </div>
                <?php endif; ?>
            </div>
            <div class="col-lg-7">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="badge bg-success bg-opacity-10 text-success">Sambutan Ketua</span>
                </div>
                <h2 class="fw-bold">Sambutan <span class="gradient-text">Ketua DPC PKB Manokwari</span></h2>
                <p class="lead"><?= htmlspecialchars($settings['chairmanName'] ?? '') ?><br>
                    <small class="text-muted"><?= htmlspecialchars($settings['chairmanPosition'] ?? '') ?></small></p>
                <p class="text-muted"><?= htmlspecialchars($settings['chairmanMessage'] ?? 'Selamat datang di website resmi DPC PKB Manokwari.') ?></p>
            </div>
        </div>
    </div>
</section>

<!-- Visi & Misi -->
<section class="mb-5 py-5 bg-light rounded-3">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold">Visi &amp; Misi Kami</h2>
            <p class="text-muted">Arah dan tujuan perjuangan kami demi Manokwari</p>
        </div>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="bg-white p-4 rounded-3 shadow-sm h-100">
                    <h3 class="text-primary fw-bold mb-3"><i class="fas fa-bullseye me-2"></i>Visi</h3>
                    <p class="text-muted"><?= htmlspecialchars($settings['vision'] ?? 'Mewujudkan masyarakat Kabupaten Manokwari yang adil, makmur, sejahtera, dan bermartabat.') ?></p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-white p-4 rounded-3 shadow-sm h-100">
                    <h3 class="text-primary fw-bold mb-3"><i class="fas fa-cogs me-2"></i>Misi</h3>
                    <ul class="list-unstyled">
                        <?php if (!empty($settings['mission']) && is_array($settings['mission'])): ?>
                            <?php foreach (array_slice($settings['mission'], 0, 3) as $i => $item): ?>
                                <li class="mb-2 text-muted"><i class="fas fa-chevron-right me-2 text-primary"></i><?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <li class="text-muted">Memperkuat struktur dan konsolidasi organisasi partai</li>
                            <li class="text-muted">Meningkatkan kualitas kader partai yang berintegritas</li>
                            <li class="text-muted">Memperjuangkan aspirasi rakyat Manokwari</li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Latest News -->
<section class="mb-5">
    <div class="container">
        <div class="text-center mb-4">
            <h2 class="fw-bold">Berita Terbaru</h2>
            <p class="text-muted">Ikuti perkembangan terbaru DPC PKB Manokwari</p>
        </div>
        <?php
        $latestNews = getNews(3);
        if (empty($latestNews)): ?>
            <p class="text-center text-muted">Belum ada berita tersedia.</p>
        <?php else: ?>
            <div class="row g-4">
                <?php foreach ($latestNews as $item): ?>
                    <div class="col-md-4">
                        <div class="card news-card h-100 shadow-sm border-0">
                            <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="card-img-top" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <span class="badge bg-primary mb-2 align-self-start"><?= htmlspecialchars($item['category']) ?></span>
                                <h5 class="card-title fw-bold"><?= htmlspecialchars($item['title']) ?></h5>
                                <p class="card-text text-muted small mt-auto"><?= htmlspecialchars(substr($item['excerpt'], 0, 100)) ?>...</p>
                                <a href="/berita/<?= $item['slug'] ?>" class="btn btn-outline-primary btn-sm mt-2">Baca Selengkapnya</a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="text-center mt-4">
                <a href="/berita" class="btn btn-primary btn-primary-custom">Lihat Semua Berita</a>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php include __DIR__ . '/../templates/footer.php'; ?>
