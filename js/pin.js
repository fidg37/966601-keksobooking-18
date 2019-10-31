'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (object) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = object.author.avatar;
    pin.querySelector('img').alt = object.offer.title;
    pin.classList.add('notice-pin');

    return pin;
  };

  var createPins = function () {
    var pinGapX;
    var pinGapY;

    for (var i = 0; i < window.data.arrayLength; i++) {
      window.util.fragment.appendChild(createPin(window.data.notices[i]));
    }

    window.data.pinsList.appendChild(window.util.fragment);
    var pinsCollection = window.data.map.querySelectorAll('[type="button"].map__pin');
    window.pin.pinsCollection = pinsCollection;

    for (var j = 0; j < window.data.arrayLength; j++) {
      pinGapX = pinsCollection[j].offsetWidth / 2;
      pinGapY = pinsCollection[j].offsetHeight;
      pinsCollection[j].style.left = window.data.notices[j].location.x - pinGapX + 'px';
      pinsCollection[j].style.top = window.data.notices[j].location.y - pinGapY + 'px';
    }
  };

  window.pin = {
    createPins: createPins,
  };
})();
