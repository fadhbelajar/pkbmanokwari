<?php
$meta_desc = 'Profil DPC PKB Manokwari - Profil, Visi, Misi, dan Pengurus Partai Kebangkitan Bangsa Kabupaten Manokwari.';
include __DIR__ . '/../templates/header.php';
$leaders = getLeaders();
$ketua = null;
foreach ($leaders as $l) {
    if (stripos($l['position'], 'ketua dpc') !== false) {
        $ketua = $l;
        break;
    }
}
?>

<div class="container mb-5">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item active">Profil</li>
        </ol>
    </nav>

    <div class="text-center mb-5">
        <h1 class="display-5 fw-bold">Profil DPC PKB Manokwari</h1>
        <p class="text-muted lead">Mengenal lebih dekat dengan Partai Kebangkitan Bangsa Kabupaten Manokwari</p>
    </div>

    <!-- Visi & Misi -->
    <section class="mb-5">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="bg-white p-4 rounded-3 shadow-sm h-100">
                    <h3 class="text-primary fw-bold mb-3"><i class="fas fa-bullseye me-2"></i>Visi</h3>
                    <p class="text-muted"><?= htmlspecialchars($settings['vision'] ?? 'Mewujudkan masyarakat Kabupaten Manokwari yang adil, makmur, sejahtera, dan bermartabat berdasarkan nilai-nilai Pancasila dan ajaran Islam Ahlussunnah Wal Jamaah.') ?></p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="bg-white p-4 rounded-3 shadow-sm h-100">
                    <h3 class="text-primary fw-bold mb-3"><i class="fas fa-cogs me-2"></i>Misi</h3>
                    <ul class="list-unstyled">
                        <?php if (!empty($settings['mission'])): ?>
                            <?php foreach ($settings['mission'] as $item): ?>
                                <li class="mb-2 text-muted"><i class="fas fa-chevron-right me-2 text-primary"></i><?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Sambutan Ketua -->
    <section class="mb-5">
        <h2 class="fw-bold mb-4"><i class="fas fa-user-tie me-2 text-primary"></i>Sambutan Ketua</h2>
        <div class="row g-4 align-items-start">
            <div class="col-md-3">
                <?php if (!empty($ketua['photo'])): ?>
                    <img src="<?= $ketua['photo'] ?>" alt="<?= htmlspecialchars($ketua['name']) ?>" class="img-fluid rounded-3 shadow border border-3 border-white">
                <?php else: ?>
                    <div class="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center shadow" style="height: 180px;">
                        <span class="text-primary fw-bold fs-1"><?= substr(htmlspecialchars($settings['chairmanName'] ?? 'PKB'), 0, 1) ?></span>
                    </div>
                <?php endif; ?>
            </div>
            <div class="col-md-9">
                <h3 class="fw-bold"><?= htmlspecialchars($ketua['name'] ?? $settings['chairmanName']) ?></h3>
                <p class="text-primary mb-3"><?= htmlspecialchars($ketua['position'] ?? $settings['chairmanPosition']) ?></p>
                <p class="text-muted"><?= htmlspecialchars($settings['chairmanMessage'] ?? ($ketua['bio'] ?? '')) ?></p>
            </div>
        </div>
    </section>

    <!-- Pengurus -->
    <section class="mb-5">
        <h2 class="fw-bold mb-4 text-center"><i class="fas fa-users me-2 text-primary"></i>Struktur Pengurus</h2>
        <div class="row g-4 justify-content-center">
            <?php foreach ($leaders as $leader): ?>
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card leader-card h-100 shadow-sm border-0 text-center">
                        <div class="position-relative d-flex justify-content-center pt-3">
                            <?php if (!empty($leader['photo'])): ?>
                                <img src="<?= $leader['photo'] ?>" alt="<?= htmlspecialchars($leader['name']) ?>" class="rounded-circle border border-3 border-white shadow" width="80" height="80" style="object-fit: cover;">
                            <?php else: ?>
                                <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center border border-3 border-white shadow" style="width: 80px; height: 80px;">
                                    <span class="text-primary fw-bold"><?= substr(htmlspecialchars($leader['name']), 0, 1) ?></span>
                                </div>
                            <?php endif; ?>
                            <?php if (!empty($leader['party_number'])): ?>
                                <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-warning text-dark"><?= $leader['party_number'] ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="card-body pt-3">
                            <h5 class="card-title fw-bold"><?= htmlspecialchars($leader['name']) ?></h5>
                            <p class="card-text text-primary small mb-2"><?= htmlspecialchars($leader['position']) ?></p>
                            <?php if (!empty($leader['bio'])): ?>
                                <p class="card-text text-muted small line-clamp-3"><?= htmlspecialchars(substr($leader['bio'], 0, 100)) ?></p>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</div>

<?php include __DIR__ . '/../templates/footer.php'; ?>
