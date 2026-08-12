<?php
global $pdo;
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

// Handle delete
if ($action === 'delete') {
    $pdo->prepare("DELETE FROM leaders WHERE id = ?")->execute([$id]);
    header('Location: ?page=leaders');
    exit();
}

// Handle save (POST)
if ($_POST) {
    $data = [
        'name' => $_POST['name'] ?? '',
        'position' => $_POST['position'] ?? '',
        'photo' => $_POST['photo'] ?? '',
        'bio' => $_POST['bio'] ?? '',
        'order_num' => (int)($_POST['order_num'] ?? 0),
        'party_number' => $_POST['party_number'] ?? null,
    ];

    if ($_POST['id']) {
        $stmt = $pdo->prepare("UPDATE leaders SET name=?, position=?, photo=?, bio=?, order_num=?, party_number=? WHERE id=?");
        $stmt->execute([...array_values($data), $_POST['id']]);
    } else {
        $newId = 'leader_' . time() . '_' . rand(100, 999);
        $stmt = $pdo->prepare("INSERT INTO leaders (id, name, position, photo, bio, order_num, party_number) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$newId, ...array_values($data)]);
    }
    header('Location: ?page=leaders');
    exit();
}

$leader = null;
if ($action === 'edit') {
    $stmt = $pdo->prepare("SELECT * FROM leaders WHERE id = ?");
    $stmt->execute([$id]);
    $leader = $stmt->fetch();
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Manajemen Pengurus</h1>
    <a href="?page=leaders&action=edit" class="btn btn-success"><i class="fas fa-plus me-1"></i> Tambah Pengurus</a>
</div>

<?php if ($action === 'edit'): ?>
<div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-light fw-bold">
        <?= $leader ? 'Edit Pengurus' : 'Tambah Pengurus Baru' ?>
    </div>
    <div class="card-body">
        <form method="POST" class="row g-3">
            <input type="hidden" name="id" value="<?= $leader['id'] ?? '' ?>">
            <div class="col-md-6">
                <label class="form-label">Nama Lengkap *</label>
                <input type="text" name="name" class="form-control" required value="<?= htmlspecialchars($leader['name'] ?? '') ?>">
            </div>
            <div class="col-md-6">
                <label class="form-label">Jabatan *</label>
                <input type="text" name="position" class="form-control" required value="<?= htmlspecialchars($leader['position'] ?? '') ?>">
            </div>
            <div class="col-12">
                <label class="form-label">Foto (URL)</label>
                <input type="text" name="photo" class="form-control" value="<?= htmlspecialchars($leader['photo'] ?? '') ?>" placeholder="/assets/img/...">
            </div>
            <div class="col-md-6">
                <label class="form-label">Nomor Urut</label>
                <input type="number" name="order_num" class="form-control" min="0" value="<?= $leader['order_num'] ?? 0 ?>">
            </div>
            <div class="col-md-6">
                <label class="form-label">Nomor Partai</label>
                <input type="text" name="party_number" class="form-control" value="<?= htmlspecialchars($leader['party_number'] ?? '') ?>">
            </div>
            <div class="col-12">
                <label class="form-label">Bio</label>
                <textarea name="bio" rows="3" class="form-control"><?= htmlspecialchars($leader['bio'] ?? '') ?></textarea>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-1"></i> Simpan
                </button>
                <a href="?page=leaders" class="btn btn-outline-secondary ms-2">Batal</a>
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
                <th>Foto</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Urut</th>
                <th class="text-end">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT * FROM leaders ORDER BY order_num ASC, name ASC");
            $leaders = $stmt->fetchAll();
            $i = 1;
            foreach ($leaders as $l):
            ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><img src="<?= $l['photo'] ?: '/assets/img/no-avatar.png' ?>" alt="" class="rounded-circle" width="40" height="40" style="object-fit:cover;"></td>
                    <td><?= htmlspecialchars($l['name']) ?></td>
                    <td><?= htmlspecialchars($l['position']) ?></td>
                    <td><?= $l['order_num'] ?></td>
                    <td class="text-end">
                        <a href="?page=leaders&action=edit&id=<?= $l['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></a>
                        <a href="?page=leaders&action=delete&id=<?= $l['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin?')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
