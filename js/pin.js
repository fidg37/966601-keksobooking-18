'use strict';
(function () {
  var pinsList = window.util.map.querySelector('.map__pins');
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

    pinsList.appendChild(window.util.fragment);

    for (var j = 0; j < window.data.ARRAYS_LENGTH; j++) {
      pinsCollection = window.util.map.querySelectorAll('[type="button"].map__pin');
      pinGapX = parseInt(pinsCollection[j].offsetWidth, 10) / 2;
      pinGapY = parseInt(pinsCollection[j].offsetHeight, 10);
      pinsCollection[j].style.left = window.data.notices[j].location.x - pinGapX + 'px';
      pinsCollection[j].style.top = window.data.notices[j].location.y - pinGapY + 'px';
    }
  };

  createPinsList();

  window.pin = {
    pinsList: pinsList,
    pinsCollection: pinsCollection
  };
})();
