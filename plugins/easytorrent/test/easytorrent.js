(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 1: ИНИЦИАЛИЗАЦИЯ И КОНФИГУРАЦИЯ
    // ═══════════════════════════════════════════════════════════════════

    const PLUGIN_NAME = 'EasyTorrent';
    const VERSION = '1.1.0 Beta';
    const PLUGIN_ICON = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>';

    // Supabase config
    const SUPABASE_URL = 'https://wozuelafumpzgvllcjne.supabase.co';
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvenVlbGFmdW1wemd2bGxjam5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5Mjg1MDgsImV4cCI6MjA4MjUwNDUwOH0.ODnHlq_P-1wr_D6Jwaba1mLXIVuGBnnUZsrHI8Twdug';
    const WIZARD_URL = 'https://darkestclouds.github.io/plugins/easytorrent/test/';

    let pollingInterval = null;

    // Конфигурация по умолчанию (используется, если не задана пользовательская)
    // Требование v1.1.0 Beta:
    // - FHD (1080p)
    // - Без HDR (считаем SDR)
    // - Без 5.1/7.1/Atmos (стерео)
    // - Приоритеты параметров: как в визарде
    // - Озвучки: как в визарде, но без украинского
    const DEFAULT_CONFIG = {
        "version": "2.1",
        "generated": "2025-12-27T13:43:12.099Z",
        "device": {
            "type": "tv_fhd",
            "supported_hdr": [],
            "supported_audio": ["stereo"]
        },
        "network": {
            "speed": "very_fast",
            "stability": "stable"
        },
        "parameter_priority": ["audio_track", "resolution", "availability", "bitrate", "hdr", "audio_quality"],
        "audio_track_priority": [2, 5, 6, 3, 4, 0, 11, 12, 13, 14, 15, 16, 17, 18, 31, 32, 45],
        "preferences": {
            "min_seeds": 3,
            "recommendation_count": 3,
            "languages": ["rus"]
        },
        "scoring_rules": {
            "schema": "2.1",
            "base_score": 100,
            "weights": { "audio_track": 100, "resolution": 85, "availability": 70, "bitrate": 55, "hdr": 40, "audio_quality": 25 },
            "resolution": { "2160": 34, "1440": 42.5, "1080": 85, "720": 8.5, "480": -34 },
            "hdr": { "dolby_vision": -8, "hdr10plus": -6, "hdr10": -6, "sdr": 0 },
            "bitrate_bonus": {
                "thresholds": [
                    { "min": 0, "max": 5, "bonus": 2.75 },
                    { "min": 5, "max": 15, "bonus": 11 },
                    { "min": 15, "max": 30, "bonus": 8.25 },
                    { "min": 30, "max": 999, "bonus": 0 }
                ],
                "missing_penalty": -8.25
            },
            "availability": {
                "min_seeds": 3,
                "below_min_penalty": -14,
                "log10_multiplier": 8.4
            },
            "audio_track": {
                "curve": "linear",
                "max_points": 100
            },
            "audio_quality": {
                // По умолчанию считаем: устройство без 5.1/7.1/Atmos — очков не даём
                "points": { "dolby_atmos": 0, "surround_71": 0, "surround_51": 0, "stereo": 0, "unknown": 0 }
            },
            "special_rules": []
        }
    };

    let USER_CONFIG = DEFAULT_CONFIG;
    const STORAGE_MODAL_UPDATE_V110 = 'easytorrent_modal_update_v110_shown';
    const STORAGE_MODAL_WELCOME = 'easytorrent_modal_welcome_shown';
    const STORAGE_CONFIG_KEY = 'easytorrent_config_json';
    let shouldShowUpdateModalV110 = false;
    let shouldShowWelcomeModal = false;
    let startupModalScheduler = null;
    const EXT_META_NAME = 'EasyTorrent';
    const EXT_META_AUTHOR = '@darkestclouds';
    const EXT_META_URL_HINTS = ['easytorrent'];

    // Переводы
    const translations = {
        easytorrent_title: { ru: 'Рекомендации торрентов', en: 'Torrent Recommendations' },
        easytorrent_desc: { ru: 'Показывать рекомендуемые торренты на основе качества, HDR и озвучки', en: 'Show recommended torrents based on quality, HDR and audio' },
        recommended_section_title: { ru: 'Рекомендуемые', en: 'Recommended' },
        show_scores: { ru: 'Показывать оценки', en: 'Show scores' },
        show_scores_desc: { ru: 'Отображать оценку качества торрента', en: 'Display torrent quality score' },
        ideal_badge: { ru: 'Идеальный', en: 'Ideal' },
        recommended_badge: { ru: 'Рекомендуется', en: 'Recommended' },
        config_json: { ru: 'Конфигурация (JSON)', en: 'Configuration (JSON)' },
        config_json_desc: { ru: 'Нажмите для просмотра или изменения настроек', en: 'Click to view or change settings' },
        config_view: { ru: 'Просмотреть параметры', en: 'View parameters' },
        config_edit: { ru: 'Вставить JSON', en: 'Paste JSON' },
        config_reset: { ru: 'Сбросить к заводским', en: 'Reset to defaults' },
        config_error: { ru: 'Ошибка: Неверный формат JSON', en: 'Error: Invalid JSON format' }
    };

    function t(key) {
        const lang = Lampa.Storage.get('language', 'ru');
        return translations[key] && translations[key][lang] || translations[key].ru || key;
    }

    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function applyDefaultConfigAndPersist() {
        USER_CONFIG = deepClone(DEFAULT_CONFIG);
        try {
            Lampa.Storage.set(STORAGE_CONFIG_KEY, JSON.stringify(USER_CONFIG));
        } catch (e) {}
    }

    function isExtensionsScreen() {
        try {
            if (document && document.querySelector && document.querySelector('.extensions')) return true;
        } catch (e) {}

        try {
            const enabled = (Lampa.Controller && typeof Lampa.Controller.enabled === 'function') ? Lampa.Controller.enabled() : null;
            if (enabled && enabled.name === 'extensions') return true;
        } catch (e) {}

        return false;
    }

    function isPluginEnabled() {
        try {
            return !!Lampa.Storage.get('easytorrent_enabled', true);
        } catch (e) {
            return true;
        }
    }

    function ensureSelfPluginMetadataInStorage() {
        try {
            const raw = Lampa.Storage.get('plugins', '[]');
            const list = Array.isArray(raw) ? raw.slice() : (typeof raw === 'string' ? JSON.parse(raw) : []);
            if (!Array.isArray(list) || !list.length) return;

            let changed = false;

            const isMatch = (u) => {
                const url = String(u || '').toLowerCase();
                if (!url) return false;
                return EXT_META_URL_HINTS.some(h => url.includes(String(h).toLowerCase()));
            };

            const normalized = list.map(item => (typeof item === 'string' ? { url: item, status: 1 } : item));

            normalized.forEach(item => {
                if (!item || typeof item !== 'object') return;
                const url = item.url || item.link;
                if (!isMatch(url)) return;

                if (!item.name) {
                    item.name = EXT_META_NAME;
                    changed = true;
                }
                if (!item.author) {
                    item.author = EXT_META_AUTHOR;
                    changed = true;
                }
                if (!item.descr) {
                    item.descr = String(url || '').replace(/\n|\t|\r/g, ' ');
                    changed = true;
                }
            });

            if (changed) {
                Lampa.Storage.set('plugins', normalized);
            }

            // Если сейчас открыт экран Extensions — обновим DOM сразу (чтобы не ждать перезагрузки)
            try {
                const root = document && document.querySelector ? document.querySelector('.extensions') : null;
                if (root) {
                    root.querySelectorAll('.extensions__item').forEach(el => {
                        const descrEl = el.querySelector('.extensions__item-descr');
                        if (!descrEl) return;
                        const descr = String(descrEl.textContent || '');
                        if (!isMatch(descr)) return;

                        const nameEl = el.querySelector('.extensions__item-name');
                        const authorEl = el.querySelector('.extensions__item-author');

                        if (nameEl && (!nameEl.textContent || nameEl.textContent.trim() === 'Без названия')) {
                            nameEl.textContent = EXT_META_NAME;
                        }
                        if (authorEl && (!authorEl.textContent || authorEl.textContent.trim() === '@lampa')) {
                            authorEl.textContent = EXT_META_AUTHOR;
                        }
                    });
                }
            } catch (e) {}
        } catch (e) {
            console.warn('[EasyTorrent] ensureSelfPluginMetadataInStorage failed:', e);
        }
    }

    function hasPendingStartupModals() {
        const needUpdate = shouldShowUpdateModalV110 && !Lampa.Storage.get(STORAGE_MODAL_UPDATE_V110, false);
        const needWelcome = shouldShowWelcomeModal && !Lampa.Storage.get(STORAGE_MODAL_WELCOME, false);
        return needUpdate || needWelcome;
    }

    function ensureStartupModalScheduler() {
        if (startupModalScheduler) return;

        // Периодически проверяем условия (покинули extensions + плагин включён) и показываем модалку.
        startupModalScheduler = setInterval(() => {
            try {
                if (!hasPendingStartupModals()) {
                    clearInterval(startupModalScheduler);
                    startupModalScheduler = null;
                    return;
                }

                // Если плагин выключен — не показываем. При включении scheduler запустится через onChange.
                if (!isPluginEnabled()) return;

                // На extensions модалки НЕ показываем (там багованное поведение) — покажем позже.
                if (isExtensionsScreen()) return;

                showStartupModalIfNeeded();
            } catch (e) {}
        }, 1500);
    }


    function isObj(v) {
        return !!v && typeof v === 'object' && !Array.isArray(v);
    }

    function isStr(v) {
        return typeof v === 'string' && v.length > 0;
    }

    function isNum(v) {
        return typeof v === 'number' && Number.isFinite(v);
    }

    function isNumOrInt(v) {
        return isNum(v);
    }

    function cfgError(message) {
        return { ok: false, error: message };
    }

    function validateConfig(cfg) {
        if (!isObj(cfg)) return cfgError('Конфиг должен быть объектом JSON');

        const v = String(cfg.version || '');
        if (v === '2.0' || v.startsWith('2.0')) {
            return cfgError('Конфиги версии 2.0 больше не поддерживаются. Сгенерируйте новый конфиг (2.1) в визарде.');
        }
        if (!v.startsWith('2.1')) {
            return cfgError(`Неподдерживаемая версия конфига: ${v || 'не указана'}. Ожидается 2.1.`);
        }

        if (!isObj(cfg.device)) return cfgError('Поле device отсутствует или неверного типа');
        if (!isStr(cfg.device.type)) return cfgError('Поле device.type отсутствует или неверного типа');
        if (!Array.isArray(cfg.device.supported_hdr)) return cfgError('Поле device.supported_hdr должно быть массивом');
        if (!Array.isArray(cfg.device.supported_audio)) return cfgError('Поле device.supported_audio должно быть массивом');

        if (!isObj(cfg.network)) return cfgError('Поле network отсутствует или неверного типа');
        if (!isStr(cfg.network.speed)) return cfgError('Поле network.speed отсутствует или неверного типа');
        if (!isStr(cfg.network.stability)) return cfgError('Поле network.stability отсутствует или неверного типа');

        if (!Array.isArray(cfg.parameter_priority) || cfg.parameter_priority.length === 0) return cfgError('Поле parameter_priority должно быть непустым массивом');
        if (!Array.isArray(cfg.audio_track_priority) || cfg.audio_track_priority.length === 0) return cfgError('Поле audio_track_priority должно быть непустым массивом');
        // Строго: только числовые id из AUDIO_TRACKS
        for (const v of cfg.audio_track_priority) {
            if (!(typeof v === 'number' && Number.isFinite(v))) {
                return cfgError('Поле audio_track_priority должно содержать только числовые id озвучек (без строковых названий)');
            }
            // AUDIO_TRACK_BY_ID инициализируется ниже вместе с AUDIO_TRACKS; здесь используем как справочник валидности id
            if (!AUDIO_TRACK_BY_ID || (AUDIO_TRACK_BY_ID.has && !AUDIO_TRACK_BY_ID.has(v))) {
                return cfgError('Поле audio_track_priority содержит неизвестный id озвучки');
            }
        }

        if (!isObj(cfg.preferences)) return cfgError('Поле preferences отсутствует или неверного типа');
        if (!isNumOrInt(cfg.preferences.min_seeds)) return cfgError('Поле preferences.min_seeds должно быть числом');
        if (!isNumOrInt(cfg.preferences.recommendation_count)) return cfgError('Поле preferences.recommendation_count должно быть числом');
        if (!Array.isArray(cfg.preferences.languages) || cfg.preferences.languages.length === 0) {
            return cfgError('Поле preferences.languages должно быть непустым массивом (например ["rus","eng"])');
        }
        for (const l of cfg.preferences.languages) {
            if (typeof l !== 'string' || !l.trim()) return cfgError('Поле preferences.languages должно содержать только строки');
        }

        if (!isObj(cfg.scoring_rules)) return cfgError('Поле scoring_rules отсутствует или неверного типа');
        const r = cfg.scoring_rules;
        if (String(r.schema || '') !== '2.1') return cfgError('Поле scoring_rules.schema должно быть "2.1"');
        if (!isNumOrInt(r.base_score)) return cfgError('Поле scoring_rules.base_score должно быть числом');

        if (!isObj(r.resolution)) return cfgError('Поле scoring_rules.resolution отсутствует или неверного типа');
        if (!isObj(r.hdr)) return cfgError('Поле scoring_rules.hdr отсутствует или неверного типа');

        if (!isObj(r.bitrate_bonus)) return cfgError('Поле scoring_rules.bitrate_bonus отсутствует или неверного типа');
        if (!Array.isArray(r.bitrate_bonus.thresholds)) return cfgError('Поле scoring_rules.bitrate_bonus.thresholds должно быть массивом');
        if (!isNumOrInt(r.bitrate_bonus.missing_penalty)) return cfgError('Поле scoring_rules.bitrate_bonus.missing_penalty должно быть числом');
        for (const t of r.bitrate_bonus.thresholds) {
            if (!isObj(t)) return cfgError('Элементы scoring_rules.bitrate_bonus.thresholds должны быть объектами');
            if (!isNumOrInt(t.min) || !isNumOrInt(t.max) || !isNumOrInt(t.bonus)) {
                return cfgError('thresholds: каждый элемент должен содержать числовые поля min/max/bonus');
            }
        }

        if (!isObj(r.availability)) return cfgError('Поле scoring_rules.availability отсутствует или неверного типа');
        if (!isNumOrInt(r.availability.min_seeds)) return cfgError('Поле scoring_rules.availability.min_seeds должно быть числом');
        if (!isNumOrInt(r.availability.below_min_penalty)) return cfgError('Поле scoring_rules.availability.below_min_penalty должно быть числом');
        if (!isNumOrInt(r.availability.log10_multiplier)) return cfgError('Поле scoring_rules.availability.log10_multiplier должно быть числом');

        if (!isObj(r.audio_track)) return cfgError('Поле scoring_rules.audio_track отсутствует или неверного типа');
        if (!isStr(r.audio_track.curve)) return cfgError('Поле scoring_rules.audio_track.curve должно быть строкой');
        if (!isNumOrInt(r.audio_track.max_points)) return cfgError('Поле scoring_rules.audio_track.max_points должно быть числом');

        if (!isObj(r.audio_quality)) return cfgError('Поле scoring_rules.audio_quality отсутствует или неверного типа');
        if (!isObj(r.audio_quality.points)) return cfgError('Поле scoring_rules.audio_quality.points отсутствует или неверного типа');

        if (r.special_rules !== undefined && !Array.isArray(r.special_rules)) {
            return cfgError('Поле scoring_rules.special_rules должно быть массивом (или отсутствовать)');
        }

        return { ok: true };
    }

    function openEasyTorrentSettingsFromModal(prevController) {
        try {
            Lampa.Modal.close();
        } catch (e) {}

        // Возвращаемся в настройки и открываем компонент
        Lampa.Controller.toggle('settings');
        setTimeout(() => {
            if (Lampa.Settings && typeof Lampa.Settings.create === 'function') {
                Lampa.Settings.create('easytorrent', {
                    onBack: () => {
                        Lampa.Controller.toggle('settings');
                    }
                });
            }
        }, 50);
    }

    function showStartupModalIfNeeded() {
        // На странице Extensions модалки не показываем вообще (покажем позже scheduler'ом)
        if (isExtensionsScreen()) return false;

        const prev = (Lampa.Controller && typeof Lampa.Controller.enabled === 'function' && Lampa.Controller.enabled())
            ? Lampa.Controller.enabled().name
            : 'content';

        // Если окружение ещё не готово (контроллер/Modal/$), не ставим флаги — просто попробуем позже
        const canOpen =
            !!(window.Lampa && Lampa.Modal && typeof Lampa.Modal.open === 'function') &&
            !!(window.Lampa && Lampa.Controller && typeof Lampa.Controller.toggle === 'function') &&
            (typeof $ === 'function');

        if (!canOpen) return false;

        // 1) Обновление (если конфиг есть, но отклонён/не поддерживается)
        if (shouldShowUpdateModalV110 && !Lampa.Storage.get(STORAGE_MODAL_UPDATE_V110, false)) {
            const html = $(`
                <div class="about">
                    <div class="about__text">
                        <div><strong>Что изменилось:</strong></div>
                        <ol>
                            <li>Исправлены баги рассчета рейтинга </li>
                            <li>Добавлены баллы за качество звука (Atmos / 7.1 / 5.1)</li>
                            <li>Улучшены расчёты битрейта и работа с сериалами.</li>
                        </ol>
                        <p style="padding: 0.75em 0.9em; border-radius: 0.6em; background: rgba(255,193,7,0.14); border: 1px solid rgba(255,193,7,0.35);">
                            <strong style="color: #ffc107;">⚠️ ВАЖНО:</strong>
                            Конфиг сброшен на дефолтную конфигурацию из-за несовместимости. Нужно настроить заново.
                        </p>
                        <p><strong>Текущая конфигурация:</strong></p>
                        <ul>
                            <li>Устройство: <strong>FHD (1080p)</strong></li>
                            <li>HDR: <strong>выключен (SDR)</strong></li>
                            <li>Звук: <strong>стерео</strong> (без 5.1/7.1/Atmos)</li>
                            <li>Приоритеты: <strong>Озвучка → Разрешение → Сиды → Битрейт</strong></li>
                            <li>Мин. сидов: <strong>${DEFAULT_CONFIG.preferences.min_seeds}</strong>, рекомендаций: <strong>${DEFAULT_CONFIG.preferences.recommendation_count}</strong></li>
                        </ul>
                        <p>
                            Для нормальной работы рекомендуеться заново настроить приоритеты:
                            <br><strong>Настройки → EasyTorrent → “Расставить приоритеты”</strong>
                        </p>
                    </div>
                </div>
            `);

            try {
                Lampa.Modal.open({
                    title: `Обновление EasyTorrent v${VERSION}`,
                    size: 'large',
                    html: html,
                    mask: true,
                    buttons_position: 'outside',
                    buttons: [
                        {
                            name: 'Открыть настройки',
                            onSelect: () => openEasyTorrentSettingsFromModal(prev)
                        },
                        {
                            name: 'Закрыть',
                            onSelect: () => {
                                Lampa.Modal.close();
                                Lampa.Controller.toggle(prev);
                            }
                        }
                    ],
                    onBack: () => {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle(prev);
                    }
                });

                // Ставим флаг ТОЛЬКО после успешного открытия
                Lampa.Storage.set(STORAGE_MODAL_UPDATE_V110, true);
                return true;
            } catch (e) {
                console.error('[EasyTorrent] Modal.open failed:', e);
                return false;
            }
        }

        // 2) Первый запуск (нет сохраненного конфига)
        if (shouldShowWelcomeModal && !Lampa.Storage.get(STORAGE_MODAL_WELCOME, false)) {
            const html = $(`
                <div class="about">
                    <div class="about__text">
                        <div>
                            Для нормальной работы нужно настроить приоритеты (озвучки/качество/сиды и т.д.).
                        </div>
                        <p>
                            Сейчас установлена конфигурация по умолчанию:
                        </p>
                        <ul>
                            <li>Устройство: <strong>FHD (1080p)</strong></li>
                            <li>HDR: <strong>выключен (SDR)</strong></li>
                            <li>Звук: <strong>стерео</strong> (без 5.1/7.1/Atmos)</li>
                            <li>Приоритеты: <strong>Озвучка → Разрешение → Сиды → Битрейт</strong></li>
                            <li>Мин. сидов: <strong>${DEFAULT_CONFIG.preferences.min_seeds}</strong>, рекомендаций: <strong>${DEFAULT_CONFIG.preferences.recommendation_count}</strong></li>
                        </ul>
                        <p>
                            Перейдите:
                            <br><strong>Настройки → EasyTorrent → “Расставить приоритеты”</strong>
                            <br>и пройдите настройку на своем телефоне через QR.
                        </p>
                    </div>
                </div>
            `);

            try {
                Lampa.Modal.open({
                    title: `EasyTorrent установлен (v${VERSION})`,
                    size: 'large',
                    html: html,
                    mask: true,
                    buttons_position: 'outside',
                    buttons: [
                        {
                            name: 'Открыть настройки',
                            onSelect: () => openEasyTorrentSettingsFromModal(prev)
                        },
                        {
                            name: 'Закрыть',
                            onSelect: () => {
                                Lampa.Modal.close();
                                Lampa.Controller.toggle(prev);
                            }
                        }
                    ],
                    onBack: () => {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle(prev);
                    }
                });

                // Ставим флаг ТОЛЬКО после успешного открытия
                Lampa.Storage.set(STORAGE_MODAL_WELCOME, true);
                return true;
            } catch (e) {
                console.error('[EasyTorrent] Modal.open failed:', e);
                return false;
            }
        }

        return false;
    }

    function loadUserConfig() {
        const savedConfig = Lampa.Storage.get(STORAGE_CONFIG_KEY);
        if (savedConfig) {
            try {
                const parsed = typeof savedConfig === 'string' ? JSON.parse(savedConfig) : savedConfig;
                const check = validateConfig(parsed);
                if (check.ok) {
                    USER_CONFIG = parsed;
                    return;
                }

                // Конфиг есть, но неправильный — не трогаем его, просто сообщаем и работаем на дефолте.
                shouldShowUpdateModalV110 = true;
                // По факту: чтобы не зацикливать "приветственную" и не держать битый конфиг, кладём дефолт в storage.
                applyDefaultConfigAndPersist();
                console.warn('[EasyTorrent] Конфиг отклонён:', check.error);
                return; // важно: не показываем welcome, т.к. конфиг "был", но отклонён
            } catch (e) {
                // Конфиг есть, но не парсится (битый JSON) — это не "первый запуск"
                shouldShowUpdateModalV110 = true;
                applyDefaultConfigAndPersist();
                console.warn('[EasyTorrent] Конфиг повреждён и не может быть прочитан:', e);
                return;
            }
        }
        // Первый запуск: ставим дефолт и показываем подсказку (1 раз)
        shouldShowWelcomeModal = true;
        applyDefaultConfigAndPersist();
    }

    function saveUserConfig(config) {
        const stringConfig = typeof config === 'string' ? config : JSON.stringify(config);
        // Сначала валидируем. Ничего "за пользователя" не исправляем.
        try {
            const parsed = JSON.parse(stringConfig);
            const check = validateConfig(parsed);
            if (!check.ok) {
                Lampa.Noty && Lampa.Noty.show ? Lampa.Noty.show(check.error) : alert(check.error);
                // Не сохраняем и не применяем.
                return;
            }

            Lampa.Storage.set(STORAGE_CONFIG_KEY, stringConfig);
            USER_CONFIG = parsed;
        } catch (e) {
            USER_CONFIG = deepClone(DEFAULT_CONFIG);
        }
    }

    function showConfigDetails() {
        const cfg = USER_CONFIG;
        const items = [
            { title: 'Версия конфига', subtitle: cfg.version, noselect: true },
            { title: 'Тип устройства', subtitle: cfg.device.type.toUpperCase(), noselect: true },
            { title: 'Поддержка HDR', subtitle: cfg.device.supported_hdr.join(', ') || 'нет', noselect: true },
            { title: 'Поддержка звука', subtitle: cfg.device.supported_audio.join(', ') || 'стерео', noselect: true },
            { title: 'Языки аудио', subtitle: (cfg.preferences && Array.isArray(cfg.preferences.languages) ? cfg.preferences.languages.join(', ') : 'не задано'), noselect: true },
            { title: 'Приоритет параметров', subtitle: cfg.parameter_priority.join(' > '), noselect: true },
            { title: 'Приоритет озвучек', subtitle: `${cfg.audio_track_priority.length} шт. • Нажмите для просмотра`, action: 'show_voices' },
            { title: 'Минимально сидов', subtitle: cfg.preferences.min_seeds, noselect: true },
            { title: 'Число рекомендаций', subtitle: cfg.preferences.recommendation_count, noselect: true }
        ];

        Lampa.Select.show({
            title: 'Текущая конфигурация',
            items: items,
            onSelect: (item) => {
                if (item.action === 'show_voices') {
                    showVoicePriority();
                }
            },
            onBack: () => {
                Lampa.Controller.toggle('settings');
            }
        });
    }

    function showVoicePriority() {
        const cfg = USER_CONFIG;
        const items = cfg.audio_track_priority.map((voice, index) => {
            const id = normalizeAudioTrackIdOrNull(voice);
            const name = (typeof id === 'number' && AUDIO_TRACK_BY_ID.get(id))
                ? AUDIO_TRACK_BY_ID.get(id).name
                : String(voice);
            return {
                title: `${index + 1}. ${name}`,
                noselect: true
            };
        });
        const safeItems = items.length ? items : [{
            title: 'Пусто',
            noselect: true
        }];

        Lampa.Select.show({
            title: 'Приоритет озвучек',
            items: safeItems,
            onBack: () => {
                showConfigDetails();
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 2: ЯДРО - АНАЛИЗ ТОРРЕНТОВ
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Определение разрешения видео из ffprobe или названия
     */
    function detectResolution(item) {
        const title = (item.Title || item.title || '').toLowerCase();
        
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            const video = item.ffprobe.find(s => s.codec_type === 'video');
            if (video && video.height) {
                // 4K: высота >= 2160 ИЛИ ширина >= 3800 (учитываем кроп)
                if (video.height >= 2160 || (video.width && video.width >= 3800)) return 2160;
                // 2K: высота >= 1440 ИЛИ ширина >= 2500
                if (video.height >= 1440 || (video.width && video.width >= 2500)) return 1440;
                // FHD: высота >= 1080 ИЛИ ширина >= 1900
                if (video.height >= 1080 || (video.width && video.width >= 1900)) return 1080;
                // HD: высота >= 720 ИЛИ ширина >= 1260
                if (video.height >= 720 || (video.width && video.width >= 1260)) return 720;
                return 480;
            }
        }
        
        if (/\b2160p\b/.test(title) || /\b4k\b/.test(title)) return 2160;
        if (/\b1440p\b/.test(title) || /\b2k\b/.test(title)) return 1440;
        if (/\b1080p\b/.test(title)) return 1080;
        if (/\b720p\b/.test(title)) return 720;
        
        return null;
    }

    /**
     * Определение HDR типа (выбирает лучший из найденных)
     */
    function detectHdr(item) {
        // 0) Если парсер уже определил тип видео — доверяем ему (это надёжнее, чем эвристики по названию)
        // Примеры: info.videotype = 'sdr' | 'hdr10' | 'hdr10plus' | 'dolby_vision'
        const vi = item && item.info && (item.info.videotype || item.info.video_type || item.info.hdr);
        if (typeof vi === 'string' && vi) {
            const v = vi.toLowerCase();
            if (v === 'sdr') return 'sdr';
            if (v === 'hdr10') return 'hdr10';
            if (v === 'hdr10plus' || v === 'hdr10+') return 'hdr10plus';
            if (v === 'dolby_vision' || v === 'dovi' || v === 'dv') return 'dolby_vision';
            if (v === 'hdr') return 'hdr10'; // общий маркер без уточнения
        }

        const title = (item.Title || item.title || '').toLowerCase();
        const foundTypes = [];

        // HDR-токены должны быть "отдельными": без букв/цифр слева/справа.
        // Это защищает от ложных срабатываний типа "HDRezka" (hdr+буква) и подобных.
        const hasToken = (tokenPattern) => {
            try {
                const re = new RegExp(`(?:^|[^\\p{L}\\p{N}])(?:${tokenPattern})(?=$|[^\\p{L}\\p{N}])`, 'iu');
                return re.test(title);
            } catch (e) {
                // fallback без \p{L}\p{N}
                const re = new RegExp(`(?:^|[^a-z0-9_])(?:${tokenPattern})(?=$|[^a-z0-9_])`, 'i');
                return re.test(title);
            }
        };
        
        // Из ffprobe
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            const video = item.ffprobe.find(s => s.codec_type === 'video');
            if (video && video.side_data_list) {
                const hasDv = video.side_data_list.some(data => 
                    data.side_data_type === 'DOVI configuration record' ||
                    data.side_data_type === 'Dolby Vision RPU'
                );
                if (hasDv) foundTypes.push('dolby_vision');
            }
        }
        
        // Из названия - собираем ВСЕ найденные типы (от специфичного к общему)
        // HDR10+ / HDR10PLUS
        if (hasToken('hdr10\\+') || hasToken('hdr10plus') || hasToken('hdr10\\s*plus')) {
            if (!foundTypes.includes('hdr10plus')) foundTypes.push('hdr10plus');
        }
        // HDR10 (важно: не матчится внутри HDR10PLUS из-за token-границ)
        if (hasToken('hdr-?10') || hasToken('hdr10')) {
            if (!foundTypes.includes('hdr10')) foundTypes.push('hdr10');
        }
        if (title.includes('dolby vision') || title.includes('dovi') || /\sp8\s/.test(title) || /\(dv\)/.test(title) || /\[dv\]/.test(title) || /\sdv\s/.test(title) || /,\s*dv\s/.test(title)) {
            if (!foundTypes.includes('dolby_vision')) foundTypes.push('dolby_vision');
        }
        // Общий HDR-маркер (только как отдельный токен: /HDR/, |HDR|, [HDR], (HDR), " HDR ")
        if (hasToken('hdr') && !foundTypes.includes('hdr10plus') && !foundTypes.includes('hdr10')) {
            foundTypes.push('hdr10');
        }
        if (hasToken('sdr')) {
            if (!foundTypes.includes('sdr')) foundTypes.push('sdr');
        }
        
        // Если ничего не найдено, вероятно SDR
        if (foundTypes.length === 0) return 'sdr';
        
        // Выбираем ЛУЧШИЙ тип по значению из конфига
        const hdrScores = USER_CONFIG.scoring_rules.hdr;
        
        let bestType = foundTypes[0];
        let bestScore = hdrScores[bestType] || 0;
        
        foundTypes.forEach(type => {
            const score = hdrScores[type] || 0;
            if (score > bestScore) {
                bestScore = score;
                bestType = type;
            }
        });
        
        return bestType;
    }

    /**
     * Извлечение аудио дорожек из ffprobe или названия
     */
    function detectAudioTracks(item) {
        const tracks = [];
        
        // Сначала из ffprobe
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            item.ffprobe.forEach(stream => {
                if (stream.codec_type === 'audio' && stream.tags && stream.tags.title) {
                    tracks.push(stream.tags.title);
                }
            });
        }
        
        // Если нет ffprobe - парсим из названия
        if (tracks.length === 0) {
            const title = item.Title || item.title || '';
            
            if (/\bДБ\b|\bDub\b|Дубляж/i.test(title)) tracks.push('RUS - Дубляж');
            if (/\bMVO\b|Многоголос|многоголос/i.test(title)) tracks.push('RUS - MVO');
            if (/LostFilm|Лостфильм/i.test(title)) tracks.push('RUS - LostFilm');
            if (/Jaskier|Жаскир/i.test(title)) tracks.push('RUS - Jaskier');
            if (/NewStudio|Нью студио/i.test(title)) tracks.push('RUS - NewStudio');
            if (/\bUKR\b|Укр|Український/i.test(title)) tracks.push('UKR - Дубляж');
            if (/\bENG\b|English|Original/i.test(title)) tracks.push('ENG - Original');
            if (/\bLine\b|Лайн/i.test(title)) tracks.push('RUS - Line');
        }
        
        return tracks;
    }

    /**
     * Определение качества звука (стерео/5.1/7.1/Atmos).
     * Это не "язык/озвучка", а именно формат/каналы.
     */
    function detectAudioQuality(item) {
        const title = (item.Title || item.title || '').toLowerCase();

        // Atmos по названию (чаще всего так и маркируют)
        if (/\batmos\b/.test(title) || title.includes('dolby atmos')) return 'dolby_atmos';

        // Каналы по названию
        if (/\b7[ .]?1\b/.test(title) || title.includes('7.1ch') || title.includes('7 1')) return 'surround_71';
        if (/\b5[ .]?1\b/.test(title) || title.includes('5.1ch') || title.includes('5 1')) return 'surround_51';

        // ffprobe (если есть): channels / channel_layout / tags
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            const audio = item.ffprobe.filter(s => s.codec_type === 'audio');
            // если нашли несколько дорожек — берём "самую жирную"
            let best = null;
            audio.forEach(s => {
                const ch = typeof s.channels === 'number' ? s.channels : null;
                const layout = (s.channel_layout || '').toLowerCase();
                const t = (s.tags?.title || s.tags?.handler_name || '').toLowerCase();
                const isAtmos = t.includes('atmos') || layout.includes('atmos');

                // оценка "жирности": атмос > 7.1 > 5.1 > стерео > неизвестно
                let rank = 0;
                if (isAtmos) rank = 4;
                else if (layout.includes('7.1') || ch === 8) rank = 3;
                else if (layout.includes('5.1') || ch === 6) rank = 2;
                else if (layout.includes('stereo') || ch === 2) rank = 1;

                if (!best || rank > best.rank) best = { rank };
            });

            if (best) {
                if (best.rank === 4) return 'dolby_atmos';
                if (best.rank === 3) return 'surround_71';
                if (best.rank === 2) return 'surround_51';
                if (best.rank === 1) return 'stereo';
            }
        }

        // По умолчанию считаем стерео (2.0) базовым вариантом
        return 'stereo';
    }

    /**
     * Извлечение битрейта (приоритет: ffprobe BPS → bit_rate → расчёт из Size+Duration → поле bitrate → название)
     */
    /**
    /**
 * Надёжный разбор "сезон/серии" из торрент-заголовков (RU/UA/EN).
 *
 * Возвращает объект:
 * {
 *   season: number | null,
 *   seasonRange?: { start: number, end: number },
 *   episode: number | null,
 *   episodeRange?: { start: number, end: number },
 *   source: string,          // какой паттерн сработал
 *   confidence: number       // 0..100 (условно)
 * }
 *
 * Пример:
 * extractSeasonEpisode("Stranger Things [05x01-03 из 08] ...")
 */

function normalizeTitle(input) {
    if (input == null) return "";
    let s = String(input);
  
    // Унифицируем тире/дефисы
    s = s.replace(/[\u2012\u2013\u2014\u2212]/g, "-");
  
    // Иногда встречается кириллическая "х" вместо латинской "x" в 05х01
    s = s.replace(/х/gi, "x");
  
    // Неразрывные пробелы и множественные пробелы
    s = s.replace(/\u00A0/g, " ");
    s = s.replace(/\s+/g, " ").trim();
  
    return s;
  }
  
  function clampConfidence(n) {
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }
  
  function toInt(x) {
    const n = parseInt(x, 10);
    return Number.isFinite(n) ? n : null;
  }
  
  function mkRange(a, b) {
    if (a == null) return null;
    if (b == null || b === a) return { start: a, end: a };
    return { start: Math.min(a, b), end: Math.max(a, b) };
  }
  
  function isPlausibleSeason(n) {
    return Number.isInteger(n) && n >= 1 && n <= 60; // запас на будущее/аниме
  }
  
  function isPlausibleEpisode(n) {
    // У аниме типа One Piece эпизодов может быть сильно больше 500.
    return Number.isInteger(n) && n >= 0 && n <= 5000; // 0 для спецвыпусков
  }
  
  function isYearLikeRange(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) return false;
    if (a < 1900 || a > 2100) return false;
    if (b < 1900 || b > 2100) return false;
    if (b < a) return false;
    // Типичные годы релиза: 1999-2024, 2010-2013 и т.п.
    return (b - a) <= 60;
  }
  
  /**
   * Проверяет, является ли тайтл "мусором" (фильмы, спецвыпуски и т.д.)
   */
  function isTrash(title) {
    const lowTitle = title.toLowerCase();
    
    // Список паттернов, которые однозначно говорят о том, что это не сериал или не эпизод сериала
    // Используем unicode-friendly границы слова
    const trashPatterns = [
      /(?:^|[^\p{L}\p{N}])(фильм|film|movie|movies)(?=$|[^\p{L}\p{N}])/iu,
      // NB: "спешл" часто пишут без "э", а "specials" — во множественном числе
      /(?:^|[^\p{L}\p{N}])(спецвыпуск|special|specials|sp|ova|ona|bonus|extra|экстра|спэшл|спешл|спэшал|ова|она|спэшел)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(трейлер|trailer|teaser|тизер)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(саундтрек|ost|soundtrack)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(клип|clip|pv)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(интервью|interview)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(репортаж|report)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(промо|promo)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(отрывок|preview)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(анонс|announcement)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(съемки|making of|behind the scenes)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(сборник|collection)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(документальный|docu|documentary)(?=$|[^\p{L}\p{N}])/iu,
      /(?:^|[^\p{L}\p{N}])(концерт|concert|live)(?=$|[^\p{L}\p{N}])/iu,
      // Аниме-специфичные фильмы и спецвыпуски
      /movie\s*\d+/i,
      /film\s*\d+/i,
      /(?:^|[^\p{L}\p{N}])(мультфильм|аниме-фильм|спецэпизод|спецсерія)(?=$|[^\p{L}\p{N}])/iu,
      /\bepisode of\b/i,
    ];
  
    for (const pattern of trashPatterns) {
      if (pattern.test(lowTitle)) return true;
    }
    
    return false;
  }
  
  function extractEpisodeTotal(title) {
    // "из 08", "из 8", "of 8"
    const m = /(?:^|[^\p{L}\p{N}])(?:из|of)\s*(\d{1,4})(?=$|[^\p{L}\p{N}])/iu.exec(title);
    if (!m) return null;
    const n = toInt(m[1]);
    return isPlausibleEpisode(n) ? n : null;
  }
  
  function isLikelyVoiceChannelXxXx(title, matchIndex, matchText) {
    // Основной ложноположительный кейс из ваших данных: "ДБ (2x2)"
    const compact = String(matchText).toLowerCase().replace(/\s+/g, "");
    if (compact === "2x2") return true;
  
    const before = title.slice(Math.max(0, matchIndex - 12), matchIndex).toLowerCase();
    const after = title.slice(matchIndex + matchText.length, matchIndex + matchText.length + 12).toLowerCase();
  
    const looksLikeDubContext = /(дб|dub)\s*\(/i.test(before);
    const looksLikeCloseParen = /^\s*\)/.test(after);
  
    return looksLikeDubContext && looksLikeCloseParen;
  }
  
  function scoreCandidate({ season, seasonRange, episode, episodeRange, base, title }) {
    if (title && isTrash(title)) return 0;
    let score = base;
  
    const s = season ?? seasonRange?.start ?? null;
    const e = episode ?? episodeRange?.start ?? null;
  
    if (s != null) score += 10;
    if (e != null) score += 10;
    if (s != null && e != null) score += 15;
  
    // Плюс за наличие диапазонов (обычно это "серии 1-4")
    if (seasonRange && seasonRange.end !== seasonRange.start) score += 5;
    if (episodeRange && episodeRange.end !== episodeRange.start) score += 5;
  
    // Жёсткие штрафы за маловероятные значения (чтобы не цеплять 2025/2160p и т.п.)
    if (s != null && !isPlausibleSeason(s)) score -= 60;
    if (e != null && !isPlausibleEpisode(e)) score -= 60;
  
    return clampConfidence(score);
  }
  
  /**
   * Главная функция.
   */
  function extractSeasonEpisode(rawTitle) {
    const title = normalizeTitle(rawTitle);
    const episodeTotal = extractEpisodeTotal(title);
  
    // Требование: фильмы/спешлы/OVA/extra и т.п. не интересуют — считаем мусором
    if (isTrash(title)) {
      return { season: null, episode: null, source: "trash", confidence: 0 };
    }
    const seasonCandidates = [];
    const episodeCandidates = [];
  
    // 1) Самые надёжные форматы: S05E01, 05x01, 05x01-03, S05x01
    {
      // S05E01 / S5E1 / S05E01-03 / S05E01-E03 / S01x01
      const m = /s(\d{1,2})\s*[ex](\d{1,3})(?:\s*[-]\s*[ex]?(\d{1,3}))?\b/i.exec(title);
      if (m) {
        const season = toInt(m[1]);
        const e1 = toInt(m[2]);
        const e2 = toInt(m[3]);
        const episodeRange = mkRange(e1, e2);
        const episode = episodeRange ? episodeRange.start : null;
        
        if (isPlausibleSeason(season)) {
          seasonCandidates.push({ season, base: 90, name: "SxxEyy" });
        }
        if (isPlausibleEpisode(episode)) {
          episodeCandidates.push({ episode, episodeRange, base: 90, name: "SxxEyy" });
        }
      }
    }
  
    // 1.2) Компактные пакеты по сезонам: 01-03x01-21 (сезоны 1-3, серии 1-21)
    // Примеры:
    // - The Witcher [01-03x01-21 из 24]
    // - The Witcher [01-03x01-17 из 24]
    {
      const m = /\b(\d{1,2})\s*[-]\s*(\d{1,2})\s*x\s*(\d{1,3})(?:\s*[-]\s*(\d{1,4}))?\b/i.exec(title);
      if (m) {
        // Важный фильтр: не путать с "2x2" (канал/озвучка)
        if (!isLikelyVoiceChannelXxXx(title, m.index, m[0])) {
          const s1 = toInt(m[1]);
          const s2 = toInt(m[2]);
          const e1 = toInt(m[3]);
          const e2 = toInt(m[4]);
  
          const sRange = mkRange(s1, s2);
          const eRange = mkRange(e1, e2);
  
          if (sRange && isPlausibleSeason(sRange.start) && isPlausibleSeason(sRange.end)) {
            seasonCandidates.push({
              season: sRange.start,
              seasonRange: sRange.start !== sRange.end ? sRange : undefined,
              base: 92,
              name: "Srange x Erange",
            });
          }
          if (eRange && isPlausibleEpisode(eRange.start) && isPlausibleEpisode(eRange.end)) {
            episodeCandidates.push({
              episode: eRange.start,
              episodeRange: eRange.start !== eRange.end ? eRange : undefined,
              base: 92,
              name: "Srange x Erange",
            });
          }
        }
      }
    }
  
    {
      // 05x01 / 5x1 / 05x01-03
      const m = /\b(\d{1,2})\s*x\s*(\d{1,3})(?:\s*[-]\s*(\d{1,3}))?\b/i.exec(title);
      if (m) {
        if (isLikelyVoiceChannelXxXx(title, m.index, m[0])) {
          // "ДБ (2x2)" и подобное — не сезон/серия
        } else {
        const season = toInt(m[1]);
        const e1 = toInt(m[2]);
        const e2 = toInt(m[3]);
        const episodeRange = mkRange(e1, e2);
        const episode = episodeRange ? episodeRange.start : null;
        
        if (isPlausibleSeason(season)) {
          seasonCandidates.push({ season, base: 85, name: "xxXyy" });
        }
        if (isPlausibleEpisode(episode)) {
          episodeCandidates.push({ episode, episodeRange, base: 85, name: "xxXyy" });
        }
        }
      }
    }
  
    // 1.5) Частый формат для аниме/пакетов: диапазон серий или одна серия в []/()
    // Примеры:
    // - One Piece [1061-1121]
    // - One Piece (892-1051 серии)
    // - One Piece [1999, TV, 207-1122 эп.]
    // - One Piece [383 из ???]
    {
      // В квадратных или круглых скобках
      const mList = title.matchAll(/[\[\(]([^\]\)]+)[\]\)]?/g);
      for (const m of mList) {
        const inside = m[1];
        
        // Ищем диапазон: 1061-1121
        const rm = /(\d{1,4})\s*[-]\s*(\d{1,4})/g;
        let r;
        while ((r = rm.exec(inside)) !== null) {
          const a = toInt(r[1]);
          const b = toInt(r[2]);
          if (a == null || b == null || isYearLikeRange(a, b)) continue;
  
          const tail = inside.slice(r.index + r[0].length, r.index + r[0].length + 12).toLowerCase();
          const head = inside.slice(Math.max(0, r.index - 12), r.index).toLowerCase();
          const hasEpisodeHints = /(эп|ep|из|of|tv|series|сер)/i.test(head + " " + tail);
  
          const looksLikeEpisodes = hasEpisodeHints || Math.max(a, b) >= 50;
          if (!looksLikeEpisodes) continue;
  
          const episodeRange = mkRange(a, b);
          const episode = episodeRange?.start ?? null;
          episodeCandidates.push({
            episode: isPlausibleEpisode(episode) ? episode : null,
            episodeRange: episodeRange && isPlausibleEpisode(episodeRange.start) ? episodeRange : undefined,
            base: hasEpisodeHints ? 75 : 70,
            name: "bracket range"
          });
        }
  
        // Ищем одиночное число с пометкой серии: [383 из ...], [эп 100], [серия 5]
        const sm = /(?:^|[^\d])(\d{1,4})(?:\s*(?:из|эп|ep|сер|of|from))(?=$|[^\d])/i;
        const sm2 = /(?:эп|ep|сер|серия)\s*(\d{1,4})(?=$|[^\d])/i;
        
        const r_sm = sm.exec(inside) || sm2.exec(inside);
        if (r_sm) {
          const e = toInt(r_sm[1]);
          if (isPlausibleEpisode(e)) {
            episodeCandidates.push({
              episode: e,
              base: 65,
              name: "bracket single"
            });
          }
        }
      }
    }
  
    // 2) "Сезон: 5 / Серии: 1-4 из 8", "5 сезон: 1-7 серии из 8", укр "Сезон 5, серії 1-7"
  
    // Сезон: 5 / Сезоны 1-4 / Season 5 / Season: 5
    {
      const reList = [
        // NB: \b в JS НЕ unicode-friendly (кириллица не считается \w), поэтому для RU/UA используем \p{L}\p{N}
        // Самый надёжный RU/UA-формат: "5 сезон ..."
        { re: /(?:^|[^\p{L}\p{N}])(\d{1,2})(?:\s*[-]\s*(\d{1,2}))?\s*сезон(?:а|ы|ів)?(?=$|[^\p{L}\p{N}])/iu, base: 75, name: "N сезон" },
  
        // "Сезон 5" или "Сезоны 1-4"
        { re: /(?:^|[^\p{L}\p{N}])сезон(?:а|ы|и|ів)?\s*(\d{1,2})(?:\s*[-]\s*(\d{1,2}))?(?=$|[^\p{L}\p{N}])/iu, base: 70, name: "Сезон N" },
  
        // "Сезон: 5" (ВАЖНО: не путать с "5 сезон: 1-7 серии", где после двоеточия идут серии)
        { re: /(?:^|[^\p{L}\p{N}])сезон(?:а|ы|и|ів)?\s*:\s*(\d{1,2})(?:\s*[-]\s*(\d{1,2}))?/iu, base: 66, name: "Сезон: N" },
        { re: /\bseason\s*[: ]\s*(\d{1,2})(?:\s*[-]\s*(\d{1,2}))?\b/i, base: 55, name: "Season:" },
        { re: /\bseason\s*(\d{1,2})\b/i, base: 52, name: "Season N" },
        // В квадратных скобках [S01] - очень надежно
        { re: /\[\s*s(\d{1,2})\s*\]/i, base: 80, name: "[Sxx]" },
        { re: /\bs(\d{1,2})\b/i, base: 50, name: "Sxx (season-only)" }, // например "Stranger Things S05 ..."
      ];
  
      for (const { re, base, name } of reList) {
        const m = re.exec(title);
        if (!m) continue;
        // Пост-фильтр только для "Сезон: N": если сразу после матча идёт "серии/episodes" БЕЗ разделителей вроде "/" или "|" — это не сезон.
        if (name === "Сезон: N") {
          const afterMatch = title.slice(m.index + m[0].length, m.index + m[0].length + 20).toLowerCase();
          // Если сразу идет "серии", то это скорее всего "Сезон: 1-8 серии" (где 1-8 это серии, а не сезон)
          // Но если есть разделитель типа "/" или ",", то "Сезон: 1 / Серии: 1-8" — это сезон.
          if (/^[\s]* (сер|series|episode|эпиз)/i.test(afterMatch)) continue;
        }
  
        const s1 = toInt(m[1]);
        const s2 = toInt(m[2]);
        if (s1 == null) continue;
        const r = mkRange(s1, s2);
        seasonCandidates.push({
          season: r?.start ?? null,
          seasonRange: r && r.end !== r.start ? r : undefined,
          base,
          name,
        });
      }
    }
  
    // Эпизоды/серии: 1-4, "1-7 серии из 8", "9 серия"
    {
      const reList = [
        { re: /(?:^|[^\p{L}\p{N}])(?:серии|серія|серії|эпизод(?:ы)?|episodes|эп\.?)\s*[: ]?\s*(\d{1,4})(?:\s*[-]\s*(\d{1,4}))?(?=$|[^\p{L}\p{N}])/iu, base: 60, name: "серии" },
        { re: /(?:^|[^\p{L}\p{N}])(\d{1,4})(?:\s*[-]\s*(\d{1,4}))?\s*(?:серии|серія|серії|эпизод(?:ы)?|эп\.?)(?=$|[^\p{L}\p{N}])/iu, base: 62, name: "1-4 серии" },
        // Диапазон + "серия" в единственном числе: "928-929 серия"
        { re: /(?:^|[^\p{L}\p{N}])(\d{1,4})\s*[-]\s*(\d{1,4})\s*серия(?=$|[^\p{L}\p{N}])/iu, base: 62, name: "1-4 серия" },
        { re: /(?:^|[^\p{L}\p{N}])(\d{1,4})\s*(?:серия|серія)(?=$|[^\p{L}\p{N}])/iu, base: 54, name: "N серия" },
        // Формат "из N серий" или "из N"
        { re: /(?:серии|серії)\s*(\d{1,4})\s*из\s*(\d{1,4})/iu, base: 65, name: "серии X из Y" },
      ];
  
      for (const { re, base, name } of reList) {
        const m = re.exec(title);
        if (!m) continue;
        const e1 = toInt(m[1]);
        const e2 = toInt(m[2]);
        if (e1 == null) continue;
        const r = mkRange(e1, e2);
        episodeCandidates.push({
          episode: r?.start ?? null,
          episodeRange: r && r.end !== r.start ? r : undefined,
          base,
          name,
        });
      }
    }
  
    // Собираем лучший сезон и лучшие серии и объединяем
    const bestSeason = seasonCandidates.sort((a, b) => b.base - a.base)[0] || null;
    const bestEpisode = episodeCandidates.sort((a, b) => b.base - a.base)[0] || null;
  
    if (bestSeason || bestEpisode) {
      const season = bestSeason?.season ?? null;
      const episode = bestEpisode?.episode ?? null;
      const seasonRange = bestSeason?.seasonRange;
      const episodeRange = bestEpisode?.episodeRange;
  
      // Лёгкая защита от ложных срабатываний по году: если сезон вдруг "2025" — выкинем.
      const finalSeason =
        season != null && isPlausibleSeason(season) ? season : null;
  
      const finalEpisode =
        episode != null && isPlausibleEpisode(episode) ? episode : null;
  
      const episodesCount =
        episodeRange ? (episodeRange.end - episodeRange.start + 1) : (finalEpisode != null ? 1 : null);
  
      const src = [bestSeason?.name, bestEpisode?.name].filter(Boolean).join(" + ") || "heuristic";
  
      return {
        season: finalSeason,
        seasonRange,
        episode: finalEpisode,
        episodeRange,
        episodesTotal: episodeTotal,
        episodesCount,
        source: src,
        confidence: scoreCandidate({
          season: finalSeason,
          seasonRange,
          episode: finalEpisode,
          episodeRange,
          base: Math.max(bestSeason?.base ?? 0, bestEpisode?.base ?? 0),
          title
        }),
      };
    }
  
    return { season: null, episode: null, source: "none", confidence: 0 };
  }

    /**
     * Определение битрейта (Мбит/с)
     */
    function getBitrate(item, movie, isSerial = false, fallbackEpCount = 1) {
        const title = item.Title || item.title || '';
        const size = item.Size || item.size_bytes || 0;
        
        // 1. Сначала пробуем из ffprobe (самый точный)
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            const video = item.ffprobe.find(s => s.codec_type === 'video');
            if (video) {
                if (video.tags && video.tags.BPS) {
                    const bps = parseInt(video.tags.BPS, 10);
                    if (!isNaN(bps) && bps > 0) return Math.round(bps / 1000000);
                }
                if (video.bit_rate) {
                    const bitrate = parseInt(video.bit_rate, 10);
                    if (!isNaN(bitrate) && bitrate > 0) return Math.round(bitrate / 1000000);
                }
            }
        }
        
        // 2. РАСЧЕТ ИЗ РАЗМЕРА И ДЛИТЕЛЬНОСТИ
        let runtime = movie?.runtime || movie?.duration || movie?.episode_run_time;
        
        // Если runtime - это массив (часто у сериалов), берем среднее или первое значение
        if (Array.isArray(runtime)) {
            runtime = runtime.length > 0 ? runtime[0] : 0;
        }
        
        // Дефолт для сериалов, если длительность совсем не указана
        if (!runtime && isSerial) runtime = 45;

        if (size > 0 && runtime > 0) {
            let epCount = 1;
            
            // МАГИЯ ПАКОВ ВКЛЮЧАЕТСЯ ТОЛЬКО ДЛЯ СЕРИАЛОВ
            if (isSerial && typeof extractSeasonEpisode === 'function') {
                const epInfo = extractSeasonEpisode(title);
                
                if (epInfo && epInfo.episodesCount && epInfo.episodesCount > 1) {
                    epCount = epInfo.episodesCount;
                } else if (fallbackEpCount > 1) {
                    const is4K = /\b2160p\b|4k\b/i.test(title);
                    const threshold = is4K ? 30 * 1024 * 1024 * 1024 : 10 * 1024 * 1024 * 1024;
                    if (size > threshold) {
                        epCount = fallbackEpCount;
                    }
                }
            }

            const totalSeconds = (runtime * 60) * epCount;
            const bitSize = size * 8;
            const mbps = Math.round((bitSize / Math.pow(1000, 2)) / totalSeconds);
            
            // Сохраняем защиту от аномалий, но делаем кап настраиваемым через конфиг
            const cap = USER_CONFIG?.scoring_rules?.bitrate_bonus?.max_mbps_cap;
            const maxCap = typeof cap === 'number' && cap > 0 ? cap : 150;
            if (mbps > 0) return Math.min(mbps, maxCap);
        }
        
        // 3. Из поля bitrate торрента (если есть)
        if (item.bitrate) {
            const match = String(item.bitrate).match(/(\d+\.?\d*)/);
            if (match) return Math.round(parseFloat(match[1]));
        }
        
        // 4. Из названия торрента
        const bitrateMatch = title.match(/(\d+\.?\d*)\s*(?:Mbps|Мбит)/i);
        if (bitrateMatch) return Math.round(parseFloat(bitrateMatch[1]));
        
        return 0;
    }

    /**
     * Сборка всех features торрента
     */
    /**
     * Сборка всех features торрента
     */
    function buildFeatures(item, movie, isSerial = false, fallbackEpCount = 1) {
        const title = (item.Title || item.title || '').toLowerCase();
        const foundAudio = [];

        // 1. Собираем озвучки из ffprobe
        if (item.ffprobe && Array.isArray(item.ffprobe)) {
            const audioTracks = item.ffprobe.filter(s => s.codec_type === 'audio');
            audioTracks.forEach(track => {
                const analyzed = analyzeAudioTrack(track);
                analyzed.forEach(type => {
                    if (!foundAudio.includes(type)) foundAudio.push(type);
                });
            });
        }

        // 2. Дополняем озвучками из названия
        AUDIO_TRACKS.forEach(tr => {
            if (foundAudio.includes(tr.id)) return;

            // Для общего "Дубляж" из названия не пытаемся угадать язык/студию (слишком много ложных срабатываний)
            if (tr.id === 0 || tr.id === 1) return;

            const aliases = Array.isArray(tr.aliases) ? tr.aliases : [];
            const match = aliases.some(alias => matchAliasInText(title, alias));
            if (match) foundAudio.push(tr.id);
        });

        return {
            resolution: detectResolution(item),
            hdr_type: detectHdr(item),
            audio_tracks: foundAudio,
            audio_quality: detectAudioQuality(item),
            bitrate: getBitrate(item, movie, isSerial, fallbackEpCount)
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 3: МАГИЯ СКОРИНГА И РЕКОМЕНДАЦИЙ
    // ═══════════════════════════════════════════════════════════════════

    const AUDIO_LANGUAGES = {
        'rus': ['rus', 'ru', 'russian'],
        'ukr': ['ukr', 'ua', 'ukrainian'],
        'eng': ['eng', 'en', 'english', 'und']
    };

    // Быстрый маппинг "любой код языка" -> канонический ключ (rus/ukr/eng)
    const AUDIO_LANG_CANON_BY_CODE = (() => {
        const map = Object.create(null);
        Object.keys(AUDIO_LANGUAGES).forEach(k => {
            (AUDIO_LANGUAGES[k] || []).forEach(code => {
                map[String(code).toLowerCase()] = k;
            });
        });
        // канонические ключи тоже считаем валидными
        Object.keys(AUDIO_LANGUAGES).forEach(k => (map[k] = k));
        return map;
    })();

    function canonicalizeAudioLanguage(lang) {
        if (!lang) return null;
        const s = String(lang).toLowerCase();
        return AUDIO_LANG_CANON_BY_CODE[s] || s;
    }

    function getAllowedAudioLanguagesSet() {
        const arr = USER_CONFIG && USER_CONFIG.preferences && Array.isArray(USER_CONFIG.preferences.languages)
            ? USER_CONFIG.preferences.languages
            : [];
        const set = new Set();
        arr.forEach(l => {
            const c = canonicalizeAudioLanguage(l);
            if (c) set.add(c);
        });
        return set;
    }

    /**
     * Единая модель "озвучек" (аудио-треков).
     * Важно: одна и та же студия может встречаться в разных языках.
     *
     * - id: стабильный ключ (используется внутри features)
     * - type: DVO/MVO/AVO/PRO/ORIG и т.п.
     * - name: отображаемое имя
     * - aliases: алиасы/маркерные строки (для распознавания из ffprobe/title)
     * - languages: список языков (ISO-639-2/коды)
     */
    const AUDIO_TRACKS = [
        { id: 0, type: 'DVO', name: 'Дубляж RU', aliases: ['дб', 'дубляж', 'dub'], languages: ['rus'] },
        { id: 1, type: 'DVO', name: 'Дубляж UKR', aliases: ['ukr', 'ua', 'укр', 'укра', 'дубляж'], languages: ['ukr'] },

        { id: 2, type: 'DVO', name: 'Дубляж Пифагор', aliases: ['пифагор'], languages: ['rus'] },
        { id: 3, type: 'DVO', name: 'Дубляж Red Head Sound', aliases: ['red head sound', 'rhs'], languages: ['rus'] },
        { id: 4, type: 'DVO', name: 'Дубляж Videofilm', aliases: ['videofilm'], languages: ['rus'] },
        { id: 5, type: 'DVO', name: 'Дубляж MovieDalen', aliases: ['moviedalen'], languages: ['rus'] },
        { id: 6, type: 'DVO', name: 'Дубляж LeDoyen', aliases: ['ledoyen'], languages: ['rus'] },
        { id: 7, type: 'DVO', name: 'Дубляж Whiskey Sound', aliases: ['whiskey sound'], languages: ['rus'] },
        { id: 8, type: 'DVO', name: 'Дубляж IRON VOICE', aliases: ['iron voice'], languages: ['rus'] },
        { id: 9, type: 'DVO', name: 'Дубляж AlexFilm', aliases: ['alexfilm'], languages: ['rus'] },
        { id: 10, type: 'DVO', name: 'Дубляж Amedia', aliases: ['amedia'], languages: ['rus'] },

        { id: 11, type: 'MVO', name: 'MVO HDRezka', aliases: ['hdrezka', 'rezka', 'hdrezka studio', 'rezka studio'], languages: ['rus', 'ukr'] },
        { id: 12, type: 'MVO', name: 'MVO LostFilm', aliases: ['lostfilm', 'lf'], languages: ['rus'] },
        { id: 13, type: 'MVO', name: 'MVO TVShows', aliases: ['tvshows', 'tv shows'], languages: ['rus'] },
        { id: 14, type: 'MVO', name: 'MVO Jaskier', aliases: ['jaskier', 'жаскир'], languages: ['rus'] },
        { id: 15, type: 'MVO', name: 'MVO RuDub', aliases: ['rudub'], languages: ['rus'] },
        { id: 16, type: 'MVO', name: 'MVO LE-Production', aliases: ['le-production', 'le production'], languages: ['rus'] },
        { id: 17, type: 'MVO', name: 'MVO Кубик в Кубе', aliases: ['кубик в кубе'], languages: ['rus'] },
        { id: 18, type: 'MVO', name: 'MVO NewStudio', aliases: ['newstudio', 'new studio', 'нью студио'], languages: ['rus'] },
        { id: 19, type: 'MVO', name: 'MVO Good People', aliases: ['good people'], languages: ['rus'] },
        { id: 20, type: 'MVO', name: 'MVO IdeaFilm', aliases: ['ideafilm', 'idea film'], languages: ['rus'] },
        { id: 21, type: 'MVO', name: 'MVO AMS', aliases: ['ams'], languages: ['rus'] },
        { id: 22, type: 'MVO', name: 'MVO Baibako', aliases: ['baibako'], languages: ['rus'] },
        { id: 23, type: 'MVO', name: 'MVO Profix Media', aliases: ['profix media', 'profix'], languages: ['rus'] },
        { id: 24, type: 'MVO', name: 'MVO NewComers', aliases: ['newcomers', 'new comers'], languages: ['rus'] },
        { id: 25, type: 'MVO', name: 'MVO GoLTFilm', aliases: ['goltfilm', 'golt film'], languages: ['rus'] },
        { id: 26, type: 'MVO', name: 'MVO JimmyJ', aliases: ['jimmyj', 'jimmy j'], languages: ['rus'] },
        { id: 27, type: 'MVO', name: 'MVO Kerob', aliases: ['kerob'], languages: ['rus'] },
        { id: 28, type: 'MVO', name: 'MVO LakeFilms', aliases: ['lakefilms', 'lake films'], languages: ['rus'] },
       
        { id: 29, type: 'MVO', name: 'MVO Twister', aliases: ['twister'], languages: ['rus'] },
        { id: 30, type: 'MVO', name: 'MVO Voice Project', aliases: ['voice project'], languages: ['rus'] },
        { id: 31, type: 'MVO', name: 'MVO Dragon Money Studio', aliases: ['dragon money', 'dms'], languages: ['rus'] },
        { id: 32, type: 'MVO', name: 'MVO Syncmer', aliases: ['syncmer'], languages: ['rus'] },
        { id: 33, type: 'MVO', name: 'MVO ColdFilm', aliases: ['coldfilm', 'cold film'], languages: ['rus'] },
        { id: 34, type: 'MVO', name: 'MVO SunshineStudio', aliases: ['sunshinestudio', 'sunshine studio'], languages: ['rus'] },
        { id: 35, type: 'MVO', name: 'MVO Ultradox', aliases: ['ultradox'], languages: ['rus'] },
        { id: 36, type: 'MVO', name: 'MVO Octopus', aliases: ['octopus'], languages: ['rus'] },
        { id: 37, type: 'MVO', name: 'MVO OMSKBIRD', aliases: ['omskbird records', 'omskbird'], languages: ['rus'] },

        { id: 38, type: 'AVO', name: 'AVO Володарский', aliases: ['володарский'], languages: ['rus'] },
        { id: 39, type: 'AVO', name: 'AVO Яроцкий', aliases: ['яроцкий', 'м. яроцкий'], languages: ['rus'] },
        { id: 40, type: 'AVO', name: 'AVO Сербин', aliases: ['сербин', 'ю. сербин'], languages: ['rus'] },

        { id: 41, type: 'PRO', name: 'PRO Gears Media', aliases: ['gears media'], languages: ['rus'] },
        { id: 42, type: 'PRO', name: 'PRO Hamsterstudio', aliases: ['hamsterstudio', 'hamster'], languages: ['rus'] },
        { id: 43, type: 'PRO', name: 'PRO P.S.Energy', aliases: ['p.s.energy', 'ps energy', 'p s energy'], languages: ['rus'] },

        { id: 44, type: 'UKR', name: 'UKR НеЗупиняйПродакшн', aliases: ['незупиняйпродакшн', 'незупиняй', 'nezupyniai'], languages: ['ukr'] },

        { id: 45, type: 'ORIG', name: 'Original', aliases: ['original', 'eng', 'english'], languages: ['eng'] }
    ];

    // Оптимизация: используем Map под числовые id и быстрый поиск по name
    const AUDIO_TRACK_BY_ID = new Map();              // id:number -> track
    const AUDIO_TRACK_ID_BY_NAME = new Map();         // nameLower:string -> id:number
    const AUDIO_TRACK_NAMES = new Set();              // name:string

    AUDIO_TRACKS.forEach(t => {
        AUDIO_TRACK_BY_ID.set(t.id, t);
        AUDIO_TRACK_ID_BY_NAME.set(String(t.name || '').toLowerCase(), t.id);
        AUDIO_TRACK_NAMES.add(t.name);
    });

    function normalizeAudioTrackIdOrNull(key) {
        if (key === null || key === undefined) return null;

        // Уже числовой id
        if (typeof key === 'number' && Number.isFinite(key)) {
            return AUDIO_TRACK_BY_ID.has(key) ? key : null;
        }

        const s = String(key).trim();
        if (!s) return null;

        // Строковый числовой id
        if (/^\d+$/.test(s)) {
            const n = parseInt(s, 10);
            return AUDIO_TRACK_BY_ID.has(n) ? n : null;
        }

        // Имя трека из конфига
        const byName = AUDIO_TRACK_ID_BY_NAME.get(s.toLowerCase());
        return (typeof byName === 'number') ? byName : null;
    }

    function matchAliasInText(text, alias) {
        if (!text || !alias) return false;
        const t = String(text).toLowerCase();
        const a = String(alias).toLowerCase();
        if (!a) return false;

        // Короткие алиасы — только как отдельное слово
        if (a.length <= 3) {
            const escaped = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            try {
                const re = new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'iu');
                return re.test(t);
            } catch (e) {
                const re = new RegExp(`(?:^|[^a-z0-9_])${escaped}(?=$|[^a-z0-9_])`, 'i');
                return re.test(t);
            }
        }
        return t.includes(a);
    }

    /**
     * Сопоставление аудио-дорожки с типом из приоритета
     */
    function matchesAudioType(audioTrack, type) {
        if (!audioTrack || !type) return false;

        const trackId = normalizeAudioTrackIdOrNull(audioTrack);
        const wantedId = normalizeAudioTrackIdOrNull(type);

        // 1) Если оба значения нормализовались в id — сравниваем по id
        if (trackId !== null && wantedId !== null) return trackId === wantedId;

        // 2) Если приоритет не распознан — совпадение невозможно
        if (wantedId === null) return false;

        // 3) Backward-compat: если пришла "сырая" строка (не id/не name), пробуем сматчить по алиасам нужного трека
        const wanted = AUDIO_TRACK_BY_ID.get(wantedId);
        if (!wanted) return false;

        const raw = String(audioTrack).toLowerCase();
        return (wanted.aliases || []).some(alias => matchAliasInText(raw, alias));
    }

    /**
     * Анализирует ffprobe теги аудио дорожки
     */
    function analyzeAudioTrack(track) {
        const tags = track.tags || {};
        const title = (tags.title || tags.handler_name || '').toLowerCase();
        const langRaw = (tags.language || '').toLowerCase();
        const lang = canonicalizeAudioLanguage(langRaw);
        const foundTypes = [];
        const allowedLangs = getAllowedAudioLanguagesSet();

        // Если язык трека известен и он НЕ входит в разрешённые — не учитываем этот трек для скоринга озвучек.
        if (lang && allowedLangs.size && !allowedLangs.has(lang)) {
            return foundTypes;
        }

        AUDIO_TRACKS.forEach(tr => {
            const aliases = Array.isArray(tr.aliases) ? tr.aliases : [];
            const langs = Array.isArray(tr.languages) ? tr.languages : [];

            // Если язык известен — требуем совместимость по языку
            if (lang && langs.length) {
                const okLang = langs.some(l => String(l).toLowerCase() === lang);
                if (!okLang) return;
            }

            // Сначала: алиас == lang (например 'ukr'), допускаем и raw-синонимы
            const langMatch = lang
                ? aliases.some(a => {
                    const al = String(a).toLowerCase();
                    return al === lang || (langRaw && al === langRaw);
                })
                : false;
            // Потом: алиасы в названии/handler
            const textMatch = aliases.some(a => matchAliasInText(title, a));

            if (langMatch || textMatch) foundTypes.push(tr.id);
        });
        
        return foundTypes;
    }

    /**
     * Движок подсчета очков на основе USER_CONFIG
     */
    function buildConfigBasedScorer() {
        const cfg = USER_CONFIG;
        const rules = cfg.scoring_rules;
        
        return function calculateScore(torrent) {
            let score = typeof rules.base_score === 'number' ? rules.base_score : 100;
            const features = torrent.features;
            const seeds = torrent.Seeds || torrent.seeds || torrent.Seeders || torrent.seeders || 0;
            
            let breakdown = {
                base: score,
                resolution: 0,
                hdr: 0,
                bitrate: 0,
                availability: 0,
                audio_track: 0,
                audio_quality: 0,
                special: 0
            };

            // 1) РЕЗОЛЮЦИЯ (значения уже финальные, визард их взвесил)
            const resScore = (rules.resolution && (rules.resolution[features.resolution] || rules.resolution[String(features.resolution)])) || 0;
            breakdown.resolution = resScore;
            score += resScore;
            
            // 2) HDR (значения уже финальные)
            let hdrScore = (rules.hdr && rules.hdr[features.hdr_type]) || 0;
            breakdown.hdr = hdrScore;
            score += hdrScore;
            
            // 3) БИТРЕЙТ (thresholds.bonus уже финальные)
            let bitrateScore = 0;
            
            if (features.bitrate > 0) {
                const thresholds = (rules.bitrate_bonus && Array.isArray(rules.bitrate_bonus.thresholds)) ? rules.bitrate_bonus.thresholds : [];
                for (const threshold of thresholds) {
                    if (features.bitrate >= threshold.min && features.bitrate < threshold.max) {
                        bitrateScore = threshold.bonus || 0;
                        break;
                    }
                }
            } else {
                // Нет данных битрейта — штраф задаётся визардом
                bitrateScore = (rules.bitrate_bonus && typeof rules.bitrate_bonus.missing_penalty === 'number')
                    ? rules.bitrate_bonus.missing_penalty
                    : 0;
            }
            breakdown.bitrate = bitrateScore;
            score += bitrateScore;
            
            // 4) ОЗВУЧКА (нормализованный вклад, не зависит от длины списка)
            // Важно: здесь ожидаются ТОЛЬКО числовые id (и в cfg.audio_track_priority, и в features.audio_tracks).
            const audioPriority = Array.isArray(cfg.audio_track_priority) ? cfg.audio_track_priority : [];
            const audioTracks = Array.isArray(features.audio_tracks) ? features.audio_tracks : [];
            let audioScore = 0;

            if (audioPriority.length && audioTracks.length) {
                const trackSet = new Set(audioTracks.filter(v => typeof v === 'number' && Number.isFinite(v)));

                for (let i = 0; i < audioPriority.length; i++) {
                    const id = audioPriority[i];
                    if (!(typeof id === 'number' && Number.isFinite(id))) continue;
                    if (!trackSet.has(id)) continue;

                    const maxPoints = rules.audio_track && typeof rules.audio_track.max_points === 'number'
                        ? rules.audio_track.max_points
                        : 0;
                    const n = audioPriority.length;
                    const factor = n <= 1 ? 1 : (1 - (i / (n - 1))); // 1..0
                    audioScore = maxPoints * factor;
                    break;
                }
            }
            breakdown.audio_track = audioScore;
            score += audioScore;

            // 5) КАЧЕСТВО ЗВУКА (каналы/Atmos)
            const aqType = features.audio_quality || 'unknown';
            const aqPoints = (rules.audio_quality && rules.audio_quality.points && typeof rules.audio_quality.points[aqType] === 'number')
                ? rules.audio_quality.points[aqType]
                : ((rules.audio_quality && rules.audio_quality.points && typeof rules.audio_quality.points.unknown === 'number') ? rules.audio_quality.points.unknown : 0);
            breakdown.audio_quality = aqPoints;
            score += aqPoints;

            // 6) ДОСТУПНОСТЬ (СИДЫ) — полностью задаётся в rules.availability
            let availScore = 0;
            const minSeeds = (rules.availability && typeof rules.availability.min_seeds === 'number')
                ? rules.availability.min_seeds
                : (cfg.preferences?.min_seeds || 1);

            if (seeds < minSeeds) {
                availScore = (rules.availability && typeof rules.availability.below_min_penalty === 'number')
                    ? rules.availability.below_min_penalty
                    : 0;
            } else {
                const mul = (rules.availability && typeof rules.availability.log10_multiplier === 'number')
                    ? rules.availability.log10_multiplier
                    : 0;
                availScore = Math.log10(seeds + 1) * mul;
            }
            breakdown.availability = availScore;
            score += availScore;

            // 7) SPECIAL RULES (если визард их положил)
            if (Array.isArray(rules.special_rules) && rules.special_rules.length) {
                let special = 0;
                for (const rule of rules.special_rules) {
                    if (!rule || typeof rule !== 'object') continue;
                    const cond = rule.if || rule.when;
                    if (!cond || typeof cond !== 'object') continue;

                    let ok = true;
                    if (typeof cond.resolution === 'number') ok = ok && (features.resolution === cond.resolution);
                    if (typeof cond.bitrate_min === 'number') ok = ok && (features.bitrate >= cond.bitrate_min);
                    if (typeof cond.seeds_min === 'number') ok = ok && (seeds >= cond.seeds_min);
                    if (typeof cond.hdr_type === 'string') ok = ok && (features.hdr_type === cond.hdr_type);
                    if (typeof cond.audio_quality === 'string') ok = ok && ((features.audio_quality || 'unknown') === cond.audio_quality);

                    if (ok) special += (typeof rule.bonus === 'number' ? rule.bonus : 0);
                }
                breakdown.special = special;
                score += special;
            }
            
            score = Math.max(0, Math.round(score));
            
            // Отладочный вывод
            if (Lampa.Storage.get('easytorrent_show_scores', false)) {
                const title = (torrent.Title || torrent.title || '').substring(0, 80);
                console.log('[Score]', title, {
                    total: score,
                    breakdown,
                    features: {
                        resolution: features.resolution,
                        hdr_type: features.hdr_type,
                        bitrate: features.bitrate,
                        audio_tracks: features.audio_tracks,
                        audio_quality: features.audio_quality
                    },
                    seeds,
                    // paramPriority оставляем только для диагностики/UX, скоринг от него напрямую не зависит
                    paramPriority: (cfg.parameter_priority || []).slice(0, 3)
                });
            }
            
            return { score, breakdown };
        };
    }

    /**
     * Обработка результатов парсера: оценка, сортировка, выбор топ-N
     * ВАЖНО: Модифицируем data.Results, перемещая топ-N в начало массива
     */
    function processParserResults(data, params) {
        if (!Lampa.Storage.get('easytorrent_enabled', true)) return;
        if (!data.Results || !Array.isArray(data.Results)) return;

        console.log('[EasyTorrent] Получено от парсера:', data.Results.length, 'торрентов');

        const movie = params?.movie;
        
        /**
         * ОПРЕДЕЛЕНИЕ ТИПА КОНТЕНТА (как в ядре Lampa)
         * original_name есть только у сериалов, у фильмов - original_title
         * также проверяем наличие сезонов в объекте
         */
        const isSerial = !!(movie && (movie.original_name || movie.number_of_seasons > 0 || movie.seasons));

        // ПРЕ-СКАН: Умный поиск количества серий (ТОЛЬКО ДЛЯ СЕРИАЛОВ)
        let maxEpisodesInSet = 1;
        
        if (isSerial && typeof extractSeasonEpisode === 'function') {
            let maxCountFound = 1; // Реальные диапазоны (1-5 = 5)
            
            data.Results.forEach(el => {
                const ep = extractSeasonEpisode(el.Title || el.title || '');
                // Важно: episodesTotal ("из N") НЕ используем как количество серий в паке
                if (ep && ep.episodesCount && ep.episodesCount > maxCountFound) maxCountFound = ep.episodesCount;
            });

            maxEpisodesInSet = maxCountFound;

            if (maxEpisodesInSet > 1) {
                console.log(`[EasyTorrent] Режим сериала. Анализ: Макс-диапазон серий в паке=${maxCountFound}. Используем=${maxEpisodesInSet}`);
            }
        }

        const calculateScore = buildConfigBasedScorer();

        // Оцениваем все торренты
        const scored = data.Results.map((element, index) => {
            // Передаем флаг isSerial и найденное кол-во серий
            const features = buildFeatures(element, movie, isSerial, maxEpisodesInSet);
            const result = calculateScore({ ...element, features });
            return {
                element,
                originalIndex: index,
                features,
                score: result.score,
                breakdown: result.breakdown
            };
        });

        console.log('[EasyTorrent] Все торренты оценены');

        // Сортируем по оценке
        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.features.bitrate !== a.features.bitrate) {
                return b.features.bitrate - a.features.bitrate;
            }
            const seedsA = a.element.Seeds || a.element.seeds || a.element.Seeders || a.element.seeders || 0;
            const seedsB = b.element.Seeds || b.element.seeds || b.element.Seeders || b.element.seeders || 0;
            return seedsB - seedsA;
        });

        // Консольный лог всех торрентов
        if (scored.length > 0) {
            console.log('=== ВСЕ ТОРРЕНТЫ (отсортированы по score) ===');
            scored.forEach((t, i) => {
                const seeds = t.element.Seeds || t.element.seeds || t.element.Seeders || t.element.seeders || 0;
                const bd = t.breakdown;
                const title = t.element.Title.substring(0, 100);
                
                const breakdownParts = [];
                if (bd.audio_track !== undefined && bd.audio_track !== 0) breakdownParts.push(`A:${bd.audio_track > 0 ? '+' : ''}${Math.round(bd.audio_track)}`);
                if (bd.audio_quality !== undefined && bd.audio_quality !== 0) breakdownParts.push(`AQ:${bd.audio_quality > 0 ? '+' : ''}${Math.round(bd.audio_quality)}`);
                if (bd.resolution !== undefined && bd.resolution !== 0) breakdownParts.push(`R:${bd.resolution > 0 ? '+' : ''}${Math.round(bd.resolution)}`);
                if (bd.bitrate !== undefined && bd.bitrate !== 0) breakdownParts.push(`B:${bd.bitrate > 0 ? '+' : ''}${Math.round(bd.bitrate)}`);
                if (bd.availability !== undefined && bd.availability !== 0) breakdownParts.push(`S:${bd.availability > 0 ? '+' : ''}${Math.round(bd.availability)}`);
                if (bd.hdr !== undefined && bd.hdr !== 0) breakdownParts.push(`H:${bd.hdr > 0 ? '+' : ''}${Math.round(bd.hdr)}`);
                if (bd.special !== undefined && bd.special !== 0) breakdownParts.push(`SP:${bd.special > 0 ? '+' : ''}${Math.round(bd.special)}`);
                
                const breakdownStr = breakdownParts.length > 0 ? `[${breakdownParts.join(' ')}]` : '[no breakdown]';
                
                console.log(`${i+1}. [${t.score}] ${t.features.resolution || '?'}p ${t.features.hdr_type} ${t.features.bitrate}mb Seeds:${seeds} ${breakdownStr} | ${title}`);
            });
            console.log(`=== ВСЕГО: ${scored.length} торрентов ===`);
        }

        // Фильтруем по минимальному количеству сидов
        const recommendCount = USER_CONFIG.preferences.recommendation_count || 3;
        const minSeeds = USER_CONFIG.preferences.min_seeds || 2;
        
        const eligible = scored.filter(t => {
            const seeds = t.element.Seeds || t.element.seeds || t.element.Seeders || t.element.seeders || 0;
            return seeds >= minSeeds;
        });
        
        

        // Добавляем оценку ко ВСЕМ элементам для будущего использования в фильтрах
        scored.forEach(t => {
            t.element._recommendScore = t.score;
            t.element._recommendBreakdown = t.breakdown;
            // сохраняем фичи, чтобы красиво отрисовывать в UI (резолюшн/HDR/битрейт)
            t.element._recommendFeatures = t.features;
        });

        console.log('[EasyTorrent] Все торренты промаркированы баллами');
        console.log('[EasyTorrent] Топ-рекомендации сохранены');
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 4: UI - СОЗДАНИЕ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Создание HTML breakdown для бейджей
     */
    function createBreakdownHTML(breakdown) {
        if (!breakdown || Object.keys(breakdown).length === 0) return '';

        const wrap = $('<div class="torrent-recommend-panel__chips"></div>');

        const items = [
            { key: 'audio_track', name: 'Озвучка' },
            { key: 'audio_quality', name: 'Звук' },
            { key: 'resolution', name: 'Разреш.' },
            { key: 'bitrate', name: 'Битрейт' },
            { key: 'availability', name: 'Сиды' },
            { key: 'hdr', name: 'HDR' },
            { key: 'special', name: 'Бонус' }
        ];

        items.forEach(it => {
            if (breakdown[it.key] === undefined || breakdown[it.key] === 0) return;

            const value = Math.round(breakdown[it.key]);
            const sign = value > 0 ? '+' : '';
            const cls = value >= 0 ? 'tr-chip--pos' : 'tr-chip--neg';

            wrap.append(`
                <div class="tr-chip ${cls}">
                    <span class="tr-chip__name">${it.name}</span>
                    <span class="tr-chip__val">${sign}${value}</span>
                </div>
            `);
        });

        return wrap;
    }

    /**
     * Добавление бейджей к торрентам в основном списке
     */
    function onTorrentRender(data) {
        if (!Lampa.Storage.get('easytorrent_enabled', true)) return;

        const { element, item } = data;
        const showScores = Lampa.Storage.get('easytorrent_show_scores', true);

        if (typeof element._recommendRank === 'undefined') return;

        item.find('.torrent-recommend-badge').remove(); // legacy
        item.find('.torrent-recommend-panel').remove();

        const rank = element._recommendRank;
        const score = element._recommendScore;
        const breakdown = element._recommendBreakdown || {};
        const recommendCount = USER_CONFIG.preferences.recommendation_count || 3;

        // Показываем панель: всегда для топ-N, и (опционально) для остальных если включены оценки
        const shouldShowPanel = element._recommendIsIdeal || rank < recommendCount || showScores;
        if (!shouldShowPanel) return;

        const features = element._recommendFeatures || {};
        const hdrMap = {
            dolby_vision: 'DV',
            hdr10plus: 'HDR10+',
            hdr10: 'HDR10',
            sdr: 'SDR'
        };

        const metaParts = [];
        if (features.resolution) metaParts.push(`${features.resolution}p`);
        if (features.hdr_type) metaParts.push(hdrMap[features.hdr_type] || String(features.hdr_type).toUpperCase());
        if (features.bitrate) metaParts.push(`${features.bitrate} Mbps`);

        let variant = 'neutral';
        let label = '';
        if (element._recommendIsIdeal) {
            variant = 'ideal';
            label = t('ideal_badge');
        } else if (rank < recommendCount) {
            variant = 'recommended';
            label = `${t('recommended_badge')} • #${rank + 1}`;
        } else {
            variant = 'neutral';
            label = 'Оценка';
        }

        const panel = $(`<div class="torrent-recommend-panel torrent-recommend-panel--${variant}"></div>`);

        const left = $(`<div class="torrent-recommend-panel__left"></div>`);
        left.append(`<div class="torrent-recommend-panel__label">${label}</div>`);
        if (metaParts.length) left.append(`<div class="torrent-recommend-panel__meta">${metaParts.join(' • ')}</div>`);

        const right = $(`<div class="torrent-recommend-panel__right"></div>`);
        if (showScores && typeof score !== 'undefined') {
            right.append(`<div class="torrent-recommend-panel__score">${score}</div>`);
        }

        panel.append(left);

        if (showScores) {
            const chips = createBreakdownHTML(breakdown);
            if (chips) panel.append(chips);
        }

        panel.append(right);

        // Приклеиваем к низу карточки, как "родной" футер
        item.append(panel);
    }

    /**
     * Добавление CSS стилей
     */
    function addStyles() {
        const css = `
/* Панель рекомендаций (футер внутри .torrent-item) */
.torrent-recommend-panel{
    display: flex;
    align-items: center;
    gap: 0.9em;
    margin: 0.8em -1em -1em;        /* "приклеиваем" к краям карточки */
    padding: 0.75em 1em 0.85em;
    border-radius: 0 0 0.3em 0.3em; /* совпадает с torrent-item */
    border-top: 1px solid rgba(255,255,255,0.10);
    background: rgba(0,0,0,0.18);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}

.torrent-recommend-panel__left{
    min-width: 0;
    flex: 1 1 auto;
}

.torrent-recommend-panel__label{
    font-size: 0.95em;
    font-weight: 800;
    letter-spacing: 0.2px;
    color: rgba(255,255,255,0.92);
    line-height: 1.15;
}

.torrent-recommend-panel__meta{
    margin-top: 0.25em;
    font-size: 0.82em;
    font-weight: 600;
    color: rgba(255,255,255,0.58);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.torrent-recommend-panel__right{
    flex: 0 0 auto;
    display: flex;
    align-items: center;
}

.torrent-recommend-panel__score{
    font-size: 1.05em;
    font-weight: 900;
    padding: 0.25em 0.55em;
    border-radius: 0.6em;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.95);
}

/* Чипсы breakdown */
.torrent-recommend-panel__chips{
    display: flex;
    flex: 2 1 auto;
    gap: 0.45em;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.torrent-recommend-panel__chips:empty{
    display: none;
}

.tr-chip{
    display: inline-flex;
    align-items: baseline;
    gap: 0.35em;
    padding: 0.28em 0.55em;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.10);
}

.tr-chip__name{
    font-size: 0.78em;
    font-weight: 700;
    color: rgba(255,255,255,0.60);
}

.tr-chip__val{
    font-size: 0.86em;
    font-weight: 900;
    color: rgba(255,255,255,0.92);
}

.tr-chip--pos{
    background: rgba(76,175,80,0.10);
    border-color: rgba(76,175,80,0.22);
}
.tr-chip--pos .tr-chip__val{ color: rgba(120,255,170,0.95); }

.tr-chip--neg{
    background: rgba(244,67,54,0.10);
    border-color: rgba(244,67,54,0.22);
}
.tr-chip--neg .tr-chip__val{ color: rgba(255,120,120,0.95); }

/* Варианты */
.torrent-recommend-panel--ideal{
    background: linear-gradient(135deg, rgba(255,215,0,0.16) 0%, rgba(255,165,0,0.08) 100%);
    border-top-color: rgba(255,215,0,0.20);
}
.torrent-recommend-panel--ideal .torrent-recommend-panel__label{
    color: rgba(255,235,140,0.98);
}

.torrent-recommend-panel--recommended{
    background: rgba(76,175,80,0.08);
    border-top-color: rgba(76,175,80,0.18);
}
.torrent-recommend-panel--recommended .torrent-recommend-panel__label{
    color: rgba(160,255,200,0.92);
}

/* Анимация (очень мягкая) */
.torrent-recommend-panel{
    animation: tr-panel-in 0.22s ease-out;
}
@keyframes tr-panel-in{
    from{ opacity: 0; transform: translateY(-3px); }
    to{ opacity: 1; transform: translateY(0); }
}

/* Подсветка при фокусе карточки */
.torrent-item.focus .torrent-recommend-panel{
    background: rgba(255,255,255,0.08);
    border-top-color: rgba(255,255,255,0.16);
}

/* Компакт: узкие экраны — прячем мету, оставляем чипсы и скор */
@media (max-width: 520px){
    .torrent-recommend-panel{
        gap: 0.7em;
        padding: 0.65em 0.9em 0.75em;
    }
    .torrent-recommend-panel__meta{
        display: none;
    }
}
`;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    /**
     * Добавление настроек плагина в Lampa
     */
    function addSettings() {
        if (Lampa.Storage.get('easytorrent_enabled') === undefined) {
            Lampa.Storage.set('easytorrent_enabled', true);
        }
        if (Lampa.Storage.get('easytorrent_show_scores') === undefined) {
            Lampa.Storage.set('easytorrent_show_scores', true);
        }

        Lampa.SettingsApi.addComponent({
            component: 'easytorrent',
            name: PLUGIN_NAME,
            icon: PLUGIN_ICON
        });

        // Добавляем информацию о плагине
        Lampa.SettingsApi.addParam({
            component: 'easytorrent',
            param: {
                name: 'easytorrent_about',
                type: 'static'
            },
            field: {
                name: '<div>' + PLUGIN_NAME + ' ' + VERSION + '</div>'
            },
            onRender: function(item) {
                item.css('opacity', '0.7');
                item.find('.settings-param__name').css({
                    'font-size': '1.2em',
                    'margin-bottom': '0.3em'
                });
                item.append('<div style="font-size: 0.9em; padding: 0 1.2em; line-height: 1.4;">Автор: DarkestClouds<br>Система рекомендаций торрентов на основе качества, HDR и озвучки</div>');
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'easytorrent',
            param: {
                name: 'easytorrent_enabled',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('easytorrent_title'),
                description: t('easytorrent_desc')
            },
            onChange: (value) => {
                // value приходит строкой 'true'/'false'
                if (String(value) === 'true') {
                    ensureStartupModalScheduler();
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'easytorrent',
            param: {
                name: 'easytorrent_show_scores',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('show_scores'),
                description: t('show_scores_desc')
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'easytorrent',
            param: {
                name: 'easytorrent_config_json',
                type: 'static',
                default: JSON.stringify(DEFAULT_CONFIG)
            },
            field: {
                name: t('config_json'),
                description: t('config_json_desc')
            },
            onRender: (item) => {
                const updateDisplay = () => {
                    const cfg = USER_CONFIG;
                    const summary = `${cfg.device.type.toUpperCase()} | ${cfg.parameter_priority[0]}`;
                    item.find('.settings-param__value').text(summary);
                };

                updateDisplay();

                item.on('hover:enter', () => {
                    Lampa.Select.show({
                        title: t('config_json'),
                        items: [
                            { title: t('config_view'), action: 'view' },
                            { title: t('config_edit'), action: 'edit' },
                            { title: t('config_reset'), action: 'reset' }
                        ],
                        onSelect: (a) => {
                            if (a.action === 'view') {
                                showConfigDetails();
                            } else if (a.action === 'edit') {
                                Lampa.Input.edit({
                                    value: Lampa.Storage.get('easytorrent_config_json') || JSON.stringify(DEFAULT_CONFIG),
                                    free: true
                                }, (new_value) => {
                                    if (new_value) {
                                        try {
                                            const parsed = JSON.parse(new_value);
                                            const check = validateConfig(parsed);
                                            if (!check.ok) throw new Error(check.error);

                                            saveUserConfig(new_value);
                                            updateDisplay();
                                            Lampa.Noty.show('OK');
                                        } catch (e) {
                                            Lampa.Noty.show((e && e.message) ? e.message : t('config_error'));
                                        }
                                    }
                                    Lampa.Controller.toggle('settings');
                                });
                            } else if (a.action === 'reset') {
                                // Сброс — это явное действие пользователя, применяем дефолтный валидный конфиг
                                saveUserConfig(DEFAULT_CONFIG);
                                updateDisplay();
                                Lampa.Noty.show('OK');
                                Lampa.Controller.toggle('settings');
                            }
                        },
                        onBack: () => {
                            Lampa.Controller.toggle('settings');
                        }
                    });
                });
            }
        });

        // Кнопка "Расставить приоритеты"
        Lampa.SettingsApi.addParam({
            component: 'easytorrent',
            param: {
                name: 'easytorrent_qr_setup',
                type: 'static'
            },
            field: {
                name: 'Расставить приоритеты',
                description: 'Откройте визард на телефоне через QR-код'
            },
            onRender: (item) => {
                item.on('hover:enter', () => {
                    showQRSetup();
                });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // QR-КОД И POLLING
    // ═══════════════════════════════════════════════════════════════════

    function generatePairCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    async function fetchConfigFromSupabase(id) {
        try {
            const url = `${SUPABASE_URL}/rest/v1/tv_configs?id=eq.${encodeURIComponent(id)}&select=data,updated_at`;
            
            const res = await fetch(url, {
                headers: {
                    'apikey': ANON_KEY,
                    'Authorization': `Bearer ${ANON_KEY}`
                }
            });
            
            if (!res.ok) {
                throw new Error(`Fetch failed: ${res.status}`);
            }
            
            const rows = await res.json();
            if (!rows.length) return null;
            
            return rows[0].data;
        } catch (error) {
            console.error('[EasyTorrent] Fetch error:', error);
            return null;
        }
    }

    function showQRSetup() {
        const pairCode = generatePairCode();
        const qrUrl = `${WIZARD_URL}?pairCode=${pairCode}`;
        
        // Создаём содержимое модального окна
        const modal = $(`
            <div class="about">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div id="qrCodeContainer" style="background: white; padding: 20px; border-radius: 15px; display: inline-block; margin-bottom: 20px;height: 20em;width: 20em;"></div>
                </div>
                <div class="about__text" style="text-align: center; margin-bottom: 15px;">
                    <strong>Или перейдите вручную:</strong><br>
                    <span style="word-break: break-all;">${qrUrl}</span>
                </div>
                <div class="about__text" style="text-align: center;">
                    <strong>Код сопряжения:</strong>
                    <div style="font-size: 2em; font-weight: bold; letter-spacing: 0.3em; margin: 10px 0; color: #667eea;">${pairCode}</div>
                </div>
                <div class="about__text" id="qrStatus" style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 20px;">
                    ⏳ Ожидание конфигурации...
                </div>
            </div>
        `);
        
        // Открываем модалку
        Lampa.Modal.open({
            title: '🔗 Настройка приоритетов',
            html: modal,
            size: 'medium',
            onBack: () => {
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                    pollingInterval = null;
                }
                Lampa.Modal.close();
                Lampa.Controller.toggle('settings_component');
            }
        });
        
        // Генерируем QR-код
        setTimeout(() => {
            const qrContainer = document.getElementById('qrCodeContainer');
            if (qrContainer && Lampa.Utils && Lampa.Utils.qrcode) {
                try {
                    Lampa.Utils.qrcode(qrUrl, qrContainer);
                                        } catch (e) {
                    qrContainer.innerHTML = '<p style="color: #f44336;">Ошибка генерации QR-кода</p>';
                }
            }
        }, 100);
        
        // Запускаем polling
        let lastUpdated = null;
        pollingInterval = setInterval(async () => {
            const config = await fetchConfigFromSupabase(pairCode);
            
            if (config) {
                const configUpdated = config.generated;
                if (configUpdated !== lastUpdated) {
                    lastUpdated = configUpdated;
                    
                    // Применяем конфиг
                    saveUserConfig(config);
                    
                    // Показываем успех
                    $('#qrStatus')
                        .html('✅ Конфигурация получена и применена!')
                        .css('color', '#4CAF50');
                    
                    // Закрываем через 2 секунды
                    setTimeout(() => {
                        if (pollingInterval) {
                            clearInterval(pollingInterval);
                            pollingInterval = null;
                        }
                        Lampa.Modal.close();
                        Lampa.Noty.show('Конфигурация обновлена!');
                        Lampa.Controller.toggle('settings_component');
                    }, 2000);
                }
            }
        }, 5000);
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 5: ВМЕШАТЕЛЬСТВО В UI ЯДРА (MONKEY PATCHING)
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Monkey patch парсера для перехвата результатов
     */
    function patchParser() {
        const Parser = window.Lampa.Parser || (window.Lampa.Component ? window.Lampa.Component.Parser : null);
        
        if (!Parser || !Parser.get) {
            console.log('[EasyTorrent] Parser не найден или не имеет метода get');
            return;
        }

        console.log('[EasyTorrent] Патчим Parser.get для перехвата и фиксации топов');
        
        const originalGet = Parser.get;
        
        Parser.get = function(params, oncomplite, onerror) {
            const wrappedOncomplite = function(data) {
                if (data && data.Results && Array.isArray(data.Results)) {
                    processParserResults(data, params);

                    let currentResults = data.Results;
                    
                    /**
                     * Умная функция фиксации топов внутри любого набора данных (полного или фильтрованного)
                     */
                    const forceTopItems = (items) => {
                        if (!Array.isArray(items) || items.length === 0) return items;
                        
                        // Берем топ-N на основе оценки именно в этом наборе данных
                        const recommendCount = USER_CONFIG.preferences.recommendation_count || 3;
                        const minSeeds = USER_CONFIG.preferences.min_seeds || 0;
                        
                        // СНАЧАЛА фильтруем по сидам, ПОТОМ сортируем и выбираем топ-N
                        const tops = [...items]
                            .filter(i => {
                                const seeds = i.Seeds || i.seeds || i.Seeders || i.seeders || 0;
                                return (i._recommendScore || 0) > 0 && seeds >= minSeeds;
                            })
                            .sort((a, b) => (b._recommendScore || 0) - (a._recommendScore || 0))
                            .slice(0, recommendCount);
                        
                        if (tops.length === 0) {
                            // Обнуляем ранги, если топов нет (чтобы старые бейджи не висели)
                            items.forEach(item => item._recommendRank = 999);
                            return items;
                        }

                        // Собираем итоговый массив: сначала наши рекомендации, потом всё остальное в исходном порядке
                        // ВАЖНО: здесь нельзя использовать items.filter, потому что мы патчим Array.prototype.filter
                        // для результатов. Если вызвать патченный filter внутри фиксатора, он повторно "поднимет" топы
                        // уже среди "остальных" элементов и сломает пользовательскую сортировку хвоста (Size/Seeders/etc).
                        const other = Array.prototype.filter.call(items, i => !tops.includes(i));
                        const final = [...tops, ...other];
                        
                        // ВАЖНО: Обновляем ранги для правильного отображения #1, #2, #3 в бейджах именно для текущего вида
                        final.forEach((item, index) => {
                            item._recommendRank = index;
                            item._recommendIsIdeal = index === 0 && (item._recommendScore || 0) >= 150;
                        });
                        
                        // Всем остальным ставим большой ранг
                        other.forEach(item => item._recommendRank = 999);
                        
                        return final;
                    };

                    /**
                     * Патчим методы массива, чтобы рекомендации всегда были сверху
                     */
                    const patchArrayMethods = (array) => {
                        if (!array || array._recommendPatched) return array;
                        
                        // 1. Патчим SORT (для смены сортировки пользователем)
                        const originalSort = array.sort;
                        array.sort = function() {
                            originalSort.apply(this, arguments);
                            const fixed = forceTopItems(this);
                            for (let i = 0; i < fixed.length; i++) this[i] = fixed[i];
                            return this;
                        };

                        // 2. Патчим FILTER (для выбора сезона, озвучки и т.д.)
                        const originalFilter = array.filter;
                        array.filter = function() {
                            const filteredResult = originalFilter.apply(this, arguments);
                            // Для результата фильтрации тоже применяем фиксацию топов и патчим методы
                            const fixed = forceTopItems(filteredResult);
                            return patchArrayMethods(fixed);
                        };
                        
                        array._recommendPatched = true;
                        return array;
                    };

                    // Применяем магию к основному массиву результатов
                    currentResults = patchArrayMethods(forceTopItems(currentResults));

                    try {
                        Object.defineProperty(data, 'Results', {
                            get: () => currentResults,
                            set: (v) => {
                                currentResults = patchArrayMethods(forceTopItems(v));
                            },
                            configurable: true,
                            enumerable: true
                        });
                        console.log('[EasyTorrent] Умная контекстная фильтрация активирована');
                    } catch (e) {
                        console.log('[EasyTorrent] Ошибка при фиксации топов:', e);
                    }
                }
                
                return oncomplite.apply(this, arguments);
            };

            return originalGet.call(this, params, wrappedOncomplite, onerror);
        };

        console.log('[EasyTorrent] Parser.get пропатчен!');
    }

    /**
     * Подписка на события Lampa
     */
    function subscribeToEvents() {
        // Подписываемся на событие render каждого торрента для добавления бейджей
        Lampa.Listener.follow('torrent', (data) => {
            if (data.type === 'render') {
                onTorrentRender(data);
            }
        });

        // Сброс при открытии новой страницы торрентов
        Lampa.Listener.follow('activity', (data) => {
            if (data.type === 'start' && data.component === 'torrents') {
                console.log('[EasyTorrent] Новая страница торрентов');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 6: ГЛАВНАЯ ИНИЦИАЛИЗАЦИЯ
    // ═══════════════════════════════════════════════════════════════════

    function init() {
        console.log('[EasyTorrent]', VERSION);
        
        // Заполняем метаданные плагина в Extensions (name/author), если пользователь добавил только URL
        ensureSelfPluginMetadataInStorage();

        loadUserConfig();
        addStyles();
        addSettings();
        // Модалки не показываем на экране Extensions и когда плагин выключен.
        // Scheduler сам дождётся нормального экрана и покажет позже.
        setTimeout(() => {
            ensureStartupModalScheduler();
        }, 1200);

        if (window.Lampa && window.Lampa.Parser) {
            patchParser();
        } else {
            setTimeout(() => {
                patchParser();
            }, 1000);
        }

        subscribeToEvents();

        console.log('[EasyTorrent] Готов к работе!');
    }

    // Запуск при готовности приложения
    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', (e) => {
            if (e.type === 'ready') {
                init();
            }
        });
    }

})();
