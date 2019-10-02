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
var fieldsetsCollection = document.querySelectorAll('fieldset');
var selectsCollection = document.querySelectorAll('select');
var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.ad-form');
var addressInput = noticeForm.querySelector('#address');
var roomNumber = noticeForm.querySelector('#room_number');
var guestCapacity = noticeForm.querySelector('#capacity');
var card = cardTemplate.cloneNode(true);
var cardFeatures = card.querySelectorAll('.popup__feature');
var featuresCollection = card.querySelectorAll('.popup__feature');

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_ARROW_GAP = 16;
var PIN_GAP = MAIN_PIN_WIDTH / 2;

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var typesTranslate = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner', 'elevator'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

  return card;
};

var disablesForms = function () {
  for (var i = 0; i < fieldsetsCollection.length; i++) {
    fieldsetsCollection[i].setAttribute('disabled', '');
  }

  for (var j = 0; j < selectsCollection.length; j++) {
    selectsCollection[j].setAttribute('disabled', '');
  }
};

var activatesForms = function () {
  for (var i = 0; i < fieldsetsCollection.length; i++) {
    fieldsetsCollection[i].removeAttribute('disabled');
  }

  for (var j = 0; j < selectsCollection.length; j++) {
    selectsCollection[j].removeAttribute('disabled');
  }
};

var setDefaultAddress = function () {
  var pinX = parseInt(mainPin.style.left, 10) + PIN_GAP;
  var pinY = parseInt(mainPin.style.top, 10) + PIN_GAP;
  addressInput.value = pinX + ', ' + pinY;
};

var setCurrentAddress = function () {
  var pinX = parseInt(mainPin.style.left, 10) + PIN_GAP;
  var pinY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + PIN_ARROW_GAP;
  addressInput.value = pinX + ', ' + pinY;
};

var addCardToPage = function (arrElem) {
  pinsList.insertAdjacentElement('afterend', fragment.appendChild(createCard(arrElem)));
};

createNoticeArray();
addCardToPage(notices[0]);
createPinsList();

disablesForms();
setDefaultAddress();


mainPin.addEventListener('mousedown', function () {
  activatesForms();
  setCurrentAddress();
  map.classList.remove('map--faded');
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatesForms();
    setCurrentAddress();
    map.classList.remove('map--faded');
  }
});

guestCapacity.addEventListener('input', function () {
  guestCapacity.setCustomValidity('');
});

roomNumber.addEventListener('input', function () {
  guestCapacity.setCustomValidity('');
});

noticeForm.addEventListener('submit', function (evt) {

  var guests = parseInt(guestCapacity.value, 10);
  var rooms = parseInt(roomNumber.value, 10);

  if (rooms !== guests && guests !== 0) {
    evt.preventDefault();
    guestCapacity.setCustomValidity('Гостей больше чем комнат');
  }
});
