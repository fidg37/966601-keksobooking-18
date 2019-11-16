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

  var createPins = function (data) {
    var pinGapX;
    var pinGapY;
    var pinsQuantity;

    if (window.util.PINS_QUANTITY <= data.length) {
      pinsQuantity = window.util.PINS_QUANTITY;
    } else {
      pinsQuantity = window.mapFilter.filtratedData.length;
    }

    for (var i = 0; i < pinsQuantity; i++) {
      window.util.fragment.appendChild(createPin(data[i]));
    }

    window.data.pinsList.appendChild(window.util.fragment);
    var pinsCollection = window.data.map.querySelectorAll('[type="button"].map__pin');
    window.pin.pinsCollection = pinsCollection;

    for (var j = 0; j < pinsQuantity; j++) {
      pinGapX = pinsCollection[j].offsetWidth / 2;
      pinGapY = pinsCollection[j].offsetHeight;
      pinsCollection[j].style.left = data[j].location.x - pinGapX + 'px';
      pinsCollection[j].style.top = data[j].location.y - pinGapY + 'px';
    }
  };

  window.pin = {
    create: createPins,
  };
})();
