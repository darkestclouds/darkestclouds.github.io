(function () {
  'use strict';

  var PLUGIN_NAME = 'InfuseSync';
  var VERSION = '1.0.0';

  var STORAGE_HOST = 'infusesync_sender_host';

  var DEFAULT_HOST = 'iphone.local';
  var PLUGIN_ICON = '<svg viewBox="0 0 1119 1400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 265.314V875.313C6.49994 1026.81 242 1081.81 279.5 880.813V279.313L839.5 687.313L187.5 1160.31C61.9999 1284.31 219 1464.81 355.5 1374.81L1007.57 908.257L1007.5 908.313C1158 781.813 1153 581.863 1007.5 464.363L534 122.363C191 -181.187 0.499939 165.813 0.5 265.314Z" fill="currentColor"/></svg>';
  var PLUGIN_ICON_COLORED = PLUGIN_ICON.replace('currentColor', '#FF8C00');

  function noty(msg) {
    if (window.Lampa && Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show(msg);else console.log(msg);
  }

  /**
   * Нормализация адреса:
   * - принимает "http://host:port/...", "https://host/", " host "
   * - возвращает только "host:port" (без протокола, без путей/слешей)
   */
  function normalizeHost(input) {
    var s = String(input || '').trim();

    s = s.replace(/^\s*https?:\/\//i, '');
    s = s.replace(/^[\/]+/, '');
    s = s.split('#')[0].split('?')[0];
    s = s.split('/')[0];
    s = s.replace(/\s+/g, '');

    return s;
  }

  function getHost() {
    if (!window.Lampa || !Lampa.Storage) return DEFAULT_HOST;

    var raw = Lampa.Storage.get(STORAGE_HOST);
    var host = normalizeHost(raw || DEFAULT_HOST);

    return host || DEFAULT_HOST;
  }

  function getEndpoint() {
    return 'http://' + getHost() + '/data/upload.json';
  }

  function safeBaseName(name) {
    var n = String(name || '').replace(/<[^>]*>?/gm, '').trim();
    n = n.split('/').pop().split('\\').pop();
    n = n.replace(/\.[a-z0-9]{1,6}$/i, '');
    n = n.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim();
    return n || 'link';
  }

  function fileNameFromStreamUrl(url) {
    try {
      var u = new URL(String(url || ''), window.location.href);
      var seg = (u.pathname || '').split('/').pop() || '';
      seg = decodeURIComponent(seg);
      return seg || '';
    } catch (e) {
      return '';
    }
  }


  /**
   * Генерация имени файла по рекомендациям Infuse
   * @param {object} it - объект файла
   * @param {object} movie - объект фильма/сериала
   * @param {number} index - индекс в списке
   */
  function generateFilename(it, movie, index) {
    var tmdb_id = movie ? movie.id : '';

    // Приводим к числу, чтобы избежать проблем со сравнением
    var s_num = parseInt(it.season !== undefined ? it.season : it.season_number);
    var e_num = parseInt(it.episode !== undefined ? it.episode : it.episode_number);

    var filename = '';

    if (movie && tmdb_id) {
      // e_num > 0 — обычная серия или спецвыпуск с номером
      // s_num >= 0 — позволяет обрабатывать спецвыпуски (0 сезон)
      if (!isNaN(e_num) && e_num > 0 && !isNaN(s_num) && s_num >= 0) {
        var title = movie.original_name || movie.original_title || movie.name || movie.title;
        var s = s_num < 10 ? '0' + s_num : s_num;
        var e = e_num < 10 ? '0' + e_num : e_num;
        filename = title + ' S' + s + 'E' + e + ' {tmdb-' + tmdb_id + '}';
      } else {
        // Если номер серии 0 или не определен
        var rawName = it.path_human || it.path || it.title || '';
        rawName = rawName.replace(/\.[a-z0-9]{1,6}$/i, ''); // Убираем расширение

        if (movie.first_air_date || movie.name) {
          // Сериал: ставим ID в начало, чтобы Infuse сам нашел серию в "грязном" названии
          filename = '{tmdb-' + tmdb_id + '} ' + (rawName || movie.original_name || movie.name);
        } else {
          // Фильм: красивое название (Год) {tmdb-ID}
          var title = movie.original_title || movie.title || movie.original_name || movie.name;
          var year = (movie.release_date || '').split('-')[0];
          filename = title + (year ? ' (' + year + ')' : '') + ' {tmdb-' + tmdb_id + '}';
        }
      }
    } else {
      // Полный фолбек
      var url = fixUrl(it.url);
      var nameFromUrl = fileNameFromStreamUrl(url);
      filename = nameFromUrl || it.path_human || it.path || it.title || 'link_' + (index + 1);
    }

    return safeBaseName(filename) + '.strm';
  }

  function fixUrl(u) {
    return String(u || '').replace('&preload', '&play').replace(/\s/g, '%20');
  }

  function uploadStrm(items) {
    var endpoint = getEndpoint();
    var form = new FormData();
    var filenames = [];

    items.forEach(function (it) {
      filenames.push(it.filename);
      form.append('files', new Blob([String(it.url || '')], {
        type: 'application/octet-stream'
      }), it.filename);
    });

    form.append('movies', filenames.join(':'));

    if (typeof fetch !== 'function') return Promise.reject(new Error('Нет fetch для отправки'));

    // Ответ будет opaque (нельзя проверить статус/тело), но запрос уйдет.
    return fetch(endpoint, {
      method: 'POST',
      body: form,
      mode: 'no-cors',
      credentials: 'omit',
      cache: 'no-store'
    });
  }

  function addSettings() {
    if (!window.Lampa || !Lampa.SettingsApi || !Lampa.Storage) return;

    if (Lampa.Storage.get(STORAGE_HOST) === undefined) Lampa.Storage.set(STORAGE_HOST, DEFAULT_HOST);

    Lampa.SettingsApi.addComponent({
      component: 'infusesync_sender',
      name: PLUGIN_NAME,
      icon: PLUGIN_ICON
    });

    Lampa.SettingsApi.addParam({
      component: 'infusesync_sender',
      param: {
        name: STORAGE_HOST,
        type: 'input',
        "default": DEFAULT_HOST,
        placeholder: DEFAULT_HOST,
        values: ''
      },
      field: {
        name: 'Адрес сервера',
        description: 'Пример: iphone.local или 192.168.1.99'
      },
      onChange: function (value) {
        var clean = normalizeHost(value || '');
        if (!clean) clean = DEFAULT_HOST;

        Lampa.Storage.set(STORAGE_HOST, clean);

        // Обновим UI, чтобы пользователь видел уже нормализованное значение
        if (Lampa.Settings && Lampa.Settings.update) Lampa.Settings.update();
      }
    });
  }

  function addMenuHook() {
    if (!window.Lampa || !Lampa.Listener) return;

    Lampa.Listener.follow('torrent_file', function (data) {
      if (!data || data.type !== 'onlong') return;

      var links_array = data.items;
      var items = Array.isArray(links_array) ? links_array : [];

      if (!items.length || !data.menu) return;

      var movie = data.params ? data.params.movie : null;
      var host = getHost();
      var is_tv = movie && (movie.number_of_seasons || movie.first_air_date || movie.name);
      
      // Находим индекс текущего элемента, на котором открыто меню
      var current_index = -1;
      if (data.element) {
        current_index = items.indexOf(data.element);
      }

      function sendBatch(list, msg_success) {
        if (typeof Lampa.Loading === 'undefined') {
          // Фолбек если Loading не доступен
          executeUpload();
          return;
        }

        var aborted = false;
        Lampa.Loading.start(function () {
          aborted = true;
          Lampa.Loading.stop();
        }, 'Отправка в Infuse...');

        function executeUpload() {
          var started = Date.now();
          var total = list.length;
          var batch = list.map(function (it, i) {
            it = it || {};
            var url = fixUrl(it.url);
            var orig_idx = items.indexOf(it);
            var filename = generateFilename(it, movie, orig_idx === -1 ? i : orig_idx);
            return {
              url: url,
              filename: filename
            };
          });

          uploadStrm(batch).then(function () {
            if (aborted) return;
            Lampa.Loading.stop();
            var spent = Math.round((Date.now() - started) / 1000);
            noty('InfuseSync: ' + msg_success + ' (' + total + ' шт. за ' + spent + 'с)');
          })["catch"](function (e) {
            if (aborted) return;
            Lampa.Loading.stop();
            noty('InfuseSync: Ошибка при отправке');
            console.error(e);
          });
        }

        executeUpload();
      }

      // 1. Основная кнопка: Фильм или Весь сезон
      data.menu.push({
        title: is_tv ? 'Сохранить все эпизоды' : 'Сохранить фильм',
        subtitle: 'Сервер Infuse: ' + host,
        icon: PLUGIN_ICON_COLORED,
        template: 'selectbox_icon',
        onSelect: function () {
          sendBatch(items, is_tv ? 'Все эпизоды отправлены' : 'Фильм отправлен');
        }
      });

      // 2. Дополнительные кнопки для сериалов
      if (is_tv && current_index !== -1) {
        // Сохранить до текущего (включая текущий)
        data.menu.push({
          title: 'Сохранить эпизоды ↓',
          subtitle: 'Сохраняет все эпизоды до текущего',
          icon: PLUGIN_ICON_COLORED,
          template: 'selectbox_icon',
          onSelect: function () {
            var list = items.slice(0, current_index + 1);
            sendBatch(list, 'Эпизоды до текущего отправлены');
          }
        });

        // Сохранить от текущего (включая текущий)
        data.menu.push({
          title: 'Сохранить эпизоды ↑',
          subtitle: 'Сохраняет все эпизоды начиная с текущего',
          icon: PLUGIN_ICON_COLORED,
          template: 'selectbox_icon',
          onSelect: function () {
            var list = items.slice(current_index);
            sendBatch(list, 'Эпизоды начиная с текущего отправлены');
          }
        });
      }
    });
  }

  function addStyles() {
    try {
      document.querySelectorAll('style[data-id="infusesync-sender"]').forEach(function (s) {
        return s.remove();
      });

      var css = '\n.infuseSyncSender{display:flex;flex-direction:row;align-items:center}\n.infuseSyncSenderLogo{width:24px;height:24px;margin-right:8px}\n';

      var style = document.createElement('style');
      style.setAttribute('data-id', 'infusesync-sender');
      style.textContent = css;
      document.head.appendChild(style);
    } catch (e) {}
  }

  function init() {
    addSettings();
    addStyles();
    addMenuHook();
  }

  // Манифест
  var pluginManifest = {
    type: 'other',
    version: VERSION,
    name: PLUGIN_NAME,
    description: 'Отправка торентов в Infuse через веб-сервер',
    author: '@darkestclouds',
    icon: PLUGIN_ICON
  };

  if (window.Lampa && Lampa.Manifest) {
    Lampa.Manifest.plugins = pluginManifest;
  }

  if (window.appready) init();else if (window.Lampa && Lampa.Listener) {
    Lampa.Listener.follow('app', function (event) {
      if (event.type === 'ready') init();
    });
  }
})();


