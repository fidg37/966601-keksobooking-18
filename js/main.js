'use strict';
var arraysLength = 8;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinsList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var pinGapX = 50 / 2;
var pinGapY = 70;
var photo = cardTemplate.querySelector('.popup__photo');

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var typesTranslate = ['дворец', 'квартира', 'дом', 'бунгало'];
var times = ['12:00', '13:00', '14:00'];

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
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner', 'elevator'];
    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
    fragment.appendChild(createPin(notices[i]));
  }
  pinsList.appendChild(fragment);
};

var createCard = function (object) {
  var card = cardTemplate.cloneNode(true);
  var cardFeatures = card.querySelectorAll('.popup__feature');
  var featuresCollection = card.querySelectorAll('.popup__feature');

  var addFeatures = function (obj) {
    for (var i = 0; i < featuresCollection.length; i++) {
      cardFeatures[i].style.display = 'none';
      for (var j = 0; j < obj.offer.features.length; j++) {
        if (cardFeatures[i].classList.contains('popup__feature--' + obj.offer.features[j])) {
          cardFeatures[i].style.display = 'inline-block';
          j = obj.offer.features.length;
        }
      }
    }
  };

  var addPhotos = function (obj) {
    if (obj.offer.photos.length > 1) {
      for (var i = 1; i < obj.offer.photos.length; i++) {
        var photoClone = photo.cloneNode(true);
        card.querySelector('.popup__photos').appendChild(photoClone);
      }
    }

    var photosList = card.querySelectorAll('.popup__photo');

    for (var j = 0; j < obj.offer.photos.length; j++) {
      photosList[j].src = obj.offer.photos[j];
    }
  };

  card.querySelector('.popup__title').textContent = object.offer.title;
  card.querySelector('.popup__text--address').textContent = object.offer.address;
  card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
  card.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  card.querySelector('.popup__description').textContent = object.offer.description;
  card.querySelector('.popup__avatar').src = object.author.avatar;
  addFeatures(object);
  addPhotos(object);

  for (var i = 0; i < types.length; i++) {
    if (object.offer.type === types[i]) {
      card.querySelector('.popup__type').textContent = typesTranslate[i];
    }
  }

  return fragment.appendChild(card);
};

createNoticeArray();
createPinsList();

map.classList.remove('map--faded');
pinsList.insertAdjacentElement('afterend', createCard(notices[0]));
