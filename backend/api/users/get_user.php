<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "../../database.php";

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(["error" => "missing user id"]);
}

$query = $db->prepare("SELECT * FROM user JOIN user_info ON user_info.info_user_id = user.user_id WHERE user_id = ?");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if ($user = $result->fetch_assoc()) {
    unset($user['password']);
    unset($user['info_user_id']);
    echo json_encode($user);
} else {
    echo json_encode(["error" => "Failed to fetch user info"]);
}
