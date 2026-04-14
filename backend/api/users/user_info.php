<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

header("Content-Type: application/json");
include "../../database.php";

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(["error" => "missing user id"]);
}

$query = $db->prepare("SELECT user_id, fname, lname, role, district, locale, score, admin FROM user_info JOIN user ON user.user_id = user_info.info_user_id WHERE info_user_id = ?");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if ($user = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "fname" => $user['fname'],
        "lname" => $user['lname'],
        "role" => $user['role'],
        "district" => $user['district'],
        "locale" => $user['locale'],
        "score" => $user['score'],
        "admin" => $user['admin']
    ]);
} else {
    echo json_encode(["error" => "Failed to fetch user info"]);
}
