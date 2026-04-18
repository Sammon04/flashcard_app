<?php

include "../config/init.php";

$id = $_GET['id'] ?? null;

if ($id === null) {
    send_response(['error' => 'Missing user id'], 400);
}

try {

    $sql = "SELECT fname, lname, role, district, locale, wildcard 
            FROM user_info 
            WHERE info_user_id = ?";

    $query = $db->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    $result = $query->get_result();
    $cur_user = $result->fetch_assoc();

    if (!$cur_user){
        send_response(['error' => 'User not found'], 404);
    }
} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}

$answers = [];

try {

    foreach ($cur_user as $key => $value) {

        $sql = "SELECT DISTINCT $key 
                FROM user_info WHERE 
                info_user_id != ?
                AND $key != ? 
                ORDER BY RAND() 
                LIMIT 3
            ";

        $query = $db->prepare($sql);
        $query->bind_param("is", $id, $value);
        $query->execute();


        $result = $query->get_result();
        $wrong = [];

        while ($row = $result->fetch_assoc()){
            $wrong[] = $row[$key];
        }

        $answers[] = [
            $key => [
                'Correct' => $value, 
                'Incorrect' => $wrong
            ]
        ];
            
    }

    echo json_encode($answers);

} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}

