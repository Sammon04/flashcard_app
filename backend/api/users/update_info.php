<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;

if ($id === null) {
    send_response(['error' => 'Missing user id'], 400);
}

$fields = [];
$values = [];
$types = '';

$allowed = ['fname', 'lname', 'image', 'role', 'district', 'locale', 'wildcard'];

foreach ($data as $key => $value) {
    if ($key === 'id') continue;
    if ($value === null) continue;

    if (!in_array($key, $allowed)) continue;

    $fields[] = "$key = ?";
    $values[] = $value;
    $types .= 's';
}

if (empty($fields)) {
    send_response(['error' => 'No valid fields to update'], 400);
}

$values[] = $id;
$types .= 'i';

$sql = "UPDATE user_info 
        SET " . implode(', ', $fields) . "
        WHERE info_user_id = ?";

try {


    $query = $db->prepare($sql);
    $query->bind_param($types, ...$values);
    $query->execute();

    if ($query->affected_rows === 0) {
        send_response(['error' => 'User not found or no changes made'], 404);
    }

    send_response(['success' => true]);

} catch (Exception $e) {
    send_response(['error' => 'Database error'], 500);
}