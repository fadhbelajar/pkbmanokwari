<?php
global $pdo;
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

if ($action === 'delete') {
    $pdo->prepare("DELETE FROM news WHERE id = ?")->execute([$id]);
    header('Location: ?page=news');
    exit();
}

if ($_POST) {
    $data = [
        'title' => $_POST['title'] ?? '',
        'excerpt' => $_POST['excerpt'] ?? '',
        'content' => $_POST['content'] ?? '',
        'image' => $_POST['image'] ?? '',
        'date' => $_POST['date'] ?? date('Y-m-d'),
        'category' => $_POST['category'] ?? '',
        'slug' => $_POST['slug'] ?? '',
        'auto_share_platforms' => isset($_POST['auto_share_platforms']) ? json_encode($_POST['auto_share_platforms']) : null,
    ];

    if ($_POST['id']) {
        $stmt = $pdo->prepare("UPDATE news SET title=?, excerpt=?, content=?, image=?, date=?, category=?, slug=?, auto_share_platforms=? WHERE id=?");
        $stmt->execute([...array_values($data), $_POST['id']]);
    } else {
        $newId = 'news_' . time() . '_' . rand(100, 999);
        $stmt = $pdo->prepare("INSERT INTO news (id, title, excerpt, content, image, date, category, slug, auto_share_platforms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$newId, ...array_values($data)]);
    }
    header('Location: ?page=news');
    exit();
}

$article = null;
if ($action === 'edit') {
    $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch();
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Manajemen Berita</h1>
    <a href="?page=news&action=edit" class="btn btn-success"><i class="fas fa-plus me-1"></i> Tambah Berita</a>
</div>

<?php if ($action === 'edit'): ?>
<div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-light fw-bold">
        <?= $article ? 'Edit Berita' : 'Tambah Berita Baru' ?>
    </div>
    <div class="card-body">
        <form method="POST" class="row g-3">
            <input type="hidden" name="id" value="<?= $article['id'] ?? '' ?>">
            <div class="col-12">
                <label class="form-label">Judul *</label>
                <input type="text" name="title" class="form-control" required value="<?= htmlspecialchars($article['title'] ?? '') ?>">
            </div>
            <div class="col-md-6">
                <label class="form-label">Kategori</label>
                <select name="category" class="form-select">
                    <option <?= ($article['category'] ?? '') == 'Organisasi' ? 'selected' : '' ?>>Organisasi</option>
                    <option <?= ($article['category'] ?? '') == 'Sosial' ? 'selected' : '' ?>>Sosial</option>
                    <option <?= ($article['category'] ?? '') == 'Politik' ? 'selected' : '' ?>>Politik</option>
                    <option <?= ($article['category'] ?? '') == 'Kaderisasi' ? 'selected' : '' ?>>Kaderisasi</option>
                    <option <?= ($article['category'] ?? '') == 'Kegiatan' ? 'selected' : '' ?>>Kegiatan</option>
                </select>
            </div>
            <div class="col-md-6">
                <label class="form-label">Tanggal</label>
                <input type="date" name="date" class="form-control" value="<?= $article['date'] ?? date('Y-m-d') ?>">
            </div>
            <div class="col-12">
                <label class="form-label">Slug (untuk URL)</label>
                <input type="text" name="slug" class="form-control" value="<?= htmlspecialchars($article['slug'] ?? '') ?>" placeholder="judul-berita">
            </div>
            <div class="col-12">
                <label class="form-label">Gambar (URL)</label>
                <input type="text" name="image" class="form-control" value="<?= htmlspecialchars($article['image'] ?? '') ?>">
            </div>
            <div class="col-12">
                <label class="form-label">Ringkasan</label>
                <textarea name="excerpt" rows="2" class="form-control"><?= htmlspecialchars($article['excerpt'] ?? '') ?></textarea>
            </div>
            <div class="col-12">
                <label class="form-label">Konten (HTML) *</label>
                <textarea name="content" rows="8" class="form-control font-monospace" required><?= htmlspecialchars($article['content'] ?? '') ?></textarea>
                <small class="text-muted">Gunakan tag HTML untuk formatting: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;h1&gt;-&lt;h3&gt;, dll.</small>
            </div>
            <div class="col-12">
                <label class="form-label">Auto Share Sosial Media</label>
                <div class="d-flex gap-3">
                    <label class="d-flex align-items-center gap-2"><input type="checkbox" name="auto_share_platforms[]" value="facebook"> Facebook</label>
                    <label class="d-flex align-items-center gap-2"><input type="checkbox" name="auto_share_platforms[]" value="twitter"> X/Twitter</label>
                    <label class="d-flex align-items-center gap-2"><input type="checkbox" name="auto_share_platforms[]" value="linkedin"> LinkedIn</label>
                    <label class="d-flex align-items-center gap-2"><input type="checkbox" name="auto_share_platforms[]" value="whatsapp"> WhatsApp</label>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-1"></i> Simpan
                </button>
                <a href="?page=news" class="btn btn-outline-secondary ms-2">Batal</a>
            </div>
        </form>
    </div>
</div>
<?php endif; ?>

<div class="table-responsive">
    <table class="table table-hover align-middle">
        <thead class="table-light">
            <tr>
                <th>No</th>
                <th>Gambar</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th class="text-end">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT id, title, image, category, date FROM news ORDER BY date DESC");
            $articles = $stmt->fetchAll();
            $i = 1;
            foreach ($articles as $a):
            ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><img src="<?= $a['image'] ?: '/assets/img/no-image.png' ?>" alt="" class="rounded" width="50" height="50" style="object-fit:cover;"></td>
                    <td><?= htmlspecialchars($a['title']) ?></td>
                    <td><span class="badge bg-primary"><?= htmlspecialchars($a['category']) ?></span></td>
                    <td><?= formatDate($a['date']) ?></td>
                    <td class="text-end">
                        <a href="?page=news&action=edit&id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></a>
                        <a href="?page=news&action=delete&id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin?')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
