<?php
global $pdo;
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

if ($action === 'delete') {
    $pdo->prepare("DELETE FROM accounts WHERE id = ?")->execute([$id]);
    header('Location: ?page=accounts');
    exit();
}

if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $email = $_POST['email'] ?? null;
    $role = $_POST['role'] ?? 'admin';
    $newId = 'acc_' . time() . '_' . rand(100, 999);
    $pdo->prepare("INSERT INTO accounts (id, username, password, email, role) VALUES (?, ?, ?, ?, ?)")
        ->execute([$newId, $username, $password, $email, $role]);
    header('Location: ?page=accounts');
    exit();
}

if ($action === 'reset') {
    $stmt = $pdo->prepare("SELECT * FROM accounts WHERE id = ?");
    $stmt->execute([$id]);
    $account = $stmt->fetch();
    if ($_POST) {
        $pdo->prepare("UPDATE accounts SET password = ? WHERE id = ?")->execute([$_POST['password'], $id]);
        header('Location: ?page=accounts');
        exit();
    }
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Manajemen Akun</h1>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAccount">
        <i class="fas fa-plus me-1"></i> Tambah Akun
    </button>
</div>

<div class="table-responsive">
    <table class="table table-hover align-middle">
        <thead class="table-light">
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th class="text-end">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT id, username, email, role FROM accounts ORDER BY created_at DESC");
            $accounts = $stmt->fetchAll();
            $i = 1;
            foreach ($accounts as $a):
            ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><?= htmlspecialchars($a['username']) ?></td>
                    <td><?= htmlspecialchars($a['email'] ?? '-') ?></td>
                    <td><span class="badge bg-info"><?= ucfirst($a['role']) ?></span></td>
                    <td class="text-end">
                        <a href="?page=accounts&action=reset&id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-warning"><i class="fas fa-key"></i> Reset</a>
                        <a href="?page=accounts&action=delete&id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin?')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<div class="modal fade" id="addAccount" tabindex="-1">
    <div class="modal-dialog">
        <form method="POST" class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Akun</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Username *</label>
                    <input type="text" name="username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password *</label>
                    <input type="password" name="password" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Role</label>
                    <select name="role" class="form-select">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Simpan</button>
            </div>
        </form>
    </div>
</div>
