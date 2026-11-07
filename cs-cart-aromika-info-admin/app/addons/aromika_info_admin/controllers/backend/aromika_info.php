<?php

defined('BOOTSTRAP') or die('Access denied');

$diag = array(
    'controller' => 'OK',
    'php' => PHP_VERSION,
    'func' => 'NOT CHECKED',
    'schema' => 'NOT CHECKED',
    'query' => 'NOT CHECKED',
    'dashboard' => 'NOT CHECKED',
    'error' => '',
);

try {
    if (!function_exists('fn_aromika_info_admin_get_dashboard')) {
        $func_file = DIR_ROOT . '/app/addons/aromika_info_admin/func.php';
        if (is_file($func_file)) {
            require_once $func_file;
        }
    }
    $diag['func'] = function_exists('fn_aromika_info_admin_get_dashboard') ? 'OK' : 'MISSING';
} catch (\Throwable $e) {
    $diag['func'] = 'ERROR';
    $diag['error'] = 'func.php: ' . $e->getMessage();
}

$dashboard = array();

if ($diag['func'] === 'OK') {
    try {
        fn_aromika_info_admin_ensure_schema();
        $diag['schema'] = 'OK';
    } catch (\Throwable $e) {
        $diag['schema'] = 'ERROR';
        $diag['error'] = 'schema: ' . $e->getMessage();
    }

    if ($diag['schema'] === 'OK') {
        try {
            $events_count = (int) db_get_field('SELECT COUNT(*) FROM ?:aromika_info_events');
            $diag['query'] = 'OK (' . $events_count . ' events)';
        } catch (\Throwable $e) {
            $diag['query'] = 'ERROR';
            $diag['error'] = 'query: ' . $e->getMessage();
        }
    }

    if ($diag['query'] !== 'ERROR') {
        try {
            $days = isset($_REQUEST['days']) ? (int) $_REQUEST['days'] : 30;
            $dashboard = fn_aromika_info_admin_get_dashboard($days);
            $diag['dashboard'] = 'OK';
        } catch (\Throwable $e) {
            $diag['dashboard'] = 'ERROR';
            $diag['error'] = 'dashboard: ' . $e->getMessage();
        }
    }
}

Tygh::$app['view']->assign('aromika_info_diag', $diag);
Tygh::$app['view']->assign('aromika_info_dashboard', $dashboard);
Tygh::$app['view']->assign('aromika_info_days', !empty($dashboard['days']) ? $dashboard['days'] : 30);

if ($mode === 'settings' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    $settings = array();
    if ($diag['schema'] === 'OK') {
        try {
            $settings = db_get_hash_single_array(
                'SELECT setting_key, setting_value FROM ?:aromika_info_settings',
                array('setting_key', 'setting_value')
            );
        } catch (\Throwable $e) {
            $diag['error'] = 'settings: ' . $e->getMessage();
        }
    }
    Tygh::$app['view']->assign('aromika_info_settings', $settings ?: array());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $mode === 'save_settings') {
    try {
        fn_aromika_info_admin_ensure_schema();
        $settings = isset($_REQUEST['settings']) && is_array($_REQUEST['settings']) ? $_REQUEST['settings'] : array();
        $allowed = array('tracking_enabled', 'romi_tracking_enabled', 'dashboard_default_days', 'site_label');

        foreach ($allowed as $key) {
            if (!array_key_exists($key, $settings)) {
                continue;
            }
            $value = is_scalar($settings[$key]) ? (string) $settings[$key] : '';
            db_query('REPLACE INTO ?:aromika_info_settings ?e', array(
                'setting_key' => $key,
                'setting_value' => $value,
                'updated_at' => TIME,
            ));
        }

        fn_set_notification('N', __('notice'), __('text_changes_saved'));
        return array(CONTROLLER_STATUS_REDIRECT, 'aromika_info.settings');
    } catch (\Throwable $e) {
        fn_set_notification('E', __('error'), 'AROMIKA.INFO: ' . $e->getMessage());
        return array(CONTROLLER_STATUS_REDIRECT, 'aromika_info.settings');
    }
}
