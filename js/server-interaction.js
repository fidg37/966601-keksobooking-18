'use strict';
(function () {
  var loadOrUpload = function (url, onSuccess, onError, isUpload, data) {
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

    if (isUpload) {
      xhr.open('POST', url);
      try {
        xhr.send(data);
      } catch (err) {
        onError();
      }
    } else {
      xhr.open('GET', url);
      xhr.send();
    }
  };

  window.serverInteraction = {
    loadOrUpload: loadOrUpload
  };
})();
