(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 1: ИНИЦИАЛИЗАЦИЯ И КОНФИГУРАЦИЯ
    // ═══════════════════════════════════════════════════════════════════

    const PLUGIN_NAME = 'EasyTorrent';
    const VERSION = '1.0.0 Beta';
    const PLUGIN_ICON = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>';

    // Supabase config
    const SUPABASE_URL = 'https://wozuelafumpzgvllcjne.supabase.co';
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvenVlbGFmdW1wemd2bGxjam5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5Mjg1MDgsImV4cCI6MjA4MjUwNDUwOH0.ODnHlq_P-1wr_D6Jwaba1mLXIVuGBnnUZsrHI8Twdug';
    const WIZARD_URL = 'https://darkestclouds.github.io/plugins/easytorrent/';

    // Глобальное хранилище топовых рекомендаций
    let topRecommendations = [];
    let pollingInterval = null;

    // Конфигурация по умолчанию (используется, если не задана пользовательская)
    const DEFAULT_CONFIG = {
        "version": "2.1",
        "generated": "2025-12-27T13:43:12.099Z",
        "device": {
            "type": "tv_4k",
            "supported_hdr": ["hdr10", "hdr10plus"],
            "supported_audio": ["stereo", "surround_51"]
        },
        "network": {
            "speed": "very_fast",
            "stability": "stable"
        },
        "parameter_priority": ["audio_track", "resolution", "availability", "bitrate", "hdr", "audio_quality"],
        "audio_track_priority": ["Дубляж RU", "MVO HDRezka", "MVO LostFilm", "MVO Кубик в Кубе", "MVO NewStudio", "Original"],
        "preferences": { "min_seeds": 3, "recommendation_count": 3 },
        "scoring_rules": {
            "schema": "2.1",
            "base_score": 100,
            "weights": { "audio_track": 100, "resolution": 85, "availability": 70, "bitrate": 55, "hdr": 40, "audio_quality": 25 },
            "resolution": { "480": -60, "720": -30, "1080": 17, "1440": 42.5, "2160": 85 },
            "hdr": { "dolby_vision": 24, "hdr10plus": 32, "hdr10": 32, "sdr": -16 },
            "bitrate_bonus": {
                "thresholds": [
                    { "min": 0, "max": 15, "bonus": 0 },
                    { "min": 15, "max": 30, "bonus": 8.25 },
                    { "min": 30, "max": 60, "bonus": 16.5 },
                    { "min": 60, "max": 999, "bonus": 19.25 }
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
                // Стерео считаем дефолтом — очков не даём
                "points": { "dolby_atmos": 20, "surround_71": 15, "surround_51": 10, "stereo": 0, "unknown": 0 }
            },
            "special_rules": [
                { "key": "4k_bonus_2160_bitrate", "if": { "resolution": 2160, "bitrate_min": 1 }, "bonus": 80 },
                { "key": "4k_bonus_2160", "if": { "resolution": 2160 }, "bonus": 30 }
            ]
        }
    };

    let USER_CONFIG = DEFAULT_CONFIG;

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

    /**
     * Нормализация/миграция конфига.
     * Цель: чтобы вся математика задавалась визардом в scoring_rules, а плагин "исполнял" правила
     * без скрытых домножений и эвристик, которые расходятся с визардом.
     */
    function normalizeConfig(cfg) {
        const out = cfg && typeof cfg === 'object' ? cfg : {};
        out.version = String(out.version || DEFAULT_CONFIG.version);
        out.device = out.device || {};
        out.network = out.network || {};
        out.preferences = out.preferences || {};
        out.parameter_priority = Array.isArray(out.parameter_priority) ? out.parameter_priority : DEFAULT_CONFIG.parameter_priority.slice();
        out.audio_track_priority = Array.isArray(out.audio_track_priority) ? out.audio_track_priority : DEFAULT_CONFIG.audio_track_priority.slice();

        // Единственный смысловой источник min_seeds: приводим в консистентный вид
        if (typeof out.preferences.min_seeds !== 'number') out.preferences.min_seeds = DEFAULT_CONFIG.preferences.min_seeds;
        if (typeof out.preferences.recommendation_count !== 'number') out.preferences.recommendation_count = DEFAULT_CONFIG.preferences.recommendation_count;

        out.scoring_rules = out.scoring_rules && typeof out.scoring_rules === 'object' ? out.scoring_rules : {};

        const rules = out.scoring_rules;
        const isNew = rules.schema && String(rules.schema).startsWith('2.1');

        // База
        if (typeof rules.base_score !== 'number') rules.base_score = 100;

        // weights оставляем как "инфо" (визард использует для генерации чисел); плагин не домножает ими таблицы.
        if (!rules.weights || typeof rules.weights !== 'object') {
            rules.weights = DEFAULT_CONFIG.scoring_rules.weights;
        }

        // resolution/hdr таблицы: если их нет — ставим дефолты
        if (!rules.resolution || typeof rules.resolution !== 'object') rules.resolution = DEFAULT_CONFIG.scoring_rules.resolution;
        if (!rules.hdr || typeof rules.hdr !== 'object') rules.hdr = DEFAULT_CONFIG.scoring_rules.hdr;

        // availability: в 2.1 это (min_seeds, below_min_penalty, log10_multiplier)
        if (!rules.availability || typeof rules.availability !== 'object') rules.availability = {};
        const avail = rules.availability;
        if (typeof avail.min_seeds !== 'number') {
            // поддержка старых конфигов: могли хранить min_seeds в preferences или availability.min_seeds
            const fromPrefs = typeof out.preferences.min_seeds === 'number' ? out.preferences.min_seeds : null;
            const fromOld = typeof avail.min_seeds === 'number' ? avail.min_seeds : null;
            avail.min_seeds = fromOld != null ? fromOld : (fromPrefs != null ? fromPrefs : DEFAULT_CONFIG.preferences.min_seeds);
        }
        // синхронизация в обе стороны (чтобы не было "двух правд")
        out.preferences.min_seeds = avail.min_seeds;

        // Старый формат availability.weight → новый формат
        if (typeof avail.log10_multiplier !== 'number') {
            if (typeof avail.weight === 'number') {
                avail.log10_multiplier = 12 * avail.weight;
            } else {
                const w = (rules.weights?.availability || 70) / 100;
                avail.log10_multiplier = 12 * w;
            }
        }
        if (typeof avail.below_min_penalty !== 'number') {
            // Раньше штраф зависел от приоритета availability. Сохраним это при миграции.
            const idx = out.parameter_priority.indexOf('availability');
            const basePenalty = idx === 0 ? -80 : (idx === 1 ? -40 : -20);
            const w = (typeof avail.weight === 'number' ? avail.weight : ((rules.weights?.availability || 70) / 100));
            avail.below_min_penalty = basePenalty * w;
        }
        // убираем старое поле, чтобы не путало
        if ('weight' in avail) delete avail.weight;

        // bitrate_bonus: в 2.1 бонусы уже финальные (взвешенные), и есть missing_penalty
        if (!rules.bitrate_bonus || typeof rules.bitrate_bonus !== 'object') rules.bitrate_bonus = {};
        const br = rules.bitrate_bonus;
        if (!Array.isArray(br.thresholds)) br.thresholds = DEFAULT_CONFIG.scoring_rules.bitrate_bonus.thresholds;

        // Миграция старого формата: thresholds были "сырые", а вес лежал в bitrate_bonus.weight / weights.bitrate
        const hasOldWeight = typeof br.weight === 'number' || (rules.weights && typeof rules.weights.bitrate === 'number');
        const needMigrateThresholds = !isNew && hasOldWeight;
        if (needMigrateThresholds) {
            const w = typeof br.weight === 'number' ? br.weight : ((rules.weights?.bitrate || 55) / 100);
            br.thresholds = br.thresholds.map(t => ({
                min: t.min,
                max: t.max,
                bonus: (typeof t.bonus === 'number' ? t.bonus : 0) * w
            }));
        }
        if (typeof br.missing_penalty !== 'number') {
            const idx = out.parameter_priority.indexOf('bitrate');
            const basePenalty = idx === 0 ? -50 : (idx === 1 ? -30 : -15);
            const w = (typeof br.weight === 'number' ? br.weight : ((rules.weights?.bitrate || 55) / 100));
            br.missing_penalty = basePenalty * w;
        }
        if ('weight' in br) delete br.weight;

        // audio_track: в 2.1 используем нормализованный скоринг (не зависит от длины списка)
        if (!rules.audio_track || typeof rules.audio_track !== 'object') rules.audio_track = {};
        const at = rules.audio_track;
        if (typeof at.curve !== 'string') at.curve = 'linear';
        if (typeof at.max_points !== 'number') {
            const w = (rules.weights?.audio_track || 100) / 100;
            at.max_points = 100 * w;
        }
        if ('weight' in at) delete at.weight;

        // audio_quality: раньше была только weight. Теперь явная таблица.
        if (!rules.audio_quality || typeof rules.audio_quality !== 'object') rules.audio_quality = {};
        const aq = rules.audio_quality;
        if (!aq.points || typeof aq.points !== 'object') {
            const w = (rules.weights?.audio_quality || 25) / 100;
            aq.points = {
                dolby_atmos: 80 * w,
                surround_71: 60 * w,
                surround_51: 40 * w,
                // стерео считаем базовым — 0 очков
                stereo: 0,
                unknown: 0
            };
        }
        if ('weight' in aq) delete aq.weight;

        // special_rules: если нет — просто не применяем
        if (!Array.isArray(rules.special_rules)) rules.special_rules = [];

        // Подписываем схему (чтобы понимать, что уже нормализовано)
        rules.schema = '2.1';
        return out;
    }

    function loadUserConfig() {
        const savedConfig = Lampa.Storage.get('easytorrent_config_json');
        if (savedConfig) {
            try {
                const parsed = typeof savedConfig === 'string' ? JSON.parse(savedConfig) : savedConfig;
                if (parsed && String(parsed.version || '').startsWith('2')) {
                    USER_CONFIG = normalizeConfig(parsed);
                    return;
                }
            } catch (e) {}
        }
        USER_CONFIG = normalizeConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
    }

    function saveUserConfig(config) {
        const stringConfig = typeof config === 'string' ? config : JSON.stringify(config);
        Lampa.Storage.set('easytorrent_config_json', stringConfig);
        try {
            USER_CONFIG = normalizeConfig(JSON.parse(stringConfig));
        } catch (e) {
            USER_CONFIG = normalizeConfig(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
        }
    }

    function showConfigDetails() {
        const cfg = USER_CONFIG;
        const items = [
            { title: 'Версия конфига', subtitle: cfg.version, noselect: true },
            { title: 'Тип устройства', subtitle: cfg.device.type.toUpperCase(), noselect: true },
            { title: 'Поддержка HDR', subtitle: cfg.device.supported_hdr.join(', ') || 'нет', noselect: true },
            { title: 'Поддержка звука', subtitle: cfg.device.supported_audio.join(', ') || 'стерео', noselect: true },
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
        const items = cfg.audio_track_priority.map((voice, index) => ({
            title: `${index + 1}. ${voice}`,
            noselect: true
        }));

        Lampa.Select.show({
            title: 'Приоритет озвучек',
            items: items,
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
        const title = (item.Title || item.title || '').toLowerCase();
        const foundTypes = [];
        
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
        if (title.includes('hdr10+') || title.includes('hdr10plus') || title.includes('hdr10 plus')) {
            if (!foundTypes.includes('hdr10plus')) foundTypes.push('hdr10plus');
        }
        if (title.includes('hdr10') || /hdr-?10/.test(title)) {
            if (!foundTypes.includes('hdr10')) foundTypes.push('hdr10');
        }
        if (title.includes('dolby vision') || title.includes('dovi') || /\sp8\s/.test(title) || /\(dv\)/.test(title) || /\[dv\]/.test(title) || /\sdv\s/.test(title) || /,\s*dv\s/.test(title)) {
            if (!foundTypes.includes('dolby_vision')) foundTypes.push('dolby_vision');
        }
        if ((/\bhdr\b/.test(title) || title.includes('[hdr]') || title.includes('(hdr)') || title.includes(', hdr')) && !foundTypes.includes('hdr10plus') && !foundTypes.includes('hdr10')) {
            foundTypes.push('hdr10');
        }
        if (title.includes('sdr') || title.includes('[sdr]') || title.includes('(sdr)')) {
            if (!foundTypes.includes('sdr')) foundTypes.push('sdr');
        }
        
        // Если ничего не найдено, вероятно SDR
        if (foundTypes.length === 0) return 'sdr';
        
        // Выбираем ЛУЧШИЙ тип по значению из конфига
        const hdrScores = USER_CONFIG.scoring_rules?.hdr || {
            'dolby_vision': 24,
            'hdr10plus': 40,
            'hdr10': 32,
            'sdr': -14
        };
        
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
        for (const type in AUDIO_TRACK_ALIASES) {
            if (foundAudio.includes(type)) continue;
            
            const aliases = AUDIO_TRACK_ALIASES[type];
            const match = aliases.some(alias => {
                const aliasLower = alias.toLowerCase();
                if (aliasLower.length <= 3) {
                    const reg = new RegExp('\\b' + aliasLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                    return reg.test(title);
                }
                return title.includes(aliasLower);
            });

            if (match) foundAudio.push(type);
        }

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

    // Алиасы для озвучек (используем в коде для сопоставления)
    const AUDIO_TRACK_ALIASES = {
        'Дубляж RU': ['дубляж', 'дб', 'd', 'dub'],
        'Дубляж UKR': ['ukr'],
        'Дубляж Пифагор': ['пифагор'],
        'Дубляж Red Head Sound': ['red head sound', 'rhs'],
        'Дубляж Videofilm': ['videofilm'],
        'Дубляж MovieDalen': ['moviedalen'],
        'Дубляж LeDoyen': ['ledoyen'],
        'Дубляж Whiskey Sound': ['whiskey sound'],
        'Дубляж IRON VOICE': ['iron voice'],
        'Дубляж AlexFilm': ['alexfilm'],
        'Дубляж Amedia': ['amedia'],
        'MVO HDRezka': ['hdrezka', 'hdrezka studio'],
        'MVO LostFilm': ['lostfilm'],
        'MVO TVShows': ['tvshows', 'tv shows'],
        'MVO Jaskier': ['jaskier'],
        'MVO RuDub': ['rudub'],
        'MVO LE-Production': ['le-production'],
        'MVO Кубик в Кубе': ['кубик в кубе'],
        'MVO NewStudio': ['newstudio'],
        'MVO Good People': ['good people'],
        'MVO IdeaFilm': ['ideafilm'],
        'MVO AMS': ['ams'],
        'MVO Baibako': ['baibako'],
        'MVO Profix Media': ['profix media'],
        'MVO NewComers': ['newcomers'],
        'MVO GoLTFilm': ['goltfilm'],
        'MVO JimmyJ': ['jimmyj'],
        'MVO Kerob': ['kerob'],
        'MVO LakeFilms': ['lakefilms'],
        'MVO Novamedia': ['novamedia'],
        'MVO Twister': ['twister'],
        'MVO Voice Project': ['voice project'],
        'MVO Dragon Money Studio': ['dragon money', 'dms'],
        'MVO Syncmer': ['syncmer'],
        'MVO ColdFilm': ['coldfilm'],
        'MVO SunshineStudio': ['sunshinestudio'],
        'MVO Ultradox': ['ultradox'],
        'MVO Octopus': ['octopus'],
        'MVO OMSKBIRD': ['omskbird records', 'omskbird'],
        'AVO Володарский': ['володарский'],
        'AVO Яроцкий': ['яроцкий', 'м. яроцкий'],
        'AVO Сербин': ['сербин', 'ю. сербин'],
        'PRO Gears Media': ['gears media'],
        'PRO Hamsterstudio': ['hamsterstudio', 'hamster'],
        'PRO P.S.Energy': ['p.s.energy'],
        'UKR НеЗупиняйПродакшн': ['незупиняйпродакшн'],
        'Original': ['original']
    };

    /**
     * Сопоставление аудио-дорожки с типом из приоритета
     */
    function matchesAudioType(audioTrack, type) {
        const trackLower = audioTrack.toLowerCase();
        const aliases = AUDIO_TRACK_ALIASES[type] || [];
        
        // 1. Полнотекстовое совпадение с границами слов для коротких алиасов (типа 'd', 'db', 'ukr')
        return aliases.some(alias => {
            const aliasLower = alias.toLowerCase();
            if (aliasLower.length <= 3) {
                // Если алиас короткий, ищем его как отдельное слово
                // Это предотвратит ложное срабатывание 'd' в слове 'ares'
                const reg = new RegExp('\\b' + aliasLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                return reg.test(trackLower);
            }
            return trackLower.includes(aliasLower);
        });
    }

    /**
     * Анализирует ffprobe теги аудио дорожки
     */
    function analyzeAudioTrack(track) {
        const tags = track.tags || {};
        const title = (tags.title || tags.handler_name || '').toLowerCase();
        const lang = (tags.language || '').toLowerCase();
        const foundTypes = [];

        // Проверяем каждую группу из нашего списка
        for (const type in AUDIO_TRACK_ALIASES) {
            const aliases = AUDIO_TRACK_ALIASES[type];
            
            // Спец-проверка для "Дубляж RU" через ffprobe теги
            if (type === 'Дубляж RU' && (lang === 'rus' || lang === 'russian')) {
                if (title.includes('dub') || title.includes('дубляж')) {
                    foundTypes.push(type);
                    continue;
                }
            }

            // Обычная проверка по алиасам в названии дорожки или языке
            const match = aliases.some(alias => {
                const aliasLower = alias.toLowerCase();
                // Если алиас совпадает с языком
                if (aliasLower === lang) return true;
                
                // Если алиас есть в названии дорожки
                if (aliasLower.length <= 3) {
                    const reg = new RegExp('\\b' + aliasLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                    return reg.test(title);
                }
                return title.includes(aliasLower);
            });

            if (match) foundTypes.push(type);
        }
        
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
            const audioPriority = cfg.audio_track_priority || [];
            const audioTracks = features.audio_tracks || [];
            let audioScore = 0;
            
            for (let i = 0; i < audioPriority.length; i++) {
                const priorityType = audioPriority[i];
                const found = audioTracks.some(track => matchesAudioType(track, priorityType));
                if (found) {
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
        
        // Сохраняем топ-N для внутреннего использования
        topRecommendations = eligible.slice(0, recommendCount).map((t, rank) => ({
            element: t.element,
            rank: rank,
            score: t.score,
            features: t.features,
            isIdeal: rank === 0 && t.score >= 150
        }));

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
                                            JSON.parse(new_value);
                                            saveUserConfig(new_value);
                                            updateDisplay();
                                            Lampa.Noty.show('OK');
                                        } catch (e) {
                                            Lampa.Noty.show(t('config_error'));
                                        }
                                    }
                                    Lampa.Controller.toggle('settings');
                                });
                            } else if (a.action === 'reset') {
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
                topRecommendations = [];
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // РАЗДЕЛ 6: ГЛАВНАЯ ИНИЦИАЛИЗАЦИЯ
    // ═══════════════════════════════════════════════════════════════════

    function init() {
        console.log('[EasyTorrent]', VERSION);
        
        loadUserConfig();
        addStyles();
        addSettings();

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
