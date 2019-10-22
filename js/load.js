'use strict';
(function () {
  var SUCCSESS_STATUS = 200;
  var TIMEOUT_LIMIT = 10000;

  var dataLoad = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_LIMIT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCSESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
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
