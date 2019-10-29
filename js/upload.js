'use strict';
(function () {
  var dataUpload = function (data, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (window.util.integerDivision(xhr.status, 100) === window.util.SUCCESS_CODE) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', url);

    try {
      xhr.send(data);
    } catch (err) {
      onError();
    }
  };

  window.upload = {
    dataUpload: dataUpload
  };
})();
