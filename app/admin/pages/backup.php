<?php
$settings_json = json_encode($settings);
?>
<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Backup & Restore</h1>
</div>

<div class="row g-4">
    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0 fw-bold"><i class="fas fa-download me-2"></i>Export Lokal</h5>
            </div>
            <div class="card-body">
                <p class="text-muted">Unduh seluruh data situs sebagai file JSON.</p>
                <a href="/api/backup-export.php" class="btn btn-success w-100">
                    <i class="fas fa-file-export me-1"></i> Export Sekarang
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-info text-white">
                <h5 class="mb-0 fw-bold"><i class="fas fa-upload me-2"></i>Import Lokal</h5>
            </div>
            <div class="card-body">
                <p class="text-muted">Upload file backup JSON untuk memulihkan data.</p>
                <form method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <input type="file" name="backup_file" accept=".json" class="form-control">
                    </div>
                    <button type="submit" name="restore" class="btn btn-info w-100 text-white">
                        <i class="fas fa-file-import me-1"></i> Restore
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
if (isset($_POST['restore'])) {
    if (isset($_FILES['backup_file']) && $_FILES['backup_file']['error'] === UPLOAD_ERR_OK) {
        $content = file_get_contents($_FILES['backup_file']['tmp_name']);
        $data = json_decode($content, true);
        if ($data && isset($data['settings'])) {
            global $pdo;
            // Restore settings
            $json = json_encode($data['settings']);
            $pdo->prepare("INSERT INTO site_settings (id, data) VALUES ('main', ?) ON DUPLICATE KEY UPDATE data = VALUES(data)")->execute([$json]);
            // Restore leaders
            if (isset($data['leaders'])) {
                $pdo->exec("DELETE FROM leaders");
                foreach ($data['leaders'] as $l) {
                    $pdo->prepare("INSERT INTO leaders (id, name, position, photo, bio, order_num, party_number) VALUES (?,?,?,?,?,?,?)")
                        ->execute([$l['id'], $l['name'], $l['position'], $l['photo'], $l['bio'], $l['order'] ?? 0, $l['partyNumber'] ?? null]);
                }
            }
            // Restore news
            if (isset($data['news'])) {
                $pdo->exec("DELETE FROM news");
                foreach ($data['news'] as $n) {
                    $pdo->prepare("INSERT INTO news (id, title, excerpt, content, image, date, category, slug, auto_share_platforms, shared_to) VALUES (?,?,?,?,?,?,?,?,?,?)")
                        ->execute([$n['id'], $n['title'], $n['excerpt'], $n['content'], $n['image'], $n['date'], $n['category'], $n['slug'] ?? null, json_encode($n['autoSharePlatforms'] ?? null), json_encode($n['sharedTo'] ?? null)]);
                }
            }
            echo '<div class="alert alert-success mt-4">Data berhasil direstore!</div>';
        } else {
            echo '<div class="alert alert-danger mt-4">Format file backup tidak valid.</div>';
        }
    } else {
        echo '<div class="alert alert-danger mt-4">Gagal mengunggah file.</div>';
    }
}
?>
