{capture name="mainbox"}
<div class="ai-admin" id="aromikaInfoAdmin">
    <div class="ai-admin__hero">
        <div>
            <div class="ai-admin__eyebrow">AROMIKA · INTERNAL</div>
            <h1 class="ai-admin__title">AROMIKA.INFO</h1>
            <p class="ai-admin__subtitle">Посещения, источники трафика, ROMI и переходы в интернет-магазин.</p>
        </div>
        <div class="ai-admin__status"><span class="ai-admin__status-dot"></span> Analytics V1 · active</div>
    </div>

    <nav class="ai-admin__nav">
        <a class="{if $runtime.mode == 'dashboard'}is-active{/if}" href="{"aromika_info.dashboard"|fn_url}">Обзор</a>
        <a class="{if $runtime.mode == 'analytics'}is-active{/if}" href="{"aromika_info.analytics"|fn_url}">Аналитика</a>
        <a class="{if $runtime.mode == 'romi'}is-active{/if}" href="{"aromika_info.romi"|fn_url}">ROMI</a>
        <a class="{if $runtime.mode == 'settings'}is-active{/if}" href="{"aromika_info.settings"|fn_url}">Настройки</a>
    </nav>

    <div class="ai-admin__toolbar">
        <div class="ai-admin__periods">
            <a class="{if $aromika_info_days == 7}is-active{/if}" href="{"aromika_info.`$runtime.mode`?days=7"|fn_url}">7 дней</a>
            <a class="{if $aromika_info_days == 30}is-active{/if}" href="{"aromika_info.`$runtime.mode`?days=30"|fn_url}">30 дней</a>
            <a class="{if $aromika_info_days == 90}is-active{/if}" href="{"aromika_info.`$runtime.mode`?days=90"|fn_url}">90 дней</a>
        </div>
        <div class="ai-admin__updated">Обновлено: {$smarty.now|date_format:"%d.%m.%Y %H:%M"}</div>
    </div>

    {$k=$aromika_info_dashboard.kpis}
    <section class="ai-kpis">
        <article class="ai-kpi">
            <div class="ai-kpi__label">Посетители</div>
            <strong class="ai-kpi__value">{$k.visitors}</strong>
            <span class="ai-kpi__delta {if $k.visitors_change >= 0}is-up{else}is-down{/if}">{if $k.visitors_change >= 0}↑ {$k.visitors_change}{else}↓ {$k.visitors_change|replace:'-':''}{/if}%</span>
            <div class="ai-card__meta">к предыдущему периоду</div>
        </article>
        <article class="ai-kpi">
            <div class="ai-kpi__label">Визиты</div>
            <strong class="ai-kpi__value">{$k.sessions}</strong>
            <span class="ai-kpi__delta {if $k.sessions_change >= 0}is-up{else}is-down{/if}">{if $k.sessions_change >= 0}↑ {$k.sessions_change}{else}↓ {$k.sessions_change|replace:'-':''}{/if}%</span>
            <div class="ai-card__meta">к предыдущему периоду</div>
        </article>
        <article class="ai-kpi">
            <div class="ai-kpi__label">Просмотры</div>
            <strong class="ai-kpi__value">{$k.page_views}</strong>
            <span class="ai-kpi__delta {if $k.page_views_change >= 0}is-up{else}is-down{/if}">{if $k.page_views_change >= 0}↑ {$k.page_views_change}{else}↓ {$k.page_views_change|replace:'-':''}{/if}%</span>
            <div class="ai-card__meta">к предыдущему периоду</div>
        </article>
        <article class="ai-kpi">
            <div class="ai-kpi__label">ROMI</div>
            <strong class="ai-kpi__value">{$k.romi_opens}</strong>
            <span class="ai-kpi__delta {if $k.romi_opens_change >= 0}is-up{else}is-down{/if}">{if $k.romi_opens_change >= 0}↑ {$k.romi_opens_change}{else}↓ {$k.romi_opens_change|replace:'-':''}{/if}%</span>
            <div class="ai-card__meta">открытия помощника</div>
        </article>
        <article class="ai-kpi">
            <div class="ai-kpi__label">Переходы SHOP</div>
            <strong class="ai-kpi__value">{$k.shop_clicks}</strong>
            <span class="ai-kpi__delta {if $k.shop_clicks_change >= 0}is-up{else}is-down{/if}">{if $k.shop_clicks_change >= 0}↑ {$k.shop_clicks_change}{else}↓ {$k.shop_clicks_change|replace:'-':''}{/if}%</span>
            <div class="ai-card__meta">переходы в магазин</div>
        </article>
    </section>

    <section class="ai-grid-main">
        <article class="ai-card">
            <div class="ai-card__head">
                <div>
                    <h2 class="ai-card__title">Посещения</h2>
                    <div class="ai-card__meta">Динамика уникальных посетителей за {$aromika_info_days} дней</div>
                </div>
                <span class="ai-badge">Live data</span>
            </div>
            <div class="ai-chart" id="aiTrafficChart"><div class="ai-chart__empty">Данные появятся после подключения трекера на aromika.info</div></div>
        </article>

        <article class="ai-card ai-romi">
            <div class="ai-card__head">
                <div><h2 class="ai-card__title">ROMI</h2><div class="ai-card__meta">Действия помощника за выбранный период</div></div>
            </div>
            <div class="ai-romi__stats">
                <div class="ai-romi__stat"><span>Открытия</span><strong>{$aromika_info_dashboard.romi.romi_open|default:0}</strong></div>
                <div class="ai-romi__stat"><span>Сообщения</span><strong>{$aromika_info_dashboard.romi.romi_message|default:0}</strong></div>
                <div class="ai-romi__stat"><span>Товары</span><strong>{$aromika_info_dashboard.romi.romi_product_view|default:0}</strong></div>
                <div class="ai-romi__stat"><span>В корзину</span><strong>{$aromika_info_dashboard.romi.romi_add_to_cart|default:0}</strong></div>
                <div class="ai-romi__stat"><span>B2B</span><strong>{$aromika_info_dashboard.romi.romi_b2b_request|default:0}</strong></div>
            </div>
        </article>
    </section>

    <section class="ai-grid-2">
        <article class="ai-card">
            <div class="ai-card__head"><div><h2 class="ai-card__title">Источники трафика</h2><div class="ai-card__meta">UTM имеет приоритет над referrer</div></div></div>
            <ul class="ai-list">
                {foreach $aromika_info_dashboard.sources as $row}
                    <li class="ai-list__row">
                        <div><div class="ai-list__name">{$row.source|default:'Direct'}</div><div class="ai-list__sub">{$row.visitors} посетителей</div></div>
                        <div class="ai-list__value">{$row.sessions} визитов</div>
                    </li>
                {foreachelse}
                    <li class="ai-card__meta">Пока нет данных.</li>
                {/foreach}
            </ul>
        </article>

        <article class="ai-card">
            <div class="ai-card__head"><div><h2 class="ai-card__title">Популярные страницы</h2><div class="ai-card__meta">Что смотрят посетители aromika.info</div></div></div>
            <ul class="ai-list">
                {foreach $aromika_info_dashboard.pages as $row}
                    <li class="ai-list__row">
                        <div><div class="ai-list__name">{if $row.page_title}{$row.page_title}{else}{$row.page_path}{/if}</div><div class="ai-list__sub">{$row.page_path}</div></div>
                        <div class="ai-list__value">{$row.views}</div>
                    </li>
                {foreachelse}
                    <li class="ai-card__meta">Пока нет данных.</li>
                {/foreach}
            </ul>
        </article>
    </section>

    <section class="ai-card">
        <div class="ai-card__head"><div><h2 class="ai-card__title">Устройства</h2><div class="ai-card__meta">Контроль доли мобильного трафика для приоритета адаптации ROMI</div></div></div>
        <div class="ai-device-row">
            {foreach $aromika_info_dashboard.devices as $row}
                <div class="ai-device">{$row.device}<strong>{$row.visitors}</strong></div>
            {foreachelse}
                <span class="ai-card__meta">Пока нет данных.</span>
            {/foreach}
        </div>
    </section>
