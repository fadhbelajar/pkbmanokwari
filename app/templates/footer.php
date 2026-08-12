<footer class="bg-dark text-white pt-5 mt-5">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4">
                <div class="d-flex align-items-center mb-3">
                    <img src="<?= $settings['logo'] ?? '/assets/img/Logo_PKB_2024.png' ?>" alt="Logo" width="50" height="50" class="me-2">
                    <div>
                        <h5 class="mb-0 fw-bold"><?= htmlspecialchars($settings['siteName'] ?? 'DPC PKB Manokwari') ?></h5>
                        <small class="text-muted"><?= htmlspecialchars($settings['tagline'] ?? '') ?></small>
                    </div>
                </div>
                <p class="text-muted small">
                    <?= htmlspecialchars($settings['aboutText'] ?? 'Partai Kebangkitan Bangsa Kabupaten Manokwari') ?>
                </p>
                <div class="d-flex gap-2 mt-3">
                    <?php if (!empty($settings['socialMedia'])): ?>
                        <?php if (!empty($settings['socialMedia']['facebook'])): ?>
                            <a href="<?= $settings['socialMedia']['facebook'] ?>" target="_blank" class="text-decoration-none"><i class="fab fa-facebook-f fs-5" style="color:#1877F2"></i></a>
                        <?php endif; ?>
                        <?php if (!empty($settings['socialMedia']['instagram'])): ?>
                            <a href="<?= $settings['socialMedia']['instagram'] ?>" target="_blank" class="text-decoration-none"><i class="fab fa-instagram fs-5" style="color:#E4405F"></i></a>
                        <?php endif; ?>
                        <?php if (!empty($settings['socialMedia']['youtube'])): ?>
                            <a href="<?= $settings['socialMedia']['youtube'] ?>" target="_blank" class="text-decoration-none"><i class="fab fa-youtube fs-5" style="color:#FF0000"></i></a>
                        <?php endif; ?>
                        <?php if (!empty($settings['socialMedia']['tiktok'])): ?>
                            <a href="<?= $settings['socialMedia']['tiktok'] ?>" target="_blank" class="text-decoration-none"><i class="fab fa-tiktok fs-5" style="color:#FE2C55"></i></a>
                        <?php endif; ?>
                        <?php if (!empty($settings['socialMedia']['twitter'])): ?>
                            <a href="<?= $settings['socialMedia']['twitter'] ?>" target="_blank" class="text-decoration-none"><i class="fab fa-twitter-x fs-5" style="color:#1DA1F2"></i></a>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-lg-2">
                <h6 class="fw-bold mb-3">Menu</h6>
                <ul class="list-unstyled">
                    <li><a href="/" class="text-muted small text-decoration-none d-block mb-2">Beranda</a></li>
                    <li><a href="/profil" class="text-muted small text-decoration-none d-block mb-2">Profil</a></li>
                    <li><a href="/berita" class="text-muted small text-decoration-none d-block mb-2">Berita</a></li>
                    <li><a href="/galeri" class="text-muted small text-decoration-none d-block mb-2">Galeri</a></li>
                    <li><a href="/kontak" class="text-muted small text-decoration-none d-block mb-2">Kontak</a></li>
                </ul>
            </div>
            <div class="col-lg-3">
                <h6 class="fw-bold mb-3">Kontak Kami</h6>
                <ul class="list-unstyled text-muted small">
                    <li class="mb-2"><i class="fas fa-map-marker-alt me-2"></i><?= htmlspecialchars($settings['address'] ?? '') ?></li>
                    <li class="mb-2"><i class="fas fa-phone me-2"></i><?= htmlspecialchars($settings['phone'] ?? '') ?></li>
                    <li class="mb-2"><i class="fas fa-envelope me-2"></i><?= htmlspecialchars($settings['email'] ?? '') ?></li>
                </ul>
            </div>
            <div class="col-lg-3">
                <div class="bg-secondary bg-opacity-25 rounded-3 p-3 text-center">
                    <div class="d-flex align-items-center justify-content-center gap-2 text-success small fw-medium">
                        <span class="spinner-border spinner-border-sm" style="width: 10px; height:10px;"></span>
                        <span>Online 24/7 via WhatsApp</span>
                    </div>
                    <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $settings['whatsappNumber'] ?? '') ?>"
                       target="_blank" class="btn btn-success btn-sm w-100 mt-2">
                        Chat WhatsApp
                    </a>
                </div>
            </div>
        </div>
        <div class="border-top border-secondary border-opacity-25 mt-4 pt-3 text-center text-muted small">
            &copy; <?= date('Y') ?> <?= htmlspecialchars($settings['siteName'] ?? 'DPC PKB Manokwari') ?>. All rights reserved.
        </div>
    </div>
</footer>
