import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = Array.from(this._form.querySelectorAll('.popup__item'));
    const inputValues = inputList.map((item) => item.value);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._values = this.__getInputValues();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._values[0], this._values[1]);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
