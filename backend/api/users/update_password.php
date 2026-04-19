<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;
$old_password = $data['old_password'] ?? null;
$new_password = $data['new_password'] ?? null;

if ($id === null || $old_password === null || $new_password === null) {
    send_response(['error' => 'Missing id or password'], 400);
}

try {
    $sql = "SELECT password FROM user WHERE user_id = ?";
    $query = $db->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows === 0) {
        send_response(['error' => 'User not found'], 404);
    }

    $user = $result->fetch_assoc();

    if (!password_verify($old_password, $user['password'])) {
        send_response(['error' => 'Old password is incorrect'], 401);
    }

    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    $sql = "UPDATE user 
            SET password = ? 
            WHERE user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("si", $hashed_password, $id);
    $query->execute();

    if ($query->affected_rows === 0) {
        send_response(['error' => 'Password not updated'], 400);
    }

    send_response(['success' => true]);
} catch (Exception $e) {
    send_response(['error' => 'Database error']);
}