</div>

<script>
(function(){
    var rows = [
        {foreach $aromika_info_dashboard.chart as $row}
        { day: '{$row.day|escape:"javascript"}', visitors: {$row.visitors}, views: {$row.page_views} }{if !$row@last},{/if}
        {/foreach}
    ];
    var host = document.getElementById('aiTrafficChart');
    if (!host || !rows.length) return;
    var W=1000,H=280,P=24;
    var max=Math.max.apply(null,rows.map(function(r){return Math.max(1,Number(r.visitors)||0)}));
    var pts=rows.map(function(r,i){
        var x=P+(rows.length===1 ? (W-2*P)/2 : i*(W-2*P)/(rows.length-1));
        var y=H-P-((Number(r.visitors)||0)/max)*(H-2*P);
        return [x,y];
    });
    var line=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ');
    var area=P+','+(H-P)+' '+line+' '+(W-P)+','+(H-P);
    var grid='';
    for(var g=1;g<5;g++){var gy=P+g*(H-2*P)/5;grid+='<line class="ai-chart__grid" x1="'+P+'" y1="'+gy+'" x2="'+(W-P)+'" y2="'+gy+'" />';}
    var dots=pts.map(function(p){return '<circle class="ai-chart__dot" cx="'+p[0]+'" cy="'+p[1]+'" r="4" />'}).join('');
    host.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+grid+'<polygon class="ai-chart__area" points="'+area+'"></polygon><polyline class="ai-chart__line" points="'+line+'"></polyline>'+dots+'</svg>';
})();
</script>
{/capture}

{include file="common/mainbox.tpl" title="AROMIKA.INFO" content=$smarty.capture.mainbox}
