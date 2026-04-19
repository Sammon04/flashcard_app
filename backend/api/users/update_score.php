<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;
$score = $data['score'] ?? null;

if ($id === null || $score === null) {
    send_response(['error' => 'Missing request information'], 400);
}

try {

    $sql = "UPDATE user 
            SET score = ? 
            WHERE user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("ii", $score, $id);
    $query->execute();

    if ($query->affected_rows === 0) {
        send_response(['error' => 'User not found'], 404);
    }

    send_response(['success' => true]);


} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}

