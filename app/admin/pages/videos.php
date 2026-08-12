<?php
global $pdo;
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

if ($action === 'delete') {
    $pdo->prepare("DELETE FROM video_links WHERE id = ?")->execute([$id]);
    header('Location: ?page=videos');
    exit();
}

if ($_POST) {
    $title = $_POST['title'] ?? '';
    $url = $_POST['url'] ?? '';
    $newId = 'vid_' . time() . '_' . rand(100, 999);
    $pdo->prepare("INSERT INTO video_links (id, title, url) VALUES (?, ?, ?)")->execute([$newId, $title, $url]);
    header('Location: ?page=videos');
    exit();
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="h3 fw-bold mb-0">Manajemen Video</h1>
    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#addVideo">
        <i class="fas fa-plus me-1"></i> Tambah Video
    </button>
</div>

<div class="table-responsive">
    <table class="table table-hover align-middle">
        <thead class="table-light">
            <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Judul</th>
                <th>URL</th>
                <th class="text-end">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT * FROM video_links ORDER BY created_at DESC");
            $videos = $stmt->fetchAll();
            $i = 1;
            foreach ($videos as $v):
                $ytId = getYouTubeId($v['url']);
                $thumb = $ytId ? "https://img.youtube.com/vi/{$ytId}/hqdefault.jpg" : '';
            ?>
                <tr>
                    <td><?= $i++ ?></td>
                    <td><?= $thumb ? '<img src="' . $thumb . '" class="rounded" width="50" height="50" style="object-fit:cover;">' : '-' ?></td>
                    <td><?= htmlspecialchars($v['title']) ?></td>
                    <td><a href="<?= $v['url'] ?>" target="_blank" class="small text-muted text-truncate d-block"><?= htmlspecialchars($v['url']) ?></a></td>
                    <td class="text-end">
                        <a href="?page=videos&action=delete&id=<?= $v['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin?')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<div class="modal fade" id="addVideo" tabindex="-1">
    <div class="modal-dialog">
        <form method="POST" class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Video</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Judul</label>
                    <input type="text" name="title" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL YouTube</label>
                    <input type="url" name="url" class="form-control" placeholder="https://www.youtube.com/watch?v=..." required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-danger">Simpan</button>
            </div>
        </form>
    </div>
</div>
