<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;

//TODO add type checking to all inputs
if ($id === null) {
    send_response(['error' => 'Missing user id'], 400);
}

try {

    $sql = "DELETE FROM user 
            WHERE user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    if ($query->affected_rows === 0) {
        send_response(['error' => 'User not found'], 404);
    }

    send_response(['success' => true]);
} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}
