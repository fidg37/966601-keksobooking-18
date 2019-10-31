'use strict';
(function () {
  var dataLoad = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.util.TIMEOUT_LIMIT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('timeout', function () {
      onError(xhr.status);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  window.load = {
    dataLoad: dataLoad
  };
})();
