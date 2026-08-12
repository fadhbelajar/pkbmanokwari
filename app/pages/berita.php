<?php
$meta_desc = 'Berita & Kegiatan DPC PKB Manokwari - Informasi terbaru kegiatan dan program partai.';
include __DIR__ . '/../templates/header.php';
$allNews = getNews();
$categories = [];
foreach ($allNews as $item) {
    if (!in_array($item['category'], $categories)) {
        $categories[] = $item['category'];
    }
}
?>

<div class="container mb-5">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item active">Berita</li>
        </ol>
    </nav>

    <div class="text-center mb-5">
        <h1 class="display-5 fw-bold">Berita &amp; Kegiatan</h1>
        <p class="text-muted lead">Informasi terbaru dan perkembangan terkini DPC PKB Manokwari</p>
    </div>

    <div class="row g-4">
        <div class="col-lg-8">
            <?php if (empty($allNews)): ?>
                <div class="text-center py-5 bg-light rounded-3">
                    <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Belum ada berita tersedia</p>
                </div>
            <?php else: ?>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <?php foreach ($allNews as $item): ?>
                        <div class="col">
                            <div class="card news-card h-100 shadow-sm border-0">
                                <div class="position-relative">
                                    <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="card-img-top" style="height: 200px; object-fit: cover;">
                                    <span class="position-absolute top-2 start-2 badge bg-primary"><?= htmlspecialchars($item['category']) ?></span>
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <div class="text-muted small mb-2">
                                        <i class="far fa-calendar me-1"></i>
                                        <?= formatDate($item['date']) ?>
                                    </div>
                                    <h3 class="card-title fw-bold h5"><?= htmlspecialchars($item['title']) ?></h3>
                                    <p class="card-text text-muted small mt-auto"><?= htmlspecialchars(substr($item['excerpt'], 0, 120)) ?>...</p>
                                    <a href="/berita/<?= $item['slug'] ?>" class="stretched-link text-decoration-none"></a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="col-lg-4">
            <div class="sticky-top" style="top: 100px;">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0 fw-bold"><i class="fas fa-folder me-2"></i>Kategori</h5>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between">
                                <a href="/berita" class="text-decoration-none">Semua</a>
                                <span class="badge bg-secondary"><?= count($allNews) ?></span>
                            </li>
                            <?php foreach ($categories as $cat): ?>
                                <li class="list-group-item d-flex justify-content-between">
                                    <?php
                                    $count = 0;
                                    foreach ($allNews as $n) {
                                        if ($n['category'] === $cat) $count++;
                                    }
                                    ?>
                                    <span class="text-decoration-none"><?= htmlspecialchars($cat) ?></span>
                                    <span class="badge bg-secondary"><?= $count ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0 fw-bold"><i class="fab fa-whatsapp me-2"></i>WhatsApp</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted small">Ikuti update berita kami di WhatsApp</p>
                        <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $settings['whatsappNumber'] ?? '') ?>" target="_blank" class="btn btn-success btn-sm w-100">
                            <i class="fab fa-whatsapp me-1"></i> Chat Kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../templates/footer.php'; ?>
