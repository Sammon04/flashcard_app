<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "../../database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$score = $data['score'] ?? '';

if (!$id || !$score) {
    echo json_encode(['error' => "Missing information"]);
    exit;
}

$query = $db->prepare("UPDATE user SET score = score + ? WHERE user_id = ?");
$query->bind_param("ii", $score, $id);

if ($query->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => "Failed to update score"]);
}