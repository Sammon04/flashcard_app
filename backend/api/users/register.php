<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "../../database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$fname = $data['fname'] ?? 'N/A';
$lname = $data['lname'] ?? 'N/A';
$image = $data['image'] ?? null;
$role = $data['role'] ?? 'N/A';
$district = $data['district'] ?? 'N/A';
$locale = $data['locale'] ?? 'N/A';
$wildcard = $data['wildcard'] ?? 'N/A';

if (!$id || !$password || !$fname || !$lname) {
    echo json_encode(["error" => "Missing user data"]);
    exit;
}

$query1 = $db->prepare("INSERT INTO user (user_id, password) VALUES (?, ?)");
$query1->bind_param("is", $id, $password);
$query2 = $db->prepare("INSERT INTO user_info (info_user_id, image, fname, lname, role, district, locale, wildcard) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$query2->bind_param("isssssss", $id, $image, $fname, $lname, $role, $district, $locale, $wildcard);

$db->begin_transaction();

try {
    $query1->execute();
    $query2->execute();

    $db->commit();

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $db->rollback();

    echo json_encode(["error" => "Failed to register user"]);
}
