<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "../../database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

if (!$id) {
    echo json_encode(["error" => "Missing user ID"]);
    exit;
}

$query = $db->prepare("DELETE FROM user WHERE user_id = ?");
$query->bind_param("i", $id);

if ($query->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to delete user"]);
}