<?php
$meta_desc = 'Galeri Kegiatan DPC PKB Manokwari - Foto dan video dokumentasi kegiatan.';
include __DIR__ . '/../templates/header.php';
$gallery = getGallery();
$videos = getVideos();
$activeTab = $_GET['tab'] ?? 'foto';
?>

<div class="container mb-5">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item active">Galeri</li>
        </ol>
    </nav>

    <div class="text-center mb-5">
        <h1 class="display-5 fw-bold">Galeri Kegiatan</h1>
        <p class="text-muted lead">Dokumentasi kegiatan DPC PKB Manokwari dalam foto dan video</p>
    </div>

    <!-- Tab Navigation -->
    <ul class="nav nav-pills justify-content-center mb-4" id="galeriTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link <?= $activeTab === 'foto' ? 'active' : '' ?>" id="foto-tab" data-bs-toggle="pill" data-bs-target="#foto" type="button">
                <i class="fas fa-camera me-2"></i>Foto (<?= count($gallery) ?>)
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link <?= $activeTab === 'video' ? 'active' : '' ?>" id="video-tab" data-bs-toggle="pill" data-bs-target="#video" type="button">
                <i class="fas fa-play me-2"></i>Video (<?= count($videos) ?>)
            </button>
        </li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane fade <?= $activeTab === 'foto' ? 'show active' : '' ?>" id="foto" role="tabpanel">
            <?php if (empty($gallery)): ?>
                <div class="text-center py-5 bg-light rounded-3">
                    <i class="fas fa-camera fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Belum ada foto galeri tersedia</p>
                </div>
            <?php else: ?>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    <?php foreach ($gallery as $item): ?>
                        <div class="col">
                            <div class="card gallery-item h-100 border-0 shadow-sm overflow-hidden">
                                <a href="<?= htmlspecialchars($item['image']) ?>" data-lightbox="gallery" data-title="<?= htmlspecialchars($item['title']) ?>">
                                    <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="card-img-top" style="height: 200px; object-fit: cover;">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title"><?= htmlspecialchars($item['title']) ?></h5>
                                    <?php if (!empty($item['date'])): ?>
                                        <p class="text-muted small mb-0"><i class="far fa-calendar me-1"></i><?= formatDate($item['date']) ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="tab-pane fade <?= $activeTab === 'video' ? 'show active' : '' ?>" id="video" role="tabpanel">
            <?php if (empty($videos)): ?>
                <div class="text-center py-5 bg-light rounded-3">
                    <i class="fas fa-play fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Belum ada video tersedia</p>
                </div>
            <?php else: ?>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <?php foreach ($videos as $item): ?>
                        <div class="col">
                            <div class="card h-100 border-0 shadow-sm overflow-hidden">
                                <?php
                                $youtubeId = getYouTubeId($item['url']);
                                $thumbnail = $youtubeId ? "https://img.youtube.com/vi/{$youtubeId}/hqdefault.jpg" : null;
                                ?>
                                <div class="position-relative">
                                    <img src="<?= $thumbnail ?: '/assets/img/video-placeholder.png' ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="card-img-top" style="height: 180px; object-fit: cover;">
                                    <?php if ($youtubeId): ?>
                                        <div class="position-absolute inset-0 d-flex align-items-center justify-content-center">
                                            <a href="https://www.youtube.com/watch?v=<?= $youtubeId ?>" target="_blank" class="text-white">
                                                <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                                                    <i class="fas fa-play fs-4"></i>
                                                </div>
                                            </a>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title"><?= htmlspecialchars($item['title']) ?></h5>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<!-- Lightbox CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.12.1/simple-lightbox.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.12.1/simple-lightbox.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = new SimpleLightbox('.gallery-item a[data-lightbox]', {
        captions: true,
        nav: true,
    });
});
</script>

<?php include __DIR__ . '/../templates/footer.php'; ?>
