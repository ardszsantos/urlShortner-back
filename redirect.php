<?php
require 'config.php';

$shortCode = $_GET['code'];

$query = $pdo->prepare("SELECT original_url FROM urls WHERE short_code = :code");
$query->execute(['code' => $shortCode]);
$url = $query->fetch();

if ($url) {
    header("Location: " . $url['original_url']);
    exit;
} else {
    echo "URL não encontrada!";
}
?>
