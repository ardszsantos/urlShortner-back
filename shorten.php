<?php
require 'config.php';

function generateShortCode($length = 6) {
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}

if (isset($_POST['url'])) {
    $originalUrl = $_POST['url'];
    
    if (!filter_var($originalUrl, FILTER_VALIDATE_URL)) {
        echo "URL inválida!";
        exit;
    }

    // Verificar se a URL já foi encurtada
    $query = $pdo->prepare("SELECT short_code FROM urls WHERE original_url = :url");
    $query->execute(['url' => $originalUrl]);
    $existing = $query->fetch();

    if ($existing) {
        echo "URL encurtada: http://seu-dominio.com/" . $existing['short_code'];
    } else {
        // Gerar código curto
        $shortCode = generateShortCode();

        // Inserir no banco de dados
        $query = $pdo->prepare("INSERT INTO urls (original_url, short_code) VALUES (:url, :code)");
        $query->execute(['url' => $originalUrl, 'code' => $shortCode]);

        echo "URL encurtada: http://seu-dominio.com/" . $shortCode;
    }
}
?>