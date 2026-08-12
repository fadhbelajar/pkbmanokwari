<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Dashboard</h1>
    <span class="badge bg-success">v2.0 PHP Native</span>
</div>

<div class="row g-4 mb-4">
    <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body">
                <i class="fas fa-newspaper fa-2x text-primary mb-2"></i>
                <h3 class="fw-bold"><?= count($news) ?></h3>
                <p class="text-muted small">Berita</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body">
                <i class="fas fa-users fa-2x text-primary mb-2"></i>
                <h3 class="fw-bold"><?= count($leaders) ?></h3>
                <p class="text-muted small">Pengurus</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body">
                <i class="fas fa-images fa-2x text-primary mb-2"></i>
                <h3 class="fw-bold"><?= count($gallery) ?></h3>
                <p class="text-muted small">Galeri Foto</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body">
                <i class="fas fa-play-circle fa-2x text-primary mb-2"></i>
                <h3 class="fw-bold"><?= count($videos) ?></h3>
                <p class="text-muted small">Video</p>
            </div>
        </div>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-header bg-white">
        <h5 class="mb-0 fw-bold">Pengaturan Cepat</h5>
    </div>
    <div class="card-body">
        <p class="mb-1"><strong>Nama Situs:</strong> <?= htmlspecialchars($settings['siteName'] ?? 'DPC PKB Manokwari') ?></p>
        <p class="mb-1"><strong>Email:</strong> <?= htmlspecialchars($settings['email'] ?? '') ?></p>
        <p class="mb-1"><strong>Telepon:</strong> <?= htmlspecialchars($settings['phone'] ?? '') ?></p>
        <p class="mb-0"><strong>Akun Admin:</strong> admin (password: admin123)</p>
    </div>
</div>
