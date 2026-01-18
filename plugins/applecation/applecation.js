(function () {
    'use strict';

    const APPLECATION_VERSION = '1.2.1';

    // Иконка плагина
    const PLUGIN_ICON = '<svg viewBox="110 90 180 210"xmlns=http://www.w3.org/2000/svg><g id=sphere><circle cx=200 cy=140 fill="hsl(200, 80%, 40%)"opacity=0.3 r=1.2 /><circle cx=230 cy=150 fill="hsl(200, 80%, 45%)"opacity=0.35 r=1.3 /><circle cx=170 cy=155 fill="hsl(200, 80%, 42%)"opacity=0.32 r=1.2 /><circle cx=245 cy=175 fill="hsl(200, 80%, 48%)"opacity=0.38 r=1.4 /><circle cx=155 cy=180 fill="hsl(200, 80%, 44%)"opacity=0.34 r=1.3 /><circle cx=215 cy=165 fill="hsl(200, 80%, 46%)"opacity=0.36 r=1.2 /><circle cx=185 cy=170 fill="hsl(200, 80%, 43%)"opacity=0.33 r=1.3 /><circle cx=260 cy=200 fill="hsl(200, 80%, 50%)"opacity=0.4 r=1.5 /><circle cx=140 cy=200 fill="hsl(200, 80%, 50%)"opacity=0.4 r=1.5 /><circle cx=250 cy=220 fill="hsl(200, 80%, 48%)"opacity=0.38 r=1.4 /><circle cx=150 cy=225 fill="hsl(200, 80%, 47%)"opacity=0.37 r=1.4 /><circle cx=235 cy=240 fill="hsl(200, 80%, 45%)"opacity=0.35 r=1.3 /><circle cx=165 cy=245 fill="hsl(200, 80%, 44%)"opacity=0.34 r=1.3 /><circle cx=220 cy=255 fill="hsl(200, 80%, 42%)"opacity=0.32 r=1.2 /><circle cx=180 cy=258 fill="hsl(200, 80%, 41%)"opacity=0.31 r=1.2 /><circle cx=200 cy=120 fill="hsl(200, 80%, 60%)"opacity=0.5 r=1.8 /><circle cx=240 cy=135 fill="hsl(200, 80%, 65%)"opacity=0.55 r=2 /><circle cx=160 cy=140 fill="hsl(200, 80%, 62%)"opacity=0.52 r=1.9 /><circle cx=270 cy=165 fill="hsl(200, 80%, 70%)"opacity=0.6 r=2.2 /><circle cx=130 cy=170 fill="hsl(200, 80%, 67%)"opacity=0.57 r=2.1 /><circle cx=255 cy=190 fill="hsl(200, 80%, 72%)"opacity=0.62 r=2.3 /><circle cx=145 cy=195 fill="hsl(200, 80%, 69%)"opacity=0.59 r=2.2 /><circle cx=280 cy=200 fill="hsl(200, 80%, 75%)"opacity=0.65 r=2.5 /><circle cx=120 cy=200 fill="hsl(200, 80%, 75%)"opacity=0.65 r=2.5 /><circle cx=275 cy=215 fill="hsl(200, 80%, 73%)"opacity=0.63 r=2.4 /><circle cx=125 cy=220 fill="hsl(200, 80%, 71%)"opacity=0.61 r=2.3 /><circle cx=260 cy=235 fill="hsl(200, 80%, 68%)"opacity=0.58 r=2.2 /><circle cx=140 cy=240 fill="hsl(200, 80%, 66%)"opacity=0.56 r=2.1 /><circle cx=245 cy=255 fill="hsl(200, 80%, 63%)"opacity=0.53 r=2 /><circle cx=155 cy=260 fill="hsl(200, 80%, 61%)"opacity=0.51 r=1.9 /><circle cx=225 cy=270 fill="hsl(200, 80%, 58%)"opacity=0.48 r=1.8 /><circle cx=175 cy=272 fill="hsl(200, 80%, 56%)"opacity=0.46 r=1.7 /><circle cx=200 cy=100 fill="hsl(200, 80%, 85%)"opacity=0.8 r=2.8 /><circle cx=230 cy=115 fill="hsl(200, 80%, 90%)"opacity=0.85 r=3 /><circle cx=170 cy=120 fill="hsl(200, 80%, 87%)"opacity=0.82 r=2.9 /><circle cx=250 cy=140 fill="hsl(200, 80%, 92%)"opacity=0.88 r=3.2 /><circle cx=150 cy=145 fill="hsl(200, 80%, 89%)"opacity=0.84 r=3.1 /><circle cx=265 cy=170 fill="hsl(200, 80%, 95%)"opacity=0.9 r=3.4 /><circle cx=135 cy=175 fill="hsl(200, 80%, 93%)"opacity=0.87 r=3.3 /><circle cx=275 cy=200 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.5 /><circle cx=125 cy=200 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.5 /><circle cx=200 cy=200 fill="hsl(200, 80%, 100%)"opacity=1 r=4 /><circle cx=220 cy=195 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.8 /><circle cx=180 cy=205 fill="hsl(200, 80%, 97%)"opacity=0.93 r=3.7 /><circle cx=240 cy=210 fill="hsl(200, 80%, 96%)"opacity=0.92 r=3.6 /><circle cx=160 cy=215 fill="hsl(200, 80%, 95%)"opacity=0.9 r=3.5 /><circle cx=270 cy=230 fill="hsl(200, 80%, 94%)"opacity=0.88 r=3.4 /><circle cx=130 cy=235 fill="hsl(200, 80%, 92%)"opacity=0.86 r=3.3 /><circle cx=255 cy=250 fill="hsl(200, 80%, 90%)"opacity=0.84 r=3.2 /><circle cx=145 cy=255 fill="hsl(200, 80%, 88%)"opacity=0.82 r=3.1 /><circle cx=235 cy=265 fill="hsl(200, 80%, 86%)"opacity=0.8 r=3 /><circle cx=165 cy=268 fill="hsl(200, 80%, 84%)"opacity=0.78 r=2.9 /><circle cx=215 cy=280 fill="hsl(200, 80%, 82%)"opacity=0.76 r=2.8 /><circle cx=185 cy=282 fill="hsl(200, 80%, 80%)"opacity=0.74 r=2.7 /><circle cx=200 cy=290 fill="hsl(200, 80%, 78%)"opacity=0.72 r=2.6 /><circle cx=210 cy=130 fill="hsl(200, 80%, 88%)"opacity=0.83 r=2.5 /><circle cx=190 cy=135 fill="hsl(200, 80%, 86%)"opacity=0.81 r=2.4 /><circle cx=225 cy=155 fill="hsl(200, 80%, 91%)"opacity=0.86 r=2.8 /><circle cx=175 cy=160 fill="hsl(200, 80%, 89%)"opacity=0.84 r=2.7 /><circle cx=245 cy=185 fill="hsl(200, 80%, 94%)"opacity=0.89 r=3.3 /><circle cx=155 cy=190 fill="hsl(200, 80%, 92%)"opacity=0.87 r=3.2 /><circle cx=260 cy=210 fill="hsl(200, 80%, 95%)"opacity=0.91 r=3.4 /><circle cx=140 cy=215 fill="hsl(200, 80%, 93%)"opacity=0.88 r=3.3 /><circle cx=250 cy=230 fill="hsl(200, 80%, 91%)"opacity=0.85 r=3.2 /><circle cx=150 cy=235 fill="hsl(200, 80%, 89%)"opacity=0.83 r=3.1 /><circle cx=230 cy=245 fill="hsl(200, 80%, 87%)"opacity=0.81 r=3 /><circle cx=170 cy=250 fill="hsl(200, 80%, 85%)"opacity=0.79 r=2.9 /><circle cx=210 cy=260 fill="hsl(200, 80%, 83%)"opacity=0.77 r=2.8 /><circle cx=190 cy=265 fill="hsl(200, 80%, 81%)"opacity=0.75 r=2.7 /></g></svg>';

    // ===================================================================
    // ВСТРОЕННАЯ СИСТЕМА РЕЙТИНГОВ
    // ===================================================================

    /**
     * Конфигурация встроенных рейтингов
     */
    const RATINGS_CONFIG = {
        cacheLifetime: 60 * 60 * 24 * 1000, // 24 часа
        cacheKey: 'applecation_ratings_cache',
        cacheLimit: 500,
        requestTimeout: 15000,
        corsProxyUrl: 'https://corsproxy.io/?url='
    };

    /**
     * Унифицированные сетевые запросы для рейтингов
     */
    class RatingsRequestClient {
        static getJson(url, onSuccess, onError, options = {}) {
            return this._request(url, onSuccess, onError, {
                dataType: 'json',
                ...options
            });
        }

        static getText(url, onSuccess, onError, options = {}) {
            return this._request(url, onSuccess, onError, {
                dataType: 'text',
                ...options
            });
        }

        static _request(url, onSuccess, onError, options) {
            const network = new Lampa.Reguest();
            network.timeout(RATINGS_CONFIG.requestTimeout);
            network.silent(url, onSuccess, onError, false, options);
        }
    }

    /**
     * Утилиты для работы с заголовками (для поиска в КиноПоиске)
     */
    class TitleUtils {
        static clean(str) {
            return str ? str.replace(/[\s.,:;''`!?]+/g, ' ').trim() : '';
        }

        static cleanForKP(str) {
            return this.clean(str)
                .replace(/^[ \/\\]+/, '')
                .replace(/[ \/\\]+$/, '')
                .replace(/\+( *[+\/\\])+/g, '+')
                .replace(/([+\/\\] *)+\+/g, '+')
                .replace(/( *[\/\\]+ *)+/g, '+');
        }

        static normalize(str) {
            if (!str) return '';
            return this.clean(str.toLowerCase()
                .replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-')
                .replace(/ё/g, 'е'));
        }

        static equal(title1, title2) {
            return typeof title1 === 'string' && 
                   typeof title2 === 'string' && 
                   this.normalize(title1) === this.normalize(title2);
        }

        static contains(str, title) {
            return typeof str === 'string' && 
                   typeof title === 'string' && 
                   this.normalize(str).indexOf(this.normalize(title)) !== -1;
        }
    }

    /**
     * Менеджер кеширования рейтингов
     */
    class RatingsCacheManager {
        _getCache() {
            return Lampa.Storage.cache(RATINGS_CONFIG.cacheKey, RATINGS_CONFIG.cacheLimit, {});
        }

        get(id) {
            if (!id) return null;

            const cache = this._getCache();
            const entry = cache[id];
            
            if (!entry) return null;

            const isExpired = (Date.now() - entry.timestamp) > RATINGS_CONFIG.cacheLifetime;
            if (isExpired) {
                delete cache[id];
                Lampa.Storage.set(RATINGS_CONFIG.cacheKey, cache);
                return null;
            }

            return entry.data;
        }

        set(id, data) {
            if (!id) return;

            const cache = this._getCache();
            cache[id] = {
                timestamp: Date.now(),
                data: data
            };
            Lampa.Storage.set(RATINGS_CONFIG.cacheKey, cache);
        }
    }

    /**
     * Провайдер рейтингов MDBList
     */
    class MDBListProvider {
        static fetch(movie, callback) {
            const apiKey = Lampa.Storage.get('applecation_mdblist_api_key', '');
            
            if (!apiKey) {
                return callback({});
            }

            const type = movie.name ? 'show' : 'movie';
            const url = `https://api.mdblist.com/tmdb/${type}/${movie.id}?apikey=${apiKey}`;

            RatingsRequestClient.getJson(
                url,
                (response) => this._processResponse(response, callback),
                () => callback({})
            );
        }

        static _processResponse(response, callback) {
            const result = {};

            if (response && response.ratings) {
                response.ratings.forEach(rating => {
                    const key = (rating.source || '').toString().toLowerCase().trim();
                    if (key === 'tmdb') return;

                    // Для Tomatoes/Popcorn нам нужны дополнительные поля (votes/url)
                    if (key === 'tomatoes' || key === 'popcorn') {
                        result[key] = {
                            value: rating.value,
                            score: rating.score,
                            votes: rating.votes,
                            url: rating.url
                        };
                    } else {
                        result[key] = rating.value;
                    }
                });
            }

            callback(result);
        }
    }

    /**
     * Провайдер рейтингов КиноПоиска
     */
    class KinopoiskProvider {
        static fetch(movie, callback) {
            const apiKey = Lampa.Storage.get('applecation_kp_api_key', '');
            
            if (!apiKey) {
                return callback(null);
            }

            this._searchFilm(movie, callback, apiKey);
        }

        static _searchFilm(movie, callback, apiKey) {
            const title = movie.title || movie.name;
            const cleanTitle = TitleUtils.cleanForKP(title || '');
            
            const { url, method } = this._buildSearchUrl(movie, cleanTitle);

            RatingsRequestClient.getJson(
                url,
                (response) => this._processSearchResponse(response, movie, callback, cleanTitle, apiKey),
                () => callback(null),
                { headers: { 'X-API-KEY': apiKey } }
            );
        }

        static _processSearchResponse(response, movie, callback, cleanTitle, apiKey) {
            const items = response.items || response.films || [];

            if (items.length > 0) {
                this._selectBestMatch(movie, items, callback, apiKey);
            } else if (movie.imdb_id) {
                this._searchByKeyword(cleanTitle, movie, callback, apiKey);
            } else {
                callback(null);
            }
        }

        static _searchByKeyword(cleanTitle, movie, callback, apiKey) {
            const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(cleanTitle)}`;

            RatingsRequestClient.getJson(
                url,
                (response) => {
                    const items = response.items || response.films || [];
                    this._selectBestMatch(movie, items, callback, apiKey);
                },
                () => callback(null),
                { headers: { 'X-API-KEY': apiKey } }
            );
        }

        static _selectBestMatch(movie, items, callback, apiKey) {
            const searchYear = this._extractYear(movie.release_date || movie.first_air_date);
            const originalTitle = movie.original_title || movie.original_name;
            
            let candidates = items.map(item => {
                const year = item.start_date || item.year || '0000';
                return {
                    ...item,
                    tmp_year: parseInt((year + '').slice(0, 4))
                };
            });

            // Фильтр по IMDb ID
            if (movie.imdb_id) {
                const imdbMatches = candidates.filter(item => 
                    (item.imdb_id || item.imdbId) === movie.imdb_id
                );
                if (imdbMatches.length > 0) {
                    return this._extractRating(imdbMatches[0], callback, apiKey);
                }
            }

            // Фильтр по оригинальному названию
            if (originalTitle) {
                candidates = this._applyFilter(candidates, item =>
                    TitleUtils.contains(item.orig_title || item.nameOriginal || item.nameEn || item.en_title, originalTitle) ||
                    TitleUtils.contains(item.title || item.ru_title || item.nameRu, originalTitle)
                );
            }

            // Фильтр по русскому названию
            if (movie.title) {
                candidates = this._applyFilter(candidates, item =>
                    TitleUtils.contains(item.title || item.ru_title || item.nameRu, movie.title) ||
                    TitleUtils.contains(item.en_title || item.nameEn || item.nameOriginal || item.orig_title, movie.title)
                );
            }

            // Фильтр по году
            if (candidates.length > 1 && searchYear !== null && searchYear > 0) {
                const exactYearMatches = candidates.filter(item => item.tmp_year === searchYear);
                if (exactYearMatches.length > 0) {
                    candidates = exactYearMatches;
                } else {
                    candidates = this._applyFilter(candidates, item =>
                        item.tmp_year && item.tmp_year > searchYear - 2 && item.tmp_year < searchYear + 2
                    );
                }
            }

            if (candidates.length === 1) {
                this._extractRating(candidates[0], callback, apiKey);
            } else {
                callback(null);
            }
        }

        static _applyFilter(candidates, predicate) {
            const filtered = candidates.filter(predicate);
            return filtered.length > 0 ? filtered : candidates;
        }

        static _buildSearchUrl(movie, cleanTitle) {
            if (movie.imdb_id) {
                return {
                    url: `https://kinopoiskapiunofficial.tech/api/v2.2/films?imdbId=${encodeURIComponent(movie.imdb_id)}`,
                    method: 'IMDb ID'
                };
            }

            return {
                url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(cleanTitle)}`,
                method: 'Keyword'
            };
        }

        static _extractYear(dateString) {
            return dateString ? parseInt((dateString + '').slice(0, 4)) : null;
        }

        static _extractRating(film, callback, apiKey) {
            const kpId = film.kp_id || film.kinopoisk_id || film.kinopoiskId || film.filmId;
            const rating = film.ratingKinopoisk || film.rating;

            if (rating && !isNaN(rating)) {
                const numRating = parseFloat(rating);
                if (numRating > 0 && numRating <= 10) {
                    return callback(numRating);
                }
            }

            if (kpId) {
                this._fetchRatingFromXML(kpId, callback);
            } else {
                callback(null);
            }
        }

        static _fetchRatingFromXML(kpId, callback) {
            const xmlUrl = `https://rating.kinopoisk.ru/${kpId}.xml`;
            const proxiedUrl = `${RATINGS_CONFIG.corsProxyUrl}${encodeURIComponent(xmlUrl)}`;

            RatingsRequestClient.getText(
                proxiedUrl,
                (xmlString) => {
                    const rating = this._parseXMLRating(xmlString);
                    callback(rating);
                },
                () => callback(null)
            );
        }

        static _parseXMLRating(xmlString) {
            try {
                const xml = $($.parseXML(xmlString));
                const kpRating = xml.find('kp_rating');
                
                if (kpRating.length) {
                    const value = parseFloat(kpRating.text());
                    return (value > 0 && value <= 10) ? value : null;
                }
            } catch (error) {
                // Игнорируем ошибки парсинга
            }
            return null;
        }
    }

    /**
     * Главный класс встроенного менеджера рейтингов
     */
    class BuiltInRatingsManager {
        constructor() {
            this.cacheManager = new RatingsCacheManager();
            this.pendingRequests = new Map();
        }

        fetch(movie, callback) {
            if (!movie || !movie.id) {
                return callback(this._getEmptyResult());
            }

            const enabledRatings = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp']);

            // Проверяем кеш
            const cached = this.cacheManager.get(movie.id);
            if (cached) {
                return callback(cached);
            }

            // Проверяем дублирование запросов
            if (this.pendingRequests.has(movie.id)) {
                this.pendingRequests.get(movie.id).push(callback);
                return;
            }

            this.pendingRequests.set(movie.id, [callback]);

            const result = this._createResult(movie, false);
            let pendingRequests = 0;

            const finishRequest = () => {
                pendingRequests--;
                if (pendingRequests <= 0) {
                    result.ready = true;
                    this.cacheManager.set(movie.id, result);
                    
                    const callbacks = this.pendingRequests.get(movie.id) || [];
                    this.pendingRequests.delete(movie.id);
                    
                    callbacks.forEach(cb => {
                        try {
                            cb(result);
                        } catch (error) {
                            // Игнорируем ошибки в callback
                        }
                    });
                }
            };

            // Запрос к MDBList
            if (Lampa.Storage.get('applecation_mdblist_api_key', '')) {
                pendingRequests++;
                MDBListProvider.fetch(movie, (ratings) => {
                    Object.assign(result, ratings);
                    finishRequest();
                });
            }

            // Запрос к КиноПоиску
            if (enabledRatings.includes('kp') && Lampa.Storage.get('applecation_kp_api_key', '')) {
                pendingRequests++;
                KinopoiskProvider.fetch(movie, (kpRating) => {
                    result.kp = kpRating;
                    finishRequest();
                });
            }

            // Если нет активных запросов (нет ключей), возвращаем пустой результат
            if (pendingRequests === 0) {
                result.ready = true;
                return callback(result);
            }
        }

        _getEmptyResult() {
            return this._createResult(null, true);
        }

        _createResult(movie, ready) {
            return {
                imdb: null,
                kp: null,
                tmdb: movie && movie.vote_average ? parseFloat(movie.vote_average) : null,
                tomatoes: null,
                popcorn: null,
                metacritic: null,
                letterboxd: null,
                trakt: null,
                myanimelist: null,
                ready: !!ready
            };
        }
    }

    // Создаем глобальный экземпляр менеджера рейтингов
    const builtInRatingsManager = new BuiltInRatingsManager();

    // ===================================================================
    // КОНЕЦ ВСТРОЕННОЙ СИСТЕМЫ РЕЙТИНГОВ
    // ===================================================================

    /**
     * Проверяет, является ли активность все еще активной
     */
    function isAlive(activity) {
        return activity && !activity.__destroyed;
    }

    /**
     * Анализирует качество контента из данных ffprobe
     * Извлекает информацию о разрешении, HDR, Dolby Vision, аудио каналах
     */
    function analyzeContentQuality(ffprobe) {
        if (!ffprobe || !Array.isArray(ffprobe)) return null;

        const quality = {
            resolution: null,
            hdr: false,
            dolbyVision: false,
            audio: null
        };

        // Анализ видео потока
        const video = ffprobe.find(stream => stream.codec_type === 'video');
        if (video) {
            // Разрешение
            if (video.width && video.height) {
                quality.resolution = `${video.width}x${video.height}`;
                
                // Определяем метки качества
                // Проверяем и ширину для широкоформатного контента (2.35:1, 2.39:1 и т.д.)
                if (video.height >= 2160 || video.width >= 3840) {
                    quality.resolutionLabel = '4K';
                } else if (video.height >= 1440 || video.width >= 2560) {
                    quality.resolutionLabel = '2K';
                } else if (video.height >= 1080 || video.width >= 1920) {
                    quality.resolutionLabel = 'FULL HD';
                } else if (video.height >= 720 || video.width >= 1280) {
                    quality.resolutionLabel = 'HD';
                }
            }

            // HDR определяется через side_data_list или color_transfer
            if (video.side_data_list) {
                const hasMasteringDisplay = video.side_data_list.some(data => 
                    data.side_data_type === 'Mastering display metadata'
                );
                const hasContentLight = video.side_data_list.some(data => 
                    data.side_data_type === 'Content light level metadata'
                );
                const hasDolbyVision = video.side_data_list.some(data => 
                    data.side_data_type === 'DOVI configuration record' ||
                    data.side_data_type === 'Dolby Vision RPU'
                );

                if (hasDolbyVision) {
                    quality.dolbyVision = true;
                    quality.hdr = true; // DV всегда включает HDR
                } else if (hasMasteringDisplay || hasContentLight) {
                    quality.hdr = true;
                }
            }

            // Альтернативная проверка HDR через color_transfer
            if (!quality.hdr && video.color_transfer) {
                const hdrTransfers = ['smpte2084', 'arib-std-b67'];
                if (hdrTransfers.includes(video.color_transfer.toLowerCase())) {
                    quality.hdr = true;
                }
            }

            // Проверка через codec_name для Dolby Vision
            if (!quality.dolbyVision && video.codec_name) {
                if (video.codec_name.toLowerCase().includes('dovi') || 
                    video.codec_name.toLowerCase().includes('dolby')) {
                    quality.dolbyVision = true;
                    quality.hdr = true;
                }
            }
        }

        // Анализ аудио потоков
        const audioStreams = ffprobe.filter(stream => stream.codec_type === 'audio');
        let maxChannels = 0;
        
        audioStreams.forEach(audio => {
            if (audio.channels && audio.channels > maxChannels) {
                maxChannels = audio.channels;
            }
        });

        // Определяем аудио формат
        if (maxChannels >= 8) {
            quality.audio = '7.1';
        } else if (maxChannels >= 6) {
            quality.audio = '5.1';
        } else if (maxChannels >= 4) {
            quality.audio = '4.0';
        } else if (maxChannels >= 2) {
            quality.audio = '2.0';
        }

        return quality;
    }

    /**
     * Анализирует качество контента при переходе на страницу full
     */
    function analyzeContentQualities(movie, activity) {
        if (!movie || !Lampa.Storage.field('parser_use')) return;

        // Получаем данные от парсера самостоятельно
        if (!Lampa.Parser || typeof Lampa.Parser.get !== 'function') {
            return;
        }

        const title = movie.title || movie.name || 'Неизвестно';
        
        // Формируем параметры для парсера
        const year = ((movie.first_air_date || movie.release_date || '0000') + '').slice(0,4);
        const combinations = {
            'df': movie.original_title,
            'df_year': movie.original_title + ' ' + year,
            'df_lg': movie.original_title + ' ' + movie.title,
            'df_lg_year': movie.original_title + ' ' + movie.title + ' ' + year,
            'lg': movie.title,
            'lg_year': movie.title + ' ' + year,
            'lg_df': movie.title + ' ' + movie.original_title,
            'lg_df_year': movie.title + ' ' + movie.original_title + ' ' + year,
        };

        const searchQuery = combinations[Lampa.Storage.field('parse_lang')] || movie.title;

        // Вызываем парсер
        Lampa.Parser.get({
            search: searchQuery,
            movie: movie,
            page: 1
        }, (results) => {
            if (!isAlive(activity)) return;

            // Получили результаты парсера
            if (!results || !results.Results || results.Results.length === 0) return;

            // Собираем итоговую информацию о доступных качествах
            const availableQualities = {
                resolutions: new Set(),
                hdr: new Set(),
                audio: new Set(),
                hasDub: false
            };

            // Анализируем каждый торрент
            results.Results.forEach((torrent) => {
                // Анализируем ffprobe если есть
                if (torrent.ffprobe && Array.isArray(torrent.ffprobe)) {
                    const quality = analyzeContentQuality(torrent.ffprobe);
                    
                    if (quality) {
                        // Разрешение
                        if (quality.resolutionLabel) {
                            availableQualities.resolutions.add(quality.resolutionLabel);
                        }
                        
                        // Аудио
                        if (quality.audio) {
                            availableQualities.audio.add(quality.audio);
                        }
                    }

                    // Проверяем наличие русского дубляжа
                    if (!availableQualities.hasDub) {
                        const audioStreams = torrent.ffprobe.filter(stream => stream.codec_type === 'audio' && stream.tags);
                        audioStreams.forEach(audio => {
                            const lang = (audio.tags.language || '').toLowerCase();
                            const title = (audio.tags.title || audio.tags.handler_name || '').toLowerCase();
                            
                            // Проверяем русский язык
                            if (lang === 'rus' || lang === 'ru' || lang === 'russian') {
                                // Проверяем что это дубляж
                                if (title.includes('dub') || title.includes('дубляж') || 
                                    title.includes('дублир') || title === 'd') {
                                    availableQualities.hasDub = true;
                                }
                            }
                        });
                    }
                }

                // Анализируем название торрента для HDR/DV
                const titleLower = torrent.Title.toLowerCase();
                
                if (titleLower.includes('dolby vision') || titleLower.includes('dovi') || titleLower.match(/\bdv\b/)) {
                    availableQualities.hdr.add('Dolby Vision');
                }
                if (titleLower.includes('hdr10+')) {
                    availableQualities.hdr.add('HDR10+');
                }
                if (titleLower.includes('hdr10')) {
                    availableQualities.hdr.add('HDR10');
                }
                if (titleLower.includes('hdr')) {
                    availableQualities.hdr.add('HDR');
                }
            });

            // Формируем структурированный объект с качеством
            const qualityInfo = {
                title: title,
                torrents_found: results.Results.length,
                quality: null,
                dv: false,
                hdr: false,
                hdr_type: null,
                sound: null,
                dub: availableQualities.hasDub
            };

            // Разрешение - берем только максимальное
            if (availableQualities.resolutions.size > 0) {
                const resOrder = ['8K', '4K', '2K', 'FULL HD', 'HD'];
                for (const res of resOrder) {
                    if (availableQualities.resolutions.has(res)) {
                        qualityInfo.quality = res;
                        break;
                    }
                }
            }
            
            // Dolby Vision
            if (availableQualities.hdr.has('Dolby Vision')) {
                qualityInfo.dv = true;
                qualityInfo.hdr = true;
            }
            
            // HDR - берем максимальный тип
            if (availableQualities.hdr.size > 0) {
                qualityInfo.hdr = true;
                
                const hdrOrder = ['HDR10+', 'HDR10', 'HDR'];
                for (const hdr of hdrOrder) {
                    if (availableQualities.hdr.has(hdr)) {
                        qualityInfo.hdr_type = hdr;
                        break;
                    }
                }
            }
            
            // Аудио - берем только максимальное
            if (availableQualities.audio.size > 0) {
                const audioOrder = ['7.1', '5.1', '4.0', '2.0'];
                for (const audio of audioOrder) {
                    if (availableQualities.audio.has(audio)) {
                        qualityInfo.sound = audio;
                        break;
                    }
                }
            }

            // Выводим JSON с результатами (опционально, для отладки)
            // console.log('Applecation Quality:', qualityInfo);
            
            // Сохраняем данные в activity для отображения иконок
            if (activity && activity.applecation_quality === undefined) {
                activity.applecation_quality = qualityInfo;
                // Обновляем info блок с иконками
                updateQualityBadges(activity, qualityInfo);
            }
            
        }, (error) => {
            // Ошибка парсера (не выводим в консоль, чтобы не засорять)
        });
    }

    // Главная функция плагина
    function initializePlugin() {
        console.log('Applecation', 'v' + APPLECATION_VERSION);
        
        if (!Lampa.Platform.screen('tv')) {
            console.log('Applecation', 'TV mode only');
            return;
        }

        patchApiImg();
        addCustomTemplate();
        addOverlayTemplate();
        addStyles();
        addSettings();
        applyLiquidGlassClass();
        attachLogoLoader();
        attachEpisodesCorePatch();
    }

    /**
     * Патч логики линии эпизодов (как отдельный episodes_core_patch.js, но интегрировано в Applecation)
     * Цель:
     * - эпизоды всегда идут 1..N, затем next (comeing)
     * - кнопка "Еще" (card-more) всегда последняя при ленивой догрузке
     * Без MutationObserver: патчим scroll.append() у нужной линии.
     */
    function attachEpisodesCorePatch(){
        try{
            if(window.applecation_episodes_core_patch) return;
            window.applecation_episodes_core_patch = true;

            // если где-то отдельно подключен старый плагин-перестановщик — глушим его флагом
            window.episodes_order_fix = true;
            window.episodes_core_patch = true;

            if(!window.Lampa || !Lampa.Utils || typeof Lampa.Utils.createInstance !== 'function') return;
            if(Lampa.Utils.__applecation_episodes_core_patch_applied) return;
            Lampa.Utils.__applecation_episodes_core_patch_applied = true;

            function looksLikeEpisodesLinePayload(element){
                try{
                    if(!element) return false;
                    if(!element.movie) return false;
                    if(!Array.isArray(element.results) || !element.results.length) return false;

                    var hits = 0;
                    for(var i = 0; i < element.results.length; i++){
                        var r = element.results[i];
                        if(!r) continue;

                        if(typeof r.episode_number === 'number') hits++;
                        if(typeof r.season_number === 'number') hits++;
                        if(r.comeing) hits++;
                        if(r.air_date) hits++;
                    }

                    return hits >= 3;
                }catch(e){
                    return false;
                }
            }

            function normalizeEpisodesResults(element){
                try{
                    var results = element.results || [];

                    var next = [];
                    var list = [];

                    for(var i = 0; i < results.length; i++){
                        var r = results[i];
                        if(!r) continue;

                        if(r.comeing) next.push(r);
                        else list.push(r);
                    }

                    // Сортируем по номеру эпизода
                    list.sort(function(a,b){
                        return (a.episode_number || 0) - (b.episode_number || 0);
                    });

                    

                    element.results = list.concat(next);
                }catch(e){}
            }

            function patchScrollAppendToKeepMoreLast(line){
                try{
                    if(!line || !line.scroll || typeof line.scroll.append !== 'function') return;
                    if(line.__applecation_episodes_scroll_append_patched) return;
                    line.__applecation_episodes_scroll_append_patched = true;

                    var originalAppend = line.scroll.append.bind(line.scroll);

                    line.scroll.append = function(object){
                        var node = object instanceof jQuery ? object[0] : object;

                        // "Еще" добавляем как обычно
                        if(node && node.classList && node.classList.contains('card-more')){
                            return originalAppend(object);
                        }

                        // Если "Еще" уже есть — вставляем перед ним
                        var body = typeof line.scroll.body === 'function' ? line.scroll.body(true) : null;
                        if(body){
                            var more = body.querySelector('.card-more');
                            if(more && node && node !== more){
                                body.insertBefore(node, more);
                                return;
                            }
                        }

                        return originalAppend(object);
                    };
                }catch(e){}
            }

            function patchLineCreate(line){
                try{
                    if(!line || typeof line.create !== 'function') return;
                    if(line.__applecation_episodes_create_patched) return;
                    line.__applecation_episodes_create_patched = true;

                    var originalCreate = line.create.bind(line);

                    line.create = function(){
                        // ставим перехват ДО рендера модулей линии
                        patchScrollAppendToKeepMoreLast(line);

                        var res = originalCreate();

                        // убираем стили "первого" у "Еще" (если MoreFirst навесил)
                        setTimeout(function(){
                            try{
                                var body = line && line.scroll && typeof line.scroll.body === 'function' ? line.scroll.body(true) : null;
                                var more = body ? body.querySelector('.card-more') : null;
                                if(more) more.classList.remove('card-more--first');
                            }catch(e){}
                        }, 0);

                        return res;
                    };
                }catch(e){}
            }

            var original = Lampa.Utils.createInstance;

            Lampa.Utils.createInstance = function(BaseClass, element, add_params, replace){
                var isEpisodesLine = looksLikeEpisodesLinePayload(element);

                var shouldReverse = Lampa.Storage.get('applecation_reverse_episodes', true);

                if(isEpisodesLine && shouldReverse){
                    normalizeEpisodesResults(element);
                }

                var instance = original.call(this, BaseClass, element, add_params, replace);

                if(isEpisodesLine && shouldReverse){
                    patchLineCreate(instance);
                }

                return instance;
            };
        }catch(e){}
    }

    // Переводы для настроек
    const translations = {
        show_ratings: {
            ru: 'Показывать рейтинги',
            en: 'Show ratings',
            uk: 'Показувати рейтинги',
            be: 'Паказваць рэйтынгі',
            bg: 'Показване на рейтинги',
            cs: 'Zobrazit hodnocení',
            he: 'הצג דירוגים',
            pt: 'Mostrar classificações',
            zh: '显示评分'
        },
        ratings_source: {
            ru: 'Источник рейтингов',
            en: 'Ratings Source',
            uk: 'Джерело рейтингів',
            be: 'Крыніца рэйтынгаў',
            bg: 'Източник на рейтинги',
            cs: 'Zdroj hodnocení',
            he: 'מקור דירוגים',
            pt: 'Fonte de classificações',
            zh: '评分来源'
        },
        ratings_source_desc: {
            ru: 'От плагинов или от рейтинговых сервисов',
            en: 'From plugins or rating services',
            uk: 'Від плагінів або від рейтингових сервісів',
            be: 'Ад плагінаў або ад рэйтынгавых сэрвісаў',
            bg: 'От плъгини или от рейтингови услуги',
            cs: 'Z pluginů nebo z ratingových služeb',
            he: 'מתוספים או משירותי דירוג',
            pt: 'De plugins ou de serviços de avaliação',
            zh: '来自插件或评分服务'
        },
        ratings_source_builtin: {
            ru: 'Рейтинговые сервисы',
            en: 'Rating services',
            uk: 'Рейтингові сервіси',
            be: 'Рэйтынгавыя сэрвісы',
            bg: 'Рейтингови услуги',
            cs: 'Ratingové služby',
            he: 'שירותי דירוג',
            pt: 'Serviços de avaliação',
            zh: '评分服务'
        },
        ratings_source_external: {
            ru: 'Плагины',
            en: 'Plugins',
            uk: 'Плагіни',
            be: 'Плагіны',
            bg: 'Плъгини',
            cs: 'Pluginy',
            he: 'תוספים',
            pt: 'Plugins',
            zh: '插件'
        },
        mdblist_api_key: {
            ru: 'MDBList API Key',
            en: 'MDBList API Key',
            uk: 'MDBList API Key',
            be: 'MDBList API Key',
            bg: 'MDBList API Key',
            cs: 'MDBList API Key',
            he: 'MDBList API Key',
            pt: 'MDBList API Key',
            zh: 'MDBList API 密钥'
        },
        mdblist_api_key_desc: {
            ru: 'API ключ для получения рейтингов от MDBList (mdblist.com)',
            en: 'API key for getting ratings from MDBList (mdblist.com)',
            uk: 'API ключ для отримання рейтингів від MDBList (mdblist.com)',
            be: 'API ключ для атрымання рэйтынгаў ад MDBList (mdblist.com)',
            bg: 'API ключ за получаване на рейтинги от MDBList (mdblist.com)',
            cs: 'API klíč pro získání hodnocení od MDBList (mdblist.com)',
            he: 'מפתח API לקבלת דירוגים מ-MDBList (mdblist.com)',
            pt: 'Chave API para obter classificações do MDBList (mdblist.com)',
            zh: '用于从 MDBList 获取评分的 API 密钥（mdblist.com）'
        },
        kp_api_key: {
            ru: 'КиноПоиск API Key',
            en: 'KinoPoisk API Key',
            uk: 'КіноПошук API Key',
            be: 'КіноПошук API Key',
            bg: 'KinoPoisk API Key',
            cs: 'KinoPoisk API Key',
            he: 'KinoPoisk API Key',
            pt: 'KinoPoisk API Key',
            zh: 'KinoPoisk API 密钥'
        },
        kp_api_key_desc: {
            ru: 'API ключ для получения рейтингов КиноПоиска (kinopoiskapiunofficial.tech)',
            en: 'API key for getting KinoPoisk ratings (kinopoiskapiunofficial.tech)',
            uk: 'API ключ для отримання рейтингів КіноПошуку (kinopoiskapiunofficial.tech)',
            be: 'API ключ для атрымання рэйтынгаў КіноПошука (kinopoiskapiunofficial.tech)',
            bg: 'API ключ за получаване на рейтинги от KinoPoisk (kinopoiskapiunofficial.tech)',
            cs: 'API klíč pro získání hodnocení KinoPoisk (kinopoiskapiunofficial.tech)',
            he: 'מפתח API לקבלת דירוגי KinoPoisk (kinopoiskapiunofficial.tech)',
            pt: 'Chave API para obter classificações do KinoPoisk (kinopoiskapiunofficial.tech)',
            zh: '用于获取 KinoPoisk 评分的 API 密钥 (kinopoiskapiunofficial.tech)'
        },
        enabled_ratings: {
            ru: 'Отображаемые рейтинги',
            en: 'Displayed Ratings',
            uk: 'Рейтинги що відображаються',
            be: 'Рэйтынгі што адлюстроўваюцца',
            bg: 'Показани рейтинги',
            cs: 'Zobrazená hodnocení',
            he: 'דירוגים מוצגים',
            pt: 'Classificações exibidas',
            zh: '显示的评分'
        },
        enabled_ratings_desc: {
            ru: 'Выберите какие рейтинги показывать',
            en: 'Select which ratings to show',
            uk: 'Виберіть які рейтинги показувати',
            be: 'Выберыце якія рэйтынгі паказваць',
            bg: 'Изберете кои рейтинги да се показват',
            cs: 'Vyberte, která hodnocení zobrazit',
            he: 'בחר אילו דירוגים להציג',
            pt: 'Selecione quais classificações exibir',
            zh: '选择要显示的评分'
        },
        rating_imdb: {
            ru: 'IMDB',
            en: 'IMDB',
            uk: 'IMDB',
            be: 'IMDB',
            bg: 'IMDB',
            cs: 'IMDB',
            he: 'IMDB',
            pt: 'IMDB',
            zh: 'IMDB'
        },
        rating_kp: {
            ru: 'КиноПоиск',
            en: 'KinoPoisk',
            uk: 'КіноПошук',
            be: 'КіноПошук',
            bg: 'KinoPoisk',
            cs: 'KinoPoisk',
            he: 'KinoPoisk',
            pt: 'KinoPoisk',
            zh: 'KinoPoisk'
        },
        rating_tmdb: {
            ru: 'TMDB',
            en: 'TMDB',
            uk: 'TMDB',
            be: 'TMDB',
            bg: 'TMDB',
            cs: 'TMDB',
            he: 'TMDB',
            pt: 'TMDB',
            zh: 'TMDB'
        },
        rating_tomatoes: {
            ru: 'Rotten Tomatoes',
            en: 'Rotten Tomatoes',
            uk: 'Rotten Tomatoes',
            be: 'Rotten Tomatoes',
            bg: 'Rotten Tomatoes',
            cs: 'Rotten Tomatoes',
            he: 'Rotten Tomatoes',
            pt: 'Rotten Tomatoes',
            zh: 'Rotten Tomatoes'
        },
        rating_popcorn: {
            ru: 'Popcorn',
            en: 'Popcorn',
            uk: 'Popcorn',
            be: 'Popcorn',
            bg: 'Popcorn',
            cs: 'Popcorn',
            he: 'Popcorn',
            pt: 'Popcorn',
            zh: 'Popcorn'
        },
        rating_metacritic: {
            ru: 'Metacritic',
            en: 'Metacritic',
            uk: 'Metacritic',
            be: 'Metacritic',
            bg: 'Metacritic',
            cs: 'Metacritic',
            he: 'Metacritic',
            pt: 'Metacritic',
            zh: 'Metacritic'
        },
        rating_letterboxd: {
            ru: 'Letterboxd',
            en: 'Letterboxd',
            uk: 'Letterboxd',
            be: 'Letterboxd',
            bg: 'Letterboxd',
            cs: 'Letterboxd',
            he: 'Letterboxd',
            pt: 'Letterboxd',
            zh: 'Letterboxd'
        },
        rating_trakt: {
            ru: 'Trakt',
            en: 'Trakt',
            uk: 'Trakt',
            be: 'Trakt',
            bg: 'Trakt',
            cs: 'Trakt',
            he: 'Trakt',
            pt: 'Trakt',
            zh: 'Trakt'
        },
        rating_mal: {
            ru: 'MyAnimeList',
            en: 'MyAnimeList',
            uk: 'MyAnimeList',
            be: 'MyAnimeList',
            bg: 'MyAnimeList',
            cs: 'MyAnimeList',
            he: 'MyAnimeList',
            pt: 'MyAnimeList',
            zh: 'MyAnimeList'
        },
        settings_title_ratings: {
            ru: 'Рейтинги',
            en: 'Ratings',
            uk: 'Рейтинги',
            be: 'Рэйтынгі',
            bg: 'Рейтинги',
            cs: 'Hodnocení',
            he: 'דירוגים',
            pt: 'Classificações',
            zh: '评分'
        },
        show_ratings_desc: {
            ru: 'Отображать рейтинги в карточке',
            en: 'Show ratings on the card',
            uk: 'Відображати рейтинги в картці',
            be: 'Адлюстроўваць рэйтынгі ў картцы',
            bg: 'Показване на рейтинги в картата',
            cs: 'Zobrazit hodnocení na kartě',
            he: 'הצג דירוגים בכרטיס',
            pt: 'Exibir classificações no cartão',
            zh: '在卡片中显示评分'
        },
        show_reactions: {
            ru: 'Показывать реакции Lampa',
            en: 'Show Lampa Reactions',
            uk: 'Показувати реакції Lampa',
            be: 'Паказваць рэакцыі Lampa',
            bg: 'Показване на реакции Lampa',
            cs: 'Zobrazit reakce Lampa',
            he: 'הצג תגובות Lampa',
            pt: 'Mostrar reações Lampa',
            zh: '显示 Lampa 反应'
        },
        show_reactions_desc: {
            ru: 'Отображать блок с реакциями на карточке',
            en: 'Display reactions block on card',
            uk: 'Відображати блок з реакціями на картці',
            be: 'Адлюстроўваць блок з рэакцыямі на картцы',
            bg: 'Показване на блока с реакции на картата',
            cs: 'Zobrazit blok s reakcemi na kartě',
            he: 'הצג בלוק תגובות בכרטיס',
            pt: 'Exibir bloco de reações no cartão',
            zh: '在卡片上显示反应块'
        },
        show_foreign_logo: {
            ru: 'Логотип на английском',
            en: 'No language logo',
            uk: 'Логотип англійською',
            be: 'Лагатып на англійскай',
            bg: 'Лого на английски',
            cs: 'Logo v angličtině',
            he: 'לוגו באנגלית',
            pt: 'Logotipo em inglês',
            zh: '英文徽标'
        },
        show_foreign_logo_desc: {
            ru: 'Показывать логотип на английском языке, если нет на русском',
            en: 'Show no language logo if localized version is missing',
            uk: 'Показувати логотип на англійській мові, якщо немає на українській',
            be: 'Паказваць лагатып на англійскай мове, калі няма на беларускай',
            bg: 'Показване на лого на английски език, ако не е налично на български',
            cs: 'Zobrazit logo v angličtině, pokud není k dispozici v češtině',
            he: 'הצג לוגו באנגלית אם הגרסה המקומית חסרה',
            pt: 'Mostrar logotipo em inglês se a versão localizada estiver ausente',
            zh: '如果本地化版本缺失，则显示英文徽标'
        },
        ratings_position: {
            ru: 'Расположение рейтингов',
            en: 'Ratings position',
            uk: 'Розташування рейтингів',
            be: 'Размяшчэнне рэйтынгаў',
            bg: 'Позиция на рейтингите',
            cs: 'Umístění hodnocení',
            he: 'מיקום דירוגים',
            pt: 'Posição das classificações',
            zh: '评分位置'
        },
        ratings_position_desc: {
            ru: 'Выберите где отображать рейтинги',
            en: 'Choose where to display ratings',
            uk: 'Виберіть де відображати рейтинги',
            be: 'Выберыце дзе адлюстроўваць рэйтынгі',
            bg: 'Изберете къде да се показват рейтингите',
            cs: 'Vyberte, kde zobrazit hodnocení',
            he: 'בחר היכן להציג דירוגים',
            pt: 'Escolha onde exibir classificações',
            zh: '选择评分显示位置'
        },
        position_card: {
            ru: 'В карточке',
            en: 'In card',
            uk: 'У картці',
            be: 'У картцы',
            bg: 'В картата',
            cs: 'Na kartě',
            he: 'בכרטיס',
            pt: 'No cartão',
            zh: '在卡片中'
        },
        position_corner: {
            ru: 'В правом нижнем углу',
            en: 'Bottom right corner',
            uk: 'У правому нижньому куті',
            be: 'У правым ніжнім куце',
            bg: 'В долния десен ъгъл',
            cs: 'V pravém dolním rohu',
            he: 'בפינה הימנית התחתונה',
            pt: 'Canto inferior direito',
            zh: '右下角'
        },
        year_short: {
            ru: ' г.',
            en: '',
            uk: ' р.',
            be: ' г.',
            bg: ' г.',
            cs: '',
            he: '',
            pt: '',
            zh: '年'
        },
        logo_scale: {
            ru: 'Размер логотипа',
            en: 'Logo Size',
            uk: 'Розмір логотипу',
            be: 'Памер лагатыпа',
            bg: 'Размер на логото',
            cs: 'Velikost loga',
            he: 'גודל לוגו',
            pt: 'Tamanho do logotipo',
            zh: '徽标大小'
        },
        logo_scale_desc: {
            ru: 'Масштаб логотипа фильма',
            en: 'Movie logo scale',
            uk: 'Масштаб логотипу фільму',
            be: 'Маштаб лагатыпа фільма',
            bg: 'Мащаб на логото на филма',
            cs: 'Měřítko loga filmu',
            he: 'קנה מידה של לוגו הסרט',
            pt: 'Escala do logotipo do filme',
            zh: '电影徽标比例'
        },
        text_scale: {
            ru: 'Размер текста',
            en: 'Text Size',
            uk: 'Розмір тексту',
            be: 'Памер тэксту',
            bg: 'Размер на текста',
            cs: 'Velikost textu',
            he: 'גודל טקסט',
            pt: 'Tamanho do texto',
            zh: '文本大小'
        },
        text_scale_desc: {
            ru: 'Масштаб текста данных о фильме',
            en: 'Movie data text scale',
            uk: 'Масштаб тексту даних про фільм',
            be: 'Маштаб тэксту даных пра фільм',
            bg: 'Мащаб на текста с данни за филма',
            cs: 'Měřítko textu dat filmu',
            he: 'קנה מידה של טקסט נתוני הסרט',
            pt: 'Escala do texto de dados do filme',
            zh: '电影数据文本比例'
        },
        scale_default: {
            ru: 'По умолчанию',
            en: 'Default',
            uk: 'За замовчуванням',
            be: 'Па змаўчанні',
            bg: 'По подразбиране',
            cs: 'Výchozí',
            he: 'ברירת מחדל',
            pt: 'Padrão',
            zh: '默认'
        },
        spacing_scale: {
            ru: 'Отступы между строками',
            en: 'Spacing Between Lines',
            uk: 'Відступи між рядками',
            be: 'Адступы паміж радкамі',
            bg: 'Разстояние между редовете',
            cs: 'Mezery mezi řádky',
            he: 'מרווח בין שורות',
            pt: 'Espaçamento entre linhas',
            zh: '行间距'
        },
        spacing_scale_desc: {
            ru: 'Расстояние между элементами информации',
            en: 'Distance between information elements',
            uk: 'Відстань між елементами інформації',
            be: 'Адлегласць паміж элементамі інфармацыі',
            bg: 'Разстояние между информационни елементи',
            cs: 'Vzdálenost mezi informačními prvky',
            he: 'מרחק בין אלמנטי מידע',
            pt: 'Distância entre elementos de informação',
            zh: '信息元素之间的距离'
        },
        settings_title_display: {
            ru: 'Отображение',
            en: 'Display',
            uk: 'Відображення',
            be: 'Адлюстраванне',
            bg: 'Показване',
            cs: 'Zobrazení',
            he: 'תצוגה',
            pt: 'Exibição',
            zh: '显示'
        },
        settings_title_scaling: {
            ru: 'Масштабирование',
            en: 'Scaling',
            uk: 'Масштабування',
            be: 'Маштабаванне',
            bg: 'Мащабиране',
            cs: 'Škálování',
            he: 'קנה מידה',
            pt: 'Dimensionamento',
            zh: '缩放'
        },
        show_episode_count: {
            ru: 'Количество серий',
            en: 'Episode Count',
            uk: 'Кількість серій',
            be: 'Колькасць серый',
            bg: 'Брой епизоди',
            cs: 'Počet epizod',
            he: 'מספר פרקים',
            pt: 'Número de episódios',
            zh: '剧集数量'
        },
        show_episode_count_desc: {
            ru: 'Показывать общее количество серий для сериалов',
            en: 'Show total episode count for TV shows',
            uk: 'Показувати загальну кількість серій для серіалів',
            be: 'Паказваць агульную колькасць серый для серыялаў',
            bg: 'Показване на общия брой епизоди за сериали',
            cs: 'Zobrazit celkový počet epizod u seriálů',
            he: 'הצג את סך כל הפרקים עבור סדרות טלוויזיה',
            pt: 'Mostrar o número total de episódios para séries',
            zh: '显示电视剧的总剧集数'
        },
        reverse_episodes: {
            ru: 'Перевернуть список эпизодов',
            en: 'Reverse Episodes List',
            uk: 'Перевернути список епізодів',
            be: 'Перавярнуць спіс эпізодаў',
            bg: 'Обърни списъка с епизоди',
            cs: 'Obrátit seznam epizod',
            he: 'הפוך את רשימת הפרקים',
            pt: 'Inverter lista de episódios',
            zh: '反转剧集列表'
        },
        reverse_episodes_desc: {
            ru: 'Показывать эпизоды в обратном порядке (от новых к старым)',
            en: 'Show episodes in reverse order (from newest to oldest)',
            uk: 'Показувати епізоди у зворотному порядку (від нових до старих)',
            be: 'Паказваць эпізоды ў адваротным парадку (ад новых да старых)',
            bg: 'Показване на епизоди в обратен ред (от нови към стари)',
            cs: 'Zobrazit epizody v opačném pořadí (od nejnovějších po nejstarší)',
            he: 'הצג פרקים בסדר הפוך (מהחדש לישן)',
            pt: 'Mostrar episódios em ordem inversa (do mais novo ao mais antigo)',
            zh: '以相反顺序显示剧集（从新到旧）'
        },
        description_overlay: {
            ru: 'Описание в оверлее',
            en: 'Description in Overlay',
            uk: 'Опис в оверлеї',
            be: 'Апісанне ў аверлеі',
            bg: 'Описание в овърлей',
            cs: 'Popis v překryvné vrstvě',
            he: 'תיאור בשכבת על',
            pt: 'Descrição em sobreposição',
            zh: '叠加层中的描述'
        },
        description_overlay_desc: {
            ru: 'Показывать описание в отдельном окне при нажатии',
            en: 'Show description in a separate window when clicked',
            uk: 'Показувати опис в окремому вікні при натисканні',
            be: 'Паказваць апісанне ў асобным акне пры націску',
            bg: 'Показване на описанието в отделен прозорец при щракване',
            cs: 'Při kliknutí zobrazit popis v samostatném okně',
            he: 'הצג תיאור בחלון נפרד בעת לחיצה',
            pt: 'Mostrar descrição em uma janela separada quando clicado',
            zh: '点击时在单独的窗口中显示描述'
        },
        liquid_glass: {
            ru: 'Жидкое стекло',
            en: 'Liquid Glass',
            uk: 'Рідке скло',
            be: 'Вадкае шкло',
            bg: 'Течно стъкло',
            cs: 'Tekuté sklo',
            he: 'זכוכית נוזלית',
            pt: 'Vidro Líquido',
            zh: '液体玻璃'
        },
        liquid_glass_desc: {
            ru: 'Эффект «стеклянных» карточек при наведении в эпизодах и актерах',
            en: '"Glassy" card effect on focus in episodes and cast',
            uk: 'Ефект «скляних» карток при наведенні в епізодах та акторах',
            be: 'Эфект «шкляных» картак пры навядзенні ў эпізодах і акцёрах',
            bg: 'Ефект „стъклени“ карти при фокус в епизодите и актьорите',
            cs: 'Efekt „skleněných“ karet při zaměření v epizodách a obsazení',
            he: 'אפקט כрטיסי "זכוכית" במיקוד בפרקים ובשחקנים',
            pt: 'Efeito de cartões "vítreos" em foco nos episódios e elenco',
            zh: '剧集和演员表中聚焦时的“玻璃”卡片效果'
        },
        about_author: {
            ru: 'Автор',
            en: 'Author',
            uk: 'Автор',
            be: 'Аўтар',
            bg: 'Автор',
            cs: 'Autor',
            he: 'מחבר',
            pt: 'Autor',
            zh: '作者'
        },
        about_description: {
            ru: 'Делает интерфейс в карточке фильма похожим на Apple TV и оптимизирует под 4K',
            en: 'Makes the movie card interface look like Apple TV and optimizes for 4K',
            uk: 'Робить інтерфейс у картці фільму схожим на Apple TV та оптимізує під 4K',
            be: 'Робіць інтэрфейс у картцы фільма падобным на Apple TV і аптымізуе пад 4K',
            bg: 'Прави интерфейса в картата на филма подобен на Apple TV и оптимизира за 4K',
            cs: 'Vytváří rozhraní karty filmu podobné Apple TV a optimalizuje pro 4K',
            he: 'הופך את ממשק כрטיס הסרט לדומה ל-Apple TV ומבצע אופטימיזציה ל-4K',
            pt: 'Torna a interface do cartão do filme semelhante à Apple TV e otimiza para 4K',
            zh: '使电影卡片界面看起来像 Apple TV 并针对 4K 进行优化'
        }
    };

    function t(key) {
        const lang = Lampa.Storage.get('language', 'ru');
        return translations[key] && translations[key][lang] || translations[key].ru;
    }

    // Применяем класс для управления эффектом жидкого стекла
    function applyLiquidGlassClass() {
        if (Lampa.Storage.get('applecation_liquid_glass', true)) {
            $('body').removeClass('applecation--no-liquid-glass');
        } else {
            $('body').addClass('applecation--no-liquid-glass');
        }
    }

    // Добавляем настройки плагина
    function addSettings() {
        // Инициализируем значения по умолчанию
        if (Lampa.Storage.get('applecation_show_ratings') === undefined) {
            Lampa.Storage.set('applecation_show_ratings', false);
        }
        if (Lampa.Storage.get('applecation_ratings_source') === undefined) {
            Lampa.Storage.set('applecation_ratings_source', 'external');
        }
        if (Lampa.Storage.get('applecation_ratings_position') === undefined) {
            Lampa.Storage.set('applecation_ratings_position', 'card');
        }
        if (Lampa.Storage.get('applecation_mdblist_api_key') === undefined) {
            Lampa.Storage.set('applecation_mdblist_api_key', '');
        }
        if (Lampa.Storage.get('applecation_kp_api_key') === undefined) {
            Lampa.Storage.set('applecation_kp_api_key', '');
        }
        if (Lampa.Storage.get('applecation_enabled_ratings') === undefined) {
            // По умолчанию не включаем КП, если ключ не задан
            const hasKpKey = !!Lampa.Storage.get('applecation_kp_api_key', '');
            Lampa.Storage.set('applecation_enabled_ratings', hasKpKey ? ['imdb', 'kp'] : ['imdb']);
        } else {
            // Если ключа КП нет — убираем КП из списка отображаемых рейтингов
            const hasKpKey = !!Lampa.Storage.get('applecation_kp_api_key', '');
            if (!hasKpKey) {
                const current = Lampa.Storage.get('applecation_enabled_ratings', ['imdb']);
                if (Array.isArray(current) && current.includes('kp')) {
                    Lampa.Storage.set('applecation_enabled_ratings', current.filter(x => x !== 'kp'));
                }
            }
        }
        if (Lampa.Storage.get('applecation_logo_scale') === undefined) {
            Lampa.Storage.set('applecation_logo_scale', '100');
        }
        if (Lampa.Storage.get('applecation_text_scale') === undefined) {
            Lampa.Storage.set('applecation_text_scale', '100');
        }
        if (Lampa.Storage.get('applecation_spacing_scale') === undefined) {
            Lampa.Storage.set('applecation_spacing_scale', '100');
        }
        if (Lampa.Storage.get('applecation_reverse_episodes') === undefined) {
            Lampa.Storage.set('applecation_reverse_episodes', true);
        }
        if (Lampa.Storage.get('applecation_description_overlay') === undefined) {
            Lampa.Storage.set('applecation_description_overlay', true);
        }
        if (Lampa.Storage.get('applecation_show_foreign_logo') === undefined) {
            Lampa.Storage.set('applecation_show_foreign_logo', true);
        }
        if (Lampa.Storage.get('applecation_liquid_glass') === undefined) {
            Lampa.Storage.set('applecation_liquid_glass', true);
        }
        if (Lampa.Storage.get('applecation_show_episode_count') === undefined) {
            Lampa.Storage.set('applecation_show_episode_count', false);
        }

        // Создаем раздел настроек
        Lampa.SettingsApi.addComponent({
            component: 'applecation_settings',
            name: 'Applecation',
            icon: PLUGIN_ICON
        });
        
        // Добавляем информацию о плагине
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_about',
                type: 'static'
            },
            field: {
                name: '<div>Applecation v' + APPLECATION_VERSION + '</div>'
            },
            onRender: function(item) {
                item.css('opacity', '0.7');
                item.find('.settings-param__name').css({
                    'font-size': '1.2em',
                    'margin-bottom': '0.3em'
                });
                item.append('<div style="font-size: 0.9em; padding: 0 1.2em; line-height: 1.4;">' + t('about_author') + ': DarkestClouds<br>' + t('about_description') + '</div>');
            }
        });

        // Заголовок: Рейтинги
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_ratings_title',
                type: 'title'
            },
            field: {
                name: t('settings_title_ratings')
            }
        });

        // Показывать рейтинги
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_show_ratings',
                type: 'trigger',
                default: false
            },
            field: {
                name: t('show_ratings'),
                description: t('show_ratings_desc')
            },
            onChange: function(value) {
                if (value) {
                    $('body').removeClass('applecation--hide-ratings');
                } else {
                    $('body').addClass('applecation--hide-ratings');
                }

                // Обновляем видимость зависимых параметров
                Lampa.Settings.update();
            }
        });

        // Источник рейтингов
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_ratings_source',
                type: 'select',
                values: {
                    external: t('ratings_source_external'),
                    builtin: t('ratings_source_builtin')
                },
                default: 'external'
            },
            field: {
                name: t('ratings_source'),
                description: t('ratings_source_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_ratings_source', value);
                // Переключаем CSS-классы для скрытия/показа нужных рейтингов
                $('body').removeClass('applecation--ratings-source-external applecation--ratings-source-builtin');
                $('body').addClass('applecation--ratings-source-' + value);
                // Обновляем видимость зависимых параметров
                Lampa.Settings.update();
            },
            onRender: function(item) {
                const showRatings = Lampa.Storage.get('applecation_show_ratings', false);
                if (!showRatings) {
                    item.hide();
                } else {
                    item.show();
                }
            }
        });

        // MDBList API Key (только для встроенных рейтингов)
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_mdblist_api_key',
                type: 'button',
                default: ''
            },
            field: {
                name: t('mdblist_api_key'),
                description: t('mdblist_api_key_desc')
            },
            onChange: function() {
                const currentKey = Lampa.Storage.get('applecation_mdblist_api_key', '');
                
                Lampa.Input.edit({
                    title: t('mdblist_api_key'),
                    value: currentKey,
                    free: true,
                    nosave: true
                }, function(newValue) {
                    if (newValue !== currentKey) {
                        Lampa.Storage.set('applecation_mdblist_api_key', newValue);
                        Lampa.Storage.set(RATINGS_CONFIG.cacheKey, {});
                        Lampa.Noty.show(t('mdblist_api_key') + ' ' + (newValue ? Lampa.Lang.translate('settings_saved') : Lampa.Lang.translate('settings_cleared')));
                    }
                });
            },
            onRender: function(item) {
                const showRatings = Lampa.Storage.get('applecation_show_ratings', false);
                if (!showRatings) {
                    item.hide();
                    return;
                }

                const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
                if (ratingsSource === 'external') {
                    item.hide();
                } else {
                    item.show();
                }
            }
        });

        // КиноПоиск API Key (только для встроенных рейтингов)
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_kp_api_key',
                type: 'button',
                default: ''
            },
            field: {
                name: t('kp_api_key'),
                description: t('kp_api_key_desc')
            },
            onChange: function() {
                const currentKey = Lampa.Storage.get('applecation_kp_api_key', '');
                
                Lampa.Input.edit({
                    title: t('kp_api_key'),
                    value: currentKey,
                    free: true,
                    nosave: true
                }, function(newValue) {
                    if (newValue !== currentKey) {
                        Lampa.Storage.set('applecation_kp_api_key', newValue);
                        Lampa.Storage.set(RATINGS_CONFIG.cacheKey, {});
                        Lampa.Noty.show(t('kp_api_key') + ' ' + (newValue ? Lampa.Lang.translate('settings_saved') : Lampa.Lang.translate('settings_cleared')));

                        // Если ключ удалили — убираем КП из списка отображаемых рейтингов
                        if (!newValue) {
                            const enabled = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp']);
                            if (Array.isArray(enabled) && enabled.includes('kp')) {
                                Lampa.Storage.set('applecation_enabled_ratings', enabled.filter(x => x !== 'kp'));
                            }
                        }
                    }
                });
            },
            onRender: function(item) {
                const showRatings = Lampa.Storage.get('applecation_show_ratings', false);
                if (!showRatings) {
                    item.hide();
                    return;
                }

                const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
                if (ratingsSource === 'external') {
                    item.hide();
                } else {
                    item.show();
                }
            }
        });

        // Отображаемые рейтинги (только для встроенных рейтингов)
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_enabled_ratings',
                type: 'button',
                default: ['imdb', 'kp']
            },
            field: {
                name: t('enabled_ratings'),
                description: t('enabled_ratings_desc')
            },
            onChange: function() {
                let enabledRatings = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp']);
                const hasKpKey = !!Lampa.Storage.get('applecation_kp_api_key', '');

                // Если ключа КП нет — не даём выбрать и вычищаем из сохранённого списка
                if (!hasKpKey && Array.isArray(enabledRatings) && enabledRatings.includes('kp')) {
                    enabledRatings = enabledRatings.filter(x => x !== 'kp');
                    Lampa.Storage.set('applecation_enabled_ratings', enabledRatings);
                }
                
                const items = [
                    {
                        title: t('rating_imdb'),
                        value: 'imdb',
                        checkbox: true,
                        checked: enabledRatings.includes('imdb')
                    },
                    {
                        title: t('rating_tmdb'),
                        value: 'tmdb',
                        checkbox: true,
                        checked: enabledRatings.includes('tmdb')
                    },
                    {
                        title: t('rating_tomatoes'),
                        value: 'tomatoes',
                        checkbox: true,
                        checked: enabledRatings.includes('tomatoes')
                    },
                    {
                        title: t('rating_popcorn'),
                        value: 'popcorn',
                        checkbox: true,
                        checked: enabledRatings.includes('popcorn')
                    },
                    {
                        title: t('rating_metacritic'),
                        value: 'metacritic',
                        checkbox: true,
                        checked: enabledRatings.includes('metacritic')
                    },
                    {
                        title: t('rating_letterboxd'),
                        value: 'letterboxd',
                        checkbox: true,
                        checked: enabledRatings.includes('letterboxd')
                    },
                    {
                        title: t('rating_trakt'),
                        value: 'trakt',
                        checkbox: true,
                        checked: enabledRatings.includes('trakt')
                    },
                    {
                        title: t('rating_mal'),
                        value: 'myanimelist',
                        checkbox: true,
                        checked: enabledRatings.includes('myanimelist')
                    }
                ];

                if (hasKpKey) {
                    items.splice(1, 0, {
                        title: t('rating_kp'),
                        value: 'kp',
                        checkbox: true,
                        checked: enabledRatings.includes('kp')
                    });
                }
                
                Lampa.Select.show({
                    title: t('enabled_ratings'),
                    items: items,
                    onCheck: function(item) {
                        const hasKpKey = !!Lampa.Storage.get('applecation_kp_api_key', '');
                        const currentEnabled = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp'])
                            .filter(x => hasKpKey ? true : x !== 'kp');
                        
                        if (item.checked) {
                            if (!currentEnabled.includes(item.value)) {
                                currentEnabled.push(item.value);
                            }
                        } else {
                            const index = currentEnabled.indexOf(item.value);
                            if (index > -1) {
                                currentEnabled.splice(index, 1);
                            }
                        }
                        
                        Lampa.Storage.set('applecation_enabled_ratings', currentEnabled);
                    },
                    onBack: function() {
                        Lampa.Controller.toggle('settings_component');
                    }
                });
            },
            onRender: function(item) {
                const showRatings = Lampa.Storage.get('applecation_show_ratings', false);
                if (!showRatings) {
                    item.hide();
                    return;
                }

                const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
                if (ratingsSource === 'external') {
                    item.hide();
                } else {
                    item.show();
                }
            }
        });

        // Расположение рейтингов
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_ratings_position',
                type: 'select',
                values: {
                    card: t('position_card'),
                    corner: t('position_corner')
                },
                default: 'card'
            },
            field: {
                name: t('ratings_position'),
                description: t('ratings_position_desc')
            },
            onChange: function(value) {
                const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
                const enabledRatings = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp']);
                
                Lampa.Storage.set('applecation_ratings_position', value);
                $('body').removeClass('applecation--ratings-card applecation--ratings-corner');
                $('body').addClass('applecation--ratings-' + value);
                // Обновляем шаблоны и перезагружаем активность
                addCustomTemplate();
                addOverlayTemplate();
                Lampa.Activity.back();
            },
            onRender: function(item) {
                const showRatings = Lampa.Storage.get('applecation_show_ratings', false);
                if (!showRatings) {
                    item.hide();
                    return;
                }

                const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
                const enabledRatings = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp']);
            }
        });

        // Заголовок: Отображение
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_display_title',
                type: 'title'
            },
            field: {
                name: t('settings_title_display')
            }
        });

        // Показывать реакции (дефолтная настройка Lampa)
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'card_interfice_reactions',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('show_reactions'),
                description: t('show_reactions_desc')
            }
        });

        // Показывать логотип на другом языке
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_show_foreign_logo',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('show_foreign_logo'),
                description: t('show_foreign_logo_desc')
            }
        });

        // Перевернуть список эпизодов
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_reverse_episodes',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('reverse_episodes'),
                description: t('reverse_episodes_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_reverse_episodes', value);
            }
        });

        // Описание в оверлее
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_description_overlay',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('description_overlay'),
                description: t('description_overlay_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_description_overlay', value);
            }
        });

        // Количество серий
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_show_episode_count',
                type: 'trigger',
                default: false
            },
            field: {
                name: t('show_episode_count'),
                description: t('show_episode_count_desc')
            }
        });

        // Жидкое стекло
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_liquid_glass',
                type: 'trigger',
                default: true
            },
            field: {
                name: t('liquid_glass'),
                description: t('liquid_glass_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_liquid_glass', value);
                applyLiquidGlassClass();
            }
        });

        // Заголовок: Масштабирование
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_scaling_title',
                type: 'title'
            },
            field: {
                name: t('settings_title_scaling')
            }
        });

        // Размер логотипа
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_logo_scale',
                type: 'select',
                values: {
                    '50': '50%',
                    '60': '60%',
                    '70': '70%',
                    '80': '80%',
                    '90': '90%',
                    '100': t('scale_default'),
                    '110': '110%',
                    '120': '120%',
                    '130': '130%',
                    '140': '140%',
                    '150': '150%',
                    '160': '160%',
                    '170': '170%',
                    '180': '180%'
                },
                default: '100'
            },
            field: {
                name: t('logo_scale'),
                description: t('logo_scale_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_logo_scale', value);
                applyScales();
            }
        });

        // Размер текста
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_text_scale',
                type: 'select',
                values: {
                    '50': '50%',
                    '60': '60%',
                    '70': '70%',
                    '80': '80%',
                    '90': '90%',
                    '100': t('scale_default'),
                    '110': '110%',
                    '120': '120%',
                    '130': '130%',
                    '140': '140%',
                    '150': '150%',
                    '160': '160%',
                    '170': '170%',
                    '180': '180%'
                },
                default: '100'
            },
            field: {
                name: t('text_scale'),
                description: t('text_scale_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_text_scale', value);
                applyScales();
            }
        });

        // Отступы между строками
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_spacing_scale',
                type: 'select',
                values: {
                    '50': '50%',
                    '60': '60%',
                    '70': '70%',
                    '80': '80%',
                    '90': '90%',
                    '100': t('scale_default'),
                    '110': '110%',
                    '120': '120%',
                    '130': '130%',
                    '140': '140%',
                    '150': '150%',
                    '160': '160%',
                    '170': '170%',
                    '180': '180%',
                    '200': '200%',
                    '250': '250%',
                    '300': '300%'
                },
                default: '100'
            },
            field: {
                name: t('spacing_scale'),
                description: t('spacing_scale_desc')
            },
            onChange: function(value) {
                Lampa.Storage.set('applecation_spacing_scale', value);
                applyScales();
            }
        });

        // Применяем текущие настройки
        if (!Lampa.Storage.get('applecation_show_ratings', false)) {
            $('body').addClass('applecation--hide-ratings');
        }
        $('body').addClass('applecation--ratings-' + Lampa.Storage.get('applecation_ratings_position', 'card'));
        
        // Применяем класс для источника рейтингов
        const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
        $('body').addClass('applecation--ratings-source-' + ratingsSource);
        
        applyScales();
    }

    // Применяем масштабирование контента
    function applyScales() {
        const logoScale = parseInt(Lampa.Storage.get('applecation_logo_scale', '100'));
        const textScale = parseInt(Lampa.Storage.get('applecation_text_scale', '100'));
        const spacingScale = parseInt(Lampa.Storage.get('applecation_spacing_scale', '100'));

        // Удаляем старые стили если есть
        $('style[data-id="applecation_scales"]').remove();

        // Создаем новые стили
        const scaleStyles = `
            <style data-id="applecation_scales">
                /* Масштаб логотипа */
                
                .applecation .applecation__logo img {
                    max-width: ${35 * logoScale / 100}vw !important;
                    max-height: ${180 * logoScale / 100}px !important;
                }

                /* Масштаб текста и мета-информации */
                .applecation .applecation__content-wrapper {
                    font-size: ${textScale}% !important;
                }

                /* Отступы между элементами */
                .applecation .full-start-new__title {
                    margin-bottom: ${0.5 * spacingScale / 100}em !important;
                }
                
                .applecation .applecation__meta {
                    margin-bottom: ${0.5 * spacingScale / 100}em !important;
                }
                
                .applecation .applecation__ratings {
                    margin-bottom: ${0.5 * spacingScale / 100}em !important;
                }
                
                .applecation .applecation__description {
                    max-width: ${35 * textScale / 100}vw !important;
                    margin-bottom: ${0.5 * spacingScale / 100}em !important;
                }
                
                .applecation .applecation__info {
                    margin-bottom: ${0.5 * spacingScale / 100}em !important;
                }
            </style>
        `;

        $('body').append(scaleStyles);
    }

    // Регистрируем шаблон для оверлея описания
    function addOverlayTemplate() {
        const overlayTemplate = `
            <div class="applecation-description-overlay">
                <div class="applecation-description-overlay__bg"></div>
                <div class="applecation-description-overlay__content selector">
                    <div class="applecation-description-overlay__logo"></div>
                    <div class="applecation-description-overlay__title">{title}</div>
                    <div class="applecation-description-overlay__text">{text}</div>
                    <div class="applecation-description-overlay__details">
                        <div class="applecation-description-overlay__info">
                            <div class="applecation-description-overlay__info-name">#{full_date_of_release}</div>
                            <div class="applecation-description-overlay__info-body">{relise}</div>
                        </div>
                        <div class="applecation-description-overlay__info applecation--budget">
                            <div class="applecation-description-overlay__info-name">#{full_budget}</div>
                            <div class="applecation-description-overlay__info-body">{budget}</div>
                        </div>
                        <div class="applecation-description-overlay__info applecation--countries">
                            <div class="applecation-description-overlay__info-name">#{full_countries}</div>
                            <div class="applecation-description-overlay__info-body">{countries}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        Lampa.Template.add('applecation_overlay', overlayTemplate);
    }

    // Регистрируем кастомный шаблон страницы full
    function addCustomTemplate() {
        const ratingsPosition = Lampa.Storage.get('applecation_ratings_position', 'card');
        
        // Блок с рейтингами
        const ratingsBlock = `<!-- Рейтинги -->
                    <div class="applecation__ratings">
                        <div class="rate--imdb hide">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path fill="currentColor" d="M4 7c-1.103 0-2 .897-2 2v6.4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2H4Zm1.4 2.363h1.275v5.312H5.4V9.362Zm1.962 0H9l.438 2.512.287-2.512h1.75v5.312H10.4v-3l-.563 3h-.8l-.512-3v3H7.362V9.362Zm8.313 0H17v1.2c.16-.16.516-.363.875-.363.36.04.84.283.8.763v3.075c0 .24-.075.404-.275.524-.16.04-.28.075-.6.075-.32 0-.795-.196-.875-.237-.08-.04-.163.275-.163.275h-1.087V9.362Zm-3.513.037H13.6c.88 0 1.084.078 1.325.237.24.16.35.397.35.838v3.2c0 .32-.15.563-.35.762-.2.2-.484.288-1.325.288h-1.438V9.4Zm1.275.8v3.563c.2 0 .488.04.488-.2v-3.126c0-.28-.247-.237-.488-.237Zm3.763.675c-.12 0-.2.08-.2.2v2.688c0 .159.08.237.2.237.12 0 .2-.117.2-.238l-.037-2.687c0-.12-.043-.2-.163-.2Z"/>
                            </svg>
                            <div>0.0</div>
                        </div>
                        <div class="rate--kp hide">
                            <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path d="M96.5 20 66.1 75.733V20H40.767v152H66.1v-55.733L96.5 172h35.467C116.767 153.422 95.2 133.578 80 115c28.711 16.889 63.789 35.044 92.5 51.933v-30.4C148.856 126.4 108.644 115.133 85 105c23.644 3.378 63.856 7.889 87.5 11.267v-30.4L85 90c27.022-11.822 60.478-22.711 87.5-34.533v-30.4C143.789 41.956 108.711 63.11 80 80l51.967-60z" style="fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/>
                            </svg>
                            <div>0.0</div>
                        </div>
                        <!-- Контейнер для встроенных рейтингов (чтобы можно было анимировать появление отдельно от общего блока) -->
                        <div class="applecation__ratings-builtin hide"></div>
                    </div>`;
        
        const template = `<div class="full-start-new applecation">
        <div class="full-start-new__body">
            <div class="full-start-new__left hide">
                <div class="full-start-new__poster">
                    <img class="full-start-new__img full--poster" />
                </div>
            </div>

            <div class="full-start-new__right">
                <div class="applecation__left">
                    <div class="applecation__logo"></div>
                    
                    <div class="applecation__content-wrapper">
                        <div class="full-start-new__title" style="display: none;">{title}</div>
                        
                        <div class="applecation__meta">
                            <div class="applecation__meta-left">
                                <span class="applecation__network"></span>
                                <span class="applecation__meta-text"></span>
                                <div class="full-start__pg hide"></div>
                            </div>
                        </div>
                        
                        ${ratingsPosition === 'card' ? ratingsBlock : ''}
                        
                        <div class="applecation__description-wrapper">
                            <div class="applecation__description"></div>
                        </div>
                        <div class="applecation__info"></div>
                    </div>
                    
                    <!-- Скрытые оригинальные элементы -->
                    <div class="full-start-new__head" style="display: none;"></div>
                    <div class="full-start-new__details" style="display: none;"></div>

                    <div class="full-start-new__buttons">
                        <div class="full-start__button selector button--play">
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14.5" r="13" stroke="currentColor" stroke-width="2.7"/>
                                <path d="M18.0739 13.634C18.7406 14.0189 18.7406 14.9811 18.0739 15.366L11.751 19.0166C11.0843 19.4015 10.251 18.9204 10.251 18.1506L10.251 10.8494C10.251 10.0796 11.0843 9.5985 11.751 9.9834L18.0739 13.634Z" fill="currentColor"/>
                            </svg>
                            <span>#{title_watch}</span>
                        </div>

                        <div class="full-start__button selector button--book">
                            <svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z" stroke="currentColor" stroke-width="2.5"/>
                            </svg>
                            <span>#{settings_input_links}</span>
                        </div>

                        <div class="full-start__button selector button--reaction">
                            <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.208 10.9742C37.1364 10.8013 37.0314 10.6441 36.899 10.5117C36.7666 10.3794 36.6095 10.2744 36.4365 10.2028L12.0658 0.108375C11.7166 -0.0361828 11.3242 -0.0361227 10.9749 0.108542C10.6257 0.253206 10.3482 0.530634 10.2034 0.879836L0.108666 25.2507C0.0369593 25.4236 3.37953e-05 25.609 2.3187e-08 25.7962C-3.37489e-05 25.9834 0.0368249 26.1688 0.108469 26.3418C0.180114 26.5147 0.28514 26.6719 0.417545 26.8042C0.54995 26.9366 0.707139 27.0416 0.880127 27.1131L17.2452 33.8917C17.5945 34.0361 17.9869 34.0361 18.3362 33.8917L29.6574 29.2017C29.8304 29.1301 29.9875 29.0251 30.1199 28.8928C30.2523 28.7604 30.3573 28.6032 30.4289 28.4303L37.2078 12.065C37.2795 11.8921 37.3164 11.7068 37.3164 11.5196C37.3165 11.3325 37.2796 11.1471 37.208 10.9742ZM20.425 29.9407L21.8784 26.4316L25.3873 27.885L20.425 29.9407ZM28.3407 26.0222L21.6524 23.252C21.3031 23.1075 20.9107 23.1076 20.5615 23.2523C20.2123 23.3969 19.9348 23.6743 19.79 24.0235L17.0194 30.7123L3.28783 25.0247L12.2918 3.28773L34.0286 12.2912L28.3407 26.0222Z" fill="currentColor"/>
                                <path d="M25.3493 16.976L24.258 14.3423L16.959 17.3666L15.7196 14.375L13.0859 15.4659L15.4161 21.0916L25.3493 16.976Z" fill="currentColor"/>
                            </svg>
                            <span>#{title_reactions}</span>
                        </div>

                        <div class="full-start__button selector button--subscribe hide">
                            <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216 30 18.7257 27.3562 18.981 24H15.9645C15.7219 25.6961 14.2632 27 12.5 27C10.7367 27 9.27804 25.6961 9.03542 24H6.01892Z" fill="currentColor"/>
                                <path d="M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5 12.5 1.5C17.2819 1.5 21.1803 5.41336 21.1803 10.2679V14.5957C21.1803 15.8462 21.5399 17.0709 22.2168 18.1213L23.0727 19.4494C24.2077 21.2106 22.9392 23.5 20.9098 23.5H4.09021C2.06084 23.5 0.792282 21.2106 1.9273 19.4494L2.78317 18.1213C3.46012 17.0709 3.81972 15.8462 3.81972 14.5957Z" stroke="currentColor" stroke-width="2.5"/>
                            </svg>
                            <span>#{title_subscribe}</span>
                        </div>

                        <div class="full-start__button selector button--options">
                            <svg width="38" height="10" viewBox="0 0 38 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4.88968" cy="4.98563" r="4.75394" fill="currentColor"/>
                                <circle cx="18.9746" cy="4.98563" r="4.75394" fill="currentColor"/>
                                <circle cx="33.0596" cy="4.98563" r="4.75394" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="applecation__right">
                    <div class="full-start-new__reactions selector">
                        <div>#{reactions_none}</div>
                    </div>
                    
                    ${ratingsPosition === 'corner' ? ratingsBlock : ''}

                    <!-- Скрытый элемент для совместимости (предотвращает выход реакций за экран) -->
                    <div class="full-start-new__rate-line">
                        <div class="full-start__status hide"></div>
                    </div>
                    
                    <!-- Пустой маркер для предотвращения вставки элементов от modss.js -->
                    <div class="rating--modss" style="display: none;"></div>
                </div>
            </div>
        </div>

        <div class="hide buttons--container">
            <div class="full-start__button view--torrent hide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z" fill="currentColor"/>
                </svg>
                <span>#{full_torrents}</span>
            </div>

            <div class="full-start__button selector view--trailer">
                <svg height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z" fill="currentColor"></path>
                </svg>
                <span>#{full_trailers}</span>
            </div>
        </div>
    </div>`;

        Lampa.Template.add('full_start_new', template);

        // Переопределяем шаблон эпизода для стиля Apple TV
        const episodeTemplate = `<div class="full-episode selector layer--visible">
            <div class="full-episode__img">
                <img />
                <div class="full-episode__time">{time}</div>
            </div>

            <div class="full-episode__body">
                <div class="full-episode__num">#{full_episode} {num}</div>
                <div class="full-episode__name">{name}</div>
                <div class="full-episode__overview">{overview}</div>
                <div class="full-episode__date">{date}</div>
            </div>
        </div>`;
        
        Lampa.Template.add('full_episode', episodeTemplate);
    }

    function disableFullDescription(e) {
        if (e.type === 'start' && e.link) {
            // Удаляем 'description' из списка rows перед рендерингом
            const rows = e.link.rows;
            const index = rows.indexOf('description');
            if (index > -1) {
                rows.splice(index, 1);
            }
        }
    }

    function addStyles() {
        const styles = `<style>

/* Основной контейнер */
.applecation {
    transition: all .3s;
}

.applecation .full-start-new__body {
    height: 80vh;
}

.applecation .full-start-new__right {
    display: flex;
    align-items: flex-end;
}

.applecation .full-start-new__title {
    font-size: 2.5em;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5em;
    text-shadow: 0 0 .1em rgba(0, 0, 0, 0.3);
}

/* Логотип */
.applecation__logo {
    margin-bottom: 0.5em;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.applecation__logo.loaded {
    opacity: 1;
    transform: translateY(0);
}

.applecation__logo img {
    display: block;
    max-width: 35vw;
    max-height: 180px;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: left center;
}

/* Контейнер для масштабируемого контента */
.applecation__content-wrapper {
    font-size: 100%;
}

/* Мета информация (Тип/Жанр/поджанр) */
.applecation__meta {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 1.1em;
    margin-bottom: 0.5em;
    line-height: 1;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    transition-delay: 0.05s;
}

.applecation__meta.show {
    opacity: 1;
    transform: translateY(0);
}

.applecation__meta-left {
    display: flex;
    align-items: center;
    line-height: 1;
}

.applecation__network {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    margin-right: 1em;
}

.applecation__network img {
    display: block;
    max-height: 0.8em;
    width: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

.applecation__meta-text {
    line-height: 1;
}

.applecation__meta .full-start__pg {
    margin: 0 0 0 0.6em;
    padding: 0.2em 0.5em;
    font-size: 0.85em;
    font-weight: 600;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    border-radius: 0.3em;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    line-height: 1;
    vertical-align: middle;
}

/* Рейтинги */
.applecation__ratings {
    display: flex;
    align-items: center;
    gap: 0.8em;
    margin-bottom: 0.5em;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    transition-delay: 0.08s;
}

.applecation__ratings.show {
    opacity: 1;
    transform: translateY(0);
}

/* Встроенные рейтинги: плавное появление контента внутри уже показанного блока */
.applecation__ratings-builtin {
    display: flex;
    align-items: center;
    gap: 0.8em;
}

@keyframes applecation-ratings-in {
    from {
        opacity: 0;
        transform: translateY(15px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Каждый рейтинг анимируется при вставке. До раскрытия карточки анимация на паузе. */
.applecation__ratings-builtin > div {
    opacity: 0;
    transform: translateY(15px);
    animation: applecation-ratings-in 0.4s ease-out both;
    animation-play-state: paused;
}

.applecation__ratings.show .applecation__ratings-builtin > div {
    animation-play-state: running;
}

.applecation__ratings .rate--imdb,
.applecation__ratings .rate--kp,
.applecation__ratings .rate--tmdb,
.applecation__ratings .rate--tomatoes,
.applecation__ratings .rate--popcorn,
.applecation__ratings .rate--metacritic,
.applecation__ratings .rate--letterboxd,
.applecation__ratings .rate--trakt,
.applecation__ratings .rate--myanimelist,
.applecation__ratings .builtin-rate--imdb,
.applecation__ratings .builtin-rate--kp,
.applecation__ratings .builtin-rate--tmdb,
.applecation__ratings .builtin-rate--tomatoes,
.applecation__ratings .builtin-rate--popcorn,
.applecation__ratings .builtin-rate--metacritic,
.applecation__ratings .builtin-rate--letterboxd,
.applecation__ratings .builtin-rate--trakt,
.applecation__ratings .builtin-rate--myanimelist {
    display: flex;
    align-items: center;
    gap: 0.35em;
}

.applecation__ratings svg {
    width: 1.8em;
    height: auto;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.85);
}

.applecation__ratings .rate--kp svg,
.applecation__ratings .builtin-rate--kp svg {
    width: 1.5em;
}

.applecation__ratings .rate--tmdb svg {
    width: 1.6em;
}

.applecation__ratings .builtin-rate--tmdb svg {
    width: 1.35em;
}

.applecation__ratings .rate--tomatoes svg,
.applecation__ratings .builtin-rate--tomatoes svg {
    width: 1.3em;
}

.applecation__ratings .rate--popcorn svg,
.applecation__ratings .builtin-rate--popcorn svg {
    width: 1em;
}

.applecation__ratings .rate--metacritic svg,
.applecation__ratings .builtin-rate--metacritic svg {
    width: 1.3em;
}

.applecation__ratings .rate--letterboxd svg,
.applecation__ratings .builtin-rate--letterboxd svg {
    width: 1.6em;
}

.applecation__ratings .rate--trakt svg,
.applecation__ratings .builtin-rate--trakt svg {
    width: 1.3em;
}

.applecation__ratings .rate--myanimelist svg,
.applecation__ratings .builtin-rate--myanimelist svg {
    width: 1.8em;
}

.applecation__ratings > div > div {
    font-size: 0.95em;
    font-weight: 600;
    line-height: 1;
    color: #fff;
}

/* Управление видимостью рейтингов через настройки */
body.applecation--hide-ratings .applecation__ratings {
    display: none !important;
}

/* Скрытие рейтингов в зависимости от источника */
/* Когда выбраны встроенные рейтинги - скрываем контейнеры для внешних плагинов */
body.applecation--ratings-source-builtin .applecation__ratings .rate--imdb,
body.applecation--ratings-source-builtin .applecation__ratings .rate--kp,
body.applecation--ratings-source-builtin .applecation__ratings .rate--tmdb {
    display: none !important;
}

/* Когда выбраны внешние рейтинги - скрываем встроенные */
body.applecation--ratings-source-external .applecation__ratings-builtin {
    display: none !important;
}

/* Расположение рейтингов - в правом нижнем углу */
body.applecation--ratings-corner .applecation__right {
    gap: 1em;
}

body.applecation--ratings-corner .applecation__ratings {
    margin-bottom: 0;
}

/* Обертка для описания */
.applecation__description-wrapper {
    background-color: transparent;
    padding: 0;
    border-radius: 1em;
    width: fit-content;
    opacity: 0;
    transform: translateY(15px);
    transition:
        padding 0.25s ease,
        transform 0.25s ease,
        opacity 0.4s ease-out;
    transition-delay: 0.1s;
}

.applecation__description-wrapper.show {
    opacity: 1;
    transform: translateY(0);
}

.applecation__description-wrapper.focus {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.28),
    rgba(255, 255, 255, 0.18)
  );
  padding: .15em .4em 0 .7em;
  border-radius: 1em;
  width: fit-content;

//   box-shadow:
//     inset 0 1px 0 rgba(255, 255, 255, 0.35),
//     0 8px 24px rgba(0, 0, 0, 0.25);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35);

  transform: scale(1.07) translateY(0);
  
  transition-delay: 0s;
}

/* Описание */
.applecation__description {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95em;
    line-height: 1.5;
    margin-bottom: 0.5em;
    max-width: 35vw;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}


.focus .applecation__description {
  color: rgba(255, 255, 255, 0.92);
}

/* Дополнительная информация (Год/длительность) */
.applecation__info {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1em;
    line-height: 1.4;
    margin-bottom: 0.5em;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    transition-delay: 0.15s;
}

.applecation__info.show {
    opacity: 1;
    transform: translateY(0);
}

/* Левая и правая части */
.applecation__left {
    flex-grow: 1;
}

.applecation__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
}

/* Выравнивание по baseline если рейтинги в углу */
body.applecation--ratings-corner .applecation__right {
    align-items: last baseline;
}

/* Реакции */
.applecation .full-start-new__reactions {
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}

.applecation .full-start-new__reactions > div {
    align-self: flex-end;
}

.applecation .full-start-new__reactions:not(.focus) {
    margin: 0;
}

.applecation .full-start-new__reactions:not(.focus) > div:not(:first-child) {
    display: none;
}

/* Стили первой реакции (всегда видимой) */
.applecation .full-start-new__reactions > div:first-child .reaction {
    display: flex !important;
    align-items: center !important;
    background-color: rgba(0, 0, 0, 0) !important;
    gap: 0 !important;
}

.applecation .full-start-new__reactions > div:first-child .reaction__icon {
    background-color: rgba(0, 0, 0, 0.3) !important;
    -webkit-border-radius: 5em;
    -moz-border-radius: 5em;
    border-radius: 5em;
    padding: 0.5em;
    width: 2.6em !important;
    height: 2.6em !important;
}

.applecation .full-start-new__reactions > div:first-child .reaction__count {
    font-size: 1.2em !important;
    font-weight: 500 !important;
}

/* При фокусе реакции раскрываются вверх */
.applecation .full-start-new__reactions.focus {
    gap: 0.5em;
}

.applecation .full-start-new__reactions.focus > div {
    display: block;
}

/* Скрываем стандартный rate-line (используется только для статуса) */
.applecation .full-start-new__rate-line {
    margin: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
}

/* Фон - переопределяем стандартную анимацию на fade */
.full-start__background {
    height: calc(100% + 6em);
    left: 0 !important;
    opacity: 0 !important;
    transition: opacity 0.6s ease-out, filter 0.3s ease-out !important;
    animation: none !important;
    transform: none !important;
    will-change: opacity, filter;
}

.full-start__background.loaded:not(.dim) {
    opacity: 1 !important;
}

.full-start__background.dim {
  filter: blur(30px);
}

/* Удерживаем opacity при загрузке нового фона */
.full-start__background.loaded.applecation-animated {
    opacity: 1 !important;
}

body:not(.menu--open) .full-start__background {
    mask-image: none;
}

/* Отключаем стандартную анимацию Lampa для фона */
body.advanced--animation:not(.no--animation) .full-start__background.loaded {
    animation: none !important;
}

/* Скрываем статус для предотвращения выхода реакций за экран */
.applecation .full-start__status {
    display: none;
}

/* Оверлей для затемнения левого края */
.applecation__overlay {
    width: 90vw;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.792) 0%, rgba(0, 0, 0, 0.504) 25%, rgba(0, 0, 0, 0.264) 45%, rgba(0, 0, 0, 0.12) 55%, rgba(0, 0, 0, 0.043) 60%, rgba(0, 0, 0, 0) 65%);
}

