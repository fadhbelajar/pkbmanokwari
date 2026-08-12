<?php
$meta_desc = $article['excerpt'] ?? '';
include __DIR__ . '/../templates/header.php';
?>

<div class="container mb-5">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item"><a href="/berita">Berita</a></li>
            <li class="breadcrumb-item active"><?= htmlspecialchars(substr($article['title'], 0, 50)) ?></li>
        </ol>
    </nav>

    <article class="blog-post">
        <div class="text-center mb-4">
            <span class="badge bg-primary mb-3 fs-6"><?= htmlspecialchars($article['category']) ?></span>
            <h1 class="display-5 fw-bold mb-3"><?= htmlspecialchars($article['title']) ?></h1>
            <div class="d-flex align-items-center justify-content-center gap-4 text-muted small">
                <span><i class="far fa-calendar me-1"></i><?= formatDate($article['date']) ?></span>
                <span><i class="far fa-user me-1"></i>DPC PKB Manokwari</span>
                <span><i class="far fa-clock me-1"></i>3 min baca</span>
            </div>
        </div>

        <?php if (!empty($article['image'])): ?>
            <div class="mb-4">
                <img src="<?= htmlspecialchars($article['image']) ?>" alt="<?= htmlspecialchars($article['title']) ?>" class="img-fluid rounded-3 shadow w-100">
            </div>
        <?php endif; ?>

        <div class="prose mt-4" style="line-height: 1.8;">
            <?= $article['content'] ?: '<p class="text-muted">Konten tidak tersedia.</p>' ?>
        </div>

        <div class="mt-5 pt-4 border-top">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold mb-0">Bagikan Artikel Ini</h5>
                <div class="d-flex gap-2">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" class="btn btn-outline-primary btn-sm"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/intent/tweet?text=<?= urlencode($article['title']) ?>&url=<?= urlencode('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" class="btn btn-outline-info btn-sm"><i class="fab fa-twitter"></i></a>
                    <a href="https://wa.me/?text=<?= urlencode($article['title'] . ' http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" class="btn btn-success btn-sm"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    </article>
</div>

<?php include __DIR__ . '/../templates/footer.php'; ?>
