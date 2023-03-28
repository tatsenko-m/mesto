import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation();
    });
  }
}

export default PopupWithConfirmation;
