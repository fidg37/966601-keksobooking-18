'use strict';
(function () {
  var ITERATOR_START_NUMBER = 1;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photo = cardTemplate.querySelector('.popup__photo');
  var card;
  var featuresCollection;

  var addFeatures = function (arr, obj) {
    arr.forEach(function (it) {
      it.style.display = 'none';

      obj.offer.features.forEach(function (item, number) {
        if (it.classList.contains('popup__feature--' + obj.offer.features[number])) {
          it.style.display = 'inline-block';
        }
      });
    });
  };

  var addPhotos = function (item, obj) {
    if (obj.offer.photos.length !== 0) {
      obj.offer.photos.forEach(function (it, number) {
        if (number >= ITERATOR_START_NUMBER) {
          var photoClone = photo.cloneNode(true);
          item.querySelector('.popup__photos').appendChild(photoClone);
        }
      });

      var photosList = card.querySelectorAll('.popup__photo');

      obj.offer.photos.forEach(function (it, number) {
        photosList[number].src = it;
      });
    } else {
      item.querySelector('.popup__photos').removeChild(item.querySelector('.popup__photo'));
    }
  };

  var createCard = function (object) {
    if (object.offer) {
      card = cardTemplate.cloneNode(true);
      featuresCollection = card.querySelectorAll('.popup__feature');

      if (window.data.map.querySelector('.map__card')) {
        window.data.map.removeChild(window.data.map.querySelector('.map__card'));
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

      window.data.apartmentsInfo.forEach(function (item) {
        if (object.offer.type === item.type) {
          card.querySelector('.popup__type').textContent = item.typeTranslate;
        }
      });
    }
    return card;
  };

  window.card = {
    create: createCard
  };
})();
