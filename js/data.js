'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var map = document.querySelector('.map');
  var pinsList = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var notices = null;

  var MapDimensions = {
    MAX_WIDTH: pinsList.offsetWidth,
    MIN_WIDTH: 0,
    MAX_HEIGHT: 630,
    MIN_HEIGHT: 130
  };

  var apartmentsInfo = [
    {
      type: 'palace',
      typeTranslate: 'Дворец',
      cost: 10000
    },
    {
      type: 'flat',
      typeTranslate: 'Квартира',
      cost: 1000
    },
    {
      type: 'house',
      typeTranslate: 'Дом',
      cost: 5000
    },
    {
      type: 'bungalo',
      typeTranslate: 'Бунгало',
      cost: 0
    }
  ];

  var createNoticeArray = function (data) {
    notices = data;
    window.data.notices = data;
    window.data.arrayLength = data.length;
  };

  window.data = {
    apartmentsInfo: apartmentsInfo,
    map: map,
    pinsList: pinsList,
    MapDimensions: MapDimensions,
    createNoticeArray: createNoticeArray,
    LOAD_URL: LOAD_URL,
    UPLOAD_URL: UPLOAD_URL,
    mainPin: mainPin,
    notices: notices,
    DEFAULT_AVATAR: DEFAULT_AVATAR
  };
})();
