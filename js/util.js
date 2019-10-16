'use strict';
(function () {
  window.fragment = document.createDocumentFragment();

  window.getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
})();
