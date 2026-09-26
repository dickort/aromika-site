/* AROMIKA.INFO Analytics Tracker V1
 * Anonymous first-party analytics for the internal AROMIKA.INFO dashboard.
 * No names, phone numbers, message text, precise location, or raw IP are collected by this script.
 */
(function () {
    'use strict';

    var host = String(location.hostname || '').toLowerCase();
    if (host !== 'aromika.info' && host !== 'www.aromika.info') return;
    if (window.__AROMIKA_INFO_ANALYTICS_V1__) return;
    window.__AROMIKA_INFO_ANALYTICS_V1__ = true;

    var ENDPOINT = 'https://aromika.shop/index.php?dispatch=aromika_info_track.collect';
    var VISITOR_KEY = 'aromika_analytics_visitor_v1';
    var SESSION_KEY = 'aromika_analytics_session_v1';
    var SESSION_TS_KEY = 'aromika_analytics_session_ts_v1';
    var ATTR_KEY = 'aromika_analytics_attribution_v1';
    var SESSION_TTL = 30 * 60 * 1000;

    function id(prefix) {
        var bytes = new Uint8Array(12);
        try { crypto.getRandomValues(bytes); }
        catch (e) { for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256); }
        return prefix + Array.prototype.map.call(bytes, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }

    function safeGet(storage, key) { try { return storage.getItem(key) || ''; } catch (e) { return ''; } }
    function safeSet(storage, key, value) { try { storage.setItem(key, value); } catch (e) {} }
    function safeRemove(storage, key) { try { storage.removeItem(key); } catch (e) {} }

    var visitorId = safeGet(localStorage, VISITOR_KEY);
    if (!visitorId) {
        visitorId = id('v_');
        safeSet(localStorage, VISITOR_KEY, visitorId);
    }

    var now = Date.now();
    var lastSessionTs = parseInt(safeGet(localStorage, SESSION_TS_KEY), 10) || 0;
    var sessionId = safeGet(localStorage, SESSION_KEY);
    var isNewSession = !sessionId || (now - lastSessionTs > SESSION_TTL);
    if (isNewSession) {
        sessionId = id('s_');
        safeSet(localStorage, SESSION_KEY, sessionId);
        safeRemove(sessionStorage, ATTR_KEY);
    }
    safeSet(localStorage, SESSION_TS_KEY, String(now));

    function referrerHost() {
        if (!document.referrer) return '';
        try { return new URL(document.referrer).hostname.replace(/^www\./, ''); }
        catch (e) { return ''; }
    }

    function freshAttribution() {
        var params = new URLSearchParams(location.search || '');
        var ref = referrerHost();
        var utmSource = params.get('utm_source') || '';
        var trafficSource = utmSource || ((!ref || ref === 'aromika.info') ? 'Direct' : ref);
        return {
            traffic_source: trafficSource,
            utm_source: utmSource,
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || ''
        };
    }

    var attribution = null;
    var explicitParams = new URLSearchParams(location.search || '');
    var hasExplicitCampaign = !!explicitParams.get('utm_source');
    if (!isNewSession && !hasExplicitCampaign) {
        try { attribution = JSON.parse(safeGet(sessionStorage, ATTR_KEY) || 'null'); } catch (e) { attribution = null; }
    }
    if (!attribution || hasExplicitCampaign) {
        attribution = freshAttribution();
        safeSet(sessionStorage, ATTR_KEY, JSON.stringify(attribution));
    }

    function source() { return attribution.traffic_source || 'Direct'; }

    function device() {
        var ua = navigator.userAgent || '';
        if (/ipad|tablet|kindle|silk/i.test(ua)) return 'Tablet';
        if (/mobi|android|iphone|ipod/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    function browser() {
        var ua = navigator.userAgent || '';
        if (/Edg\//.test(ua)) return 'Edge';
        if (/OPR\//.test(ua)) return 'Opera';
        if (/Firefox\//.test(ua)) return 'Firefox';
        if (/Chrome\//.test(ua)) return 'Chrome';
        if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
        return 'Other';
    }

    function os() {
        var ua = navigator.userAgent || '';
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
        if (/Mac OS X/i.test(ua)) return 'macOS';
        if (/Linux/i.test(ua)) return 'Linux';
        return 'Other';
    }

    function cleanData(data) {
        data = data || {};
        var allowed = ['action', 'product_id', 'brand', 'intent', 'destination', 'source', 'label'];
        var out = {};
        allowed.forEach(function (key) {
            if (data[key] === undefined || data[key] === null) return;
            var value = String(data[key]);
            out[key] = value.slice(0, 160);
        });
        return out;
    }

    function payload(type, data) {
        return {
            visitor_id: visitorId,
            session_id: sessionId,
            event_type: String(type || '').slice(0, 64),
            page_url: location.href.slice(0, 768),
            page_path: (location.pathname + location.search).slice(0, 255),
            page_title: String(document.title || '').slice(0, 255),
            referrer: String(document.referrer || '').slice(0, 768),
            traffic_source: source().slice(0, 190),
            utm_source: String(attribution.utm_source || '').slice(0, 190),
            utm_medium: String(attribution.utm_medium || '').slice(0, 190),
            utm_campaign: String(attribution.utm_campaign || '').slice(0, 190),
            utm_content: String(attribution.utm_content || '').slice(0, 190),
            utm_term: String(attribution.utm_term || '').slice(0, 190),
            device_type: device(),
            browser: browser(),
            os: os(),
            language: String(navigator.language || '').slice(0, 16),
            screen_width: Math.max(0, Number(screen.width) || 0),
            screen_height: Math.max(0, Number(screen.height) || 0),
            event_data: cleanData(data)
        };
    }

    function track(type, data) {
        safeSet(localStorage, SESSION_TS_KEY, String(Date.now()));
        var body = JSON.stringify(payload(type, data));
        try {
            fetch(ENDPOINT, {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                cache: 'no-store',
                keepalive: true,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body: body
            }).catch(function () {});
        } catch (e) {}
    }

    function trackLink(anchor) {
        if (!anchor || !anchor.href) return;
        var href = String(anchor.href);
        var label = String(anchor.textContent || anchor.getAttribute('aria-label') || '').trim().slice(0, 120);
        if (/^tel:/i.test(href)) track('phone_click', { label: label });
        else if (/wa\.me|whatsapp\.com|api\.whatsapp/i.test(href)) track('whatsapp_click', { label: label });
        else {
            try {
                var url = new URL(href, location.href);
                if (url.hostname === 'aromika.shop' || url.hostname === 'www.aromika.shop') {
                    track('shop_click', { destination: url.pathname, label: label });
                }
            } catch (e) {}
        }
    }

    document.addEventListener('click', function (event) {
        var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
        if (anchor) trackLink(anchor);
    }, true);

    var romiEvents = {
        'romi:open': 'romi_open',
        'romi:close': 'romi_close',
        'romi:message': 'romi_message',
        'romi:quick-action': 'romi_quick_action',
        'romi:product-view': 'romi_product_view',
        'romi:add-to-cart': 'romi_add_to_cart',
        'romi:b2b-request': 'romi_b2b_request',
        'romi:price-request': 'price_request',
        'romi:certificate-request': 'certificate_request'
    };
    Object.keys(romiEvents).forEach(function (eventName) {
        window.addEventListener(eventName, function (event) {
            track(romiEvents[eventName], event && event.detail ? event.detail : {});
        });
    });

    window.AROMIKA_ANALYTICS = Object.freeze({
        track: track,
        version: '1.0.1'
    });

    if (isNewSession) track('session_start');
    track('page_view');
})();
