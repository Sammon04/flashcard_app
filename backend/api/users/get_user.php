<?php

include "../config/init.php";

$id = $_GET['id'] ?? null;

if ($id === null) {
    send_response(['error' => 'Missing user id'], 404);
}

try {

    $sql = "SELECT * FROM user AS u 
            JOIN user_info AS ui
            ON ui.info_user_id = u.user_id 
            WHERE user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    $result = $query->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        send_response(['error' => 'User not found'], 404);
    }

    unset($user['password']);
    unset($user['info_user_id']);

    send_response($user);

} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}

