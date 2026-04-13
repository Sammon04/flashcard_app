<?php

//(hopefully) Avoids CORS issues for now
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

include "../../database.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

//Action depends on which method is used
//GET = get all cards for user
//POST = add card for user
//DELETE = delete card
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $user_id = $_GET['user_id'] ?? '';

        if (!$user_id) {
            echo json_encode(["error" => "Missing user ID"]);
            exit;
        }

        $query = $db->prepare("SELECT card_id, front, back, points FROM flashcard WHERE card_user_id = ?");
        $query->bind_param("i", $user_id);
        $query->execute();

        $result = $query->get_result();

        $cards = [];

        while ($row = $result->fetch_assoc()) {
            $cards[] = $row;
        }

        echo json_encode($cards);
        break;

    case 'POST':

        $data = json_decode(file_get_contents("php://input"), true);

        $user_id = $data['user_id'] ?? '';
        $front = $data['front'] ?? '';
        $back = $data['back'] ?? '';

        if (!$user_id || !$front || !$back) {
            echo json_encode(['error' => "Missing card data"]);
            exit;
        }

        $query = $db->prepare("INSERT INTO flashcard (card_user_id, front, back) VALUES (?, ?, ?)");
        $query->bind_param("iss", $user_id, $front, $back);
        
        if ($query->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Failed to add card"]);
        }
        break;
    
    case 'DELETE':

        $card_id = $_GET['card_id'];

        if (!$card_id) {
            echo json_encode(['error' => 'Missing card id']);
            exit;
        }

        $query = $db->prepare("DELETE FROM flashcard WHERE card_id = ?");
        $query->bind_param("i", $card_id);

        if ($query->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Failed to delete card"]);
        }
        break;

    
    default:
        echo json_encode(["error" => "Method not allowed"]);
}

