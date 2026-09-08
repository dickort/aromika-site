<?php

defined('BOOTSTRAP') or die('Access denied');

/**
 * Returns compact dashboard analytics for aromika.info.
 */
function fn_aromika_info_admin_get_dashboard($days = 30)
{
    $days = max(1, min(365, (int) $days));
    $to = TIME;
    $from = strtotime('-' . ($days - 1) . ' days midnight', $to);
    $period = max(86400, $to - $from + 1);
    $prev_to = $from - 1;
    $prev_from = max(0, $prev_to - $period + 1);

    $current = fn_aromika_info_admin_get_kpis($from, $to);
    $previous = fn_aromika_info_admin_get_kpis($prev_from, $prev_to);

    foreach ($current as $key => $value) {
        $current[$key . '_change'] = fn_aromika_info_admin_percent_change($value, isset($previous[$key]) ? $previous[$key] : 0);
    }

    return array(
        'days' => $days,
        'from' => $from,
        'to' => $to,
        'kpis' => $current,
        'chart' => fn_aromika_info_admin_get_daily_chart($from, $to),
        'sources' => fn_aromika_info_admin_get_sources($from, $to, 7),
        'pages' => fn_aromika_info_admin_get_pages($from, $to, 7),
        'devices' => fn_aromika_info_admin_get_devices($from, $to),
        'romi' => fn_aromika_info_admin_get_romi_stats($from, $to),
    );
}

function fn_aromika_info_admin_get_kpis($from, $to)
{
    $condition = db_quote('created_at BETWEEN ?i AND ?i', (int) $from, (int) $to);

    return array(
        'visitors' => (int) db_get_field('SELECT COUNT(DISTINCT visitor_id) FROM ?:aromika_info_events WHERE ?p AND visitor_id != ?s', $condition, ''),
        'sessions' => (int) db_get_field('SELECT COUNT(DISTINCT session_id) FROM ?:aromika_info_events WHERE ?p AND session_id != ?s', $condition, ''),
        'page_views' => (int) db_get_field('SELECT COUNT(*) FROM ?:aromika_info_events WHERE ?p AND event_type = ?s', $condition, 'page_view'),
        'romi_opens' => (int) db_get_field('SELECT COUNT(*) FROM ?:aromika_info_events WHERE ?p AND event_type = ?s', $condition, 'romi_open'),
        'shop_clicks' => (int) db_get_field('SELECT COUNT(*) FROM ?:aromika_info_events WHERE ?p AND event_type = ?s', $condition, 'shop_click'),
    );
}

function fn_aromika_info_admin_percent_change($current, $previous)
{
    $current = (float) $current;
    $previous = (float) $previous;
    if ($previous <= 0) {
        return $current > 0 ? 100 : 0;
    }

    return round((($current - $previous) / $previous) * 100, 1);
}

function fn_aromika_info_admin_get_daily_chart($from, $to)
{
    $rows = db_get_array(
        'SELECT DATE(FROM_UNIXTIME(created_at)) AS day, '
        . 'SUM(event_type = ?s) AS page_views, COUNT(DISTINCT visitor_id) AS visitors '
        . 'FROM ?:aromika_info_events WHERE created_at BETWEEN ?i AND ?i '
        . 'GROUP BY day ORDER BY day ASC',
        'page_view',
        (int) $from,
        (int) $to
    );

    return $rows ?: array();
}

function fn_aromika_info_admin_get_sources($from, $to, $limit = 7)
{
    return db_get_array(
        'SELECT IF(traffic_source = ?s, ?s, traffic_source) AS source, '
        . 'COUNT(DISTINCT session_id) AS sessions, COUNT(DISTINCT visitor_id) AS visitors '
        . 'FROM ?:aromika_info_events WHERE created_at BETWEEN ?i AND ?i AND event_type = ?s '
        . 'GROUP BY source ORDER BY sessions DESC LIMIT ?i',
        '',
        'Direct',
        (int) $from,
        (int) $to,
        'page_view',
        (int) $limit
    );
}

function fn_aromika_info_admin_get_pages($from, $to, $limit = 7)
{
    return db_get_array(
        'SELECT page_path, MAX(page_title) AS page_title, COUNT(*) AS views, '
        . 'COUNT(DISTINCT visitor_id) AS visitors '
        . 'FROM ?:aromika_info_events WHERE created_at BETWEEN ?i AND ?i AND event_type = ?s '
        . 'GROUP BY page_path ORDER BY views DESC LIMIT ?i',
        (int) $from,
        (int) $to,
        'page_view',
        (int) $limit
    );
}

