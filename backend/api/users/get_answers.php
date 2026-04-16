<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

header("Content-Type: application/json");
include "../../database.php";

$id = $_GET['id'];

if (!$id) {
    echo json_encode(['error' => "Missing user id"]);
}

$query = $db->prepare("SELECT role, district, locale, wildcard from user_info WHERE info_user_id = ?");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if (!($cur_user = $result->fetch_assoc())){
    echo json_encode(['error' => 'Failed to get answers']);
}

$answers = [];

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

    if ($query->execute()) {

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
        
    } else {
        echo json_encode(['error' => 'Failed to get answers']);
        exit;
    }
}

echo json_encode($answers);
