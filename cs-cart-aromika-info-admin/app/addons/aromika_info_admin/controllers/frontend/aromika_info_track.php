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
    http_response_code(405);
    echo json_encode(array('ok' => false, 'error' => 'method_not_allowed'));
    exit;
}

if ($origin && !in_array($origin, $allowed_origins, true)) {
    http_response_code(403);
    echo json_encode(array('ok' => false, 'error' => 'origin_not_allowed'));
    exit;
}

$raw = file_get_contents('php://input');
if (strlen($raw) > 16384) {
    http_response_code(413);
    echo json_encode(array('ok' => false, 'error' => 'payload_too_large'));
    exit;
}

$payload = json_decode($raw, true);
if (!is_array($payload)) {
    $payload = isset($_REQUEST['event']) && is_array($_REQUEST['event']) ? $_REQUEST['event'] : array();
}

if (!$payload) {
    http_response_code(400);
    echo json_encode(array('ok' => false, 'error' => 'invalid_event'));
    exit;
}

$settings = db_get_hash_single_array(
    'SELECT setting_key, setting_value FROM ?:aromika_info_settings WHERE setting_key IN (?a)',
    array('setting_key', 'setting_value'),
    array('tracking_enabled', 'romi_tracking_enabled')
);

if (isset($settings['tracking_enabled']) && $settings['tracking_enabled'] === 'N') {
    echo json_encode(array('ok' => true, 'disabled' => true));
    exit;
}

$event_type = isset($payload['event_type']) ? (string) $payload['event_type'] : '';
$is_romi = strpos($event_type, 'romi_') === 0 || in_array($event_type, array('price_request', 'certificate_request'), true);
if ($is_romi && isset($settings['romi_tracking_enabled']) && $settings['romi_tracking_enabled'] === 'N') {
    echo json_encode(array('ok' => true, 'disabled' => true));
    exit;
}

if (!fn_aromika_info_admin_store_event($payload)) {
    http_response_code(400);
    echo json_encode(array('ok' => false, 'error' => 'invalid_event'));
    exit;
}

echo json_encode(array('ok' => true));
exit;
