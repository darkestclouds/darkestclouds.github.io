(function () {
    'use strict';

    // Иконка плагина
    const PLUGIN_ICON = '<svg viewBox="110 90 180 210"xmlns=http://www.w3.org/2000/svg><g id=sphere><circle cx=200 cy=140 fill="hsl(200, 80%, 40%)"opacity=0.3 r=1.2 /><circle cx=230 cy=150 fill="hsl(200, 80%, 45%)"opacity=0.35 r=1.3 /><circle cx=170 cy=155 fill="hsl(200, 80%, 42%)"opacity=0.32 r=1.2 /><circle cx=245 cy=175 fill="hsl(200, 80%, 48%)"opacity=0.38 r=1.4 /><circle cx=155 cy=180 fill="hsl(200, 80%, 44%)"opacity=0.34 r=1.3 /><circle cx=215 cy=165 fill="hsl(200, 80%, 46%)"opacity=0.36 r=1.2 /><circle cx=185 cy=170 fill="hsl(200, 80%, 43%)"opacity=0.33 r=1.3 /><circle cx=260 cy=200 fill="hsl(200, 80%, 50%)"opacity=0.4 r=1.5 /><circle cx=140 cy=200 fill="hsl(200, 80%, 50%)"opacity=0.4 r=1.5 /><circle cx=250 cy=220 fill="hsl(200, 80%, 48%)"opacity=0.38 r=1.4 /><circle cx=150 cy=225 fill="hsl(200, 80%, 47%)"opacity=0.37 r=1.4 /><circle cx=235 cy=240 fill="hsl(200, 80%, 45%)"opacity=0.35 r=1.3 /><circle cx=165 cy=245 fill="hsl(200, 80%, 44%)"opacity=0.34 r=1.3 /><circle cx=220 cy=255 fill="hsl(200, 80%, 42%)"opacity=0.32 r=1.2 /><circle cx=180 cy=258 fill="hsl(200, 80%, 41%)"opacity=0.31 r=1.2 /><circle cx=200 cy=120 fill="hsl(200, 80%, 60%)"opacity=0.5 r=1.8 /><circle cx=240 cy=135 fill="hsl(200, 80%, 65%)"opacity=0.55 r=2 /><circle cx=160 cy=140 fill="hsl(200, 80%, 62%)"opacity=0.52 r=1.9 /><circle cx=270 cy=165 fill="hsl(200, 80%, 70%)"opacity=0.6 r=2.2 /><circle cx=130 cy=170 fill="hsl(200, 80%, 67%)"opacity=0.57 r=2.1 /><circle cx=255 cy=190 fill="hsl(200, 80%, 72%)"opacity=0.62 r=2.3 /><circle cx=145 cy=195 fill="hsl(200, 80%, 69%)"opacity=0.59 r=2.2 /><circle cx=280 cy=200 fill="hsl(200, 80%, 75%)"opacity=0.65 r=2.5 /><circle cx=120 cy=200 fill="hsl(200, 80%, 75%)"opacity=0.65 r=2.5 /><circle cx=275 cy=215 fill="hsl(200, 80%, 73%)"opacity=0.63 r=2.4 /><circle cx=125 cy=220 fill="hsl(200, 80%, 71%)"opacity=0.61 r=2.3 /><circle cx=260 cy=235 fill="hsl(200, 80%, 68%)"opacity=0.58 r=2.2 /><circle cx=140 cy=240 fill="hsl(200, 80%, 66%)"opacity=0.56 r=2.1 /><circle cx=245 cy=255 fill="hsl(200, 80%, 63%)"opacity=0.53 r=2 /><circle cx=155 cy=260 fill="hsl(200, 80%, 61%)"opacity=0.51 r=1.9 /><circle cx=225 cy=270 fill="hsl(200, 80%, 58%)"opacity=0.48 r=1.8 /><circle cx=175 cy=272 fill="hsl(200, 80%, 56%)"opacity=0.46 r=1.7 /><circle cx=200 cy=100 fill="hsl(200, 80%, 85%)"opacity=0.8 r=2.8 /><circle cx=230 cy=115 fill="hsl(200, 80%, 90%)"opacity=0.85 r=3 /><circle cx=170 cy=120 fill="hsl(200, 80%, 87%)"opacity=0.82 r=2.9 /><circle cx=250 cy=140 fill="hsl(200, 80%, 92%)"opacity=0.88 r=3.2 /><circle cx=150 cy=145 fill="hsl(200, 80%, 89%)"opacity=0.84 r=3.1 /><circle cx=265 cy=170 fill="hsl(200, 80%, 95%)"opacity=0.9 r=3.4 /><circle cx=135 cy=175 fill="hsl(200, 80%, 93%)"opacity=0.87 r=3.3 /><circle cx=275 cy=200 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.5 /><circle cx=125 cy=200 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.5 /><circle cx=200 cy=200 fill="hsl(200, 80%, 100%)"opacity=1 r=4 /><circle cx=220 cy=195 fill="hsl(200, 80%, 98%)"opacity=0.95 r=3.8 /><circle cx=180 cy=205 fill="hsl(200, 80%, 97%)"opacity=0.93 r=3.7 /><circle cx=240 cy=210 fill="hsl(200, 80%, 96%)"opacity=0.92 r=3.6 /><circle cx=160 cy=215 fill="hsl(200, 80%, 95%)"opacity=0.9 r=3.5 /><circle cx=270 cy=230 fill="hsl(200, 80%, 94%)"opacity=0.88 r=3.4 /><circle cx=130 cy=235 fill="hsl(200, 80%, 92%)"opacity=0.86 r=3.3 /><circle cx=255 cy=250 fill="hsl(200, 80%, 90%)"opacity=0.84 r=3.2 /><circle cx=145 cy=255 fill="hsl(200, 80%, 88%)"opacity=0.82 r=3.1 /><circle cx=235 cy=265 fill="hsl(200, 80%, 86%)"opacity=0.8 r=3 /><circle cx=165 cy=268 fill="hsl(200, 80%, 84%)"opacity=0.78 r=2.9 /><circle cx=215 cy=280 fill="hsl(200, 80%, 82%)"opacity=0.76 r=2.8 /><circle cx=185 cy=282 fill="hsl(200, 80%, 80%)"opacity=0.74 r=2.7 /><circle cx=200 cy=290 fill="hsl(200, 80%, 78%)"opacity=0.72 r=2.6 /><circle cx=210 cy=130 fill="hsl(200, 80%, 88%)"opacity=0.83 r=2.5 /><circle cx=190 cy=135 fill="hsl(200, 80%, 86%)"opacity=0.81 r=2.4 /><circle cx=225 cy=155 fill="hsl(200, 80%, 91%)"opacity=0.86 r=2.8 /><circle cx=175 cy=160 fill="hsl(200, 80%, 89%)"opacity=0.84 r=2.7 /><circle cx=245 cy=185 fill="hsl(200, 80%, 94%)"opacity=0.89 r=3.3 /><circle cx=155 cy=190 fill="hsl(200, 80%, 92%)"opacity=0.87 r=3.2 /><circle cx=260 cy=210 fill="hsl(200, 80%, 95%)"opacity=0.91 r=3.4 /><circle cx=140 cy=215 fill="hsl(200, 80%, 93%)"opacity=0.88 r=3.3 /><circle cx=250 cy=230 fill="hsl(200, 80%, 91%)"opacity=0.85 r=3.2 /><circle cx=150 cy=235 fill="hsl(200, 80%, 89%)"opacity=0.83 r=3.1 /><circle cx=230 cy=245 fill="hsl(200, 80%, 87%)"opacity=0.81 r=3 /><circle cx=170 cy=250 fill="hsl(200, 80%, 85%)"opacity=0.79 r=2.9 /><circle cx=210 cy=260 fill="hsl(200, 80%, 83%)"opacity=0.77 r=2.8 /><circle cx=190 cy=265 fill="hsl(200, 80%, 81%)"opacity=0.75 r=2.7 /></g></svg>';

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

            // Выводим JSON с результатами
            console.log('Applecation', qualityInfo);
            
            // Сохраняем данные в activity для отображения иконок
            if (activity && activity.applecation_quality === undefined) {
                activity.applecation_quality = qualityInfo;
                // Обновляем info блок с иконками
                updateQualityBadges(activity, qualityInfo);
            }
            
        }, (error) => {
            console.log('Applecation', { error: error });
        });
    }

    // Главная функция плагина
    function initializePlugin() {
        console.log('Applecation', 'v1.0.0');
        
        if (!Lampa.Platform.screen('tv')) {
            console.log('Applecation', 'TV mode only');
            return;
        }

        patchApiImg();
        addCustomTemplate();
        addStyles();
        addSettings();
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

                if(isEpisodesLine){
                    normalizeEpisodesResults(element);
                }

                var instance = original.call(this, BaseClass, element, add_params, replace);

                if(isEpisodesLine){
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
        show_ratings_desc: {
            ru: 'Отображать рейтинги IMDB и КиноПоиск',
            en: 'Display IMDB and KinoPoisk ratings',
            uk: 'Відображати рейтинги IMDB та КіноПошук',
            be: 'Адлюстроўваць рэйтынгі IMDB і КіноПошук',
            bg: 'Показване на рейтинги IMDB и КиноПоиск',
            cs: 'Zobrazit hodnocení IMDB a KinoPoisk',
            he: 'הצג דירוגי IMDB וקינופויסק',
            pt: 'Exibir classificações IMDB e KinoPoisk',
            zh: '显示 IMDB 和 KinoPoisk 评分'
        },
        hide_reactions: {
            ru: 'Скрыть реакции Lampa',
            en: 'Hide Lampa reactions',
            uk: 'Сховати реакції Lampa',
            be: 'Схаваць рэакцыі Lampa',
            bg: 'Скриване на реакции Lampa',
            cs: 'Skrýt reakce Lampa',
            he: 'הסתר תגובות Lampa',
            pt: 'Ocultar reações Lampa',
            zh: '隐藏 Lampa 反应'
        },
        hide_reactions_desc: {
            ru: 'Скрыть блок с реакциями',
            en: 'Hide reactions block',
            uk: 'Сховати блок з реакціями',
            be: 'Схаваць блок з рэакцыямі',
            bg: 'Скриване на блока с реакции',
            cs: 'Skrýt blok s reakcemi',
            he: 'הסתר בלוק תגובות',
            pt: 'Ocultar bloco de reações',
            zh: '隐藏反应块'
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
            ru: 'В левом нижнем углу',
            en: 'Bottom left corner',
            uk: 'У лівому нижньому куті',
            be: 'У левым ніжнім куце',
            bg: 'В долния ляв ъгъл',
            cs: 'V levém dolním rohu',
            he: 'בפינה השמאלית התחתונה',
            pt: 'Canto inferior esquerdo',
            zh: '左下角'
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
        }
    };

    function t(key) {
        const lang = Lampa.Storage.get('language', 'ru');
        return translations[key] && translations[key][lang] || translations[key].ru;
    }

    // Добавляем настройки плагина
    function addSettings() {
        // Инициализируем значения по умолчанию
        if (Lampa.Storage.get('applecation_show_ratings') === undefined) {
            Lampa.Storage.set('applecation_show_ratings', false);
        }
        if (Lampa.Storage.get('applecation_hide_reactions') === undefined) {
            Lampa.Storage.set('applecation_hide_reactions', false);
        }
        if (Lampa.Storage.get('applecation_ratings_position') === undefined) {
            Lampa.Storage.set('applecation_ratings_position', 'card');
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
                name: '<div>Applecation v1.0.0</div>'
            },
            onRender: function(item) {
                item.css('opacity', '0.7');
                item.find('.settings-param__name').css({
                    'font-size': '1.2em',
                    'margin-bottom': '0.3em'
                });
                item.append('<div style="font-size: 0.9em; padding: 0 1.2em; line-height: 1.4;">Автор: DarkestClouds<br>Делает интерфейс в карточке фильма похожим на Apple TV и оптимизирует под 4K</div>');
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
                Lampa.Storage.set('applecation_ratings_position', value);
                $('body').removeClass('applecation--ratings-card applecation--ratings-corner');
                $('body').addClass('applecation--ratings-' + value);
                // Обновляем шаблон и перезагружаем активность
                addCustomTemplate();
                Lampa.Activity.back();
            }
        });

        // Скрыть реакции
        Lampa.SettingsApi.addParam({
            component: 'applecation_settings',
            param: {
                name: 'applecation_hide_reactions',
                type: 'trigger',
                default: false
            },
            field: {
                name: t('hide_reactions'),
                description: t('hide_reactions_desc')
            },
            onChange: function(value) {
                if (value) {
                    $('body').addClass('applecation--hide-reactions');
                } else {
                    $('body').removeClass('applecation--hide-reactions');
                }
            }
        });

        // Применяем текущие настройки
        if (!Lampa.Storage.get('applecation_show_ratings', false)) {
            $('body').addClass('applecation--hide-ratings');
        }
        $('body').addClass('applecation--ratings-' + Lampa.Storage.get('applecation_ratings_position', 'card'));
        if (Lampa.Storage.get('applecation_hide_reactions', false)) {
            $('body').addClass('applecation--hide-reactions');
        }
    }

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
                    <div class="full-start-new__title" style="display: none;">{title}</div>
                    
                    <div class="applecation__meta">
                        <div class="applecation__meta-left">
                            <span class="applecation__network"></span>
                            <span class="applecation__meta-text"></span>
                            <div class="full-start__pg hide"></div>
                        </div>
                    </div>
                    
                    ${ratingsPosition === 'card' ? ratingsBlock : ''}
                    
                    <div class="applecation__description"></div>
                    <div class="applecation__info"></div>
                    
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
}