function fn_aromika_info_admin_get_devices($from, $to)
{
    return db_get_array(
        'SELECT IF(device_type = ?s, ?s, device_type) AS device, COUNT(DISTINCT visitor_id) AS visitors '
        . 'FROM ?:aromika_info_events WHERE created_at BETWEEN ?i AND ?i AND event_type = ?s '
        . 'GROUP BY device ORDER BY visitors DESC',
        '',
        'Unknown',
        (int) $from,
        (int) $to,
        'page_view'
    );
}

function fn_aromika_info_admin_get_romi_stats($from, $to)
{
    $types = array('romi_open', 'romi_message', 'romi_product_view', 'romi_add_to_cart', 'romi_b2b_request');
    $rows = db_get_hash_single_array(
        'SELECT event_type, COUNT(*) AS total FROM ?:aromika_info_events '
        . 'WHERE created_at BETWEEN ?i AND ?i AND event_type IN (?a) GROUP BY event_type',
        array('event_type', 'total'),
        (int) $from,
        (int) $to,
        $types
    );

    $out = array();
    foreach ($types as $type) {
        $out[$type] = isset($rows[$type]) ? (int) $rows[$type] : 0;
    }

    return $out;
}

function fn_aromika_info_admin_clean_string($value, $max = 255)
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    return mb_substr($value, 0, $max, 'UTF-8');
}

function fn_aromika_info_admin_store_event(array $payload)
{
    $allowed_types = array(
        'session_start', 'page_view', 'shop_click', 'phone_click', 'whatsapp_click',
        'romi_open', 'romi_close', 'romi_message', 'romi_quick_action',
        'romi_product_view', 'romi_add_to_cart', 'romi_b2b_request',
        'price_request', 'certificate_request', 'vacancy_view', 'vacancy_click'
    );

    $type = fn_aromika_info_admin_clean_string(isset($payload['event_type']) ? $payload['event_type'] : '', 64);
    if (!in_array($type, $allowed_types, true)) {
        return false;
    }

    $data = array(
        'visitor_id' => fn_aromika_info_admin_clean_string(isset($payload['visitor_id']) ? $payload['visitor_id'] : '', 64),
        'session_id' => fn_aromika_info_admin_clean_string(isset($payload['session_id']) ? $payload['session_id'] : '', 64),
        'event_type' => $type,
        'page_url' => fn_aromika_info_admin_clean_string(isset($payload['page_url']) ? $payload['page_url'] : '', 768),
        'page_path' => fn_aromika_info_admin_clean_string(isset($payload['page_path']) ? $payload['page_path'] : '', 255),
        'page_title' => fn_aromika_info_admin_clean_string(isset($payload['page_title']) ? $payload['page_title'] : '', 255),
        'referrer' => fn_aromika_info_admin_clean_string(isset($payload['referrer']) ? $payload['referrer'] : '', 768),
        'traffic_source' => fn_aromika_info_admin_clean_string(isset($payload['traffic_source']) ? $payload['traffic_source'] : '', 190),
        'utm_source' => fn_aromika_info_admin_clean_string(isset($payload['utm_source']) ? $payload['utm_source'] : '', 190),
        'utm_medium' => fn_aromika_info_admin_clean_string(isset($payload['utm_medium']) ? $payload['utm_medium'] : '', 190),
        'utm_campaign' => fn_aromika_info_admin_clean_string(isset($payload['utm_campaign']) ? $payload['utm_campaign'] : '', 190),
        'utm_content' => fn_aromika_info_admin_clean_string(isset($payload['utm_content']) ? $payload['utm_content'] : '', 190),
        'utm_term' => fn_aromika_info_admin_clean_string(isset($payload['utm_term']) ? $payload['utm_term'] : '', 190),
        'device_type' => fn_aromika_info_admin_clean_string(isset($payload['device_type']) ? $payload['device_type'] : '', 32),
        'browser' => fn_aromika_info_admin_clean_string(isset($payload['browser']) ? $payload['browser'] : '', 64),
        'os' => fn_aromika_info_admin_clean_string(isset($payload['os']) ? $payload['os'] : '', 64),
        'language' => fn_aromika_info_admin_clean_string(isset($payload['language']) ? $payload['language'] : '', 16),
        'screen_width' => max(0, (int) (isset($payload['screen_width']) ? $payload['screen_width'] : 0)),
        'screen_height' => max(0, (int) (isset($payload['screen_height']) ? $payload['screen_height'] : 0)),
        'event_data' => json_encode(isset($payload['event_data']) && is_array($payload['event_data']) ? $payload['event_data'] : array(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'created_at' => TIME,
    );

    db_query('INSERT INTO ?:aromika_info_events ?e', $data);
    return true;
}
