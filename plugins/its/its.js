(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /**
   * Генерация имени файла (Логика из InfuseSync)
   */
  function generateFilename(it, movie, index) {
    var tmdb_id = movie ? movie.id : '';
    var s_num = parseInt(it.season !== undefined ? it.season : it.season_number);
    var e_num = parseInt(it.episode !== undefined ? it.episode : it.episode_number);
    var filename = '';

    if (movie && tmdb_id) {
      if (!isNaN(e_num) && e_num > 0 && !isNaN(s_num) && s_num >= 0) {
        var title = movie.original_name || movie.original_title || movie.name || movie.title;
        var s = s_num < 10 ? '0' + s_num : s_num;
        var e = e_num < 10 ? '0' + e_num : e_num;
        filename = title + ' S' + s + 'E' + e + ' {tmdb-' + tmdb_id + '}';
      } else {
        var rawName = it.path_human || it.path || it.title || '';
        rawName = rawName.replace(/\.[a-z0-9]{1,6}$/i, '');
        if (movie.first_air_date || movie.name) {
          filename = '{tmdb-' + tmdb_id + '} ' + (rawName || movie.original_name || movie.name);
        } else {
          var title = movie.original_title || movie.title || movie.original_name || movie.name;
          var year = (movie.release_date || '').split('-')[0];
          filename = title + (year ? ' (' + year + ')' : '') + ' {tmdb-' + tmdb_id + '}';
        }
      }
    } else {
      var u_base = (it.url || '').split('?')[0];
      var nameFromUrl = decodeURIComponent(u_base.split('/').pop() || '').replace(/\.[a-z0-9]{1,6}$/i, '');
      filename = nameFromUrl || it.path_human || it.path || it.title || 'link_' + (index + 1);
    }

    filename = String(filename || '').replace(/<[^>]*>?/gm, '').trim();
    return filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim() || 'link';
  }

  /**
   * Возвращает новый URL с измененным именем файла
   */
  function getRenamedUrl(it, movie, index) {
    var url = String(it.url || '').replace('&preload', '&play').replace(/\s/g, '%20');
    var filename = generateFilename(it, movie, index);
    
    var parts = url.split('?');
    var path = parts[0];
    var query = parts[1] || '';
    
    var pathParts = path.split('/');
    var lastPart = pathParts[pathParts.length - 1];
    var extension = '';
    var m = lastPart.match(/\.[a-z0-9]{1,6}$/i);
    if (m) extension = m[0];

    pathParts[pathParts.length - 1] = encodeURIComponent(filename) + extension;
    return pathParts.join('/') + (query ? '?' + query : '');
  }

  Lampa.Platform.tv();
  function add() {
    Lampa.Listener.follow('torrent_file', function (data) {
      if (data.type === 'onlong') {
        var movie = data.params ? data.params.movie : null;
        var links_array = data.items || [];
        
        // Ссылка для одного элемента (не мутируем оригинал!)
        var current_url = getRenamedUrl(data.element, movie, links_array.indexOf(data.element));
        
        console.log("ITS", 'infuse://x-callback-url/save?url=' + encodeURIComponent(current_url));

        data.menu.push({
          title: 'Save to Infuse',
          onSelect: function onSelect() {
            window.location.assign('infuse://x-callback-url/save?url=' + encodeURIComponent(current_url));
          }
        });

        // Подготовка данных для массового сохранения
        var formatted_urls = '';
        var trim_playlist = [];

        links_array.forEach(function (item, idx) {
          var r_url = getRenamedUrl(item, movie, idx);
          formatted_urls += encodeURIComponent(r_url + '\n');
          trim_playlist.push({ url: r_url });
        });

        //Disable list import
        if (Lampa.Platform.is('apple_tv') === false) {
          data.menu.push({
            title: 'Save all to infuse',
            onSelect: function onSelect() {
              window.location.assign('shortcuts://run-shortcut?name=Infuse import links&input=text&text=' + formatted_urls);
            }
          });
          console.log("ITS Shortcuts", formatted_urls);
        }
        
        // list import apple tv
        if (Lampa.Platform.is('apple_tv') === true) {
          data.menu.push({
            title: 'Save all to infuse',
            onSelect: function onSelect() {
              var playlistURL = trim_playlist.length > 0 ? encodeURIComponent(JSON.stringify(trim_playlist)) : '';
              window.location.assign("lampa://saveAllToInfuse?playlist=" + playlistURL);
            }
          });
        }
      }
    });

    //showadvancedmenu
    var icon = Lampa.Head.addIcon('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" /></svg>', function () {
      window.open('lampa://showadvancedmenu');
    });
    
    if (Lampa.Platform.is('apple_tv') === true) {
      icon.addClass('appleTV_showadvancedmenu');
    }
  }

  function startPlugin() {
    window.plugin_its_ready = true;
    Lampa.Manifest.plugins = {
      type: "other",
      version: "0.5",
      name: "AppleTV Tweaks",
      description: "Some tweaks for Apple TV",
      component: "its"
    };
    Lampa.Template.add('infuseSaver', "\n        <style>\n            .infuseSaver {\n              display: flex;\n              flex-direction: row;\n            }\n            .infuseSaverLogo {\n              width: 24px;\n              height: 24px;\n              margin-right: 2%;\n            }\n        </style>\n    ");
    $('body').append(Lampa.Template.get('infuseSaver', {}, true));
    if (window.appready) add();else {
      Lampa.Listener.follow("app", function (e) {
        if (e.type === "ready") add();
      });
    }
  }
  if (!window.plugin_its_ready) startPlugin();

})();
