'use strict';
(function () {
  var ARRAYS_LENGTH = 8;

  var notices = [];

  var authors = [];
  var offers = [];
  var locationsArray = [];

  var apartmentsInfo = {
    types: ['palace', 'flat', 'house', 'bungalo'],
    typesTranslate: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
    cost: [10000, 1000, 5000, 0]
  };

  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner', 'elevator'];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var createAuthorsArray = function (arrayLength) {
    var array = [];
    var randomArray = [];
    var firstElem = 1;

    for (var i = 0; i < arrayLength; i++) {
      array[i] = firstElem;
      firstElem += 1;
    }

    while (array.length !== 0) {
      var removedElem = array.splice(window.util.getRandom(0, array.length - 1), 1);
      randomArray[randomArray.length] = {
        avatar: 'img/avatars/user0' + removedElem[0] + '.png'
      };
    }
    return randomArray;
  };

  var createOffersArray = function () {
    var x;
    var y;

    for (var i = 0; i < ARRAYS_LENGTH; i++) {
      x = window.util.getRandom(0, 300);
      y = window.util.getRandom(130, 630);

      offers[i] = {
        title: 'Title №' + (i + 1)
      };
      offers[i].address = x + ', ' + y;
      offers[i].price = window.util.getRandom(5000, 10000);
      offers[i].type = window.util.getRandArrElem(apartmentsInfo.types);
      offers[i].rooms = window.util.getRandom(1, 5);
      offers[i].guests = window.util.getRandom(1, 5);
      offers[i].checkin = window.util.getRandArrElem(times);
      offers[i].checkout = window.util.getRandArrElem(times);
      offers[i].features = window.util.randomizedArray(features);
      offers[i].description = 'Random description №' + (i + 1);
      offers[i].photos = window.util.randomizedArray(photos);
    }
  };

  var createLocationsArray = function () {
    for (var i = 0; i < ARRAYS_LENGTH; i++) {
      locationsArray[i] = {
        x: window.util.getRandom(0, 1200),
        y: window.util.getRandom(130, 630)
      };
    }
  };

  var createNoticeArray = function () {
    authors = createAuthorsArray(ARRAYS_LENGTH, 0, ARRAYS_LENGTH);
    createOffersArray();
    createLocationsArray();

    for (var i = 0; i < ARRAYS_LENGTH; i++) {
      notices[i] = {
        author: authors[i]
      };
      notices[i].offer = offers[i];
      notices[i].location = locationsArray[i];
    }
  };

  createNoticeArray();

  window.data = {
    ARRAYS_LENGTH: ARRAYS_LENGTH,
    notices: notices,
    apartmentsInfo: apartmentsInfo
  };
})();