/* Бейджи качества */
.applecation__quality-badges {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    margin-left: 0.6em;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.applecation__quality-badges.show {
    opacity: 1;
    transform: translateY(0);
}

.quality-badge {
    display: inline-flex;
    height: 0.8em;
}

.quality-badge svg {
    height: 100%;
    width: auto;
    display: block;
}

.quality-badge--res svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.quality-badge--dv svg,
.quality-badge--hdr svg,
.quality-badge--sound svg,
.quality-badge--dub svg {
    color: rgba(255, 255, 255, 0.85);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

/* Эпизоды Apple TV */
.applecation .full-episode--small {
    width: 20em !important;
    height: auto !important;
    margin-right: 1.5em !important;
    background: none !important;
    display: flex !important;
    flex-direction: column !important;
    transition: transform 0.3s !important;
}

.applecation .full-episode--small.focus {
    transform: scale(1.02);
}

.applecation .full-episode--next .full-episode__img::after {
  border: none !important;
}

.applecation .full-episode__img {
    padding-bottom: 56.25% !important;
    border-radius: 0.8em !important;
    margin-bottom: 1em !important;
    background-color: rgba(255,255,255,0.05) !important;
    position: relative !important;
    overflow: visible !important;
}

.applecation .full-episode__img img {
    border-radius: 0.8em !important;
    object-fit: cover !important;
}

.applecation .full-episode__time {
    position: absolute;
    bottom: 0.8em;
    left: 0.8em;
    background: rgba(0,0,0,0.6);
    padding: 0.2em 0.5em;
    border-radius: 0.4em;
    font-size: 0.75em;
    font-weight: 600;
    color: #fff;
    backdrop-filter: blur(5px);
    z-index: 2;
}

.applecation .full-episode__time:empty {
    display: none;
}

.applecation .full-episode__body {
    position: static !important;
    display: flex !important;
    flex-direction: column !important;
    background: none !important;
    padding: 0 0.5em !important;
    opacity: 0.6;
    transition: opacity 0.3s;
}

.applecation .full-episode.focus .full-episode__body {
    opacity: 1;
}

.applecation .full-episode__num {
    font-size: 0.75em !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    color: rgba(255,255,255,0.4) !important;
    margin-bottom: 0.2em !important;
    letter-spacing: 0.05em !important;
}

.applecation .full-episode__name {
    font-size: 1.1em !important;
    font-weight: 600 !important;
    color: #fff !important;
    margin-bottom: 0.4em !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    line-height: 1.4 !important;
    padding-bottom: 0.1em !important;
}

.applecation .full-episode__overview {
    font-size: 0.85em !important;
    line-height: 1.4 !important;
    color: rgba(255,255,255,0.5) !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    margin-bottom: 0.6em !important;
    height: 2.8em !important;
}

.applecation .full-episode__date {
    font-size: 0.8em !important;
    color: rgba(255,255,255,0.3) !important;
}


/* =========================================================
   БАЗА: ничего не блюрим/не затемняем без фокуса
   ========================================================= */

.applecation .full-episode{
  position: relative;
  z-index: 1;
  opacity: 1;
  filter: none;

  transition: transform .6s cubic-bezier(.16,1,.3,1);
}

/* без фокуса — вообще без эффектов */
.applecation .full-episode:not(.focus){
  transform: none;
}

/* фокус — мягкий “apple” подъём */
.applecation .full-episode.focus{
  z-index: 10;
  transform: scale(1.03) translateY(-6px);
}


/* =========================================================
   КАРТИНКА
   ========================================================= */

.applecation .full-episode__img{
  position: relative;
  overflow: hidden;
  border-radius: inherit;

  transition:
    box-shadow .6s cubic-bezier(.16,1,.3,1),
    backdrop-filter .6s cubic-bezier(.16,1,.3,1),
    transform .6s cubic-bezier(.16,1,.3,1);
}


/* =========================================================
   ЖИДКОЕ СТЕКЛО — ТОЛЬКО НА ФОКУСЕ
   ========================================================= */

.applecation .full-episode.focus .full-episode__img{
  box-shadow:
    0 0 0 1px rgba(255,255,255,.18),
    0 26px 65px rgba(0,0,0,.4) !important;

  -webkit-backdrop-filter: blur(14px) saturate(1.25) contrast(1.05);
  backdrop-filter: blur(14px) saturate(1.25) contrast(1.05);

  background: rgba(255,255,255,.06);
}

/* толщина стекла */
.applecation .full-episode.focus .full-episode__img::before{
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;

  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.22),
    inset 0 0 18px rgba(255,255,255,.12),
    inset 0 -14px 22px rgba(0,0,0,.18);

  filter: blur(.35px);
  opacity: 1;
  transition: opacity .45s ease;
}

/* блик */
.applecation .full-episode.focus .full-episode__img::after{
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;

  background:
    radial-gradient(120% 85% at 18% 10%,
      rgba(255,255,255,.38),
      rgba(255,255,255,.10) 38%,
      transparent 62%),
    linear-gradient(135deg,
      rgba(255,255,255,.20),
      rgba(255,255,255,0) 52%,
      rgba(255,255,255,.06));

  mix-blend-mode: screen;
  opacity: .95;

  transition:
    opacity .45s ease,
    transform .65s cubic-bezier(.16,1,.3,1);
}

/* когда фокуса нет — просто не показываем слои стекла */
.applecation .full-episode:not(.focus) .full-episode__img::before,
.applecation .full-episode:not(.focus) .full-episode__img::after{
  opacity: 0;
}

/* убрать старый оверлей */
.applecation .full-episode.focus::after{
  display: none !important;
}



.applecation .full-episode__viewed {
    top: 0.8em !important;
    right: 0.8em !important;
    background: rgba(0,0,0,0.5) !important;
    border-radius: 50% !important;
    padding: 0.3em !important;
    backdrop-filter: blur(10px) !important;
}

/* Статус следующей серии */
.applecation .full-episode--next .full-episode__img:after {
    border-radius: 0.8em !important;
}

/* Оверлей для полного описания */
.applecation-description-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.applecation-description-overlay.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.applecation-description-overlay__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-backdrop-filter: blur(100px);
    backdrop-filter: blur(100px);
}

