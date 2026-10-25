{capture name="mainbox"}
<div style="max-width:1180px;margin:0 auto;padding:24px 8px;font-family:Arial,sans-serif;">
    <div style="background:#fff7f8;border-radius:24px;padding:28px 30px;margin-bottom:20px;border:1px solid #f4dfe3;">
        <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a26d79;margin-bottom:8px;">AROMIKA · INTERNAL</div>
        <div style="display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap;">
            <div>
                <h1 style="margin:0 0 8px;font-size:34px;line-height:1.1;color:#252226;">AROMIKA.INFO</h1>
                <div style="font-size:15px;color:#756e73;">Диагностика административного модуля · v1.0.2</div>
            </div>
            <div style="background:#252226;color:#fff;padding:10px 14px;border-radius:999px;font-size:13px;">Diagnostic mode</div>
        </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px;">
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">CONTROLLER</div><strong style="font-size:20px;">{$aromika_info_diag.controller}</strong></div>
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">FUNC.PHP</div><strong style="font-size:20px;">{$aromika_info_diag.func}</strong></div>
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">DATABASE SCHEMA</div><strong style="font-size:20px;">{$aromika_info_diag.schema}</strong></div>
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">DATABASE QUERY</div><strong style="font-size:20px;">{$aromika_info_diag.query}</strong></div>
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">DASHBOARD DATA</div><strong style="font-size:20px;">{$aromika_info_diag.dashboard}</strong></div>
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:18px;padding:18px;"><div style="font-size:12px;color:#8b8388;margin-bottom:6px;">PHP</div><strong style="font-size:20px;">{$aromika_info_diag.php}</strong></div>
    </div>

    {if $aromika_info_diag.error}
        <div style="background:#fff0f1;border:1px solid #f1b7bf;color:#8f2432;border-radius:18px;padding:18px 20px;margin-bottom:20px;word-break:break-word;">
            <strong>Ошибка:</strong> {$aromika_info_diag.error}
        </div>
    {/if}

    {if $aromika_info_diag.dashboard == 'OK'}
        <div style="background:#fff;border:1px solid #e8e3e6;border-radius:22px;padding:24px;">
            <h2 style="margin:0 0 18px;font-size:22px;color:#252226;">Базовые показатели</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">
                <div style="background:#faf8f9;border-radius:16px;padding:16px;"><div style="font-size:12px;color:#8b8388;">Посетители</div><strong style="font-size:28px;">{$aromika_info_dashboard.kpis.visitors}</strong></div>
                <div style="background:#faf8f9;border-radius:16px;padding:16px;"><div style="font-size:12px;color:#8b8388;">Визиты</div><strong style="font-size:28px;">{$aromika_info_dashboard.kpis.sessions}</strong></div>
                <div style="background:#faf8f9;border-radius:16px;padding:16px;"><div style="font-size:12px;color:#8b8388;">Просмотры</div><strong style="font-size:28px;">{$aromika_info_dashboard.kpis.page_views}</strong></div>
                <div style="background:#faf8f9;border-radius:16px;padding:16px;"><div style="font-size:12px;color:#8b8388;">ROMI</div><strong style="font-size:28px;">{$aromika_info_dashboard.kpis.romi_opens}</strong></div>
                <div style="background:#faf8f9;border-radius:16px;padding:16px;"><div style="font-size:12px;color:#8b8388;">SHOP</div><strong style="font-size:28px;">{$aromika_info_dashboard.kpis.shop_clicks}</strong></div>
            </div>
        </div>
    {/if}
</div>
{/capture}

{include file="common/mainbox.tpl" title="AROMIKA.INFO" content=$smarty.capture.mainbox}
