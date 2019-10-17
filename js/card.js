'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photo = cardTemplate.querySelector('.popup__photo');
  var card;
  var featuresCollection;

  var addFeatures = function (arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.display = 'none';
      for (var j = 0; j < obj.offer.features.length; j++) {
        if (arr[i].classList.contains('popup__feature--' + obj.offer.features[j])) {
          arr[i].style.display = 'inline-block';
          j = obj.offer.features.length;
        }
      }
    }
  };

  var addPhotos = function (item, obj) {
    if (obj.offer.photos.length > 1) {
      for (var i = 1; i < obj.offer.photos.length; i++) {
        var photoClone = photo.cloneNode(true);
        item.querySelector('.popup__photos').appendChild(photoClone);
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

    if (window.util.map.querySelector('.map__card')) {
      window.util.map.removeChild(window.util.map.querySelector('.map__card'));
    }

    card.querySelector('.popup__title').textContent = object.offer.title;
    card.querySelector('.popup__text--address').textContent = object.offer.address;
    card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    card.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
    card.querySelector('.popup__description').textContent = object.offer.description;
    card.querySelector('.popup__avatar').src = object.author.avatar;
    addFeatures(featuresCollection, object);
    addPhotos(card, object);

    for (var i = 0; i < window.data.apartmentsInfo.types.length; i++) {
      if (object.offer.type === window.data.apartmentsInfo.types[i]) {
        card.querySelector('.popup__type').textContent = window.data.apartmentsInfo.typesTranslate[i];
      }
    }

    return card;
  };

  window.card = {
    createCard: createCard
  };
})();