.applecation-description-overlay__content {
    position: relative;
    z-index: 1;
    max-width: 60vw;
    max-height: 90vh;
    overflow-y: auto;
}

.applecation-description-overlay__logo {
    text-align: center;
    margin-bottom: 1.5em;
    display: none;
}

.applecation-description-overlay__logo img {
    max-width: 40vw;
    max-height: 150px;
    width: auto;
    height: auto;
    object-fit: contain;
}

.applecation-description-overlay__title {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 1em;
    color: #fff;
    text-align: center;
}

.applecation-description-overlay__text {
    font-size: 1.2em;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    white-space: pre-wrap;
    margin-bottom: 1.5em;
}

.applecation-description-overlay__details {
    display: flex;
    flex-wrap: wrap;
    margin: -1em;
}

.applecation-description-overlay__details > * {
    margin: 1em;
}

.applecation-description-overlay__info-name {
    font-size: 1.1em;
    margin-bottom: 0.5em;
}

.applecation-description-overlay__info-body {
    font-size: 1.2em;
    opacity: 0.6;
}

/* Скроллбар для описания */
.applecation-description-overlay__content::-webkit-scrollbar {
    width: 0.5em;
}

.applecation-description-overlay__content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1em;
}

.applecation-description-overlay__content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1em;
}

