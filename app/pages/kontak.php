<?php
$meta_desc = 'Hubungi DPC PKB Manokwari - Informasi kontak, alamat, nomor telepon, dan email resmi.';
include __DIR__ . '/../templates/header.php';
?>

<div class="container mb-5">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item active">Kontak</li>
        </ol>
    </nav>

    <div class="text-center mb-5">
        <h1 class="display-5 fw-bold">Hubungi Kami</h1>
        <p class="text-muted lead">Silakan menghubungi kami untuk pertanyaan, usulan, atau kolaborasi</p>
    </div>

    <div class="row g-5">
        <div class="col-lg-6">
            <h2 class="fw-bold mb-4"><i class="fas fa-info-circle me-2 text-primary"></i>Informasi Kontak</h2>

            <div class="d-grid gap-3 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body d-flex align-items-start">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-map-marker-alt fa-lg text-primary"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1">Alamat Kantor</h5>
                            <p class="text-muted mb-0"><?= htmlspecialchars($settings['address'] ?? 'Jl. Brawijaya No. 10, Manokwari, Papua Barat 98312') ?></p>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm">
                    <div class="card-body d-flex align-items-start">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-phone fa-lg text-primary"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1">Telepon</h5>
                            <p class="text-muted mb-0"><?= htmlspecialchars($settings['phone'] ?? '(0986) 212-1234') ?></p>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm">
                    <div class="card-body d-flex align-items-start">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-envelope fa-lg text-primary"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1">Email</h5>
                            <p class="text-muted mb-0"><?= htmlspecialchars($settings['email'] ?? 'dpc.pkb.manokwari@gmail.com') ?></p>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm">
                    <div class="card-body d-flex align-items-start">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-clock fa-lg text-primary"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1">Jam Operasional</h5>
                            <p class="text-muted mb-0">Senin - Jumat: 08.00 - 17.00<br>Sabtu: 08.00 - 13.00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-primary bg-opacity-10 rounded-3 p-4 mb-4">
                <div class="d-flex align-items-center gap-2 text-success mb-2">
                    <span class="spinner-border spinner-border-sm" role="status"></span>
                    <span class="fw-medium">Online 24/7 melalui WhatsApp</span>
                </div>
                <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $settings['whatsappNumber'] ?? '') ?>" target="_blank" class="btn btn-success mt-2">
                    <i class="fab fa-whatsapp me-2"></i> Chat via WhatsApp
                </a>
            </div>

            <div class="d-flex gap-3">
                <?php if (!empty($settings['socialMedia'])): ?>
                    <?php if (!empty($settings['socialMedia']['facebook'])): ?>
                        <a href="<?= $settings['socialMedia']['facebook'] ?>" target="_blank" class="btn btn-outline-primary"><i class="fab fa-facebook-f"></i></a>
                    <?php endif; ?>
                    <?php if (!empty($settings['socialMedia']['instagram'])): ?>
                        <a href="<?= $settings['socialMedia']['instagram'] ?>" target="_blank" class="btn btn-outline-danger"><i class="fab fa-instagram"></i></a>
                    <?php endif; ?>
                    <?php if (!empty($settings['socialMedia']['youtube'])): ?>
                        <a href="<?= $settings['socialMedia']['youtube'] ?>" target="_blank" class="btn btn-outline-danger"><i class="fab fa-youtube"></i></a>
                    <?php endif; ?>
                    <?php if (!empty($settings['socialMedia']['twitter'])): ?>
                        <a href="<?= $settings['socialMedia']['twitter'] ?>" target="_blank" class="btn btn-outline-info"><i class="fab fa-twitter"></i></a>
                    <?php endif; ?>
                    <?php if (!empty($settings['socialMedia']['tiktok'])): ?>
                        <a href="<?= $settings['socialMedia']['tiktok'] ?>" target="_blank" class="btn btn-dark"><i class="fab fa-tiktok"></i></a>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white">
                    <h3 class="h5 mb-0 fw-bold"><i class="fas fa-paper-plane me-2"></i>Buat Pesan</h3>
                </div>
                <div class="card-body">
                    <form action="/api/contact.php" method="POST" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Nama Lengkap *</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email *</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label">No. Telepon</label>
                            <input type="tel" name="phone" class="form-control">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Subjek *</label>
                            <input type="text" name="subject" class="form-control" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Pesan *</label>
                            <textarea name="message" rows="5" class="form-control" required></textarea>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary w-100 btn-primary-custom">
                                <i class="fas fa-paper-plane me-2"></i> Kirim Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="ratio mt-4" style="height: 250px;">
                <iframe
                    src="https://maps.google.com/maps?q=<?= urlencode($settings['address'] ?? 'Manokwari, Papua Barat') ?>&output=embed"
                    width="100%" style="border:0; border-radius: 8px;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../templates/footer.php'; ?>
