'use strict';
(function () {
  window.map = document.querySelector('.map');
  window.fragment = document.createDocumentFragment();
  window.pinsList = window.map.querySelector('.map__pins');

  var pinGapX = 50 / 2;
  var pinGapY = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  

  var createPin = function (object) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = object.location.x - pinGapX + 'px';
    pin.style.top = object.location.y - pinGapY + 'px';
    pin.querySelector('img').src = object.author.avatar;
    pin.querySelector('img').alt = object.offer.title;
  
    return pin;
  };

  var createPinsList = function () {
    for (var i = 0; i < window.arraysLength; i++) {
      window.fragment.appendChild(createPin(window.notices[i]));
    }
    pinsList.appendChild(window.fragment);
  };

  createPinsList();
})();
