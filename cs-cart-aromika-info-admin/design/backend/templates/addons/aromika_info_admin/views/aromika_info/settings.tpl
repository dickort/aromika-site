{capture name="mainbox"}
<div class="ai-admin">
    <div class="ai-admin__hero">
        <div>
            <div class="ai-admin__eyebrow">AROMIKA · INTERNAL</div>
            <h1 class="ai-admin__title">Настройки INFO</h1>
            <p class="ai-admin__subtitle">Базовые параметры аналитики и интеграции ROMI.</p>
        </div>
    </div>

    <nav class="ai-admin__nav">
        <a href="{"aromika_info.dashboard"|fn_url}">Обзор</a>
        <a href="{"aromika_info.analytics"|fn_url}">Аналитика</a>
        <a href="{"aromika_info.romi"|fn_url}">ROMI</a>
        <a class="is-active" href="{"aromika_info.settings"|fn_url}">Настройки</a>
    </nav>

    <form action="{''|fn_url}" method="post" name="aromika_info_settings_form" class="cm-form">
        <input type="hidden" name="dispatch" value="aromika_info.save_settings" />
        <div class="ai-card ai-setting">
            <div class="ai-card__head">
                <div><h2 class="ai-card__title">Сбор данных</h2><div class="ai-card__meta">V1 хранит только анонимные идентификаторы и технические события.</div></div>
            </div>

            <div class="ai-setting__row">
                <div><label for="tracking_enabled">Аналитика aromika.info</label><p>Посещения, источники, UTM, страницы, устройства и переходы в shop.</p></div>
                <div>
                    <select id="tracking_enabled" name="settings[tracking_enabled]">
                        <option value="Y" {if $aromika_info_settings.tracking_enabled != 'N'}selected{/if}>Включена</option>
                        <option value="N" {if $aromika_info_settings.tracking_enabled == 'N'}selected{/if}>Выключена</option>
                    </select>
                </div>
            </div>

            <div class="ai-setting__row">
                <div><label for="romi_tracking_enabled">Аналитика ROMI</label><p>Открытия, действия, товары, корзина и B2B-события. Текст сообщений V1 не сохраняет.</p></div>
                <div>
                    <select id="romi_tracking_enabled" name="settings[romi_tracking_enabled]">
                        <option value="Y" {if $aromika_info_settings.romi_tracking_enabled != 'N'}selected{/if}>Включена</option>
                        <option value="N" {if $aromika_info_settings.romi_tracking_enabled == 'N'}selected{/if}>Выключена</option>
                    </select>
                </div>
            </div>

            <div class="ai-setting__row">
                <div><label for="dashboard_default_days">Период дашборда</label><p>Период по умолчанию для стартового экрана.</p></div>
                <div>
                    <select id="dashboard_default_days" name="settings[dashboard_default_days]">
                        <option value="7" {if $aromika_info_settings.dashboard_default_days == '7'}selected{/if}>7 дней</option>
                        <option value="30" {if !$aromika_info_settings.dashboard_default_days || $aromika_info_settings.dashboard_default_days == '30'}selected{/if}>30 дней</option>
                        <option value="90" {if $aromika_info_settings.dashboard_default_days == '90'}selected{/if}>90 дней</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="buttons-container">
            {include file="buttons/save.tpl" but_name="dispatch[aromika_info.save_settings]" but_role="submit-link" but_target_form="aromika_info_settings_form"}
        </div>
    </form>
</div>
{/capture}

{include file="common/mainbox.tpl" title="AROMIKA.INFO · Настройки" content=$smarty.capture.mainbox}
