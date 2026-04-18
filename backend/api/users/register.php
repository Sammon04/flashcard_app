<?php

include "../config/init.php";

$data = get_json();

$id = $data['id'] ?? null;
$password = $data['password'] ?? null;
$fname = $data['fname'] ?? null;
$lname = $data['lname'] ?? null;
$image = $data['image'] ?? null;
$role = $data['role'] ?? null;
$district = $data['district'] ?? null;
$locale = $data['locale'] ?? null;
$wildcard = $data['wildcard'] ?? null;

if (empty($id) || empty($password) || empty($fname) || empty($lname)) {
    send_response(['error' => 'Missing user data'], 400);
}

$password = password_hash($password, PASSWORD_DEFAULT);

try {

    $db->begin_transaction();

    $sql1 = "INSERT INTO user (user_id, password) 
    VALUES (?, ?)";

    $sql2 = "INSERT INTO user_info 
    (info_user_id, fname, lname, image, role, district, locale, wildcard) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $query1 = $db->prepare($sql1);
    $query1->bind_param("is", $id, $password);
    $query2 = $db->prepare($sql2);
    $query2->bind_param("isssssss", $id, $fname, $lname, $image, $role, $district, $locale, $wildcard);

    $query1->execute();
    $query2->execute();

    $db->commit();

    send_response(['success' => true]);
} catch (Exception $e) {
    $db->rollback();

    if ($e->getCode() == 1062) {
        send_response(['error' => 'User already exists'], 409);
    }

    send_response(['error' => 'Database error'], 500);
}
