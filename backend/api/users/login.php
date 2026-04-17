<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;
$password = $data['password'] ?? null;

if ($id === null || $password === null) {
    send_response(['error' => 'Missing login info'], 400);
}

try {

    $sql = "SELECT user_id, password 
            FROM user 
            WHERE user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    $result = $query->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        send_response(['error' => 'User not found'], 404);
    }

    if (!password_verify($password, $user['password'])) {
        send_response(['error' => 'Invalid password'], 401);
    }

    send_response(['user_id' => $user['user_id']]);

} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}


