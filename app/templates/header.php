<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($meta_desc ?? $settings['siteName'] . ' - ' . ($settings['tagline'] ?? '')) ?>">
    <title><?= htmlspecialchars($page_title ?? $settings['siteName']) ?> | DPC PKB Manokwari</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="icon" type="image/png" href="<?= $settings['logo'] ?? '/assets/img/Logo_PKB_2024.png' ?>" sizes="32x32">
</head>
<body>
<?php include __DIR__ . '/navbar.php'; ?>
<main>
