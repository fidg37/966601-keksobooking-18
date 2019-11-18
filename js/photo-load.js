'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adChooser = document.querySelector('.ad-form__input');
  var adPreview = document.querySelector('.ad-form__photo');

  var inputChangeHandler = function (fileChooser, preview, isNotAvatar) {
    var file = fileChooser.files[fileChooser.files.length - 1];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (isNotAvatar) {
          var image = document.createElement('img');

          image.src = reader.result;
          preview.appendChild(image);
        } else {
          preview.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    inputChangeHandler(avatarChooser, avatarPreview);
  });

  adChooser.addEventListener('change', function () {
    inputChangeHandler(adChooser, adPreview, true);
  });

  window.photoLoad = {
    avatarPreview: avatarPreview,
    adPreview: adPreview
  };
})();
