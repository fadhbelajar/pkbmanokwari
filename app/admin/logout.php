<?php
require_once __DIR__ . '/../core/config.php';
require_once __DIR__ . '/../core/functions.php';

if (isset($_POST['logout'])) {
    logout();
}
header('Location: index.php');
exit();
