<?php
require_once __DIR__ . '/../core/config.php';
require_once __DIR__ . '/../core/functions.php';

logout();
header('Location: /admin.php?action=login');
exit();
