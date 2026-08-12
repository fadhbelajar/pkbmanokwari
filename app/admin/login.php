<?php
require_once __DIR__ . '/../core/config.php';
require_once __DIR__ . '/../core/functions.php';

if (isLoggedIn()) {
    header('Location: /admin/');
    exit();
}

$error = '';
if ($_POST) {
    $password = $_POST['password'] ?? '';
    if (login($password)) {
        header('Location: /admin/');
        exit();
    } else {
        $error = 'Password salah!';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin | DPC PKB Manokwari</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="icon" type="image/png" href="/assets/img/Logo_PKB_2024.png" sizes="32x32">
</head>
<body class="bg-light">
<div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-5">
            <div class="text-center mb-4">
                <img src="/assets/img/Logo_PKB_2024.png" alt="Logo" width="60" height="60" class="mb-2">
                <h4 class="fw-bold" style="color: #008c44;">Admin Panel - DPC PKB Manokwari</h4>
            </div>
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <?php if ($error): ?>
                        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
                    <?php endif; ?>
                    <form method="POST">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Password Admin</label>
                            <input type="password" name="password" class="form-control" placeholder="Masukkan password" required autofocus>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" style="background:#008c44;border-color:#008c44;">
                            <i class="fas fa-sign-in-alt me-2"></i> Masuk
                        </button>
                    </form>
                    <div class="text-center mt-3 text-muted small">
                        Password default: <code>admin123</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
