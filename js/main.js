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
var card;
var featuresCollection;

var fieldsetsCollection = document.querySelectorAll('fieldset');
var selectsCollection = document.querySelectorAll('select');
var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.ad-form');
var addressInput = noticeForm.querySelector('#address');
var roomNumber = noticeForm.querySelector('#room_number');
var guestCapacity = noticeForm.querySelector('#capacity');
var noticeTitle = noticeForm.querySelector('#title');
var price = noticeForm.querySelector('#price');
var apartmentsType = noticeForm.querySelector('#type');
var submitButton = noticeForm.querySelector('.ad-form__submit');
var rooms;
var guests;
var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');

var MAX_PRICE = 1000000;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAIN_PIN_WIDTH = mainPin.offsetWidth;
var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
var PIN_ARROW_GAP = window.getComputedStyle(mainPin, ':after').height - 6;
var PIN_GAP = MAIN_PIN_WIDTH / 2;

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var typesTranslate = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var apartmentsCost = [10000, 1000, 5000, 0];
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

var addFeatures = function (featuresCollection, obj) {
  for (var i = 0; i < featuresCollection.length; i++) {
    featuresCollection[i].style.display = 'none';
    for (var j = 0; j < obj.offer.features.length; j++) {
      if (featuresCollection[i].classList.contains('popup__feature--' + obj.offer.features[j])) {
        featuresCollection[i].style.display = 'inline-block';
        j = obj.offer.features.length;
      }
    }
  }
};

var addPhotos = function (card, obj) {
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

var createCard = function (object) {
  card = cardTemplate.cloneNode(true);
  featuresCollection = card.querySelectorAll('.popup__feature');

  if (map.querySelector('.map__card')) {
    map.removeChild(map.querySelector('.map__card'));
  };

  card.querySelector('.popup__title').textContent = object.offer.title;
  card.querySelector('.popup__text--address').textContent = object.offer.address;
  card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
  card.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  card.querySelector('.popup__description').textContent = object.offer.description;
  card.querySelector('.popup__avatar').src = object.author.avatar;
  addFeatures(featuresCollection, object);
  addPhotos(card, object);

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

var pinsCollection = map.querySelectorAll('[type="button"].map__pin');
var closeButton;
var noticeCard;


var pinsClickHandler = function (i) {
  pinsCollection[i].addEventListener('click', function () {
    addCardToPage(notices[i]);

    noticeCard = map.querySelector('.map__card');
    closeButton = noticeCard.querySelector('.popup__close');

    document.addEventListener('keydown', cardESCpressHandler);
    closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
    closeButton.addEventListener('click', closeButtonClickHandler);
  })
};

var pinsKeydownHandler = function (i) {
  pinsCollection[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      addCardToPage(notices[i]);

      noticeCard = map.querySelector('.map__card');
      closeButton = noticeCard.querySelector('.popup__close');

      document.addEventListener('keydown', cardESCpressHandler);
      closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
      closeButton.addEventListener('click', closeButtonClickHandler);
    }
  })
};

var cardCloseHandler = function () {
  map.removeChild(noticeCard);

  document.removeEventListener('keydown', cardESCpressHandler);
  closeButton.removeEventListener('keydown', closeButtonEnterPressHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
};

var closeButtonEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    cardCloseHandler();
  }
};

var closeButtonClickHandler = function (evt) {
  cardCloseHandler();
}

var cardESCpressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    cardCloseHandler();
  }
};

for (var i = 0; i < pinsCollection.length; i++) {
  pinsClickHandler(i)
};

for (var i = 0; i < pinsCollection.length; i++) {
  pinsKeydownHandler(i)
};

var getCost = function (arrTypes, arrCosts) {
  var cost;
  var type = apartmentsType.value;
  for (var i = 0; i < arrTypes.length; i++) {
    if (type === arrTypes[i]) {
      cost = arrCosts[i];
      i = arrTypes.length;
    }
  }
  return cost;
};

submitButton.addEventListener('click', function (evt) {
  rooms = parseInt(roomNumber.value, 10);
  guests = parseInt(guestCapacity.value, 10);
  var cost = getCost(types, apartmentsCost);

  if (guestCapacity.value > rooms && guests !== 0) {
    console.log('фыафыа');
    guestCapacity.setCustomValidity('Гостей больше чем комнат');
  } else {
    guestCapacity.setCustomValidity('');
  }

  if (noticeTitle.value.length < 30) {
    noticeTitle.setCustomValidity('Минимальная длина 30 символов');
  } else if (noticeTitle.value.length > 100) {
    noticeTitle.setCustomValidity('Максимальная длина 100 символов');
  } else {
    noticeTitle.setCustomValidity('');
  }

  if (parseInt(price.value) > MAX_PRICE) {
    price.setCustomValidity('Цена за ночь не может превышать 1 000 000');
  } else {
    price.setCustomValidity('');
  }

  if (price.value < cost) {
    price.setCustomValidity('Минимальная цена за ночь ' + cost);
    price.setAttribute('placeholder', cost);
  } else {
    price.setCustomValidity('');
  }
});

timeIn.addEventListener('input', function() {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('input', function() {
  timeIn.value = timeOut.value;
});
