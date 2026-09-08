<?php

defined('BOOTSTRAP') or die('Access denied');

function fn_aromika_info_admin_default_days()
{
    $value = (int) db_get_field(
        'SELECT setting_value FROM ?:aromika_info_settings WHERE setting_key = ?s',
        'dashboard_default_days'
    );
    return in_array($value, array(7, 30, 90), true) ? $value : 30;
}

if ($mode === 'dashboard' || $mode === 'analytics' || $mode === 'romi') {
    $days = isset($_REQUEST['days']) ? (int) $_REQUEST['days'] : fn_aromika_info_admin_default_days();
    $dashboard = fn_aromika_info_admin_get_dashboard($days);

    Tygh::$app['view']->assign('aromika_info_dashboard', $dashboard);
    Tygh::$app['view']->assign('aromika_info_days', $dashboard['days']);
}

if ($mode === 'settings') {
    $settings = db_get_hash_single_array(
        'SELECT setting_key, setting_value FROM ?:aromika_info_settings',
        array('setting_key', 'setting_value')
    );
    Tygh::$app['view']->assign('aromika_info_settings', $settings ?: array());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $mode === 'save_settings') {
    $settings = isset($_REQUEST['settings']) && is_array($_REQUEST['settings']) ? $_REQUEST['settings'] : array();
    $allowed = array(
        'tracking_enabled',
        'romi_tracking_enabled',
        'dashboard_default_days',
        'site_label',
    );

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
}
