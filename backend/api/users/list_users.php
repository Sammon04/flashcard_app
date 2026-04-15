<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

header("Content-Type: application/json");
include "../../database.php";

$users = [];

$query = $db->prepare("SELECT * FROM user JOIN user_info ON user.user_id = user_info.info_user_id");

if ($query->execute()) {
    $result = $query->get_result();

    while ($row = $result->fetch_assoc()) {
        unset($row['info_user_id']);
        unset($row['password']);
        $users[] = $row;
    
    echo json_encode($users);
    }

} else {
    echo json_encode(["error" => "Failed to get users"]);
}
