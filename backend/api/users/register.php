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
$fname = $data['fname'];
$lname = $data['lname'];

if (!$id || !$password || !$fname || !$lname) {
    echo json_encode(["error" => "Missing user data"]);
    exit;
}

$query1 = $db->prepare("INSERT INTO user (user_id, password) VALUES (?, ?)");
$query1->bind_param("is", $id, $password);
$query2 = $db->prepare("INSERT INTO user_info (info_user_id, fname, lname) VALUES (?, ?, ?)");
$query2->bind_param("iss", $id, $fname, $lname);

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