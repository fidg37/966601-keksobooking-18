'use strict';
var arraysLength = 8;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = map.querySelector('.map__pins');
var pinsFragment = document.createDocumentFragment();
var pinGapX = 50 / 2;
var pinGapY = 70;

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  var initialArray = array;
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
  for (var i = 0; i < arraysLength; i++) {
    var x = getRandom(0, 300);
    var y = getRandom(130, 630);

    offers[i] = {
      title: 'Title №' + (i + 1)
    };
    offers[i].address = x + ', ' + y;
    offers[i].price = getRandom(5000, 10000);
    offers[i].type = getRandArrElem(types);
    offers[i].rooms = getRandom(1, 5);
    offers[i].guests = getRandom(1, 5);
    offers[i].checkin = getRandArrElem(times);
    offers[i].checkout = getRandArrElem(times);
    offers[i].features = randomizedArray(features);
    offers[i].description = 'Random description №' + (i + 1);
    offers[i].photos = randomizedArray(photos);
  }
};

var createLocationsArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    locationsArray[i] = {
      x: getRandom(0, 1000),
      y: getRandom(130, 630)
    };
  }
};

var createNoticeArray = function () {
  authors = createAuthorsArray(arraysLength, 0, arraysLength);
  createOffersArray();
  createLocationsArray();

  for (var i = 0; i < arraysLength; i++) {
    notices[i] = {
      author: authors[i]
    };
    notices[i].offer = offers[i];
    notices[i].location = locationsArray[i];
  }
};

var createPin = function (object) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = object.location.x - pinGapX + 'px';
  pin.style.top = object.location.y - pinGapY + 'px';
  pin.querySelector('img').src = object.author.avatar;
  pin.querySelector('img').alt = object.offer.title;

  return pin;
};

var createPinsList = function () {
  for (var i = 0; i < arraysLength; i++) {
    pinsFragment.appendChild(createPin(notices[i]));
  }
  pinsList.appendChild(pinsFragment);
};

createNoticeArray();
createPinsList();

map.classList.remove('map--faded');

