<?php
// Handle POST save settings
if ($_POST) {
    $data = [
        'siteName' => $_POST['siteName'] ?? 'DPC PKB Manokwari',
        'tagline' => $_POST['tagline'] ?? '',
        'logo' => $_POST['logo'] ?? '',
        'primaryColor' => $_POST['primaryColor'] ?? '#008c44',
        'phone' => $_POST['phone'] ?? '',
        'email' => $_POST['email'] ?? '',
        'address' => $_POST['address'] ?? '',
        'whatsappNumber' => $_POST['whatsappNumber'] ?? '',
        'vision' => $_POST['vision'] ?? '',
        'mission' => isset($_POST['mission']) ? array_filter($_POST['mission']) : [],
        'aboutText' => $_POST['aboutText'] ?? '',
        'chairmanName' => $_POST['chairmanName'] ?? '',
        'chairmanPosition' => $_POST['chairmanPosition'] ?? '',
        'chairmanPhoto' => $_POST['chairmanPhoto'] ?? '',
        'chairmanMessage' => $_POST['chairmanMessage'] ?? '',
        'socialMedia' => [
            'facebook' => $_POST['socialMedia']['facebook'] ?? '',
            'instagram' => $_POST['socialMedia']['instagram'] ?? '',
            'youtube' => $_POST['socialMedia']['youtube'] ?? '',
            'tiktok' => $_POST['socialMedia']['tiktok'] ?? '',
            'twitter' => $_POST['socialMedia']['twitter'] ?? '',
        ],
    ];

    global $pdo;
    $jsonData = json_encode($data);
    $stmt = $pdo->prepare("SELECT id FROM site_settings WHERE id = 'main'");
    $stmt->execute();
    if ($stmt->fetch()) {
        $pdo->prepare("UPDATE site_settings SET data = ? WHERE id = 'main'")->execute([$jsonData]);
    } else {
        $pdo->prepare("INSERT INTO site_settings (id, data) VALUES ('main', ?)")->execute([$jsonData]);
    }

    echo '<div class="alert alert-success">Pengaturan berhasil disimpan!</div>';
    $settings = $data;
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Pengaturan Situs</h1>
</div>

<form method="POST">
    <div class="row g-4">
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light fw-bold">Informasi Umum</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Nama Situs</label>
                            <input type="text" name="siteName" class="form-control" value="<?= htmlspecialchars($settings['siteName'] ?? '') ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Tagline</label>
                            <input type="text" name="tagline" class="form-control" value="<?= htmlspecialchars($settings['tagline'] ?? '') ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Logo (URL)</label>
                            <input type="text" name="logo" class="form-control" value="<?= htmlspecialchars($settings['logo'] ?? '') ?>" placeholder="/assets/img/Logo_PKB_2024.png">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Warna Utama</label>
                            <input type="color" name="primaryColor" class="form-control form-control-color" value="<?= htmlspecialchars($settings['primaryColor'] ?? '#008c44') ?>">
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light fw-bold">Visi & Misi</div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Visi</label>
                        <textarea name="vision" rows="3" class="form-control"><?= htmlspecialchars($settings['vision'] ?? '') ?></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Misi</label>
                        <?php for ($i = 0; $i < 5; $i++):
                            $missions = $settings['mission'] ?? [];
                        ?>
                            <input type="text" name="mission[]" class="form-control mb-2" value="<?= htmlspecialchars($missions[$i] ?? '') ?>" placeholder="Misi ke-<?= $i + 1 ?>">
                        <?php endfor; ?>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tentang Kami</label>
                        <textarea name="aboutText" rows="4" class="form-control"><?= htmlspecialchars($settings['aboutText'] ?? '') ?></textarea>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light fw-bold">Informasi Kontak</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Telepon</label>
                            <input type="text" name="phone" class="form-control" value="<?= htmlspecialchars($settings['phone'] ?? '') ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($settings['email'] ?? '') ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Alamat</label>
                            <input type="text" name="address" class="form-control" value="<?= htmlspecialchars($settings['address'] ?? '') ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Nomor WhatsApp</label>
                            <input type="text" name="whatsappNumber" class="form-control" value="<?= htmlspecialchars($settings['whatsappNumber'] ?? '') ?>">
                        </div>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light fw-bold">Sambutan Ketua</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Nama Ketua</label>
                            <input type="text" name="chairmanName" class="form-control" value="<?= htmlspecialchars($settings['chairmanName'] ?? '') ?>">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Jabatan</label>
                            <input type="text" name="chairmanPosition" class="form-control" value="<?= htmlspecialchars($settings['chairmanPosition'] ?? '') ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Foto Ketua (URL)</label>
                            <input type="text" name="chairmanPhoto" class="form-control" value="<?= htmlspecialchars($settings['chairmanPhoto'] ?? '') ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Pesan Sambutan</label>
                            <textarea name="chairmanMessage" rows="5" class="form-control"><?= htmlspecialchars($settings['chairmanMessage'] ?? '') ?></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light fw-bold">Media Sosial</div>
                <div class="card-body">
                    <?php
                    $sm = $settings['socialMedia'] ?? [];
                    $platforms = ['facebook' => 'Facebook', 'instagram' => 'Instagram', 'youtube' => 'YouTube', 'tiktok' => 'TikTok', 'twitter' => 'X/Twitter'];
                    foreach ($platforms as $key => $label):
                    ?>
                        <div class="mb-3">
                            <label class="form-label"><?= $label ?></label>
                            <input type="url" name="socialMedia[<?= $key ?>]" class="form-control" value="<?= htmlspecialchars($sm[$key] ?? '') ?>" placeholder="https://...">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 btn-lg">
                <i class="fas fa-save me-2"></i>Simpan Pengaturan
            </button>
        </div>
    </div>
</form>