.applecation-description-overlay__content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* =========================================================
   ПЕРСОНЫ (АКТЕРЫ И СЪЕМОЧНАЯ ГРУППА) - APPLE TV СТИЛЬ
   ========================================================= */

.applecation .full-person {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 10.7em !important;
    background: none !important;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform;
    -webkit-animation: none !important;
    animation: none !important;
    margin-left: 0;
}

.applecation .full-person.focus {
    transform: scale(1.08) translateY(-6px) !important;
    z-index: 10;
}

/* Фото персоны - круглое */
.applecation .full-person__photo {
    position: relative !important;
    width: 9.4em !important;
    height: 9.4em !important;
    margin: 0 0 .3em 0 !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    background: rgba(255, 255, 255, 0.05) !important;
    flex-shrink: 0 !important;
    transition: 
        box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
        background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform, box-shadow, backdrop-filter;
    -webkit-animation: none !important;
    animation: none !important;
}

.applecation .full-person__photo img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
}

/* Смещаем лицо только при высоком качестве (w500), так как там другой кроп у TMDB */
.applecation.applecation--poster-high .full-person__photo img {
    object-position: center calc(50% + 20px) !important;
}

/* Дефолтные заглушки оставляем по центру, чтобы не ломать симметрию иконок */
.applecation .full-person__photo img[src*="actor.svg"],
.applecation .full-person__photo img[src*="img_broken.svg"] {
    object-position: center !important;
}

/* ЖИДКОЕ СТЕКЛО — БАЗОВЫЕ СЛОИ (скрыты) */
.applecation .full-person__photo::before,
.applecation .full-person__photo::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: opacity;
}

/* толщина стекла */
.applecation .full-person__photo::before {
    z-index: 2;
    box-shadow:
        inset 2px 2px 1px rgba(255, 255, 255, 0.30),
        inset -2px -2px 2px rgba(255, 255, 255, 0.30);
}

/* ореол и блик */
.applecation .full-person__photo::after {
    z-index: 3;
    background:
        radial-gradient(circle at center,
            transparent 58%,
            rgba(255, 255, 255, 0.22) 75%,
            rgba(255, 255, 255, 0.38) 90%),
        radial-gradient(120% 85% at 18% 10%,
            rgba(255, 255, 255, 0.35),
            rgba(255, 255, 255, 0.10) 38%,
            transparent 62%);
    mix-blend-mode: screen;
}

/* ЭФФЕКТЫ ПРИ ФОКУСЕ */

.applecation .full-person.focus .full-person__photo::before,
.applecation .full-person.focus .full-person__photo::after {
    opacity: 1;
}

.applecation .full-person.focus .full-person__photo::after {
    opacity: 0.9;
}

/* Текстовая информация */
.applecation .full-person__body {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    width: 100% !important;
    padding: 0 0.3em !important;
}

/* Имя персоны */
.applecation .full-person__name {
    font-size: 1em !important;
    font-weight: 600 !important;
    color: #fff !important;
    line-height: 1.3 !important;
    width: 100% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    position: relative !important;
}

/* Бегущая строка для длинных имен */
.applecation .full-person__name.marquee-active {
    text-overflow: clip !important;
    mask-image: linear-gradient(to right, #000 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, #000 92%, transparent 100%);
}

/* При фокусе (когда строка едет) прозрачность с обеих сторон */
.applecation .full-person.focus .full-person__name.marquee-active {
    mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
}

.applecation .marquee__inner {
    display: inline-block;
    white-space: nowrap;
}

.applecation .marquee__inner span {
    padding-right: 2.5em;
    display: inline-block;
}

/* Запуск анимации при фокусе */
.applecation .full-person.focus .full-person__name.marquee-active .marquee__inner {
    animation: marquee var(--marquee-duration, 5s) linear infinite;
}

@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* Роль персоны */
.applecation .full-person__role {
    font-size: 0.8em !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 0.5) !important;
    line-height: 1.3 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    width: 100% !important;
    margin-top: 0;
}

.applecation .full-person.focus .full-person__role {
    color: rgb(255, 255, 255) !important;
}

/* ОТКЛЮЧЕНИЕ ЖИДКОГО СТЕКЛА */
body.applecation--no-liquid-glass .applecation .full-episode.focus .full-episode__img,
body.applecation--no-liquid-glass .applecation .full-person.focus .full-person__photo {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: rgba(255,255,255,0.05) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
}

