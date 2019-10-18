'use strict';
(function () {
  var pinsCollection;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (object) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = object.author.avatar;
    pin.querySelector('img').alt = object.offer.title;

    return pin;
  };

  var createPinsList = function () {
    var pinGapX;
    var pinGapY;

    for (var i = 0; i < window.data.ARRAYS_LENGTH; i++) {
      window.util.fragment.appendChild(createPin(window.data.notices[i]));
    }

    window.data.pinsList.appendChild(window.util.fragment);

    for (var j = 0; j < window.data.ARRAYS_LENGTH; j++) {
      pinsCollection = window.data.map.querySelectorAll('[type="button"].map__pin');
      pinGapX = pinsCollection[j].offsetWidth / 2;
      pinGapY = pinsCollection[j].offsetHeight;
      pinsCollection[j].style.left = window.data.notices[j].location.x - pinGapX + 'px';
      pinsCollection[j].style.top = window.data.notices[j].location.y - pinGapY + 'px';
    }
  };

  createPinsList();

  window.pin = {
    pinsCollection: pinsCollection
  };
})();
