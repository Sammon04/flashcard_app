<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");
include "database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$fname = $data['fname'];
$lname = $data['lname'];

if (!$id || !$password || !$fname || !$lname) {
    echo json_encode(["error" => "Missing user data"]);
    exit;
}

$query = $db->prepare("INSERT INTO user (user_id, password, fname, lname) VALUES (?, ?, ?, ?)");
$query->bind_param("isss", $id, $password, $fname, $lname);

if ($query->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Registration failed"]);
}