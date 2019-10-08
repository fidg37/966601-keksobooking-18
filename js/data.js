'use strict';
(function () {
  window.arraysLength = 8;
  window.authors = [];
  window.offers = [];
  window.locationsArray = [];
  window.notices = [];
  window.types = ['palace', 'flat', 'house', 'bungalo'];

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
      var removedElem = array.splice(getRandom(0, array.length - 1), 1);
      randomArray[randomArray.length] = {
        avatar: 'img/avatars/user0' + removedElem[0] + '.png'
      };
    }
    return randomArray;
  };

  var randomizedArray = function (array) {
    var initialArray = array.slice();
    var randomArray = [];
    var numberRandomElem = getRandom(1, array.length);
  
    for (var i = 0; i < numberRandomElem; i++) {
      var removedElem = initialArray.splice(getRandom(0, initialArray.length - 1), 1);
      randomArray[randomArray.length] = removedElem[0];
    }
  
    return randomArray;
  };

  var getRandArrElem = function (array) {
    return array[getRandom(0, array.length - 1)];
  };

  var createOffersArray = function () {
    var x;
    var y;
  
    for (var i = 0; i < arraysLength; i++) {
      x = getRandom(0, 300);
      y = getRandom(130, 630);
  
      window.offers[i] = {
        title: 'Title №' + (i + 1)
      };
      window.offers[i].address = x + ', ' + y;
      window.offers[i].price = getRandom(5000, 10000);
      window.offers[i].type = getRandArrElem(types);
      window.offers[i].rooms = getRandom(1, 5);
      window.offers[i].guests = getRandom(1, 5);
      window.offers[i].checkin = getRandArrElem(times);
      window.offers[i].checkout = getRandArrElem(times);
      window.offers[i].features = randomizedArray(features);
      window.offers[i].description = 'Random description №' + (i + 1);
      window.offers[i].photos = randomizedArray(photos);
    }
  };

  var createLocationsArray = function () {
    for (var i = 0; i < arraysLength; i++) {
      window.locationsArray[i] = {
        x: getRandom(0, 1200),
        y: getRandom(130, 630)
      };
    }
  };

  var createNoticeArray = function () {
    authors = createAuthorsArray(arraysLength, 0, arraysLength);
    createOffersArray();
    createLocationsArray();
  
    for (var i = 0; i < arraysLength; i++) {
      window.notices[i] = {
        author: authors[i]
      };
      window.notices[i].offer = offers[i];
      window.notices[i].location = locationsArray[i];
    }
  };

  createNoticeArray();
})();
