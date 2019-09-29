'use strict';
var arraysLength = 8;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photo = cardTemplate.querySelector('.popup__photo');
var pinsList = map.querySelector('.map__pins');
var pinsFragment = document.createDocumentFragment();
var pinGapX = 50 / 2;
var pinGapY= 70;

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];

var getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createAuthorsArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    if (authors.length > 0) {
      var createAvatar = function () {
        var random = getRandom(1, arraysLength);
        for (var j = 0; j < authors.length; j++) {
          if (authors[j].avatar === 'img/avatars/user0' + random + '.png') {
            j = authors.length;
            createAvatar();
            return;
          }
        }

        authors[i] = {
          avatar: 'img/avatars/user0' + random + '.png'
        };
      };

      createAvatar();
    } else {
      authors[i] = {
        avatar: 'img/avatars/user0' + getRandom(1, arraysLength) + '.png'
      };
    }
  }
};

var createOffersArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    var x = getRandom(0, 300);
    var y = getRandom(130, 630);
    var typeRandom = getRandom(1, 4);
    var checkinRand = getRandom(1, 3);
    var checkoutRand = getRandom(1, 3);

    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var randomFeaturesArray = [];
    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var randomPhotosArray = [];

    var randomizePhotos = function () {
      var photosQuantity = getRandom(1, photos.length);
      for (var j = 0; j < photosQuantity; j++) {
        var randomPhoto = getRandom(0, photosQuantity);
        if (randomPhotosArray.length > 0) {
          var createPhoto = function () {
            var subRandomPhoto = getRandom(0, photosQuantity);
            for (y = 0; y < randomPhotosArray.length; y++) {
              if (randomPhotosArray[y] === photos[subRandomPhoto]) {
                createPhoto();
                return;
              }
            }

            randomPhotosArray[j] = photos[subRandomPhoto];
          };
          createPhoto();
        } else {
          randomPhotosArray[j] = photos[randomPhoto];
        }
      }
    };

    var randomizeFeatures = function () {
      var featuresQuantity = getRandom(1, features.length);
      for (var j = 0; j < featuresQuantity; j++) {
        var randomFeature = getRandom(0, featuresQuantity);
        if (randomFeaturesArray.length > 0) {
          var createFeature = function () {
            var subRandomFeature = getRandom(0, featuresQuantity);
            for (y = 0; y < randomFeaturesArray.length; y++) {
              if (randomFeaturesArray[y] === features[subRandomFeature]) {
                createFeature();
                return;
              }
            }

            randomFeaturesArray[j] = features[subRandomFeature];
          };
          createFeature();
        } else {
          randomFeaturesArray[j] = features[randomFeature];
        }
      }
    };

    randomizeFeatures();
    randomizePhotos();

    offers[i] = {
      title: 'Title №' + (i + 1)
    };

    offers[i].address = x + ', ' + y;

    offers[i].price = getRandom(5000, 10000);

    if (typeRandom === 1) {
      offers[i].type = 'palace';
    } else if (typeRandom === 2) {
      offers[i].type = 'flat';
    } else if (typeRandom === 3) {
      offers[i].type = 'house';
    } else {
      offers[i].type = 'bungalo';
    }

    offers[i].rooms = getRandom(1, 5);

    offers[i].guests = getRandom(1, 5);

    if (checkinRand === 1) {
      offers[i].checkin = '12:00';
    } else if (checkinRand === 2) {
      offers[i].checkin = '13:00';
    } else {
      offers[i].checkin = '14:00';
    }

    if (checkoutRand === 1) {
      offers[i].checkout = '12:00';
    } else if (checkoutRand === 2) {
      offers[i].checkout = '13:00';
    } else {
      offers[i].checkout = '14:00';
    }

    offers[i].features = randomFeaturesArray;

    offers[i].description = 'Random description №' + (i + 1);

    offers[i].photos = randomPhotosArray;

  }
};

var createLocationsArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    locationsArray[i] = {
      x: getRandom(0, 1000) - pinGapX,
      y: getRandom(130, 630) - pinGapY
    };
  }
};

var createNoticeArray = function () {
  createAuthorsArray();
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
  pin.style.left = object.location.x + 'px';
  pin.style.top = object.location.y + 'px';
  pin.querySelector('img').src = object.author.avatar;
  pin.querySelector('img').alt = object.offer.title;

  return pin;
};

var createCard = function (object) {
  var card = cardTemplate.cloneNode(true);
  var cardFeatures = card.querySelectorAll('.popup__feature');
  var photoClone = photo.cloneNode(true);

  card.querySelector('.popup__text--address').textContent = object.offer.address;
  card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';

  if (object.offer.type === 'flat') {
    card.querySelector('.popup__type').textContent = 'Квартира';
  } else if (object.offer.type === 'palace') {
    card.querySelector('.popup__type').textContent = 'Дворец';
  } else if (object.offer.type === 'house') {
    card.querySelector('.popup__type').textContent = 'Дом';
  } else {
    card.querySelector('.popup__type').textContent = 'Бунгало';
  }

  card.querySelector('.popup__text--capacity').textContent = object.offer.rooms + 'комнаты для ' + object.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  card.querySelector('.popup__description').textContent = object.offer.description;
  card.querySelector('.popup__avatar').src = object.author.avatar;

  for (var i = 0; i < object.offer.features.length; i++) {
     for (var j = 0; j < object.offer.features.length; j++) {
      if (cardFeatures[i].classList.contains('popup__feature--' + object.offer.features[j])) {
        cardFeatures[i].textContent = object.offer.features[j];
      }
     };
  };

  for (var i = 0; i < object.offer.photos.length; i++) {
    if (object.offer.photos.length > 1) {
      card.querySelector('.popup__photos').appendChild(photoClone);
    }
  };

  var photosList = card.querySelectorAll('.popup__photo');

  for (var i = 0; i < object.offer.photos.length; i++) {
    photosList[i].src = object.offer.photos[i];
  };

  return card;
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

pinsList.insertAdjacentHTML('afterend', createCard(notices[0]));
