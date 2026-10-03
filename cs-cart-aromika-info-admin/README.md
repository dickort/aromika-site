# AROMIKA.INFO Admin V1

Внутренняя административная панель для `aromika.info`, работающая внутри административной части CS-Cart на `aromika.shop`.

## Что входит в V1

- фирменный Dashboard в стиле `aromika.info`;
- посетители, визиты и просмотры;
- сравнение с предыдущим периодом;
- источники трафика и UTM;
- популярные страницы;
- устройства;
- переходы в `aromika.shop`;
- клики по телефону и WhatsApp;
- базовая аналитика ROMI;
- настройки включения/выключения сбора данных;
- анонимные visitor/session ID без хранения имени, телефона, текста сообщений и точной геолокации.

## Совместимость

Подготовлено для CS-Cart 4.18.1+.

## Установка на CS-Cart

Скопировать содержимое этой директории в корень установки CS-Cart, сохранив структуру:

- `app/addons/aromika_info_admin/...`
- `design/backend/css/addons/aromika_info_admin/...`
- `design/backend/templates/addons/aromika_info_admin/...`

После копирования:

1. В админке CS-Cart открыть **Модули → Управление модулями**.
2. Найти **AROMIKA.INFO Admin**.
3. Установить и включить модуль.
4. Очистить кэш CS-Cart.
5. В левом меню открыть **Веб-сайт → AROMIKA.INFO**.
6. Убедиться, что Dashboard открывается без ошибок.

При установке создаются таблицы:

- `?:aromika_info_events`
- `?:aromika_info_settings`

## Endpoint аналитики

После установки должен отвечать endpoint:

`https://aromika.shop/index.php?dispatch=aromika_info_track.collect`

Он принимает только POST-события от `https://aromika.info` и `https://www.aromika.info` через CORS.

До подключения трекера пустой Dashboard — нормальное состояние.

## Подключение трекера на aromika.info

Только после проверки endpoint добавить в глобальный HEAD/перед `</body>` Tilda содержимое:

`analytics/INSTALL_INFO_ANALYTICS_V1.txt`

Трекер расположен в GitHub:

`analytics/aromika-info-tracker-v1.js`

Он фиксирует:

- `session_start`
- `page_view`
- `shop_click`
- `phone_click`
- `whatsapp_click`
- события ROMI через `romi:*` CustomEvent

UTM-атрибуция сохраняется на весь 30-минутный визит и не теряется при переходах между страницами `aromika.info`.

## ROMI

V1 уже умеет принимать следующие события:

- `romi:open`
- `romi:close`
- `romi:message`
- `romi:quick-action`
- `romi:product-view`
- `romi:add-to-cart`
- `romi:b2b-request`
- `romi:price-request`
- `romi:certificate-request`

Текущий ROMI Connector нужно дополнить отправкой этих событий в местах соответствующих действий. До этого посещения сайта, источники, страницы, устройства и переходы в shop работают независимо от ROMI.

## Что пойдёт в V2

- филиалы и контакты;
- управление настройками ROMI из админки;
- неотвеченные вопросы ROMI;
- UTM-кампании отдельным отчётом;
- события и воронки;
- география до уровня города без точных координат;
- связка `INFO → ROMI → SHOP → корзина → заказ`;
- вакансии;
- SEO.

## Важное

Не подключать `aromika-info-tracker-v1.js` на боевой `aromika.info` до установки серверного модуля: иначе события будут отправляться в несуществующий endpoint.
