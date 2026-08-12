<?php
global $pdo;
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

if ($action === 'delete') {
    $pdo->prepare("DELETE FROM gallery_items WHERE id = ?")->execute([$id]);
    header('Location: ?page=gallery');
    exit();
}

if ($_POST) {
    $name = $_POST['title'];
    $image = $_POST['image'];
    $date = $_POST['date'] ?? null;
    $newId = 'g_' . time() . '_' . rand(100, 999);

    $stmt = $pdo->prepare("INSERT INTO gallery_items (id, title, image, date) VALUES (?, ?, ?, ?)");
    $stmt->execute([$newId, $name, $image, $date]);
    header('Location: ?page=gallery');
    exit();
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Manajemen Galeri</h1>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addItem">
        <i class="fas fa-plus me-1"></i> Tambah Foto
    </button>
</div>

<div class="table-responsive">
    <table class="table table-hover align-middle">
        <thead class="table-light">
            <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Judul</th>
                <th>Tanggal</th>
                <th class="text-end">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT * FROM gallery_items ORDER BY date DESC");
            $items = $stmt->fetchAll();
            $i = 1;
            foreach ($items as $item):
            ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><img src="<?= $item['image'] ?>" alt="" class="rounded" width="50" height="50" style="object-fit:cover;"></td>
                    <td><?= htmlspecialchars($item['title']) ?></td>
                    <td><?= $item['date'] ? formatDate($item['date']) : '-' ?></td>
                    <td class="text-end">
                        <a href="?page=gallery&action=delete&id=<?= $item['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin?')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<!-- Modal Tambah -->
<div class="modal fade" id="addItem" tabindex="-1">
    <div class="modal-dialog">
        <form method="POST" class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Galeri Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Judul</label>
                    <input type="text" name="title" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL Gambar</label>
                    <input type="text" name="image" class="form-control" placeholder="https://..." required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal</label>
                    <input type="date" name="date" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Simpan</button>
            </div>
        </form>
    </div>
</div>