.applecation__network img {
    display: block;
    max-height: 0.8em;
    width: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

.applecation__meta-text {
    margin-left: 1em;
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

.applecation__ratings .rate--imdb,
.applecation__ratings .rate--kp {
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

.applecation__ratings .rate--kp svg {
    width: 1.5em;
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

/* Скрытие реакций через настройки */
body.applecation--hide-reactions .full-start-new__reactions {
    display: none !important;
}

/* Расположение рейтингов - в левом нижнем углу */
body.applecation--ratings-corner .applecation__right {
    gap: 1em;
}

body.applecation--ratings-corner .applecation__ratings {
    margin-bottom: 0;
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
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    transition-delay: 0.1s;
}

.applecation__description.show {
    opacity: 1;
    transform: translateY(0);
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

/* Выравнивание по baseline только если реакции видны и рейтинги в углу */
body.applecation--ratings-corner:not(.applecation--hide-reactions) .applecation__right {
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
</style>`;
        
        Lampa.Template.add('applecation_css', styles);
        $('body').append(Lampa.Template.get('applecation_css', {}, true));
    }

    // Патчим внутренние методы Лампы для корректной работы эпизодов и качества
    function patchApiImg() {
        const tmdbSource = Lampa.Api.sources.tmdb;
        
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

        // ДЕБАГ: добавляем значение style тега body
        const bodyStyle = document.body.getAttribute('style') || 'нет атрибута style';
        metaParts.push('DEBUG: body style = [' + bodyStyle + ']');

        // ДЕБАГ: вычисляем 1vw в пикселях
        const oneVwInPixels = window.innerWidth / 100;
        metaParts.push('1vw = ' + oneVwInPixels.toFixed(2) + 'px');

        metaTextContainer.html(metaParts.join(' · '));
        
        // Загружаем иконку студии/сети
        loadNetworkIcon(activity, data);
    }

    // Заполняем описание
    function fillDescription(activity, data) {
        const descContainer = activity.render().find('.applecation__description');
        const description = data.overview || '';
        descContainer.text(description);
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
            // После загрузки фона показываем контент
            activity.render().find('.applecation__meta').addClass('show');
            activity.render().find('.applecation__description').addClass('show');
            activity.render().find('.applecation__info').addClass('show');
            activity.render().find('.applecation__ratings').addClass('show');
        });

        // Загружаем логотип
        const mediaType = data.name ? 'tv' : 'movie';
        const apiUrl = Lampa.TMDB.api(
            `${mediaType}/${data.id}/images?api_key=${Lampa.TMDB.key()}&language=${Lampa.Storage.get('language')}`
        );

        $.get(apiUrl, (imagesData) => {
            const logoContainer = activity.render().find('.applecation__logo');
            const titleElement = activity.render().find('.full-start-new__title');

            if (imagesData.logos && imagesData.logos[0]) {
                const logoPath = imagesData.logos[0].file_path;
                const quality = getLogoQuality();
                const logoUrl = Lampa.TMDB.image(`/t/p/${quality}${logoPath}`);

                const img = new Image();
                img.onload = () => {
                    logoContainer.html(`<img src="${logoUrl}" alt="" />`);
                    waitForBackgroundLoad(activity, () => {
                        logoContainer.addClass('loaded');
                    });
                };
                img.src = logoUrl;
            } else {
                // Нет логотипа - показываем текстовое название
                titleElement.show();
                waitForBackgroundLoad(activity, () => {
                    logoContainer.addClass('loaded');
                });
            }
        }).fail(() => {
            // При ошибке показываем текстовое название
            activity.render().find('.full-start-new__title').show();
            waitForBackgroundLoad(activity, () => {
                activity.render().find('.applecation__logo').addClass('loaded');
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
            }, 650); // 600ms transition + 50ms запас
            return;
        }

        // Ждем загрузки фона
        const checkInterval = setInterval(() => {
            if (background.hasClass('loaded')) {
                clearInterval(checkInterval);
                // Ждем завершения transition + небольшая задержка
                setTimeout(() => {
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

    // Подключаем загрузку логотипов
    function attachLogoLoader() {
        Lampa.Listener.follow('full', (event) => {
            if (event.type === 'complite') {
                const activity = event.object.activity;
                const render = activity.render();
                
                // Добавляем класс для применения стилей
                render.addClass('applecation');

                addOverlay(activity);
                loadLogo(event);
                attachScrollBlur(activity);

                // Анализируем качество контента
                const data = event.data;
                const movie = data && data.movie;
                if (movie) {
                    analyzeContentQualities(movie, activity);
                }
            }
        });
    }

    // Регистрация плагина в манифесте
    var pluginManifest = {
        type: 'other',
        version: '1.0.0',
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