body.applecation--no-liquid-glass .applecation .full-episode.focus .full-episode__img::before,
body.applecation--no-liquid-glass .applecation .full-episode.focus .full-episode__img::after,
body.applecation--no-liquid-glass .applecation .full-person.focus .full-person__photo::before,
body.applecation--no-liquid-glass .applecation .full-person.focus .full-person__photo::after {
    display: none !important;
}
</style>`;
        
        Lampa.Template.add('applecation_css', styles);
        $('body').append(Lampa.Template.get('applecation_css', {}, true));
    }

    // Патчим внутренние методы Лампы для корректной работы эпизодов и качества
    function patchApiImg() {
        const tmdbSource = Lampa.Api.sources.tmdb;

        if (!tmdbSource) return;

        // 0. Патчим формирование URL для TMDB, чтобы добавить логотипы в основной запрос (append_to_response)
        if (window.Lampa && Lampa.TMDB && Lampa.TMDB.api) {
            const originalTmdbApi = Lampa.TMDB.api;
            Lampa.TMDB.api = function(url) {
                let newUrl = url;
                if (typeof newUrl === 'string' && newUrl.indexOf('append_to_response=') !== -1 && newUrl.indexOf('images') === -1) {
                    // Добавляем images в список append_to_response
                    newUrl = newUrl.replace('append_to_response=', 'append_to_response=images,');
                    
                    // Добавляем языки для картинок, если они еще не указаны
                    if (newUrl.indexOf('include_image_language=') === -1) {
                        const lang = Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language') || 'ru';
                        newUrl += (newUrl.indexOf('?') === -1 ? '?' : '&') + 'include_image_language=en,null,' + lang;
                    }
                }
                return originalTmdbApi.call(Lampa.TMDB, newUrl);
            };
        }
        
        // 1. Патчим шаблонизатор, чтобы принудительно изменить формат даты и времени в карточках
        const originalTemplateJs = Lampa.Template.js;
        Lampa.Template.js = function(name, vars) {
            if (name === 'full_episode' && vars) {
                // Форматируем время (локализовано: 1 ч 10 м или 39 м) - убираем точки
                if (vars.runtime > 0) {
                    vars.time = Lampa.Utils.secondsToTimeHuman(vars.runtime * 60).replace(/\./g, '');
                } else {
                    vars.time = '';
                }

                // Форматируем дату: всегда с годом
                if (vars.air_date) {
                    const dateObj = new Date(vars.air_date.replace(/-/g, '/'));
                    const month = dateObj.getMonth() + 1;
                    const monthEnd = Lampa.Lang.translate('month_' + month + '_e');
                    const yearSuffix = t('year_short');
                    vars.date = dateObj.getDate() + ' ' + monthEnd + ' ' + dateObj.getFullYear() + yearSuffix;
                }
            }
            return originalTemplateJs.call(Lampa.Template, name, vars);
        };

        // 2. Патчим метод изображений для улучшения качества
        const originalImg = tmdbSource.img;
        tmdbSource.img = function(src, size) {
            const posterSize = Lampa.Storage.field('poster_size');

            if (size === 'w1280') {
                const backdropMap = {
                    'w200': 'w780',
                    'w300': 'w1280',
                    'w500': 'original'
                };
                size = backdropMap[posterSize] || 'w1280';
            }

            if (size === 'w300') {
                const episodeMap = {
                    'w200': 'w300',
                    'w300': 'w780',
                    'w500': 'w780'
                };
                size = episodeMap[posterSize] || 'w300';
            }

            if (size === 'w276_and_h350_face' && posterSize === 'w500') {
                size = 'w600_and_h900_face';
            }

            return originalImg.call(tmdbSource, src, size);
        };

        Lampa.Api.img = tmdbSource.img;
    }

    // Получаем качество логотипа на основе poster_size
    function getLogoQuality() {
        const posterSize = Lampa.Storage.field('poster_size');
        const qualityMap = {
            'w200': 'w300',      // Низкое постера → низкое лого
            'w300': 'w500',      // Среднее постера → среднее лого
            'w500': 'original'   // Высокое постера → оригинальное лого
        };
        return qualityMap[posterSize] || 'w500';
    }

    // Получаем локализованный тип медиа
    function getMediaType(data) {
        const lang = Lampa.Storage.get('language', 'ru');
        const isTv = !!data.name;
        
        const types = {
            ru: isTv ? 'Сериал' : 'Фильм',
            en: isTv ? 'TV Series' : 'Movie',
            uk: isTv ? 'Серіал' : 'Фільм',
            be: isTv ? 'Серыял' : 'Фільм',
            bg: isTv ? 'Сериал' : 'Филм',
            cs: isTv ? 'Seriál' : 'Film',
            he: isTv ? 'סדרה' : 'סרט',
            pt: isTv ? 'Série' : 'Filme',
            zh: isTv ? '电视剧' : '电影'
        };
        
        return types[lang] || types['en'];
    }

    // Загружаем иконку студии/сети
    function loadNetworkIcon(activity, data) {
        const networkContainer = activity.render().find('.applecation__network');
        
        // Для сериалов - телесеть
        if (data.networks && data.networks.length) {
            const network = data.networks[0];
            if (network.logo_path) {
                const logoUrl = Lampa.Api.img(network.logo_path, 'w200');
                networkContainer.html(`<img src="${logoUrl}" alt="${network.name}">`);
                return;
            }
        }
        
        // Для фильмов - студия
        if (data.production_companies && data.production_companies.length) {
            const company = data.production_companies[0];
            if (company.logo_path) {
                const logoUrl = Lampa.Api.img(company.logo_path, 'w200');
                networkContainer.html(`<img src="${logoUrl}" alt="${company.name}">`);
                return;
            }
        }
        
        // Если нет иконки - скрываем контейнер
        networkContainer.remove();
    }

    // Заполняем мета информацию (Тип/Жанр/поджанр)
    function fillMetaInfo(activity, data) {
        const metaTextContainer = activity.render().find('.applecation__meta-text');
        const metaParts = [];

        // Тип контента
        metaParts.push(getMediaType(data));

        // Жанры (первые 2-3)
        if (data.genres && data.genres.length) {
            const genres = data.genres.slice(0, 2).map(g => 
                Lampa.Utils.capitalizeFirstLetter(g.name)
            );
            metaParts.push(...genres);
        }

        metaTextContainer.html(metaParts.join(' · '));
        
        // Загружаем иконку студии/сети
        loadNetworkIcon(activity, data);
    }

    // Заполняем описание
    function fillDescription(activity, data) {
        const descContainer = activity.render().find('.applecation__description');
        const descWrapper = activity.render().find('.applecation__description-wrapper');
        const description = data.overview || '';
        const useOverlay = Lampa.Storage.get('applecation_description_overlay', true);
        
        descContainer.text(description);
        
        if (useOverlay) {
            // Создаем оверлей заранее
            createDescriptionOverlay(activity, data);
            
            // Добавляем обработчик клика для показа полного описания
            descWrapper.off('hover:enter').on('hover:enter', function() {
                showFullDescription();
            });
        } else {
            // Если оверлей отключен, убираем обработчики и удаляем оверлей
            descWrapper.off('hover:enter');
            $('.applecation-description-overlay').remove();
        }
    }
    
    // Обновляем логотип в оверлее
    function updateOverlayLogo(logoUrl) {
        const overlay = $('.applecation-description-overlay');
        
        if (!overlay.length) return;
        
        if (logoUrl) {
            const newLogoImg = $('<img>').attr('src', logoUrl);
            overlay.find('.applecation-description-overlay__logo').html(newLogoImg).css('display', 'block');
            overlay.find('.applecation-description-overlay__title').css('display', 'none');
        }
    }
    
    // Парсим страны с локализацией (как в ядре Lampa)
    function parseCountries(movie) {
        if (!movie.production_countries) return [];
        
        return movie.production_countries.map(country => {
            const isoCode = country.iso_3166_1;
            const langKey = 'country_' + isoCode.toLowerCase();
            const translated = Lampa.Lang.translate(langKey);
            
            // Если перевод найден (не равен ключу), используем его, иначе оригинальное имя
            return translated !== langKey ? translated : country.name;
        });
    }
    
    // Создаем оверлей заранее
    function createDescriptionOverlay(activity, data) {
        const text = data.overview || '';
        const title = data.title || data.name;
        
        if (!text) return;
        
        // Удаляем старый оверлей если есть
        $('.applecation-description-overlay').remove();
        
        // Парсим данные как в Lampa
        const date = (data.release_date || data.first_air_date || '') + '';
        const relise = date.length > 3 ? Lampa.Utils.parseTime(date).full : date.length > 0 ? date : Lampa.Lang.translate('player_unknown');
        const budget = '$ ' + Lampa.Utils.numberWithSpaces(data.budget || 0);
        const countriesArr = parseCountries(data);
        const countries = countriesArr.join(', ');
        
        // Создаем оверлей через шаблон Lampa
        const overlay = $(Lampa.Template.get('applecation_overlay', {
            title: title,
            text: text,
            relise: relise,
            budget: budget,
            countries: countries
        }));
        
        // Скрываем бюджет если 0
        if (!data.budget || data.budget === 0) {
            overlay.find('.applecation--budget').remove();
        }
        
        // Скрываем страны если пусто
        if (!countries) {
            overlay.find('.applecation--countries').remove();
        }
        
        // Добавляем в body но НЕ показываем
        $('body').append(overlay);
        
        // Сохраняем ссылку
        overlay.data('controller-created', false);
    }
    
    // Показываем полное описание в оверлее
    function showFullDescription() {
        const overlay = $('.applecation-description-overlay');
        
        if (!overlay.length) return;
        
        // Анимация появления
        setTimeout(() => overlay.addClass('show'), 10);
        
        // Создаем контроллер только один раз
        if (!overlay.data('controller-created')) {
            const controller = {
                toggle: function() {
                    Lampa.Controller.collectionSet(overlay);
                    Lampa.Controller.collectionFocus(overlay.find('.applecation-description-overlay__content'), overlay);
                },
                back: function() {
                    closeDescriptionOverlay();
                }
            };
            
            Lampa.Controller.add('applecation_description', controller);
            overlay.data('controller-created', true);
        }
        
        Lampa.Controller.toggle('applecation_description');
    }
    
    // Закрываем оверлей с описанием
    function closeDescriptionOverlay() {
        const overlay = $('.applecation-description-overlay');
        
        if (!overlay.length) return;
        
        overlay.removeClass('show');
        
        setTimeout(() => {
            Lampa.Controller.toggle('content');
        }, 300);
    }

    // Склонение сезонов с локализацией
    function formatSeasons(count) {
        const lang = Lampa.Storage.get('language', 'ru');
        
        // Славянские языки (ru, uk, be, bg) - сложное склонение
        if (['ru', 'uk', 'be', 'bg'].includes(lang)) {
            const cases = [2, 0, 1, 1, 1, 2];
            const titles = {
                ru: ['сезон', 'сезона', 'сезонов'],
                uk: ['сезон', 'сезони', 'сезонів'],
                be: ['сезон', 'сезоны', 'сезонаў'],
                bg: ['сезон', 'сезона', 'сезона']
            };
            
            const langTitles = titles[lang] || titles['ru'];
            const caseIndex = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)];
            
            return `${count} ${langTitles[caseIndex]}`;
        }
        
        // Английский
        if (lang === 'en') {
            return count === 1 ? `${count} Season` : `${count} Seasons`;
        }
        
        // Чешский
        if (lang === 'cs') {
            if (count === 1) return `${count} série`;
            if (count >= 2 && count <= 4) return `${count} série`;
            return `${count} sérií`;
        }
        
        // Португальский
        if (lang === 'pt') {
            return count === 1 ? `${count} Temporada` : `${count} Temporadas`;
        }
        
        // Иврит
        if (lang === 'he') {
            if (count === 1) return `עונה ${count}`;
            if (count === 2) return `${count} עונות`;
            return `${count} עונות`;
        }
        
        // Китайский (без склонения)
        if (lang === 'zh') {
            return `${count} 季`;
        }
        
        // Остальные языки - базовое склонение
        const seasonWord = Lampa.Lang.translate('full_season');
        return count === 1 ? `${count} ${seasonWord}` : `${count} ${seasonWord}s`;
    }

    // Склонение серий с локализацией
    function formatEpisodes(count) {
        const lang = Lampa.Storage.get('language', 'ru');
        
        // Славянские языки (ru, uk, be, bg) - сложное склонение
        if (['ru', 'uk', 'be', 'bg'].includes(lang)) {
            const cases = [2, 0, 1, 1, 1, 2];
            const titles = {
                ru: ['серия', 'серии', 'серий'],
                uk: ['серія', 'серії', 'серій'],
                be: ['серыя', 'серыі', 'серый'],
                bg: ['епизод', 'епизода', 'епизода']
            };
            
            const langTitles = titles[lang] || titles['ru'];
            const caseIndex = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)];
            
            return `${count} ${langTitles[caseIndex]}`;
        }
        
        // Английский
        if (lang === 'en') {
            return count === 1 ? `${count} Episode` : `${count} Episodes`;
        }
        
        // Чешский
        if (lang === 'cs') {
            if (count === 1) return `${count} epizoda`;
            if (count >= 2 && count <= 4) return `${count} epizody`;
            return `${count} epizod`;
        }
        
        // Португальский
        if (lang === 'pt') {
            return count === 1 ? `${count} Episódio` : `${count} Episódios`;
        }
        
        // Иврит
        if (lang === 'he') {
            if (count === 1) return `פרק ${count}`;
            return `${count} פרקים`;
        }
        
        // Китайский (без склонения)
        if (lang === 'zh') {
            return `${count} 集`;
        }
        
        // Остальные языки - базовое склонение
        const episodeWord = Lampa.Lang.translate('full_episode');
        return count === 1 ? `${count} ${episodeWord}` : `${count} ${episodeWord}s`;
    }

    // Заполняем дополнительную информацию (Год/длительность)
    function fillAdditionalInfo(activity, data) {
        const infoContainer = activity.render().find('.applecation__info');
        const infoParts = [];

        // Год выпуска
        const releaseDate = data.release_date || data.first_air_date || '';
        if (releaseDate) {
            const year = releaseDate.split('-')[0];
            infoParts.push(year);
        }

        // Длительность
        if (data.name) {
            // Сериал - показываем и продолжительность эпизода, и количество сезонов
            if (data.episode_run_time && data.episode_run_time.length) {
                const avgRuntime = data.episode_run_time[0];
                const timeM = Lampa.Lang.translate('time_m').replace('.', '');
                infoParts.push(`${avgRuntime} ${timeM}`);
            }
            
            // Всегда показываем количество сезонов для сериалов
            const seasons = Lampa.Utils.countSeasons(data);
            if (seasons) {
                infoParts.push(formatSeasons(seasons));
            }

            // Показываем количество серий, если включено в настройках
            if (Lampa.Storage.get('applecation_show_episode_count', false)) {
                const episodes = data.number_of_episodes;
                if (episodes) {
                    infoParts.push(formatEpisodes(episodes));
                }
            }
        } else {
            // Фильм - общая продолжительность
            if (data.runtime && data.runtime > 0) {
                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;
                const timeH = Lampa.Lang.translate('time_h').replace('.', '');
                const timeM = Lampa.Lang.translate('time_m').replace('.', '');
                const timeStr = hours > 0 
                    ? `${hours} ${timeH} ${minutes} ${timeM}` 
                    : `${minutes} ${timeM}`;
                infoParts.push(timeStr);
            }
        }

        const textContent = infoParts.length > 0 ? infoParts.join(' · ') : '';
        infoContainer.html(textContent + '<span class="applecation__quality-badges"></span>');
    }
    
    // Обновляем бейджи качества
    function updateQualityBadges(activity, qualityInfo) {
        const badgesContainer = activity.render().find('.applecation__quality-badges');
        if (!badgesContainer.length) return;
        
        const badges = [];
        
        // Порядок: Quality, Dolby Vision, HDR, Sound, DUB
        
        // 1. Quality (4K/2K/FHD/HD)
        if (qualityInfo.quality) {
            let qualitySvg = '';
            if (qualityInfo.quality === '4K') {
                qualitySvg = '<svg viewBox="0 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M291 0C302.046 3.57563e-06 311 8.95431 311 20V114C311 125.046 302.046 134 291 134H20C8.95431 134 0 125.046 0 114V20C0 8.95431 8.95431 0 20 0H291ZM113 20.9092L74.1367 82.1367V97.6367H118.818V114H137.637V97.6367H149.182V81.8633H137.637V20.9092H113ZM162.841 20.9092V114H182.522V87.5459L192.204 75.7275L217.704 114H241.25L206.296 62.5908L240.841 20.9092H217.25L183.75 61.9541H182.522V20.9092H162.841ZM119.182 81.8633H93.9541V81.1367L118.454 42.3633H119.182V81.8633Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === '2K') {
                qualitySvg = '<svg viewBox="0 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M291 0C302.046 3.57563e-06 311 8.95431 311 20V114C311 125.046 302.046 134 291 134H20C8.95431 134 0 125.046 0 114V20C0 8.95431 8.95431 0 20 0H291ZM110.608 19.6367C104.124 19.6367 98.3955 20.8638 93.4258 23.3184C88.4563 25.7729 84.5925 29.2428 81.835 33.7275C79.0775 38.2123 77.6992 43.5001 77.6992 49.5908H96.3809C96.3809 46.6212 96.9569 44.0607 98.1084 41.9092C99.2599 39.7578 100.896 38.1056 103.017 36.9541C105.138 35.8026 107.623 35.2275 110.472 35.2275C113.199 35.2276 115.639 35.7724 117.79 36.8633C119.941 37.9238 121.638 39.4542 122.881 41.4541C124.123 43.4238 124.744 45.7727 124.744 48.5C124.744 50.9545 124.244 53.2421 123.244 55.3633C122.244 57.4542 120.774 59.5906 118.835 61.7725C116.926 63.9543 114.562 66.4094 111.744 69.1367L78.6084 99.8184V114H144.972V97.9092H105.881V97.2725L119.472 83.9541C125.865 78.1361 130.82 73.1514 134.335 69C137.85 64.8182 140.29 61.0151 141.653 57.5908C143.047 54.1666 143.744 50.6968 143.744 47.1816C143.744 41.8182 142.366 37.0606 139.608 32.9092C136.851 28.7577 132.986 25.515 128.017 23.1816C123.077 20.8182 117.275 19.6368 110.608 19.6367ZM159.778 20.9092V114H179.46V87.5459L189.142 75.7275L214.642 114H238.188L203.233 62.5908L237.778 20.9092H214.188L180.688 61.9541H179.46V20.9092H159.778Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === 'FULL HD') {
                qualitySvg = '<svg viewBox="331 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M622 0C633.046 3.57563e-06 642 8.95431 642 20V114C642 125.046 633.046 134 622 134H351C339.954 134 331 125.046 331 114V20C331 8.95431 339.954 0 351 0H622ZM362.341 20.9092V114H382.022V75.5459H419.887V59.3184H382.022V37.1367H423.978V20.9092H362.341ZM437.216 20.9092V114H456.897V75.5459H496.853V114H516.488V20.9092H496.853V59.3184H456.897V20.9092H437.216ZM532.716 20.9092V114H565.716C575.17 114 583.291 112.136 590.079 108.409C596.897 104.682 602.125 99.333 605.762 92.3633C609.428 85.3937 611.262 77.0601 611.262 67.3633C611.262 57.6968 609.428 49.3934 605.762 42.4541C602.125 35.5149 596.928 30.1969 590.171 26.5C583.413 22.7727 575.352 20.9092 565.988 20.9092H532.716ZM564.943 37.7725C570.761 37.7725 575.655 38.8027 579.625 40.8633C583.595 42.9239 586.579 46.1364 588.579 50.5C590.609 54.8636 591.625 60.4847 591.625 67.3633C591.625 74.3026 590.609 79.9694 588.579 84.3633C586.579 88.7269 583.579 91.955 579.579 94.0459C575.609 96.1063 570.715 97.1367 564.897 97.1367H552.397V37.7725H564.943Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === 'HD') {
                qualitySvg = '<svg viewBox="662 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M953 0C964.046 3.57563e-06 973 8.95431 973 20V114C973 125.046 964.046 134 953 134H682C670.954 134 662 125.046 662 114V20C662 8.95431 670.954 0 682 0H953ZM731.278 20.9092V114H750.96V75.5459H790.915V114H810.551V20.9092H790.915V59.3184H750.96V20.9092H731.278ZM826.778 20.9092V114H859.778C869.233 114 877.354 112.136 884.142 108.409C890.96 104.682 896.188 99.333 899.824 92.3633C903.491 85.3937 905.324 77.0601 905.324 67.3633C905.324 57.6968 903.491 49.3934 899.824 42.4541C896.188 35.5149 890.991 30.1969 884.233 26.5C877.476 22.7727 869.414 20.9092 860.051 20.9092H826.778ZM859.006 37.7725C864.824 37.7725 869.718 38.8027 873.688 40.8633C877.657 42.9239 880.642 46.1364 882.642 50.5C884.672 54.8636 885.687 60.4847 885.688 67.3633C885.688 74.3026 884.672 79.9694 882.642 84.3633C880.642 88.7269 877.642 91.955 873.642 94.0459C869.672 96.1063 864.778 97.1367 858.96 97.1367H846.46V37.7725H859.006Z" fill="white"/></svg>';
            }
            if (qualitySvg) {
                badges.push(`<div class="quality-badge quality-badge--res">${qualitySvg}</div>`);
            }
        }
        
        // 2. Dolby Vision
        if (qualityInfo.dv) {
            badges.push('<div class="quality-badge quality-badge--dv"><svg viewBox="0 0 1051 393" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,393) scale(0.1,-0.1)" fill="currentColor"><path d="M50 2905 l0 -1017 223 5 c146 4 244 11 287 21 361 85 638 334 753 677 39 116 50 211 44 366 -7 200 -52 340 -163 511 -130 199 -329 344 -574 419 -79 24 -102 26 -327 31 l-243 4 0 -1017z"/><path d="M2436 3904 c-443 -95 -762 -453 -806 -905 -30 -308 86 -611 320 -832 104 -99 212 -165 345 -213 133 -47 253 -64 468 -64 l177 0 0 1015 0 1015 -217 -1 c-152 0 -239 -5 -287 -15z"/><path d="M3552 2908 l3 -1013 425 0 c309 0 443 4 490 13 213 43 407 148 550 299 119 124 194 255 247 428 25 84 27 103 27 270 1 158 -2 189 -22 259 -72 251 -221 458 -424 590 -97 63 -170 97 -288 134 l-85 26 -463 4 -462 3 2 -1013z m825 701 c165 -22 283 -81 404 -199 227 -223 279 -550 133 -831 -70 -133 -176 -234 -319 -304 -132 -65 -197 -75 -490 -75 l-245 0 0 703 c0 387 3 707 7 710 11 11 425 8 510 -4z"/><path d="M7070 2905 l0 -1015 155 0 155 0 0 1015 0 1015 -155 0 -155 0 0 -1015z"/><path d="M7640 2905 l0 -1015 150 0 150 0 0 60 c0 33 2 60 5 60 2 0 33 -15 67 -34 202 -110 433 -113 648 -9 79 38 108 59 180 132 72 71 95 102 134 181 102 207 102 414 1 625 -120 251 -394 411 -670 391 -115 -8 -225 -42 -307 -93 -21 -13 -42 -23 -48 -23 -7 0 -10 125 -10 370 l0 370 -150 0 -150 0 0 -1015z m832 95 c219 -67 348 -310 280 -527 -62 -198 -268 -328 -466 -295 -96 15 -168 52 -235 119 -131 132 -164 311 -87 478 27 60 101 145 158 181 100 63 234 80 350 44z"/><path d="M6035 3286 c-253 -49 -460 -232 -542 -481 -23 -70 -26 -96 -26 -210 0 -114 3 -140 26 -210 37 -113 90 -198 177 -286 84 -85 170 -138 288 -177 67 -22 94 -26 207 -26 113 0 140 4 207 26 119 39 204 92 288 177 87 89 140 174 177 286 22 67 26 99 27 200 1 137 -14 207 -69 320 -134 277 -457 440 -760 381z m252 -284 c117 -37 206 -114 260 -229 121 -253 -38 -548 -321 -595 -258 -43 -503 183 -483 447 20 271 287 457 544 377z"/><path d="M9059 3258 c10 -24 138 -312 285 -642 l266 -598 -72 -162 c-39 -88 -78 -171 -86 -183 -37 -58 -132 -80 -208 -48 l-35 14 -18 -42 c-10 -23 -37 -84 -60 -135 -23 -52 -39 -97 -36 -102 3 -4 40 -23 83 -41 70 -31 86 -34 177 -34 93 0 105 2 167 33 76 37 149 104 180 166 29 57 799 1777 805 1799 5 16 -6 17 -161 15 l-167 -3 -185 -415 c-102 -228 -192 -431 -200 -450 l-15 -35 -201 453 -201 452 -168 0 -168 0 18 -42z"/><path d="M2650 968 c0 -2 81 -211 179 -463 l179 -460 59 -3 59 -3 178 453 c98 249 180 459 183 466 4 9 -13 12 -65 12 -47 0 -71 -4 -74 -12 -3 -7 -65 -176 -138 -375 -73 -200 -136 -363 -139 -363 -3 0 -67 168 -142 373 l-136 372 -72 3 c-39 2 -71 1 -71 0z"/><path d="M3805 958 c-3 -7 -4 -215 -3 -463 l3 -450 63 -3 62 -3 0 466 0 465 -60 0 c-39 0 -62 -4 -65 -12z"/><path d="M4580 960 c-97 -16 -178 -72 -211 -145 -23 -50 -24 -143 -3 -193 32 -77 91 -117 244 -167 99 -32 146 -64 166 -112 28 -65 -11 -149 -83 -179 -78 -33 -212 -1 -261 61 l-19 24 -48 -43 -48 -42 43 -37 c121 -103 347 -112 462 -17 54 44 88 120 88 194 -1 130 -79 213 -242 256 -24 7 -71 25 -104 41 -48 22 -66 37 -79 65 -32 67 -5 138 65 174 73 37 193 18 244 -39 l20 -22 43 43 c41 40 42 43 25 61 -27 30 -102 64 -167 76 -64 12 -70 12 -135 1z"/><path d="M5320 505 l0 -465 65 0 65 0 0 465 0 465 -65 0 -65 0 0 -465z"/><path d="M6210 960 c-147 -25 -264 -114 -328 -249 -32 -65 -36 -84 -40 -175 -7 -161 33 -271 135 -367 140 -132 360 -164 541 -77 227 108 316 395 198 634 -88 177 -290 271 -506 234z m232 -132 c100 -46 165 -136 188 -261 20 -106 -18 -237 -88 -310 -101 -105 -245 -132 -377 -73 -74 33 -120 79 -157 154 -31 62 -33 74 -33 167 0 87 4 107 26 155 64 137 173 204 320 196 43 -2 85 -12 121 -28z"/><path d="M7135 958 c-3 -7 -4 -215 -3 -463 l3 -450 63 -3 62 -3 0 376 c0 207 3 374 8 371 4 -2 115 -171 247 -375 l240 -371 78 0 77 0 0 465 0 465 -60 0 -60 0 -2 -372 -3 -372 -241 370 -241 369 -82 3 c-59 2 -83 -1 -86 -10z"/></g></svg></div>');
        }
        
        // 3. HDR
        if (qualityInfo.hdr && qualityInfo.hdr_type) {
            badges.push('<div class="quality-badge quality-badge--hdr"><svg viewBox="-1 178 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="181.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M27.2784 293V199.909H46.9602V238.318H86.9148V199.909H106.551V293H86.9148V254.545H46.9602V293H27.2784ZM155.778 293H122.778V199.909H156.051C165.415 199.909 173.475 201.773 180.233 205.5C186.991 209.197 192.188 214.515 195.824 221.455C199.491 228.394 201.324 236.697 201.324 246.364C201.324 256.061 199.491 264.394 195.824 271.364C192.188 278.333 186.96 283.682 180.142 287.409C173.354 291.136 165.233 293 155.778 293ZM142.46 276.136H154.96C160.778 276.136 165.672 275.106 169.642 273.045C173.642 270.955 176.642 267.727 178.642 263.364C180.672 258.97 181.688 253.303 181.688 246.364C181.688 239.485 180.672 233.864 178.642 229.5C176.642 225.136 173.657 221.924 169.688 219.864C165.718 217.803 160.824 216.773 155.006 216.773H142.46V276.136ZM215.903 293V199.909H252.631C259.661 199.909 265.661 201.167 270.631 203.682C275.631 206.167 279.434 209.697 282.04 214.273C284.676 218.818 285.994 224.167 285.994 230.318C285.994 236.5 284.661 241.818 281.994 246.273C279.328 250.697 275.464 254.091 270.403 256.455C265.373 258.818 259.282 260 252.131 260H227.54V244.182H248.949C252.706 244.182 255.828 243.667 258.312 242.636C260.797 241.606 262.646 240.061 263.858 238C265.1 235.939 265.722 233.379 265.722 230.318C265.722 227.227 265.1 224.621 263.858 222.5C262.646 220.379 260.782 218.773 258.267 217.682C255.782 216.561 252.646 216 248.858 216H235.585V293H215.903ZM266.176 250.636L289.312 293H267.585L244.949 250.636H266.176Z" fill="currentColor"/></svg></div>');
        }
        
        // 4. Sound (7.1/5.1/2.0)
        if (qualityInfo.sound) {
            let soundSvg = '';
            if (qualityInfo.sound === '7.1') {
                soundSvg = '<svg viewBox="-1 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M91.6023 483L130.193 406.636V406H85.2386V389.909H150.557V406.227L111.92 483H91.6023ZM159.545 484.182C156.545 484.182 153.97 483.121 151.818 481C149.697 478.848 148.636 476.273 148.636 473.273C148.636 470.303 149.697 467.758 151.818 465.636C153.97 463.515 156.545 462.455 159.545 462.455C162.455 462.455 165 463.515 167.182 465.636C169.364 467.758 170.455 470.303 170.455 473.273C170.455 475.273 169.939 477.106 168.909 478.773C167.909 480.409 166.591 481.727 164.955 482.727C163.318 483.697 161.515 484.182 159.545 484.182ZM215.045 389.909V483H195.364V408.591H194.818L173.5 421.955V404.5L196.545 389.909H215.045Z" fill="currentColor"/></svg>';
            } else if (qualityInfo.sound === '5.1') {
                soundSvg = '<svg viewBox="330 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="333.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M443.733 484.273C437.309 484.273 431.581 483.091 426.551 480.727C421.551 478.364 417.581 475.106 414.642 470.955C411.703 466.803 410.172 462.045 410.051 456.682H429.142C429.354 460.288 430.869 463.212 433.688 465.455C436.506 467.697 439.854 468.818 443.733 468.818C446.824 468.818 449.551 468.136 451.915 466.773C454.309 465.379 456.172 463.455 457.506 461C458.869 458.515 459.551 455.667 459.551 452.455C459.551 449.182 458.854 446.303 457.46 443.818C456.097 441.333 454.203 439.394 451.778 438C449.354 436.606 446.581 435.894 443.46 435.864C440.733 435.864 438.081 436.424 435.506 437.545C432.96 438.667 430.975 440.197 429.551 442.136L412.051 439L416.46 389.909H473.369V406H432.688L430.278 429.318H430.824C432.46 427.015 434.93 425.106 438.233 423.591C441.536 422.076 445.233 421.318 449.324 421.318C454.93 421.318 459.93 422.636 464.324 425.273C468.718 427.909 472.188 431.53 474.733 436.136C477.278 440.712 478.536 445.985 478.506 451.955C478.536 458.227 477.081 463.803 474.142 468.682C471.233 473.53 467.157 477.348 461.915 480.136C456.703 482.894 450.642 484.273 443.733 484.273ZM500.733 484.182C497.733 484.182 495.157 483.121 493.006 481C490.884 478.848 489.824 476.273 489.824 473.273C489.824 470.303 490.884 467.758 493.006 465.636C495.157 463.515 497.733 462.455 500.733 462.455C503.642 462.455 506.188 463.515 508.369 465.636C510.551 467.758 511.642 470.303 511.642 473.273C511.642 475.273 511.127 477.106 510.097 478.773C509.097 480.409 507.778 481.727 506.142 482.727C504.506 483.697 502.703 484.182 500.733 484.182ZM556.233 389.909V483H536.551V408.591H536.006L514.688 421.955V404.5L537.733 389.909H556.233Z" fill="currentColor"/></svg>';
            } else if (qualityInfo.sound === '2.0') {
                soundSvg = '<svg viewBox="661 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="664.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M722.983 483V468.818L756.119 438.136C758.938 435.409 761.301 432.955 763.21 430.773C765.15 428.591 766.619 426.455 767.619 424.364C768.619 422.242 769.119 419.955 769.119 417.5C769.119 414.773 768.498 412.424 767.256 410.455C766.013 408.455 764.316 406.924 762.165 405.864C760.013 404.773 757.574 404.227 754.847 404.227C751.998 404.227 749.513 404.803 747.392 405.955C745.271 407.106 743.634 408.758 742.483 410.909C741.331 413.061 740.756 415.621 740.756 418.591H722.074C722.074 412.5 723.453 407.212 726.21 402.727C728.968 398.242 732.831 394.773 737.801 392.318C742.771 389.864 748.498 388.636 754.983 388.636C761.65 388.636 767.453 389.818 772.392 392.182C777.362 394.515 781.225 397.758 783.983 401.909C786.741 406.061 788.119 410.818 788.119 416.182C788.119 419.697 787.422 423.167 786.028 426.591C784.665 430.015 782.225 433.818 778.71 438C775.195 442.152 770.241 447.136 763.847 452.955L750.256 466.273V466.909H789.347V483H722.983ZM815.108 484.182C812.108 484.182 809.532 483.121 807.381 481C805.259 478.848 804.199 476.273 804.199 473.273C804.199 470.303 805.259 467.758 807.381 465.636C809.532 463.515 812.108 462.455 815.108 462.455C818.017 462.455 820.563 463.515 822.744 465.636C824.926 467.758 826.017 470.303 826.017 473.273C826.017 475.273 825.502 477.106 824.472 478.773C823.472 480.409 822.153 481.727 820.517 482.727C818.881 483.697 817.078 484.182 815.108 484.182ZM874.483 485.045C866.665 485.015 859.938 483.091 854.301 479.273C848.695 475.455 844.377 469.924 841.347 462.682C838.347 455.439 836.862 446.727 836.892 436.545C836.892 426.394 838.392 417.742 841.392 410.591C844.422 403.439 848.741 398 854.347 394.273C859.983 390.515 866.695 388.636 874.483 388.636C882.271 388.636 888.968 390.515 894.574 394.273C900.21 398.03 904.544 403.485 907.574 410.636C910.604 417.758 912.104 426.394 912.074 436.545C912.074 446.758 910.559 455.485 907.528 462.727C904.528 469.97 900.225 475.5 894.619 479.318C889.013 483.136 882.301 485.045 874.483 485.045ZM874.483 468.727C879.816 468.727 884.074 466.045 887.256 460.682C890.438 455.318 892.013 447.273 891.983 436.545C891.983 429.485 891.256 423.606 889.801 418.909C888.377 414.212 886.347 410.682 883.71 408.318C881.104 405.955 878.028 404.773 874.483 404.773C869.18 404.773 864.938 407.424 861.756 412.727C858.574 418.03 856.968 425.97 856.938 436.545C856.938 443.697 857.65 449.667 859.074 454.455C860.528 459.212 862.574 462.788 865.21 465.182C867.847 467.545 870.938 468.727 874.483 468.727Z" fill="currentColor"/></svg>';
            }
            if (soundSvg) {
                badges.push(`<div class="quality-badge quality-badge--sound">${soundSvg}</div>`);
            }
        }
        
        // 5. DUB
        if (qualityInfo.dub) {
            badges.push('<div class="quality-badge quality-badge--dub"><svg viewBox="-1 558 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="561.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M60.5284 673H27.5284V579.909H60.8011C70.1648 579.909 78.2254 581.773 84.983 585.5C91.7405 589.197 96.9375 594.515 100.574 601.455C104.241 608.394 106.074 616.697 106.074 626.364C106.074 636.061 104.241 644.394 100.574 651.364C96.9375 658.333 91.7102 663.682 84.892 667.409C78.1042 671.136 69.983 673 60.5284 673ZM47.2102 656.136H59.7102C65.5284 656.136 70.4223 655.106 74.392 653.045C78.392 650.955 81.392 647.727 83.392 643.364C85.4223 638.97 86.4375 633.303 86.4375 626.364C86.4375 619.485 85.4223 613.864 83.392 609.5C81.392 605.136 78.4072 601.924 74.4375 599.864C70.4678 597.803 65.5739 596.773 59.7557 596.773H47.2102V656.136ZM178.153 579.909H197.835V640.364C197.835 647.152 196.214 653.091 192.972 658.182C189.759 663.273 185.259 667.242 179.472 670.091C173.684 672.909 166.941 674.318 159.244 674.318C151.517 674.318 144.759 672.909 138.972 670.091C133.184 667.242 128.684 663.273 125.472 658.182C122.259 653.091 120.653 647.152 120.653 640.364V579.909H140.335V638.682C140.335 642.227 141.108 645.379 142.653 648.136C144.229 650.894 146.441 653.061 149.29 654.636C152.138 656.212 155.456 657 159.244 657C163.063 657 166.381 656.212 169.199 654.636C172.047 653.061 174.244 650.894 175.79 648.136C177.366 645.379 178.153 642.227 178.153 638.682V579.909ZM214.028 673V579.909H251.301C258.15 579.909 263.862 580.924 268.438 582.955C273.013 584.985 276.453 587.803 278.756 591.409C281.059 594.985 282.21 599.106 282.21 603.773C282.21 607.409 281.483 610.606 280.028 613.364C278.574 616.091 276.574 618.333 274.028 620.091C271.513 621.818 268.634 623.045 265.392 623.773V624.682C268.938 624.833 272.256 625.833 275.347 627.682C278.468 629.53 280.998 632.121 282.938 635.455C284.877 638.758 285.847 642.697 285.847 647.273C285.847 652.212 284.619 656.621 282.165 660.5C279.741 664.348 276.15 667.394 271.392 669.636C266.634 671.879 260.771 673 253.801 673H214.028ZM233.71 656.909H249.756C255.241 656.909 259.241 655.864 261.756 653.773C264.271 651.652 265.528 648.833 265.528 645.318C265.528 642.742 264.907 640.47 263.665 638.5C262.422 636.53 260.65 634.985 258.347 633.864C256.074 632.742 253.362 632.182 250.21 632.182H233.71V656.909ZM233.71 618.864H248.301C250.998 618.864 253.392 618.394 255.483 617.455C257.604 616.485 259.271 615.121 260.483 613.364C261.725 611.606 262.347 609.5 262.347 607.045C262.347 603.682 261.15 600.97 258.756 598.909C256.392 596.848 253.028 595.818 248.665 595.818H233.71V618.864Z" fill="currentColor"/></svg></div>');
        }
        
        if (badges.length > 0) {
            badgesContainer.html(badges.join(''));
            badgesContainer.addClass('show');
        }
    }

    // Загрузка и отображение рейтингов
    function loadAndDisplayRatings(activity, movie) {
        // Проверяем, включены ли рейтинги
        if (!Lampa.Storage.get('applecation_show_ratings', false)) {
            return;
        }

        const ratingsContainer = activity.render().find('.applecation__ratings');
        if (!ratingsContainer.length) return;

        const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');

        if (ratingsSource === 'builtin') {
            // Встроенные рейтинги
            builtInRatingsManager.fetch(movie, (ratings) => {
                if (!isAlive(activity)) return;
                
                displayRatings(activity, ratings, movie);
            });
        } else {
            // Внешние плагины (существующий функционал)
            // Рейтинги будут добавлены плагинами через DOM
        }
    }

    // Отображение рейтингов в интерфейсе
    function displayRatings(activity, ratings, movie) {
        const ratingsContainer = activity.render().find('.applecation__ratings');
        if (!ratingsContainer.length) return;

        const hasKpKey = !!Lampa.Storage.get('applecation_kp_api_key', '');
        const enabledRatings = Lampa.Storage.get('applecation_enabled_ratings', ['imdb', 'kp'])
            .filter(x => hasKpKey ? true : x !== 'kp');
        const ratingsSource = Lampa.Storage.get('applecation_ratings_source', 'external');
        if (ratingsSource !== 'builtin') return;

        // Внутренний контейнер (появляется с анимацией после наполнения)
        let builtInContainer = ratingsContainer.find('.applecation__ratings-builtin');
        if (!builtInContainer.length) {
            builtInContainer = $('<div class="applecation__ratings-builtin hide"></div>');
            ratingsContainer.append(builtInContainer);
        }

        // Сбрасываем прошлый контент и анимацию
        builtInContainer.removeClass('show').addClass('hide').empty();

        // Используем префикс класса в зависимости от источника
        const classPrefix = 'builtin-rate--';

        // Порядок отображения всех рейтингов
        const order = ['imdb', 'kp', 'tmdb', 'tomatoes', 'popcorn', 'metacritic', 'letterboxd', 'trakt', 'myanimelist'];

        // Rotten Tomatoes / Popcorn: иконка зависит от значения рейтинга
        const rtIcons = {
            tomatoes: {
                fresh: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.75 141.25"><g fill="#f93208"><path d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><path d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></svg>',
                certified: '<svg viewBox="0 0 264 264"xmlns=http://www.w3.org/2000/svg><g id=layer1><path d="m37.343 201c-64.636-75.11-21.896-199.45 92.547-200.68 109.5-1.9185 166 117.79 98.07 200.36z"id=path3406 fill=#fa6d0e /></g><g id=layer2><path d="m39.391 194.45c-5.232-6.2-9.522-12.72-13.649-20.73-6.979-13.55-11.103-27.74-12.599-43.34-0.60643-6.3238-0.44896-18.969 0.307-24.652 1.9531-14.684 5.7507-27.003 12.112-39.293 18.411-35.567 52.726-57.341 95.518-60.608 5.327-0.40672 17.081-0.40573 21.912 0.00186 26.228 2.2125 49.157 11.341 67.929 27.045 20.207 16.904 33.673 39.672 38.885 65.748 1.6378 8.1935 1.8934 11.156 1.8916 21.922-0.002 10.239-0.13698 12.089-1.4281 19.534-1.3592 7.838-3.1873 14.455-6.0824 22.015-1.9226 5.0206-5.4869 12.588-7.5942 16.124-0.76237 1.279-1.4706 2.5348-1.5739 2.7906-0.40166 0.99471-5.8217 8.831-8.4607 12.233l-2.7782 3.5809-73.628 0.008c-40.495 0.005-81.465 0.0864-91.042 0.18233l-17.414 0.1745-2.3083-2.7351z"id=path3414 fill=#ffd600 /></g><g id=layer3 fill-rule=evenodd stroke=#000 stroke-width=1px><g><path d="m60.733 41.274c-13.825 0.77302-13.491 15.928-7.5773 20.321 5.7404 4.7541 19.245 4.1115 18.714-10.677h-4.7071c0.81464 7.4274-6.1664 10.215-10.792 6.544-3.1787-2.4792-3.3966-10.664 4.4775-11.366z"id=path3419 /><path d="m65.98 34.008 13.236-8.3473 1.9042 3.1531-9.4084 5.8018 2.8029 4.2282 8.8344-5.7404 1.8566 3.1392-8.6581 5.5386 2.6069 4.2479 9.2936-5.6452 1.8427 2.9629-13.094 7.9414z"id=path3463 /><path d="m87.732 21.446 6.8212 20.517 5.2278-2.019-2.3576-6.936 2.411-0.80365 5.7125 5.6255 5.7485-1.9378-6.6391-6.0987c5.8115-6.7807-0.73197-16.414-12.805-10.333z"id=path3487 /><path d="m110.12 14.044 0.73063 4.6679 6.1697-0.89299 1.9078 17.332 4.7085-0.64945-2.0295-17.048 6.3321-1.0554-0.4465-4.5055z"id=path3513 /><path d="m136.55 12.177-1.1365 21.838 4.7897 0.32472 1.2177-21.919z"id=path3515 /><path d="m152.46 14.288-5.2768 20.782 4.3026 1.1365 2.2731-8.3616 8.8487 2.5166 0.97417-3.8967-8.6864-2.5166 1.1365-4.5461 9.4982 2.5166 1.0554-4.3026z"id=path3517 /><path d="m175.41 20.871-9.0758 19.895 4.3358 2.0608 9.1811-19.941z"id=path3519 /><path d="m189.41 27.48 12.708 9.1323-2.2071 2.949-8.9107-6.5405-2.8659 4.1857 8.6381 6.0316-2.212 2.8997-8.3849-5.944-2.9577 4.0115 8.7225 6.4929-2.0539 2.8206-12.278-9.1525z"id=path3521 /><path d="m209.61 42.295-15.749 14.45c2.101 4.1046 11.445 15.188 21.269 6.6568 7.7467-7.7002 0.46855-14.925-5.5203-21.107z"id=path3523 /></g><path d="m93.601 23.867 2.2731 5.845c2.2103-1.0484 7.5812-1.814 5.845-6.0886-1.7638-2.4625-4.5169-1.7258-8.1181 0.24354z"id=path3597 fill=#ffd600 /><path d="m209.38 48.512-9.5145 8.7794c0.96874 2.2553 5.9216 8.786 12.12 3.0671 5.1113-5.0568 0.43115-8.5523-2.6052-11.847z"id=path3600 fill=#ffd600 /></g><g id=layer4><path d="m52.811 196.72c-29.827-32.21-35.027-109.5 35.131-128.81l87.488-1.608c64.955 14.227 70.868 92.462 35.131 129.96z"id=path3605 fill=#fa3008 /></g><g id=layer5><g fill=#fff><path d="m44.545 110.85v41.675h11.251v-15.269h16.647v-9.6438h-16.647v-7.118h17.68v-9.6438z"id=path3702 /><path d="m76.806 110.96v41.101h11.251v-12.399h3.7886l7.334 12.703h13.331l-8.6418-14.968c11.722-6.4577 8.299-26.954-8.0052-26.781 0 0-19.173 0.34442-19.058 0.34442z"id=path3704 /><path d="m114.46 111.19v41.445h31.802v-10.218h-19.517v-6.4292h18.369v-9.6438h-18.369v-5.7404h19.632v-9.6438z"id=path3706 /><path d="m174.28 125.31 7.0032-7.5773c-5.6401-9.8066-31.184-12.207-32.261 5.8552-0.0651 10.857 10.676 12.689 16.647 13.547 9.1514 1.1745 4.5108 5.4184 2.1813 5.97-4.1015 0.3558-9.5196-1.8055-12.858-6.3144l-7.118 7.3476c12.082 15.461 29.732 6.958 32.376 2.8702 9.8557-16.106-10.255-23.046-16.417-22.043-4.5744 0.5052-4.1267-6.0987 2.2962-4.5923 2.1102 0.54658 3.4808 0.3029 8.1513 4.9367z"id=path3708 /><path d="m185.07 110.73v42.249h11.825v-16.417h12.055v16.303h11.94v-42.019h-12.055v15.499h-11.94v-15.499z"id=path3710 /></g><path d="m88.287 121.18v8.4957c5.4584-0.16649 10.747 0.86766 10.792-4.4775 0.05152-3.6316-3.2768-4.8952-10.792-4.0182z"id=path3712 fill=#fa3008 /></g><g id=layer6><path d="m6.9717 230.41c6.2855-7.2889 16.555-13.98 31.498-19.97l24.841 36.694c-15.721 0.33212-26.526 9.2959-32.797 16.561-2.5232-9.7958-3.895-19.592-2.1107-29.387-10.522-4.6768-14.817-3.1271-21.432-3.8967z"id=path3895 fill=#04c754 /><path d="m257.99 230.07c-6.2855-7.2889-16.555-13.98-31.498-19.97l-24.841 36.694c15.721 0.33212 26.526 9.2959 32.797 16.561 2.5232-9.7958 3.895-19.592 2.1107-29.387 10.522-4.6768 14.817-3.1271 21.432-3.8967z"id=path3961 fill=#04c754 /><path d="m30.166 214.17c3.5218-1.832 4.8782-2.4512 8.4068-3.6212l9.2431 33.319z"id=path4029 fill=#00ac40 /><path d="m234.73 213.72c-3.5218-1.832-4.8782-2.4512-8.4068-3.6212l-9.2431 33.319z"id=path4031 fill=#00ac40 /><path d="m47.588 243.74 15.556 3.0424-0.68884-7.9791z"id=path4033 fill=#009c34 /><path d="m202.92 240.06-1.2055 6.8884 15.958-3.0424z"id=path4035 fill=#009c34 /></g><g id=layer7 fill=#01912c><path d="m30.686 197.59 16.786 46.372c57.615-9.8616 114.29-9.3656 170.17-0.1802l16.642-46.273c-71.73-11.24-135.24-12.64-203.59 0.08z"id=path4037 /><path d="m95.793 191.42 2.1107-3.7343 7.5498-1.7048 7.631 5.0332z"id=path4307 /></g><g id=layer8><g id=g4262 fill=#f9f517 transform="matrix(.24170 0 0 .24170 49.363 178.57)"><path d="m105.8 102.98-8.0172-0.10423v-50.619-50.619h24.186c26.088 0 28.291 0.12542 34.659 1.9732 10.334 2.9985 18.223 9.4964 22.57 18.591 2.1141 4.4222 2.9427 7.9588 3.1597 13.486 0.49026 12.49-4.8082 23.35-14.188 29.082-2.8096 1.7169-2.9403 1.8527-2.4829 2.5796 1.2343 1.9616 20.736 35.548 20.736 35.713 0 0.1025-7.4426 0.18636-16.539 0.18636h-16.539l-9.5998-16.167c-5.2799-8.8917-9.8029-16.445-10.051-16.784-0.33627-0.45988-1.1926-0.66814-3.3574-0.81651l-2.906-0.19918 0.1815 16.983 0.1815 16.983-6.9879-0.0828c-3.8433-0.0455-10.596-0.12973-15.005-0.18705zm35.703-56.479c6.7674-1.4238 10.228-4.6666 10.607-9.9384 0.26462-3.6861-0.61122-6.2013-2.9536-8.482-3.1044-3.0227-7.4377-4.0701-16.926-4.0912l-5.0084-0.0111 0.23412 3.2983c0.12877 1.814 0.23412 7.1086 0.23412 11.766v8.4675l5.6751-0.24535c3.1213-0.13495 6.7833-0.47851 8.1378-0.76348z"id=path3554 /><path d="m218.68 104.68c-8.9254-1.007-16.797-4.9792-23.157-11.686-7.2226-7.6165-11.109-16.992-11.521-27.797-0.22097-5.7879 0.2163-9.6195 1.5977-14 5.206-16.508 19.973-26.343 40.714-27.116 3.5416-0.13202 6.6611-0.0434 8.8279 0.25076 17.801 2.4166 30.891 14.819 34.788 32.96 0.82406 3.8358 0.81686 12.628-0.0133 16.27-3.4361 15.073-14.036 25.493-29.983 29.475-6.315 1.5768-15.528 2.2888-21.255 1.6427h-0.00001zm9.7895-12.053c3.4979-1.0388 4.9377-2.9451 4.899-6.4866-0.013-1.1891-0.28397-2.8511-0.60221-3.6933-1.675-4.4332-1.6614-4.3761-1.2552-5.2676 0.21765-0.47768 0.78769-1.0471 1.2668-1.2654 1.1551-0.52631 1.8453-0.0729 3.4061 2.2376 2.2156 3.2798 6.2083 7.0112 8.7996 8.2239 2.0783 0.97253 2.6624 1.089 4.8436 0.96575 2.166-0.1224 2.733-0.31414 4.4738-1.5131 2.2856-1.5742 2.9015-2.8565 2.8796-5.996-0.0219-3.1463-1.6539-5.7434-4.8982-7.7954-1.9849-1.2554-6.2108-2.548-9.285-2.84-3.9203-0.37243-5.3039-1.0122-5.8047-2.6839-0.48683-1.6249 0.0253-2.9578 1.5779-4.1069 0.79157-0.58585 1.76-0.78306 4.6842-0.95387 2.3539-0.13749 4.0903-0.42912 4.8039-0.80682 5.1061-2.7026 5.4383-11.468 0.56294-14.856-1.364-0.9479-1.8674-1.0841-3.9636-1.0725-4.8275 0.0268-8.0918 3.1872-9.6325 9.3261-0.12439 0.49562-0.60784 1.313-1.0743 1.8163-0.9863 1.0642-2.8395 1.226-4.4579 0.38911-1.6309-0.84339-1.8399-2.6938-0.90178-7.9844 1.1672-6.5826 0.53375-9.3395-2.5629-11.154-1.9709-1.155-5.4749-1.5596-7.5568-0.87248-1.8355 0.60576-4.2268 3.0607-4.7778 4.905-1.1107 3.7172-0.22935 6.0738 3.8878 10.396 1.7296 1.8156 3.2504 3.6341 3.3796 4.0411 0.59081 1.8615-1.6535 3.9975-3.7227 3.543-1.1806-0.25929-2.3025-1.4025-4.1283-4.2067-2.9344-4.5068-7.0321-5.9454-11.069-3.8859-3.4732 1.7719-4.3725 5.7747-2.0664 9.1975 1.3375 1.9852 3.7393 3.3086 7.44 4.0994 5.3584 1.1451 6.8669 2.3079 5.4052 4.1662-0.75801 0.96366-0.83096 0.9792-3.3251 0.7083-3.7655-0.409-5.2238-0.25808-7.3156 0.75707-2.1787 1.0573-3.1289 2.2273-3.7222 4.5835-1.1898 4.725 2.1398 8.9112 7.0702 8.8892 2.5959-0.0116 4.5669-1.083 7.8614-4.2736 3.6397-3.525 4.2895-3.8967 5.4654-3.1262 1.2859 0.84253 1.4466 2.0917 0.56544 4.3943-2.0038 5.2363-0.15432 10.68 4.1498 12.214 1.8042 0.64317 2.5 0.6414 4.7-0.0119z"id=path3556 /><path d="m310.73 103.24c-13.527-0.86538-20.855-4.6291-24.882-12.779-2.7931-5.6532-3.4544-10.408-3.7959-27.295l-0.23135-11.44h-1.89c-1.0395 0-2.6423-0.10312-3.5617-0.22914l-1.6717-0.22914v-12.382-12.382h3.7834 3.7834v-10.81-10.81h14.773 14.773v10.81 10.81h6.1255 6.1255v12.792 12.792h-6.1255-6.1255l0.001 11.44c0.001 10.711 0.0462 11.514 0.70471 12.594 1.2297 2.017 2.1917 2.2695 8.6444 2.2695h5.7831v12.611 12.611l-6.0354-0.0538c-3.3195-0.0296-7.9001-0.17311-10.179-0.31891z"id=path3558 /><path d="m365.58 102.87c-15.629-1.5099-22.78-7.8138-25.148-22.169-0.41928-2.541-0.6553-7.1627-0.82014-16.06-0.12729-6.8705-0.36628-12.627-0.53108-12.791-0.1648-0.16485-1.8268-0.35591-3.6933-0.42459l-3.3937-0.12486v-12.577-12.577h4.0064 4.0064l-0.26587-10.81-0.26587-10.81h14.816 14.816v10.99 10.99h6.1255 6.1255v12.611 12.611h-6.144-6.144l0.10857 11.62c0.0984 10.534 0.16986 11.711 0.76417 12.586 1.4074 2.0734 2.088 2.2667 8.4426 2.3982l5.8553 0.12108v12.4 12.4l-7.837-0.0491c-4.3104-0.027-9.1809-0.17894-10.823-0.33763z"id=path3560 /><path d="m425.4 87.386c-12.392-1.5612-23.904-7.7739-29.557-15.952-5.3449-7.7317-8.0642-16.437-8.0697-25.834-0.008-13.574 5.9092-24.516 17.388-32.154 7.1893-4.7836 12.745-6.3503 23.579-6.6497 5.523-0.1526 6.9942-0.0741 9.9106 0.52869 5.7317 1.1847 10.724 3.5398 14.889 7.0243 3.7102 3.1035 7.8573 9.2211 9.9488 14.676 2.507 6.5385 3.9263 17.032 3.034 22.43l-0.22334 1.3512h-26.076c-14.342 0-26.076 0.137-26.076 0.30446 0 0.16745 0.62239 1.2674 1.3831 2.4444 3.3244 5.1435 8.6222 7.7076 15.898 7.6943 5.4469-0.01 10.592-1.4423 14.27-3.973l1.4804-1.0186 8.2565 7.7551c4.5411 4.2653 8.475 7.9652 8.742 8.2221 0.75121 0.7224 0.0562 1.6522-3.1554 4.2219-4.9481 3.9589-11.022 6.685-18.337 8.23-4.0389 0.85301-13.138 1.2205-17.284 0.69813zm15.261-50.147c-0.59675-3.7319-2.7937-6.5239-6.4972-8.257-4.0532-1.8967-9.342-1.7323-13.564 0.42183-2.8638 1.461-5.5299 4.8747-6.2366 7.9854l-0.2218 0.97626 2.9759 0.12145c1.6367 0.0668 7.6583 0.15445 13.381 0.19478l10.405 0.0734-0.24243-1.5161z"id=path3562 /><path d="m473.24 64.698v-38.915h14.593 14.593v5.4048c0 2.9727 0.12161 5.4037 0.27025 5.4023 0.14863-0.001 1.081-0.98805 2.0719-2.1925 3.3319-4.05 8.4992-7.6668 13.356-9.348 15.184-5.2565 31.395 6.568 33.649 24.545 0.23146 1.846 0.37789 12.826 0.37789 28.336v25.322h-14.773-14.773v-22.99-22.99l-0.9562-1.9188c-1.5738-3.1581-4.7154-4.9985-8.5924-5.0335-4.3579-0.0393-7.6091 2.6196-9.3056 7.6105-0.74626 2.1954-0.7727 2.9121-0.88464 23.973l-0.11539 21.71h-14.755-14.755v-38.915z"id=path3564 /><path d="m483.72 195.49c-8.7879-1.2296-17.227-5.0751-22.84-10.407-6.9419-6.5948-11.058-16.86-11.058-27.579 0-11.183 5.0732-21.063 14.659-28.549 1.6668-1.3015 2.971-2.4258 2.8983-2.4985s-2.839 0.0526-6.1473 0.27845c-3.3084 0.22582-6.1097 0.31609-6.2252 0.20059-0.35527-0.35527 1.9224-3.3646 3.4808-4.5988 3.1887-2.5255 7.1982-3.4206 11.016-2.4593 2.8647 0.72134 2.7601 0.0117-0.52917-3.5913l-2.9368-3.2169 1.9486-1.6648c1.0718-0.91561 2.0264-1.6648 2.1214-1.6648s1.3454 1.8672 2.7786 4.1494 2.7377 4.2309 2.8989 4.3305c0.16121 0.0996 0.88234-0.70656 1.6025-1.7915 3.1041-4.6766 7.5048-6.7814 11.726-5.6087 2.8281 0.78567 2.8284 0.94893 0.009 4.474-1.4011 1.7514-2.5474 3.2129-2.5474 3.2477s2.8972-0.005 6.4382-0.0887c12.435-0.2935 20.725 1.6085 27.681 6.351 2.3823 1.6241 5.8912 5.1844 7.6504 7.7624 1.3597 1.9926 5.0735 9.6438 5.9418 12.241 1.8727 5.6021 2.1543 15.51 0.60611 21.323-1.0931 4.1048-3.901 9.5862-6.6754 13.032-6.2675 7.7832-16.447 13.536-27.95 15.794-3.5693 0.70076-13.148 1.0101-16.548 0.53438z"id=path3566 /><path d="m578.46 196.55c-7.8346-0.99337-14.881-3.5706-21.428-7.837-7.4897-4.8811-13.128-13.98-15.556-25.105-0.78464-3.5949-1.0411-10.974-0.50816-14.619 1.8612-12.729 9.6305-22.96 22.28-29.339 2.3971-1.2089 4.4428-1.9037 7.7062-2.6174 4.0381-0.88306 5.1322-0.97166 12.01-0.97253 6.7615-0.00086 7.8928 0.087 10.63 0.82559 12.802 3.4549 21.615 13.546 24.914 28.527 0.6918 3.142 0.83442 4.8524 0.84128 10.089l0.008 6.3057-26.206 0.18017-26.206 0.18016 1.1028 1.9308c3.137 5.4924 8.7262 8.3384 16.375 8.3384 5.3866 0 11.187-1.6725 14.461-4.1698l1.1776-0.89824 8.8542 8.356 8.8542 8.356-1.3689 1.4106c-7.9413 8.1832-23.911 12.838-37.942 11.059zm15.344-49.787c-0.77215-4.8941-4.5797-8.3719-10.226-9.3401-7.3015-1.2521-14.551 3.0206-16.122 9.5022-0.23523 0.97036-0.23008 0.97313 2.0507 1.1016 1.2576 0.0709 7.2932 0.16007 13.413 0.19825l11.126 0.0694-0.24162-1.5314z"id=path3568 /><path d="m649.62 196.93c-4.1463-0.4696-9.5241-1.6761-13.109-2.941-5.0223-1.7721-12.654-5.8658-12.654-6.7875 0-0.29887 10.534-18.822 11.044-19.42 0.0714-0.0836 2.3584 0.99211 5.0822 2.3905 7.4733 3.8368 10.895 4.8595 16.123 4.8192 4.2064-0.0324 6.9057-0.75215 8.1974-2.1858 1.8014-1.9995 0.97638-4.9047-1.6271-5.7293-0.64098-0.20303-3.6787-0.35471-6.7504-0.33708-3.9043 0.0224-6.3566-0.14086-8.1489-0.54259-10.216-2.2898-18.196-8.8832-21.451-17.724-0.64718-1.7576-0.7997-2.9616-0.82112-6.4824-0.0646-2.6728 0.7448-5.0553 1.5236-7.5661 3.0818-9.9354 13.202-16.079 23.78-18.263 2.9019-0.59914 4.4449-0.69408 9.0809-0.55874 6.0131 0.17555 9.6049 0.81959 15.149 2.7164 5.6992 1.9497 13.459 5.5992 13.421 6.312-0.009 0.16319-2.2624 4.0982-5.0083 8.7444-3.8334 6.4863-5.1196 8.3911-5.5397 8.2041-2.0201-0.89918-11.14-3.7997-13.519-4.2998-1.5854-0.33323-4.5108-0.62581-6.5009-0.65016-3.8407-0.047-4.94 0.31052-6.3727 2.0726-0.98054 1.206-0.83346 3.5197 0.29091 4.5764 0.89112 0.83748 1.1626 0.87763 6.5759 0.97257 13.405 0.2351 21.781 3.1407 27.711 9.6131 3.5386 3.8618 5.3831 8.2718 5.7427 13.731 0.51074 7.752-2.2504 14.495-8.2806 20.223-4.1377 3.9304-5.7939 4.9373-11.207 6.8132-5.8898 2.0411-15.988 3.0618-22.733 2.2979z"id=path3570 /><path d="m427.56 194.43c-3.1147-0.14948-8.5034-0.88225-10.832-1.473-10.841-2.7501-16.058-8.9595-18.094-21.535-0.27815-1.718-0.47698-6.2005-0.68515-15.446l-0.29328-13.025-1.6724-0.15801c-0.91985-0.0869-2.561-0.15881-3.6471-0.15981l-1.9746-0.002v-12.612-12.612h3.9386 3.9386l-0.1221-9.1086c-0.0672-5.0098-0.17037-9.8826-0.22936-10.828l-0.10726-1.7198h14.89 14.89v10.956 10.956h6.1149 6.1149v12.739 12.739h-6.1149-6.1149l0.002 10.892c0.00076 6.8144 0.10147 11.252 0.26868 11.855 0.33257 1.1976 1.6225 2.6971 2.7115 3.1521 0.60913 0.25456 2.3193 0.34423 6.5646 0.34423h5.7409v12.612 12.612l-6.8156-0.0491c-3.7486-0.027-7.5608-0.0849-8.4717-0.12858z"id=path3572 /><path d="m327.55 196.91c-6.0677-0.89879-12.181-4.2608-18.039-9.9194-3.6145-3.4921-5.6717-6.2542-7.7002-10.339-3.0306-6.1023-4.1772-10.835-4.3864-18.104-0.20071-6.9721 0.59366-12.343 2.7511-18.599 2.2335-6.4773 4.4455-10.213 8.3658-14.126 8.4647-8.4508 18.629-11.802 28.321-9.3368 5.607 1.426 10.185 4.0966 15.083 8.7982l2.2294 2.14v-4.7499-4.7499h13.886 13.886v38.473 38.473h-13.886-13.886v-4.841c0-2.6625-0.0749-4.841-0.16647-4.841-0.0916 0-1.2206 1.0606-2.5091 2.3568-7.0642 7.107-15.892 10.559-23.95 9.366zm17.685-28.317c5.7855-2.8454 9.0992-11.159 6.9944-17.547-1.1572-3.5124-4.2606-6.4205-8.2736-7.7526-3.876-1.2867-6.6105-1.145-10.106 0.52351-4.5126 2.154-7.1913 6.6024-7.1913 11.943 0 3.8881 1.2707 7.0034 3.9492 9.6819 4.0239 4.0239 10.164 5.3469 14.627 3.1517z"id=path3574 /><path d="m260.84 189.73c-0.0924-2.9654-0.17862-11.364-0.1917-18.663-0.0131-7.2994-0.0995-15.45-0.19195-18.113-0.19113-5.5023-0.42525-6.3086-2.4118-8.3062-2.3224-2.3354-6.3268-3.1823-9.4598-2.0009-2.7463 1.0356-4.8368 3.8001-5.4692 7.2327-0.18747 1.0175-0.27855 8.5779-0.27855 23.122v21.61h-14.778c-8.1277 0-14.801-0.0287-14.829-0.0637-0.0281-0.035-0.1141-10.383-0.19109-22.995l-0.13998-22.931-0.86605-1.5971c-0.99669-1.838-2.2415-3.0544-4.1569-4.0618-1.1982-0.63025-1.6137-0.70842-3.7673-0.70889-2.0345-0.0005-2.5948 0.0925-3.5138 0.58259-2.416 1.2885-4.2402 4.0486-5.0865 7.6961-0.40668 1.7527-0.43572 3.667-0.35081 23.122l0.0926 21.211h-14.765-14.765l-0.16939-22.973c-0.0932-12.635-0.16939-30.12-0.16939-38.855v-15.882h14.643 14.643l0.0707 3.6275c0.0605 3.1064 0.13001 3.6389 0.48358 3.7068 0.24341 0.0467 1.3415-0.84094 2.6753-2.1625 2.7004-2.6758 5.0529-4.087 9.1256-5.4745 11.078-3.7741 22.042-1.1534 30.246 7.2298l2.2033 2.2515 0.69237-1.1814c3.2464-5.5396 12.361-9.5259 21.781-9.5259 7.8044 0 14.775 2.6568 19.708 7.5117 5.1179 5.0368 8.1838 12.777 8.6807 21.916 0.0762 1.4013 0.20438 13.239 0.28485 26.307l0.14632 23.759h-14.879-14.879l-0.16791-5.3916z"id=path3576 /><path d="m107.78 196.02c-6.0926-0.99832-10.52-2.705-15.396-5.9351-11.61-7.6903-18.797-22.407-18.135-37.134 0.81092-18.046 12.392-31.634 30.62-35.927 7.9813-1.8796 17.076-2.1579 24.066-0.73652 12.231 2.4873 22.77 10.864 28.179 22.395 5.2662 11.228 5.4349 24.038 0.4578 34.76-5.5967 12.056-17.13 19.866-32.956 22.316-3.758 0.5817-13.917 0.73961-16.834 0.26167zm13.14-27.525c4.4484-0.93392 8.1199-3.6944 10.055-7.5597 1.0002-1.9983 1.0286-2.1268 1.0249-4.6373-0.004-3.0016-0.47007-5.2416-1.5427-7.4205-3.6817-7.4786-12.83-10.42-20.566-6.6116-3.7913 1.8662-7.0509 6.2224-7.7619 10.373-1.1202 6.5396 3.8078 14.306 10.256 16.163 1.4002 0.40328 5.9277 0.24039 8.5354-0.3071z"id=path3578 /><path d="m28.559 158.18v-36.689h-13.376-13.376v-14.301-14.301l40.448 0.18815c22.246 0.10348 40.534 0.23971 40.639 0.30273 0.1051 0.063 0.19109 6.3565 0.19109 13.985v13.871h-12.994-12.994v36.817 36.817h-14.268-14.268v-36.689z"id=path3580 /><path d="m705.5 109.07c-0.8084-0.0513-1.6332-0.0184-2.4531 0.0918-1.6393 0.22023-3.2608 0.74918-4.6836 1.582-1.7985 1.0528-3.6019 3.0024-4.5664 4.9102-2.1226 4.1983-1.8353 9.352 0.76758 13.117 1.7571 2.542 4.5826 4.305 7.9336 5.0293 1.743 0.37669 4.1785 0.36028 5.7168-0.13281 1.965-0.62998 3.6029-1.6767 5.1113-3.252 2.559-2.6723 3.9068-5.9718 3.9121-9.6094 0.005-3.253-1.1303-5.9181-3.459-8.1133-1.5822-1.4916-3.3513-2.4394-5.9258-3.2109-0.75281-0.22561-1.5451-0.36077-2.3535-0.41211zm-0.79492 3.9121c1.2826 0.00021 1.3825 0.009 2.248 0.27344 3.2525 0.99456 5.2285 2.8755 5.9492 5.4766 1.2382 4.4679-1.9019 9.9522-6.2051 10.967-1.9266 0.45434-5.0387-0.16285-6.8809-1.4258-2.9831-2.0454-4.2013-5.8638-2.9863-9.6445 0.72861-2.267 2.2294-3.9702 4.3262-4.9297 1.2837-0.58744 1.9196-0.71707 3.5488-0.71679z"id=path4305 /><path d="m701.3 126.62-0.8542-0.0115v-5.3932-5.3933h2.577c2.7795 0 3.0143 0.0134 3.6928 0.21025 1.101 0.31948 1.9415 1.0118 2.4049 1.9808 0.22524 0.47117 0.31353 0.84798 0.33665 1.437 0.0521 1.3307-0.51231 2.4879-1.5117 3.0986-0.29937 0.18292-0.31328 0.19738-0.26455 0.27485 0.13151 0.20899 2.2093 3.7876 2.2093 3.8051 0 0.0107-0.79299 0.0199-1.7622 0.0199h-1.7622l-1.0228-1.7225c-0.56254-0.9474-1.0445-1.7521-1.0709-1.7883-0.0358-0.049-0.12706-0.0712-0.35773-0.087l-0.30963-0.0212 0.0193 1.8095 0.0193 1.8095-0.74454-0.009c-0.4095-0.005-1.1289-0.0138-1.5988-0.0199zm3.804-6.0177c0.72105-0.15169 1.0898-0.49721 1.1301-1.0589 0.0282-0.39275-0.0652-0.66074-0.3147-0.90375-0.33078-0.32205-0.79247-0.43365-1.8034-0.4359l-0.53364-0.001 0.0249 0.35143c0.0136 0.19328 0.0248 0.75742 0.0248 1.2536v0.90219l0.60466-0.0261c0.33258-0.0144 0.72275-0.0511 0.86707-0.0814z"id=path3584 /></g></g><path d="m92.534 57.233c1.823-2.196 15.246-14.146 32.836-3.215l-6.8884-14.351 7.8069-0.80365 4.133 14.58c5.6938-6.7936 18.081-12.516 26.75-0.68884-7.1807 0.6116-8.6909 4.1794-9.1846 7.3476 21.349-2.099 27.616 3.9846 31.457 8.1513-12.791-3.6696-27.648 11.782-42.019 2.4109-2.2844 14.012-13.151 14.634-22.502 14.351 2.9228-4.5918 6.742-8.9147 3.7886-15.269-11.512 8.7305-20.641 5.0873-33.753-1.3777 1.6737-1.2709 18.946-7.0772 25.946-6.6588-6.6249-3.4685-13.423-4.1733-18.369-4.4775z"id=path3607 fill=#01912c /></svg>',
                rotten: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 140"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>'
            },
            popcorn: {
                fresh: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.25 140"><path fill="#fa3106" d="M2.727 39.537c-.471-21.981 100.88-25.089 100.88-.42L92.91 117.56c-7.605 26.86-72.064 27.007-79.07.21z"/><g fill="#fff"><path d="M8.809 51.911l9.018 66.639c3.472 4.515 8.498 7.384 9.648 8.022l-6.921-68.576c-3.498-1.41-9.881-4.579-11.745-6.083zM28.629 59.776l5.453 68.898c4.926 2.652 11.04 3.391 15.73 3.566l-1.258-70.366c-3.414-.024-13.82-.642-19.925-2.098zM97.632 52.121l-9.019 66.643c-3.472 4.515-8.498 7.384-9.647 8.022l6.92-68.583c3.5-1.41 9.882-4.579 11.746-6.082zM77.812 59.986l-5.453 68.898c-4.926 2.652-11.04 3.391-15.73 3.566l1.258-70.366c3.414-.024 13.82-.642 19.925-2.098z"/></g><g fill="#ffd600"><circle cx="13.213" cy="31.252" r="6.816"/><circle cx="22.022" cy="27.687" r="6.607"/><circle cx="30.359" cy="19.769" r="5.925"/><circle cx="34.973" cy="15.155" r="6.03"/><circle cx="45.093" cy="17.095" r="4.929"/><circle cx="51.123" cy="9.597" r="6.24"/><circle cx="61.19" cy="9.387" r="6.554"/><circle cx="67.954" cy="13.635" r="4.929"/><circle cx="76.081" cy="17.672" r="5.925"/><circle cx="78.913" cy="22.706" r="4.352"/><circle cx="83.475" cy="26.324" r="5.243"/><circle cx="88.194" cy="34.398" r="5.768"/><path d="M87.355 35.447c5.79 2.799 1.352-2.213 10.696 2.097-9.574 15.338-74.774 16.892-90.291.525l-.21-3.985L38.59 16.99l22.863-6.606 15.52 9.962z"/></g></svg>',
                rotten: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.75 108.75"><path d="m96.641 2.9657c28.149 1.101 27.459 97.814 0.825 97.194l-74.45-9.973c-25.51-7.211-25.922-69.313-0.534-76.178z" fill="#07a23b"/><g fill="#fff"><path d="m85.419 8.8789-63.171 8.9751c-4.2681 3.3648-6.9679 8.2192-7.5687 9.3296l65.017-6.963c1.3226-3.3762 4.3015-9.5395 5.7202-11.342z"/><path d="m78.042 28.008-65.329 5.5498c-2.494 4.757-3.169 10.65-3.3147 15.17l66.739-1.5147c0.0074-3.2891 0.55003-13.318 1.9052-19.206z"/><path d="m85.595 94.456-63.251-8.403c-4.2975-3.326-7.0398-8.1557-7.6503-9.2607l65.082 6.3737c1.3522 3.3644 4.3852 9.4999 5.8189 11.29z"/><path d="m78.051 75.394-65.375-4.957c-2.536-4.734-3.2627-10.621-3.4481-15.14l66.749 0.9101c0.03629 3.2889 0.66694 13.312 2.0737 19.188z"/></g><path d="m100.36 10.836c-13.099 0.685-19.878 48.223-11.732 71.195l21.342-4.561c8.39-24.044 1.28-66.986-9.61-66.634z" fill="#03621e"/><g fill="#fdd600"><path d="m99.087 78.942a6.1255 6.1255 0 0 1 -6.1238 6.1255 6.1255 6.1255 0 0 1 -6.1273 -6.122 6.1255 6.1255 0 0 1 6.1202 -6.1291 6.1255 6.1255 0 0 1 6.1309 6.1184"/><path d="m112.96 75.406a5.5952 5.5952 0 0 1 -5.5936 5.5952 5.5952 5.5952 0 0 1 -5.5968 -5.592 5.5952 5.5952 0 0 1 5.5903 -5.5985 5.5952 5.5952 0 0 1 5.6001 5.5887"/><path d="m120.39 74.743a4.9323 4.9323 0 0 1 -4.9309 4.9323 4.9323 4.9323 0 0 1 -4.9337 -4.9294 4.9323 4.9323 0 0 1 4.928 -4.9352 4.9323 4.9323 0 0 1 4.9366 4.9266"/><path d="m124.1 78.942a3.7391 3.7391 0 0 1 -3.738 3.7391 3.7391 3.7391 0 0 1 -3.7402 -3.7369 3.7391 3.7391 0 0 1 3.7358 -3.7412 3.7391 3.7391 0 0 1 3.7423 3.7347"/><path d="m131.08 83.14a5.0207 5.0207 0 0 1 -5.0192 5.0207 5.0207 5.0207 0 0 1 -5.0222 -5.0178 5.0207 5.0207 0 0 1 5.0163 -5.0236 5.0207 5.0207 0 0 1 5.0251 5.0148"/><path d="m135.86 91.67a5.5952 5.5952 0 0 1 -5.5936 5.5952 5.5952 5.5952 0 0 1 -5.5968 -5.592 5.5952 5.5952 0 0 1 5.5903 -5.5985 5.5952 5.5952 0 0 1 5.6001 5.5887"/><path d="m140.36 97.327a3.9158 3.9158 0 0 1 -3.9147 3.9158 3.9158 3.9158 0 0 1 -3.917 -3.9136 3.9158 3.9158 0 0 1 3.9124 -3.9181 3.9158 3.9158 0 0 1 3.9192 3.9113"/><path d="m140.45 99.625a4.181 4.181 0 0 1 -4.1798 4.181 4.181 4.181 0 0 1 -4.1822 -4.1786 4.181 4.181 0 0 1 4.1773 -4.1834 4.181 4.181 0 0 1 4.1846 4.1761"/><path d="m134.44 100.55a4.8439 4.8439 0 0 1 -4.8425 4.8439 4.8439 4.8439 0 0 1 -4.8453 -4.8411 4.8439 4.8439 0 0 1 4.8397 -4.8467 4.8439 4.8439 0 0 1 4.8481 4.8383"/><path d="m126.84 100.24a4.0042 4.0042 0 0 1 -4.0031 4.0042 4.0042 4.0042 0 0 1 -4.0054 -4.0019 4.0042 4.0042 0 0 1 4.0007 -4.0065 4.0042 4.0042 0 0 1 4.0077 3.9996"/><path d="m125.43 97.636a5.1091 5.1091 0 0 1 -5.1076 5.1091 5.1091 5.1091 0 0 1 -5.1106 -5.1061 5.1091 5.1091 0 0 1 5.1046 -5.112 5.1091 5.1091 0 0 1 5.1135 5.1031"/><path d="m117.12 98.078a5.1091 5.1091 0 0 1 -5.1076 5.1091 5.1091 5.1091 0 0 1 -5.1106 -5.1061 5.1091 5.1091 0 0 1 5.1046 -5.112 5.1091 5.1091 0 0 1 5.1135 5.1031"/><path d="m110.49 97.459a3.6065 3.6065 0 0 1 -3.6054 3.6065 3.6065 3.6065 0 0 1 -3.6075 -3.6044 3.6065 3.6065 0 0 1 3.6033 -3.6086 3.6065 3.6065 0 0 1 3.6096 3.6023"/><path d="m105.72 96.929a4.0484 4.0484 0 0 1 -4.0472 4.0484 4.0484 4.0484 0 0 1 -4.0496 -4.0461 4.0484 4.0484 0 0 1 4.0449 -4.0508 4.0484 4.0484 0 0 1 4.052 4.0437"/><path d="m94.71 80.271c2.1568-1.7217 5.4319-2.8842 9.5881-3.6062l11.579 0.61872 15.203 13.612-2.0329 9.6343-27.047-2.5633-4.7288 1.4584-11.183-17.899z"/></g><path d="m85.913 71.627c3.2472 12.036 7.0507 22.57 12.64 28.284l-9.9879-1.591s-5.5685-25.456-4.8614-25.544c0.70711-0.08839 2.2097-1.149 2.2097-1.149z" fill="#09a339"/></svg>'
            }
        };
        
        // SVG иконки для рейтингов
        const svgIcons = {
            imdb: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="currentColor" d="M4 7c-1.103 0-2 .897-2 2v6.4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2H4Zm1.4 2.363h1.275v5.312H5.4V9.362Zm1.962 0H9l.438 2.512.287-2.512h1.75v5.312H10.4v-3l-.563 3h-.8l-.512-3v3H7.362V9.362Zm8.313 0H17v1.2c.16-.16.516-.363.875-.363.36.04.84.283.8.763v3.075c0 .24-.075.404-.275.524-.16.04-.28.075-.6.075-.32 0-.795-.196-.875-.237-.08-.04-.163.275-.163.275h-1.087V9.362Zm-3.513.037H13.6c.88 0 1.084.078 1.325.237.24.16.35.397.35.838v3.2c0 .32-.15.563-.35.762-.2.2-.484.288-1.325.288h-1.438V9.4Zm1.275.8v3.563c.2 0 .488.04.488-.2v-3.126c0-.28-.247-.237-.488-.237Zm3.763.675c-.12 0-.2.08-.2.2v2.688c0 .159.08.237.2.237.12 0 .2-.117.2-.238l-.037-2.687c0-.12-.043-.2-.163-.2Z"/></svg>',
            kp: '<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M96.5 20 66.1 75.733V20H40.767v152H66.1v-55.733L96.5 172h35.467C116.767 153.422 95.2 133.578 80 115c28.711 16.889 63.789 35.044 92.5 51.933v-30.4C148.856 126.4 108.644 115.133 85 105c23.644 3.378 63.856 7.889 87.5 11.267v-30.4L85 90c27.022-11.822 60.478-22.711 87.5-34.533v-30.4C143.789 41.956 108.711 63.11 80 80l51.967-60z" style="fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/></svg>',
            tmdb: '<svg width="800" height="800" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M25.99 29.198c2.807 0 4.708-1.896 4.708-4.708v-19.781c0-2.807-1.901-4.708-4.708-4.708h-19.979c-2.807 0-4.708 1.901-4.708 4.708v27.292l2.411-2.802v-24.49c.005-1.266 1.031-2.292 2.297-2.292h19.974c1.266 0 2.292 1.026 2.292 2.292v19.781c0 1.266-1.026 2.292-2.292 2.292h-16.755l-2.417 2.417-.016-.016zM11.714 15.286h-2.26v7.599h2.26c5.057 0 5.057-7.599 0-7.599zM11.714 21.365h-.734v-4.557h.734c2.958 0 2.958 4.557 0 4.557zM11.276 13.854h1.516v-6.083h1.891v-1.505h-5.302v1.505h1.896zM18.75 9.599l-2.625-3.333h-.49v7.714h1.542v-4.24l1.573 2.042 1.578-2.042-.010 4.24h1.542v-7.714h-.479zM21.313 19.089c.474-.333.677-.922.698-1.5.031-1.339-.807-2.307-2.156-2.307h-3.005v7.609h3.005c1.24-.010 2.245-1.021 2.245-2.26v-.036c0-.62-.307-1.172-.781-1.5zM18.37 16.802h1.354c.432 0 .698.339.698.766.031.406-.286.76-.698.76h-1.354zM19.724 21.37h-1.354v-1.516h1.37c.411 0 .745.333.745.745v.016c0 .417-.333.755-.75.755z"/></svg>',
            tomatoes: '<svg id="svg3390" xmlns="http://www.w3.org/2000/svg" height="141.25" viewBox="0 0 138.75 141.25" width="138.75" version="1.1"><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
            popcorn: '<svg xmlns="http://www.w3.org/2000/svg" width="106.25" height="140"><path fill="#fa3106" d="M2.727 39.537c-.471-21.981 100.88-25.089 100.88-.42L92.91 117.56c-7.605 26.86-72.064 27.007-79.07.21z"/><g fill="#fff"><path d="M8.809 51.911l9.018 66.639c3.472 4.515 8.498 7.384 9.648 8.022l-6.921-68.576c-3.498-1.41-9.881-4.579-11.745-6.083zM28.629 59.776l5.453 68.898c4.926 2.652 11.04 3.391 15.73 3.566l-1.258-70.366c-3.414-.024-13.82-.642-19.925-2.098zM97.632 52.121l-9.019 66.643c-3.472 4.515-8.498 7.384-9.647 8.022l6.92-68.583c3.5-1.41 9.882-4.579 11.746-6.082zM77.812 59.986l-5.453 68.898c-4.926 2.652-11.04 3.391-15.73 3.566l1.258-70.366c3.414-.024 13.82-.642 19.925-2.098z"/></g><g fill="#ffd600"><circle cx="13.213" cy="31.252" r="6.816"/><circle cx="22.022" cy="27.687" r="6.607"/><circle cx="30.359" cy="19.769" r="5.925"/><circle cx="34.973" cy="15.155" r="6.03"/><circle cx="45.093" cy="17.095" r="4.929"/><circle cx="51.123" cy="9.597" r="6.24"/><circle cx="61.19" cy="9.387" r="6.554"/><circle cx="67.954" cy="13.635" r="4.929"/><circle cx="76.081" cy="17.672" r="5.925"/><circle cx="78.913" cy="22.706" r="4.352"/><circle cx="83.475" cy="26.324" r="5.243"/><circle cx="88.194" cy="34.398" r="5.768"/><path d="M87.355 35.447c5.79 2.799 1.352-2.213 10.696 2.097-9.574 15.338-74.774 16.892-90.291.525l-.21-3.985L38.59 16.99l22.863-6.606 15.52 9.962z"/></g></svg>',
            metacritic: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.209 32.937L20.619 29.527L14.052 22.96C13.776 22.684 13.476 22.338 13.315 21.946C12.946 21.163 12.785 19.942 13.684 19.043C14.79 17.937 16.264 18.398 17.693 19.827L24.006 26.14L27.416 22.73L20.826 16.14C20.55 15.864 20.227 15.449 20.066 15.103C19.628 14.205 19.651 13.076 20.458 12.269C21.587 11.14 23.061 11.555 24.698 13.191L30.826 19.32L34.236 15.91L27.6 9.274C24.236 5.91 21.08 6.025 18.914 8.191C18.084 9.021 17.577 9.896 17.324 10.887C17.0952 11.8067 17.0639 12.7643 17.232 13.697L17.186 13.744C15.526 13.053 13.637 13.467 12.186 14.919C10.25 16.854 10.32 18.905 10.55 20.103L10.48 20.173L8.799 18.813L5.849 21.762C6.886 22.707 8.131 23.859 9.536 25.264L17.209 32.937Z" fill="white"/><path d="M19.982 8.12464e-06C16.0272 0.0035675 12.1621 1.17957 8.87551 3.37936C5.5889 5.57915 3.02825 8.70397 1.51726 12.3588C0.00626421 16.0136 -0.387235 20.0344 0.386501 23.9128C1.16024 27.7913 3.06647 31.3532 5.86424 34.1485C8.662 36.9437 12.2257 38.8468 16.1048 39.617C19.9839 40.3873 24.0044 39.9901 27.6578 38.4759C31.3113 36.9616 34.4338 34.3981 36.6306 31.1095C38.8275 27.8209 40 23.9549 40 20V19.976C39.9936 14.6727 37.8812 9.58908 34.1273 5.84302C30.3734 2.09697 25.2853 -0.00476866 19.982 8.12464e-06ZM19.891 4.27401C24.0449 4.27029 28.0303 5.9166 30.9705 8.85087C33.9108 11.7851 35.5652 15.7671 35.57 19.921V19.939C35.57 23.0366 34.6516 26.0647 32.931 28.6405C31.2104 31.2162 28.7647 33.2241 25.9032 34.4101C23.0417 35.5962 19.8927 35.9073 16.8544 35.3041C13.8161 34.7009 11.0249 33.2104 8.83348 31.0211C6.6421 28.8318 5.14897 26.042 4.54284 23.0043C3.93671 19.9666 4.24479 16.8173 5.42814 13.9547C6.61148 11.092 8.61697 8.64442 11.1911 6.92133C13.7652 5.19823 16.7924 4.27697 19.89 4.27401H19.891Z" fill="#FFBD3F"/></svg>',
            letterboxd: '<svg width="800" height="800" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M1179.28 284.01c-6.02-5.845-14.23-9.447-23.28-9.447-9.04 0-17.25 3.597-23.27 9.438-6.03-5.841-14.23-9.438-23.28-9.438-18.45 0-33.43 14.983-33.43 33.437 0 18.454 14.98 33.437 33.43 33.437 9.05 0 17.25-3.597 23.28-9.438 6.02 5.841 14.23 9.438 23.27 9.438 9.05 0 17.26-3.602 23.28-9.447 6.02 5.845 14.24 9.447 23.28 9.447 18.46 0 33.44-14.983 33.44-33.437 0-18.454-14.98-33.437-33.44-33.437-9.04 0-17.26 3.602-23.28 9.447Zm-7.07 9.965c-3.94-4.539-9.74-7.412-16.21-7.412-6.46 0-12.26 2.867-16.2 7.397a33.152 33.152 0 0 1 3.09 14.04c0 5.012-1.1 9.768-3.09 14.04 3.94 4.53 9.74 7.397 16.2 7.397 6.47 0 12.27-2.873 16.21-7.412a33.228 33.228 0 0 1-3.08-14.025c0-5.007 1.1-9.758 3.08-14.025Zm-46.56-.015c-3.93-4.53-9.73-7.397-16.2-7.397-11.83 0-21.43 9.606-21.43 21.437 0 11.831 9.6 21.437 21.43 21.437 6.47 0 12.27-2.867 16.2-7.397a33.303 33.303 0 0 1-3.09-14.04c0-5.012 1.11-9.768 3.09-14.04Zm60.71 28.065c3.93 4.539 9.73 7.412 16.2 7.412 11.83 0 21.44-9.606 21.44-21.437 0-11.831-9.61-21.437-21.44-21.437-6.47 0-12.27 2.873-16.2 7.412a33.373 33.373 0 0 1 3.07 14.025c0 5.007-1.1 9.758-3.07 14.025Z" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" transform="translate(-1060 -212)"/></svg>',
            trakt: '<svg width="800" height="800" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M16 32c-8.817 0-16-7.183-16-16s7.183-16 16-16c8.817 0 16 7.183 16 16s-7.183 16-16 16zM16 1.615c-7.932 0-14.385 6.453-14.385 14.385s6.453 14.385 14.385 14.385c7.932 0 14.385-6.453 14.385-14.385s-6.453-14.385-14.385-14.385zM6.521 24.708c2.339 2.557 5.724 4.152 9.479 4.152 1.917 0 3.735-0.417 5.369-1.167l-8.932-8.907zM25.573 24.62c2.052-2.281 3.307-5.323 3.307-8.625 0-5.177-3.047-9.62-7.421-11.677l-8.12 8.099 12.219 12.204zM12.401 13.38l-6.765 6.74-0.907-0.907 15.421-15.416c-1.301-0.437-2.692-0.677-4.151-0.677-7.115-0.005-12.885 5.765-12.885 12.88 0 2.896 0.953 5.573 2.588 7.735l6.74-6.74 0.479 0.437 9.663 9.661c0.197-0.109 0.38-0.219 0.556-0.353l-10.703-10.672-6.468 6.473-0.907-0.905 7.38-7.381 0.479 0.443 11.281 11.251c0.177-0.136 0.339-0.292 0.5-0.421l-12.181-12.157-0.109 0.021zM16.464 14.749l-0.901-0.9 6.38-6.385 0.907 0.916-6.385 6.38zM22.521 5.979l-7.36 7.36-0.907-0.907 7.36-7.359 0.907 0.911z"/></svg>',
            myanimelist: '<svg width="512" height="206" viewBox="0 0 512 206" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M176.49 1.28V180.97L131.63 180.91V69.67L88.32 120.96L45.89 68.52L45.46 181.27H0V1.32001H47L86.79 55.61L129.79 1.30002L176.49 1.28ZM360.55 45.42L361.08 180.57H310.63L310.46 119.32H250.73C252.22 129.97 255.21 146.32 259.63 157.32C262.94 165.45 265.99 173.32 272.07 181.38L235.7 205.38C228.25 191.81 222.43 176.86 216.97 160.96C211.505 145.955 207.872 130.346 206.15 114.47C204.34 98.47 204.08 83.09 208.43 67.28C212.708 51.9137 221.305 38.0972 233.2 27.47C239.88 21.22 249.2 16.8 256.67 12.81C264.14 8.82003 272.52 7.18002 280.29 5.15002C288.64 3.16198 297.138 1.85764 305.7 1.25C314.19 0.52 329.32 -0.159976 356.7 0.650024L368.33 37.96H309.55C296.9 38.13 290.82 37.96 280.94 42.42C273.097 46.129 266.415 51.9066 261.611 59.131C256.808 66.3555 254.066 74.7531 253.68 83.42L310.49 84.12L311.3 45.51H360.56L360.55 45.42ZM445.72 0.670013V142.02L512 142.67L502.83 180.54H400.28V0L445.72 0.670013Z" fill="white"/></svg>'
        };
        
        order.forEach(key => {
            if (!enabledRatings.includes(key)) return;
            if (!ratings[key] || ratings[key] === null) return;

            const raw = ratings[key];
            const rawValue = (raw && typeof raw === 'object') ? (raw.score ?? raw.value) : raw;
            const votes = (raw && typeof raw === 'object') ? raw.votes : undefined;

            const numeric = parseFloat(rawValue);
            if (isNaN(numeric)) return;

            const isShow = !!(movie && (movie.name || movie.original_name || movie.first_air_date));
            const certifiedMinScore = 75;
            const certifiedMinVotes = isShow ? 20 : 80;
            const hasVotes = typeof votes === 'number' && !isNaN(votes);
            const isCertified = key === 'tomatoes'
                && numeric >= certifiedMinScore
                && hasVotes
                && votes >= certifiedMinVotes;
            const isFresh = numeric >= 60;
            const icon = (key === 'tomatoes')
                ? (isCertified ? rtIcons.tomatoes.certified : (isFresh ? rtIcons.tomatoes.fresh : rtIcons.tomatoes.rotten))
                : (key === 'popcorn')
                    ? (isFresh ? rtIcons.popcorn.fresh : rtIcons.popcorn.rotten)
                    : svgIcons[key];

            // Формат значения в UI
            let value;
            if (key === 'tomatoes' || key === 'popcorn') {
                value = Math.round(numeric) + '%';
            } else if (key === 'metacritic' || key === 'trakt') {
                value = Math.round(numeric).toString();
            } else {
                value = numeric.toFixed(1);
            }
            
            const ratingHtml = `
                <div class="${classPrefix}${key}">
                    ${icon}
                    <div>${value}</div>
                </div>
            `;
            
            builtInContainer.append(ratingHtml);
        });
        
        // Показываем контейнер если есть рейтинги
        if (builtInContainer.children().length > 0) {
            ratingsContainer.removeClass('hide'); // внешний контейнер (анимируется по своему таймингу)
            builtInContainer.removeClass('hide');
        }
    }

    // Загружаем логотип фильма
    function loadLogo(event) {
        const badgesContainer = activity.render().find('.applecation__quality-badges');
        if (!badgesContainer.length) return;
        
        const badges = [];
        
        // Порядок: Quality, Dolby Vision, HDR, Sound, DUB
        
        // 1. Quality (4K/2K/FHD/HD)
        if (qualityInfo.quality) {
            let qualitySvg = '';
            if (qualityInfo.quality === '4K') {
                qualitySvg = '<svg viewBox="0 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M291 0C302.046 3.57563e-06 311 8.95431 311 20V114C311 125.046 302.046 134 291 134H20C8.95431 134 0 125.046 0 114V20C0 8.95431 8.95431 0 20 0H291ZM113 20.9092L74.1367 82.1367V97.6367H118.818V114H137.637V97.6367H149.182V81.8633H137.637V20.9092H113ZM162.841 20.9092V114H182.522V87.5459L192.204 75.7275L217.704 114H241.25L206.296 62.5908L240.841 20.9092H217.25L183.75 61.9541H182.522V20.9092H162.841ZM119.182 81.8633H93.9541V81.1367L118.454 42.3633H119.182V81.8633Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === '2K') {
                qualitySvg = '<svg viewBox="0 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M291 0C302.046 3.57563e-06 311 8.95431 311 20V114C311 125.046 302.046 134 291 134H20C8.95431 134 0 125.046 0 114V20C0 8.95431 8.95431 0 20 0H291ZM110.608 19.6367C104.124 19.6367 98.3955 20.8638 93.4258 23.3184C88.4563 25.7729 84.5925 29.2428 81.835 33.7275C79.0775 38.2123 77.6992 43.5001 77.6992 49.5908H96.3809C96.3809 46.6212 96.9569 44.0607 98.1084 41.9092C99.2599 39.7578 100.896 38.1056 103.017 36.9541C105.138 35.8026 107.623 35.2275 110.472 35.2275C113.199 35.2276 115.639 35.7724 117.79 36.8633C119.941 37.9238 121.638 39.4542 122.881 41.4541C124.123 43.4238 124.744 45.7727 124.744 48.5C124.744 50.9545 124.244 53.2421 123.244 55.3633C122.244 57.4542 120.774 59.5906 118.835 61.7725C116.926 63.9543 114.562 66.4094 111.744 69.1367L78.6084 99.8184V114H144.972V97.9092H105.881V97.2725L119.472 83.9541C125.865 78.1361 130.82 73.1514 134.335 69C137.85 64.8182 140.29 61.0151 141.653 57.5908C143.047 54.1666 143.744 50.6968 143.744 47.1816C143.744 41.8182 142.366 37.0606 139.608 32.9092C136.851 28.7577 132.986 25.515 128.017 23.1816C123.077 20.8182 117.275 19.6368 110.608 19.6367ZM159.778 20.9092V114H179.46V87.5459L189.142 75.7275L214.642 114H238.188L203.233 62.5908L237.778 20.9092H214.188L180.688 61.9541H179.46V20.9092H159.778Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === 'FULL HD') {
                qualitySvg = '<svg viewBox="331 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M622 0C633.046 3.57563e-06 642 8.95431 642 20V114C642 125.046 633.046 134 622 134H351C339.954 134 331 125.046 331 114V20C331 8.95431 339.954 0 351 0H622ZM362.341 20.9092V114H382.022V75.5459H419.887V59.3184H382.022V37.1367H423.978V20.9092H362.341ZM437.216 20.9092V114H456.897V75.5459H496.853V114H516.488V20.9092H496.853V59.3184H456.897V20.9092H437.216ZM532.716 20.9092V114H565.716C575.17 114 583.291 112.136 590.079 108.409C596.897 104.682 602.125 99.333 605.762 92.3633C609.428 85.3937 611.262 77.0601 611.262 67.3633C611.262 57.6968 609.428 49.3934 605.762 42.4541C602.125 35.5149 596.928 30.1969 590.171 26.5C583.413 22.7727 575.352 20.9092 565.988 20.9092H532.716ZM564.943 37.7725C570.761 37.7725 575.655 38.8027 579.625 40.8633C583.595 42.9239 586.579 46.1364 588.579 50.5C590.609 54.8636 591.625 60.4847 591.625 67.3633C591.625 74.3026 590.609 79.9694 588.579 84.3633C586.579 88.7269 583.579 91.955 579.579 94.0459C575.609 96.1063 570.715 97.1367 564.897 97.1367H552.397V37.7725H564.943Z" fill="white"/></svg>';
            } else if (qualityInfo.quality === 'HD') {
                qualitySvg = '<svg viewBox="662 0 311 134" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M953 0C964.046 3.57563e-06 973 8.95431 973 20V114C973 125.046 964.046 134 953 134H682C670.954 134 662 125.046 662 114V20C662 8.95431 670.954 0 682 0H953ZM731.278 20.9092V114H750.96V75.5459H790.915V114H810.551V20.9092H790.915V59.3184H750.96V20.9092H731.278ZM826.778 20.9092V114H859.778C869.233 114 877.354 112.136 884.142 108.409C890.96 104.682 896.188 99.333 899.824 92.3633C903.491 85.3937 905.324 77.0601 905.324 67.3633C905.324 57.6968 903.491 49.3934 899.824 42.4541C896.188 35.5149 890.991 30.1969 884.233 26.5C877.476 22.7727 869.414 20.9092 860.051 20.9092H826.778ZM859.006 37.7725C864.824 37.7725 869.718 38.8027 873.688 40.8633C877.657 42.9239 880.642 46.1364 882.642 50.5C884.672 54.8636 885.687 60.4847 885.688 67.3633C885.688 74.3026 884.672 79.9694 882.642 84.3633C880.642 88.7269 877.642 91.955 873.642 94.0459C869.672 96.1063 864.778 97.1367 858.96 97.1367H846.46V37.7725H859.006Z" fill="white"/></svg>';
            }
            if (qualitySvg) {
                badges.push(`<div class="quality-badge quality-badge--res">${qualitySvg}</div>`);
            }
        }
        
        // 2. Dolby Vision
        if (qualityInfo.dv) {
            badges.push('<div class="quality-badge quality-badge--dv"><svg viewBox="0 0 1051 393" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,393) scale(0.1,-0.1)" fill="currentColor"><path d="M50 2905 l0 -1017 223 5 c146 4 244 11 287 21 361 85 638 334 753 677 39 116 50 211 44 366 -7 200 -52 340 -163 511 -130 199 -329 344 -574 419 -79 24 -102 26 -327 31 l-243 4 0 -1017z"/><path d="M2436 3904 c-443 -95 -762 -453 -806 -905 -30 -308 86 -611 320 -832 104 -99 212 -165 345 -213 133 -47 253 -64 468 -64 l177 0 0 1015 0 1015 -217 -1 c-152 0 -239 -5 -287 -15z"/><path d="M3552 2908 l3 -1013 425 0 c309 0 443 4 490 13 213 43 407 148 550 299 119 124 194 255 247 428 25 84 27 103 27 270 1 158 -2 189 -22 259 -72 251 -221 458 -424 590 -97 63 -170 97 -288 134 l-85 26 -463 4 -462 3 2 -1013z m825 701 c165 -22 283 -81 404 -199 227 -223 279 -550 133 -831 -70 -133 -176 -234 -319 -304 -132 -65 -197 -75 -490 -75 l-245 0 0 703 c0 387 3 707 7 710 11 11 425 8 510 -4z"/><path d="M7070 2905 l0 -1015 155 0 155 0 0 1015 0 1015 -155 0 -155 0 0 -1015z"/><path d="M7640 2905 l0 -1015 150 0 150 0 0 60 c0 33 2 60 5 60 2 0 33 -15 67 -34 202 -110 433 -113 648 -9 79 38 108 59 180 132 72 71 95 102 134 181 102 207 102 414 1 625 -120 251 -394 411 -670 391 -115 -8 -225 -42 -307 -93 -21 -13 -42 -23 -48 -23 -7 0 -10 125 -10 370 l0 370 -150 0 -150 0 0 -1015z m832 95 c219 -67 348 -310 280 -527 -62 -198 -268 -328 -466 -295 -96 15 -168 52 -235 119 -131 132 -164 311 -87 478 27 60 101 145 158 181 100 63 234 80 350 44z"/><path d="M6035 3286 c-253 -49 -460 -232 -542 -481 -23 -70 -26 -96 -26 -210 0 -114 3 -140 26 -210 37 -113 90 -198 177 -286 84 -85 170 -138 288 -177 67 -22 94 -26 207 -26 113 0 140 4 207 26 119 39 204 92 288 177 87 89 140 174 177 286 22 67 26 99 27 200 1 137 -14 207 -69 320 -134 277 -457 440 -760 381z m252 -284 c117 -37 206 -114 260 -229 121 -253 -38 -548 -321 -595 -258 -43 -503 183 -483 447 20 271 287 457 544 377z"/><path d="M9059 3258 c10 -24 138 -312 285 -642 l266 -598 -72 -162 c-39 -88 -78 -171 -86 -183 -37 -58 -132 -80 -208 -48 l-35 14 -18 -42 c-10 -23 -37 -84 -60 -135 -23 -52 -39 -97 -36 -102 3 -4 40 -23 83 -41 70 -31 86 -34 177 -34 93 0 105 2 167 33 76 37 149 104 180 166 29 57 799 1777 805 1799 5 16 -6 17 -161 15 l-167 -3 -185 -415 c-102 -228 -192 -431 -200 -450 l-15 -35 -201 453 -201 452 -168 0 -168 0 18 -42z"/><path d="M2650 968 c0 -2 81 -211 179 -463 l179 -460 59 -3 59 -3 178 453 c98 249 180 459 183 466 4 9 -13 12 -65 12 -47 0 -71 -4 -74 -12 -3 -7 -65 -176 -138 -375 -73 -200 -136 -363 -139 -363 -3 0 -67 168 -142 373 l-136 372 -72 3 c-39 2 -71 1 -71 0z"/><path d="M3805 958 c-3 -7 -4 -215 -3 -463 l3 -450 63 -3 62 -3 0 466 0 465 -60 0 c-39 0 -62 -4 -65 -12z"/><path d="M4580 960 c-97 -16 -178 -72 -211 -145 -23 -50 -24 -143 -3 -193 32 -77 91 -117 244 -167 99 -32 146 -64 166 -112 28 -65 -11 -149 -83 -179 -78 -33 -212 -1 -261 61 l-19 24 -48 -43 -48 -42 43 -37 c121 -103 347 -112 462 -17 54 44 88 120 88 194 -1 130 -79 213 -242 256 -24 7 -71 25 -104 41 -48 22 -66 37 -79 65 -32 67 -5 138 65 174 73 37 193 18 244 -39 l20 -22 43 43 c41 40 42 43 25 61 -27 30 -102 64 -167 76 -64 12 -70 12 -135 1z"/><path d="M5320 505 l0 -465 65 0 65 0 0 465 0 465 -65 0 -65 0 0 -465z"/><path d="M6210 960 c-147 -25 -264 -114 -328 -249 -32 -65 -36 -84 -40 -175 -7 -161 33 -271 135 -367 140 -132 360 -164 541 -77 227 108 316 395 198 634 -88 177 -290 271 -506 234z m232 -132 c100 -46 165 -136 188 -261 20 -106 -18 -237 -88 -310 -101 -105 -245 -132 -377 -73 -74 33 -120 79 -157 154 -31 62 -33 74 -33 167 0 87 4 107 26 155 64 137 173 204 320 196 43 -2 85 -12 121 -28z"/><path d="M7135 958 c-3 -7 -4 -215 -3 -463 l3 -450 63 -3 62 -3 0 376 c0 207 3 374 8 371 4 -2 115 -171 247 -375 l240 -371 78 0 77 0 0 465 0 465 -60 0 -60 0 -2 -372 -3 -372 -241 370 -241 369 -82 3 c-59 2 -83 -1 -86 -10z"/></g></svg></div>');
        }
        
        // 3. HDR
        if (qualityInfo.hdr && qualityInfo.hdr_type) {
            badges.push('<div class="quality-badge quality-badge--hdr"><svg viewBox="-1 178 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="181.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M27.2784 293V199.909H46.9602V238.318H86.9148V199.909H106.551V293H86.9148V254.545H46.9602V293H27.2784ZM155.778 293H122.778V199.909H156.051C165.415 199.909 173.475 201.773 180.233 205.5C186.991 209.197 192.188 214.515 195.824 221.455C199.491 228.394 201.324 236.697 201.324 246.364C201.324 256.061 199.491 264.394 195.824 271.364C192.188 278.333 186.96 283.682 180.142 287.409C173.354 291.136 165.233 293 155.778 293ZM142.46 276.136H154.96C160.778 276.136 165.672 275.106 169.642 273.045C173.642 270.955 176.642 267.727 178.642 263.364C180.672 258.97 181.688 253.303 181.688 246.364C181.688 239.485 180.672 233.864 178.642 229.5C176.642 225.136 173.657 221.924 169.688 219.864C165.718 217.803 160.824 216.773 155.006 216.773H142.46V276.136ZM215.903 293V199.909H252.631C259.661 199.909 265.661 201.167 270.631 203.682C275.631 206.167 279.434 209.697 282.04 214.273C284.676 218.818 285.994 224.167 285.994 230.318C285.994 236.5 284.661 241.818 281.994 246.273C279.328 250.697 275.464 254.091 270.403 256.455C265.373 258.818 259.282 260 252.131 260H227.54V244.182H248.949C252.706 244.182 255.828 243.667 258.312 242.636C260.797 241.606 262.646 240.061 263.858 238C265.1 235.939 265.722 233.379 265.722 230.318C265.722 227.227 265.1 224.621 263.858 222.5C262.646 220.379 260.782 218.773 258.267 217.682C255.782 216.561 252.646 216 248.858 216H235.585V293H215.903ZM266.176 250.636L289.312 293H267.585L244.949 250.636H266.176Z" fill="currentColor"/></svg></div>');
        }
        
        // 4. Sound (7.1/5.1/2.0)
        if (qualityInfo.sound) {
            let soundSvg = '';
            if (qualityInfo.sound === '7.1') {
                soundSvg = '<svg viewBox="-1 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M91.6023 483L130.193 406.636V406H85.2386V389.909H150.557V406.227L111.92 483H91.6023ZM159.545 484.182C156.545 484.182 153.97 483.121 151.818 481C149.697 478.848 148.636 476.273 148.636 473.273C148.636 470.303 149.697 467.758 151.818 465.636C153.97 463.515 156.545 462.455 159.545 462.455C162.455 462.455 165 463.515 167.182 465.636C169.364 467.758 170.455 470.303 170.455 473.273C170.455 475.273 169.939 477.106 168.909 478.773C167.909 480.409 166.591 481.727 164.955 482.727C163.318 483.697 161.515 484.182 159.545 484.182ZM215.045 389.909V483H195.364V408.591H194.818L173.5 421.955V404.5L196.545 389.909H215.045Z" fill="currentColor"/></svg>';
            } else if (qualityInfo.sound === '5.1') {
                soundSvg = '<svg viewBox="330 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="333.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M443.733 484.273C437.309 484.273 431.581 483.091 426.551 480.727C421.551 478.364 417.581 475.106 414.642 470.955C411.703 466.803 410.172 462.045 410.051 456.682H429.142C429.354 460.288 430.869 463.212 433.688 465.455C436.506 467.697 439.854 468.818 443.733 468.818C446.824 468.818 449.551 468.136 451.915 466.773C454.309 465.379 456.172 463.455 457.506 461C458.869 458.515 459.551 455.667 459.551 452.455C459.551 449.182 458.854 446.303 457.46 443.818C456.097 441.333 454.203 439.394 451.778 438C449.354 436.606 446.581 435.894 443.46 435.864C440.733 435.864 438.081 436.424 435.506 437.545C432.96 438.667 430.975 440.197 429.551 442.136L412.051 439L416.46 389.909H473.369V406H432.688L430.278 429.318H430.824C432.46 427.015 434.93 425.106 438.233 423.591C441.536 422.076 445.233 421.318 449.324 421.318C454.93 421.318 459.93 422.636 464.324 425.273C468.718 427.909 472.188 431.53 474.733 436.136C477.278 440.712 478.536 445.985 478.506 451.955C478.536 458.227 477.081 463.803 474.142 468.682C471.233 473.53 467.157 477.348 461.915 480.136C456.703 482.894 450.642 484.273 443.733 484.273ZM500.733 484.182C497.733 484.182 495.157 483.121 493.006 481C490.884 478.848 489.824 476.273 489.824 473.273C489.824 470.303 490.884 467.758 493.006 465.636C495.157 463.515 497.733 462.455 500.733 462.455C503.642 462.455 506.188 463.515 508.369 465.636C510.551 467.758 511.642 470.303 511.642 473.273C511.642 475.273 511.127 477.106 510.097 478.773C509.097 480.409 507.778 481.727 506.142 482.727C504.506 483.697 502.703 484.182 500.733 484.182ZM556.233 389.909V483H536.551V408.591H536.006L514.688 421.955V404.5L537.733 389.909H556.233Z" fill="currentColor"/></svg>';
            } else if (qualityInfo.sound === '2.0') {
                soundSvg = '<svg viewBox="661 368 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="664.5" y="371.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M722.983 483V468.818L756.119 438.136C758.938 435.409 761.301 432.955 763.21 430.773C765.15 428.591 766.619 426.455 767.619 424.364C768.619 422.242 769.119 419.955 769.119 417.5C769.119 414.773 768.498 412.424 767.256 410.455C766.013 408.455 764.316 406.924 762.165 405.864C760.013 404.773 757.574 404.227 754.847 404.227C751.998 404.227 749.513 404.803 747.392 405.955C745.271 407.106 743.634 408.758 742.483 410.909C741.331 413.061 740.756 415.621 740.756 418.591H722.074C722.074 412.5 723.453 407.212 726.21 402.727C728.968 398.242 732.831 394.773 737.801 392.318C742.771 389.864 748.498 388.636 754.983 388.636C761.65 388.636 767.453 389.818 772.392 392.182C777.362 394.515 781.225 397.758 783.983 401.909C786.741 406.061 788.119 410.818 788.119 416.182C788.119 419.697 787.422 423.167 786.028 426.591C784.665 430.015 782.225 433.818 778.71 438C775.195 442.152 770.241 447.136 763.847 452.955L750.256 466.273V466.909H789.347V483H722.983ZM815.108 484.182C812.108 484.182 809.532 483.121 807.381 481C805.259 478.848 804.199 476.273 804.199 473.273C804.199 470.303 805.259 467.758 807.381 465.636C809.532 463.515 812.108 462.455 815.108 462.455C818.017 462.455 820.563 463.515 822.744 465.636C824.926 467.758 826.017 470.303 826.017 473.273C826.017 475.273 825.502 477.106 824.472 478.773C823.472 480.409 822.153 481.727 820.517 482.727C818.881 483.697 817.078 484.182 815.108 484.182ZM874.483 485.045C866.665 485.015 859.938 483.091 854.301 479.273C848.695 475.455 844.377 469.924 841.347 462.682C838.347 455.439 836.862 446.727 836.892 436.545C836.892 426.394 838.392 417.742 841.392 410.591C844.422 403.439 848.741 398 854.347 394.273C859.983 390.515 866.695 388.636 874.483 388.636C882.271 388.636 888.968 390.515 894.574 394.273C900.21 398.03 904.544 403.485 907.574 410.636C910.604 417.758 912.104 426.394 912.074 436.545C912.074 446.758 910.559 455.485 907.528 462.727C904.528 469.97 900.225 475.5 894.619 479.318C889.013 483.136 882.301 485.045 874.483 485.045ZM874.483 468.727C879.816 468.727 884.074 466.045 887.256 460.682C890.438 455.318 892.013 447.273 891.983 436.545C891.983 429.485 891.256 423.606 889.801 418.909C888.377 414.212 886.347 410.682 883.71 408.318C881.104 405.955 878.028 404.773 874.483 404.773C869.18 404.773 864.938 407.424 861.756 412.727C858.574 418.03 856.968 425.97 856.938 436.545C856.938 443.697 857.65 449.667 859.074 454.455C860.528 459.212 862.574 462.788 865.21 465.182C867.847 467.545 870.938 468.727 874.483 468.727Z" fill="currentColor"/></svg>';
            }
            if (soundSvg) {
                badges.push(`<div class="quality-badge quality-badge--sound">${soundSvg}</div>`);
            }
        }
        
        // 5. DUB
        if (qualityInfo.dub) {
            badges.push('<div class="quality-badge quality-badge--dub"><svg viewBox="-1 558 313 136" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="561.5" width="306" height="129" rx="17.5" stroke="currentColor" stroke-width="5" fill="none"/><path d="M60.5284 673H27.5284V579.909H60.8011C70.1648 579.909 78.2254 581.773 84.983 585.5C91.7405 589.197 96.9375 594.515 100.574 601.455C104.241 608.394 106.074 616.697 106.074 626.364C106.074 636.061 104.241 644.394 100.574 651.364C96.9375 658.333 91.7102 663.682 84.892 667.409C78.1042 671.136 69.983 673 60.5284 673ZM47.2102 656.136H59.7102C65.5284 656.136 70.4223 655.106 74.392 653.045C78.392 650.955 81.392 647.727 83.392 643.364C85.4223 638.97 86.4375 633.303 86.4375 626.364C86.4375 619.485 85.4223 613.864 83.392 609.5C81.392 605.136 78.4072 601.924 74.4375 599.864C70.4678 597.803 65.5739 596.773 59.7557 596.773H47.2102V656.136ZM178.153 579.909H197.835V640.364C197.835 647.152 196.214 653.091 192.972 658.182C189.759 663.273 185.259 667.242 179.472 670.091C173.684 672.909 166.941 674.318 159.244 674.318C151.517 674.318 144.759 672.909 138.972 670.091C133.184 667.242 128.684 663.273 125.472 658.182C122.259 653.091 120.653 647.152 120.653 640.364V579.909H140.335V638.682C140.335 642.227 141.108 645.379 142.653 648.136C144.229 650.894 146.441 653.061 149.29 654.636C152.138 656.212 155.456 657 159.244 657C163.063 657 166.381 656.212 169.199 654.636C172.047 653.061 174.244 650.894 175.79 648.136C177.366 645.379 178.153 642.227 178.153 638.682V579.909ZM214.028 673V579.909H251.301C258.15 579.909 263.862 580.924 268.438 582.955C273.013 584.985 276.453 587.803 278.756 591.409C281.059 594.985 282.21 599.106 282.21 603.773C282.21 607.409 281.483 610.606 280.028 613.364C278.574 616.091 276.574 618.333 274.028 620.091C271.513 621.818 268.634 623.045 265.392 623.773V624.682C268.938 624.833 272.256 625.833 275.347 627.682C278.468 629.53 280.998 632.121 282.938 635.455C284.877 638.758 285.847 642.697 285.847 647.273C285.847 652.212 284.619 656.621 282.165 660.5C279.741 664.348 276.15 667.394 271.392 669.636C266.634 671.879 260.771 673 253.801 673H214.028ZM233.71 656.909H249.756C255.241 656.909 259.241 655.864 261.756 653.773C264.271 651.652 265.528 648.833 265.528 645.318C265.528 642.742 264.907 640.47 263.665 638.5C262.422 636.53 260.65 634.985 258.347 633.864C256.074 632.742 253.362 632.182 250.21 632.182H233.71V656.909ZM233.71 618.864H248.301C250.998 618.864 253.392 618.394 255.483 617.455C257.604 616.485 259.271 615.121 260.483 613.364C261.725 611.606 262.347 609.5 262.347 607.045C262.347 603.682 261.15 600.97 258.756 598.909C256.392 596.848 253.028 595.818 248.665 595.818H233.71V618.864Z" fill="currentColor"/></svg></div>');
        }
        
        if (badges.length > 0) {
            badgesContainer.html(badges.join(''));
            badgesContainer.addClass('show');
        }
    }

    // Загружаем логотип фильма
    function loadLogo(event) {
        const data = event.data.movie;
        const activity = event.object.activity;
        
        if (!data || !activity) return;

        // Заполняем основную информацию
        fillMetaInfo(activity, data);
        fillDescription(activity, data);
        fillAdditionalInfo(activity, data);

        // Ждем когда фон загрузится и появится
        waitForBackgroundLoad(activity, () => {
            if (!isAlive(activity)) return;

            // После загрузки фона показываем контент
            activity.render().find('.applecation__meta').addClass('show');
            
            const useOverlay = Lampa.Storage.get('applecation_description_overlay', true);
            const descWrapper = activity.render().find('.applecation__description-wrapper').addClass('show');
            
            if (useOverlay) {
                descWrapper.addClass('selector');
                if (window.Lampa && Lampa.Controller) {
                    Lampa.Controller.collectionAppend(descWrapper);
                }
            }
            
            activity.render().find('.applecation__info').addClass('show');
            activity.render().find('.applecation__ratings').addClass('show');
        });

        const logoContainer = activity.render().find('.applecation__logo');
        const titleElement = activity.render().find('.full-start-new__title');

        // Функция для отрисовки найденного логотипа
        const renderLogo = (logoPath) => {
            const quality = getLogoQuality();
            const logoUrl = Lampa.TMDB.image(`/t/p/${quality}${logoPath}`);

            const img = new Image();
            img.onload = () => {
                if (!isAlive(activity)) return;

                logoContainer.html(`<img src="${logoUrl}" alt="" />`);
                waitForBackgroundLoad(activity, () => {
                    if (!isAlive(activity)) return;
                    logoContainer.addClass('loaded');
                });
                
                // Обновляем логотип в оверлее
                updateOverlayLogo(logoUrl);
            };
            img.src = logoUrl;
        };

        // 1. Пытаемся взять логотип из уже загруженных данных (благодаря патчу append_to_response)
        if (data.images && data.images.logos && data.images.logos.length > 0) {
            // Находим логотип на текущем языке или английский/нейтральный
            const lang = Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language') || 'ru';
            let logo = data.images.logos.find(l => l.iso_639_1 === lang);
            
            // Если логотипа на текущем языке нет, ищем на английском или нейтральном
            if (!logo && Lampa.Storage.get('applecation_show_foreign_logo', true)) {
                logo = data.images.logos.find(l => l.iso_639_1 === 'en');
                if (!logo) logo = data.images.logos.find(l => !l.iso_639_1); // null
                if (!logo) logo = data.images.logos[0];
            }

            if (logo && logo.file_path) {
                return renderLogo(logo.file_path);
            }
        }

        // 2. Если логотипа нет в данных (например, другой источник или ошибка патча), делаем старый запрос
        const mediaType = data.name ? 'tv' : 'movie';
        const apiUrl = Lampa.TMDB.api(
            `${mediaType}/${data.id}/images?api_key=${Lampa.TMDB.key()}&language=${Lampa.Storage.get('language')}`
        );

        $.get(apiUrl, (imagesData) => {
            if (!isAlive(activity)) return;

            if (imagesData.logos && imagesData.logos.length > 0) {
                const lang = Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language') || 'ru';
                let logo = imagesData.logos.find(l => l.iso_639_1 === lang);

                if (!logo && Lampa.Storage.get('applecation_show_foreign_logo', true)) {
                    logo = imagesData.logos.find(l => l.iso_639_1 === 'en') || imagesData.logos.find(l => !l.iso_639_1) || imagesData.logos[0];
                }

                if (logo && logo.file_path) {
                    return renderLogo(logo.file_path);
                }
            }
            
            // Нет подходящего логотипа - показываем текстовое название
            titleElement.show();
            waitForBackgroundLoad(activity, () => {
                logoContainer.addClass('loaded');
            });
        }).fail(() => {
            // При ошибке показываем текстовое название
            titleElement.show();
            waitForBackgroundLoad(activity, () => {
                logoContainer.addClass('loaded');
            });
        });
    }

    // Ждем загрузки и появления фона
    function waitForBackgroundLoad(activity, callback) {
        const background = activity.render().find('.full-start__background:not(.applecation__overlay)');
        
        if (!background.length) {
            callback();
            return;
        }

        // Если фон уже загружен и анимация завершена
        if (background.hasClass('loaded') && background.hasClass('applecation-animated')) {
            callback();
            return;
        }

        // Если фон загружен но анимация еще идет
        if (background.hasClass('loaded')) {
            // Ждем завершения transition + небольшая задержка для надежности
            setTimeout(() => {
                background.addClass('applecation-animated');
                callback();
            }, 350); // 600ms transition + 50ms запас
            return;
        }

        // Ждем загрузки фона
        const checkInterval = setInterval(() => {
            if (!isAlive(activity)) {
                clearInterval(checkInterval);
                return;
            }

            if (background.hasClass('loaded')) {
                clearInterval(checkInterval);
                // Ждем завершения transition + небольшая задержка
                setTimeout(() => {
                    if (!isAlive(activity)) return;
                    
                    background.addClass('applecation-animated');
                    callback();
                }, 650); // 600ms transition + 50ms запас
            }
        }, 50);

        // Таймаут на случай если что-то пошло не так
        setTimeout(() => {
            clearInterval(checkInterval);
            if (!background.hasClass('applecation-animated')) {
                background.addClass('applecation-animated');
                callback();
            }
        }, 2000);
    }

    // Добавляем оверлей рядом с фоном
    function addOverlay(activity) {
        const background = activity.render().find('.full-start__background');
        if (background.length && !background.next('.applecation__overlay').length) {
            background.after('<div class="full-start__background loaded applecation__overlay"></div>');
        }
    }

    // Применяем размытие фона при прокрутке
    function attachScrollBlur(activity) {
        const background = activity.render().find('.full-start__background:not(.applecation__overlay)')[0];
        const scrollBody = activity.render().find('.scroll__body')[0];
        
        if (!background || !scrollBody) return;
        
        // Кешируем состояние для избежания лишних DOM операций
        let isBlurred = false;
        
        // Перехватываем сеттер стиля - самый быстрый и синхронный способ
        const originalDescriptor = Object.getOwnPropertyDescriptor(scrollBody.style, '-webkit-transform') || 
                                   Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'webkitTransform');
        
        Object.defineProperty(scrollBody.style, '-webkit-transform', {
            set: function(value) {
                // Оптимизированный парсинг без regex
                if (value) {
                    const yStart = value.indexOf(',') + 1;
                    const yEnd = value.indexOf(',', yStart);
                    if (yStart > 0 && yEnd > yStart) {
                        const yValue = parseFloat(value.substring(yStart, yEnd));
                        const shouldBlur = yValue < 0;
                        
                        // Применяем только если состояние изменилось
                        if (shouldBlur !== isBlurred) {
                            isBlurred = shouldBlur;
                            background.classList.toggle('dim', shouldBlur);
                        }
                    }
                }
                
                // Вызываем оригинальный сеттер
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.call(this, value);
                } else {
                    this.setProperty('-webkit-transform', value);
                }
            },
            get: function() {
                if (originalDescriptor && originalDescriptor.get) {
                    return originalDescriptor.get.call(this);
                }
                return this.getPropertyValue('-webkit-transform');
            },
            configurable: true
        });
    }

    // Добавляем бегущую строку для длинных имен персон
    function attachPersonMarquee(activity) {
        const render = activity.render();
        const names = render.find('.full-person__name');
        
        // Очищаем старые marquee если они есть (на случай повторного вызова)
        names.each(function() {
            const nameElement = $(this);
            if (nameElement.hasClass('marquee-processed')) {
                const originalText = nameElement.find('span').first().text();
                if (originalText) {
                    nameElement.text(originalText);
                    nameElement.removeClass('marquee-processed marquee-active');
                    nameElement.css('--marquee-duration', '');
                }
            }
        });

        // Функция для проверки переполнения
        function isTextOverflowing(element) {
            // Для корректной проверки на скрытых элементах или в процессе отрисовки
            return element.scrollWidth > element.clientWidth + 1;
        }
        
        // Инициализируем marquee для тех, кто переполнен
        // Небольшая задержка, чтобы лайаут успел пересчитаться
        setTimeout(() => {
            if (!isAlive(activity)) return;

            names.each(function() {
                const nameElement = $(this);
                const text = nameElement.text().trim();
                
                if (!text) return;
                
                if (isTextOverflowing(nameElement[0])) {
                    // Рассчитываем длительность: ~250мс на символ, но не менее 5с и не более 20с
                    const duration = Math.min(Math.max(text.length * 0.25, 5), 20);
                    
                    nameElement.addClass('marquee-processed marquee-active');
                    nameElement.css('--marquee-duration', duration + 's');
                    
                    // Оборачиваем в структуру для анимации
                    // Используем text() для безопасности от XSS
                    const span1 = $('<span>').text(text);
                    const span2 = $('<span>').text(text);
                    const inner = $('<div class="marquee__inner">').append(span1).append(span2);
                    
                    nameElement.empty().append(inner);
                } else {
                    nameElement.addClass('marquee-processed');
                }
            });
        }, 100);
    }

    // Подключаем загрузку логотипов
    function attachLogoLoader() {
        Lampa.Listener.follow('full', (event) => {
            // Отключаем блок "Подробно", если включен оверлей
            if (Lampa.Storage.get('applecation_description_overlay', true)) {
                disableFullDescription(event);
            }
            
            if (event.type === 'complite') {
                const activity = event.object.activity;
                const render = activity.render();
                
                // Добавляем класс для применения стилей
                render.addClass('applecation');

                // Помечаем активность при уничтожении
                activity.__destroyed = false;
                
                // Сохраняем оригинальный метод destroy если он есть
                var originalDestroy = activity.destroy;
                activity.destroy = function() {
                    activity.__destroyed = true;
                    if (originalDestroy) originalDestroy.apply(activity, arguments);
                };

                // Добавляем класс качества постеров для CSS
                const posterSize = Lampa.Storage.field('poster_size');
                render.toggleClass('applecation--poster-high', posterSize === 'w500');

                addOverlay(activity);
                loadLogo(event);
                
                // Загружаем рейтинги
                const data = event.data;
                const movie = data && data.movie;
                if (movie) {
                    loadAndDisplayRatings(activity, movie);
                }
                
                attachScrollBlur(activity);
                attachPersonMarquee(activity);

                // Анализируем качество контента
                if (movie) {
                    analyzeContentQualities(movie, activity);
                }
            }
        });
    }

    // Регистрация плагина в манифесте
    var pluginManifest = {
        type: 'other',
        version: APPLECATION_VERSION,
        name: 'Applecation',
        description: 'Делает интерфейс в карточке фильма похожим на Apple TV и оптимизирует под 4K',
        author: '@darkestclouds',
        icon: PLUGIN_ICON
    };

    // Регистрируем плагин
    if (Lampa.Manifest && Lampa.Manifest.plugins) {
        Lampa.Manifest.plugins = pluginManifest;
    }

    // Запуск плагина
    if (window.appready) {
        initializePlugin();
    } else {
        Lampa.Listener.follow('app', (event) => {
            if (event.type === 'ready') {
                initializePlugin();
            }
        });
    }

})();

