import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._caption = this._popupElement.querySelector('.popup__caption');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = 'Фото ' + name;
    this._caption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
