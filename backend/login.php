<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "database.php";

$data = json_decode(file_get_contents("php://input"), true);

$emp_id = $data['id'] ?? '';
$password = $data['password'] ?? '';

if (!$emp_id || !$password) {
    echo json_encode(["error" => "Missing credentials"]);
    exit;
}

$query = $db->prepare("SELECT user_id, password FROM user WHERE user_id = ?");
$query->bind_param("s", $emp_id);
$query->execute();

$result = $query->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => true,
            "user_id" => $user['user_id']
        ]);
    } else {
        echo json_encode(["error" => "Invalid password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}