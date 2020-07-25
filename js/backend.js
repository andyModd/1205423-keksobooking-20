'use strict';
(function () {
  var load = function (url, type, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.constants.timeoutInMs;
    xhr.open(type, url);
    xhr.send(data);
  };

  var upload = function (data, onSuccess, onError) {
    load(window.constants.urlPost, window.constants.requestPost, onSuccess, onError, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
