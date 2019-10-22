'use strict';
(function () {
  var SIMILAR_NOTICES_URL = 'https://js.dump.academy/keksobooking/data';

  var map = document.querySelector('.map');
  var pinsList = map.querySelector('.map__pins');

  var mapDimensions = {
    maxWidth: pinsList.offsetWidth,
    minWidth: 0,
    maxHeight: pinsList.offsetHeight,
    minHeight: 0
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
    window.data.notices = data;
    window.data.arrayLength = data.length;
  };

  window.data = {
    apartmentsInfo: apartmentsInfo,
    map: map,
    pinsList: pinsList,
    mapDimensions: mapDimensions,
    createNoticeArray: createNoticeArray,
    SIMILAR_NOTICES_URL: SIMILAR_NOTICES_URL
  };
})();
