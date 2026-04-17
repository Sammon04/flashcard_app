<?php

include "../config/init.php";

$users = [];

try {

    $sql = "SELECT * FROM user AS u 
            JOIN user_info AS ui 
            ON u.user_id = ui.info_user_id 
            ORDER BY u.score DESC";

    $query = $db->prepare($sql);
    $query->execute();
    $result = $query->get_result();

    if (!$result) {
        send_response(['error' => 'No users found'], 404);
    }

    while ($row = $result->fetch_assoc()) {
        unset($row['info_user_id']);
        unset($row['password']);
        $users[] = $row;
    }

    send_response($users);

} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}


