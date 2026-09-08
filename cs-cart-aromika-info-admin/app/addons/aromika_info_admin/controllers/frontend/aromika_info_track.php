<?php

defined('BOOTSTRAP') or die('Access denied');

$origin = isset($_SERVER['HTTP_ORIGIN']) ? strtolower(trim($_SERVER['HTTP_ORIGIN'])) : '';
$allowed_origins = array('https://aromika.info', 'https://www.aromika.info');

if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('ok' => false, 'error' => 'method_not_allowed'));
    exit;
}

if ($origin && !in_array($origin, $allowed_origins, true)) {
    http_response_code(403);
    echo json_encode(array('ok' => false, 'error' => 'origin_not_allowed'));
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    $payload = isset($_REQUEST['event']) && is_array($_REQUEST['event']) ? $_REQUEST['event'] : array();
}

if (!$payload || !fn_aromika_info_admin_store_event($payload)) {
    http_response_code(400);
    echo json_encode(array('ok' => false, 'error' => 'invalid_event'));
    exit;
}

echo json_encode(array('ok' => true));
exit;
