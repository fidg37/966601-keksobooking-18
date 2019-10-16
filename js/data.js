'use strict';
(function () {
  window.arraysLength = 8;
  window.notices = [];

  var authors = [];
  var offers = [];
  var locationsArray = [];

  window.types = ['palace', 'flat', 'house', 'bungalo'];
  window.typesTranslate = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  window.apartmentsCost = [10000, 1000, 5000, 0];
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
      var removedElem = array.splice(window.getRandom(0, array.length - 1), 1);
      randomArray[randomArray.length] = {
        avatar: 'img/avatars/user0' + removedElem[0] + '.png'
      };
    }
    return randomArray;
  };

  var randomizedArray = function (array) {
    var initialArray = array.slice();
    var randomArray = [];
    var numberRandomElem = window.getRandom(1, array.length);

    for (var i = 0; i < numberRandomElem; i++) {
      var removedElem = initialArray.splice(window.getRandom(0, initialArray.length - 1), 1);
      randomArray[randomArray.length] = removedElem[0];
    }

    return randomArray;
  };

  var getRandArrElem = function (array) {
    return array[window.getRandom(0, array.length - 1)];
  };

  var createOffersArray = function () {
    var x;
    var y;

    for (var i = 0; i < window.arraysLength; i++) {
      x = window.getRandom(0, 300);
      y = window.getRandom(130, 630);

      offers[i] = {
        title: 'Title №' + (i + 1)
      };
      offers[i].address = x + ', ' + y;
      offers[i].price = window.getRandom(5000, 10000);
      offers[i].type = getRandArrElem(window.types);
      offers[i].rooms = window.getRandom(1, 5);
      offers[i].guests = window.getRandom(1, 5);
      offers[i].checkin = getRandArrElem(times);
      offers[i].checkout = getRandArrElem(times);
      offers[i].features = randomizedArray(features);
      offers[i].description = 'Random description №' + (i + 1);
      offers[i].photos = randomizedArray(photos);
    }
  };

  var createLocationsArray = function () {
    for (var i = 0; i < window.arraysLength; i++) {
      locationsArray[i] = {
        x: window.getRandom(0, 1200),
        y: window.getRandom(130, 630)
      };
    }
  };

  var createNoticeArray = function () {
    authors = createAuthorsArray(window.arraysLength, 0, window.arraysLength);
    createOffersArray();
    createLocationsArray();

    for (var i = 0; i < window.arraysLength; i++) {
      window.notices[i] = {
        author: authors[i]
      };
      window.notices[i].offer = offers[i];
      window.notices[i].location = locationsArray[i];
    }
  };

  createNoticeArray();
})();
