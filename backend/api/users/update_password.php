<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;
$password = $data['password'] ?? null;

if ($id === null || $password === null) {
    send_response(['error' => 'Missing id or password'], 400);
}

$password = password_hash($password, PASSWORD_DEFAULT);

try {

    $sql = "UPDATE user 
            SET password = ? 
            WHERE user_id = ?";
    
    $query = $db->prepare($sql);
    $query->bind_param("si", $password, $id);
    $query->execute();

    if ($query->affected_rows === 0) {
        send_response(['error' => 'User not found or passwords were equal'], 404);
    }

    send_response(['success' => true]);
} catch (Exception $e) {
    send_response(['error' => 'Database error']);
}