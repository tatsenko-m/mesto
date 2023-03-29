import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__item'));
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputData = {};
    this._inputList.forEach((item) => {
      inputData[`${item.name}`] = `${item.value}`;
    });
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._inputData = this._getInputValues();
      this._handleFormSubmit(this._inputData);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._originalButtonText;
    }
  }
}

export default PopupWithForm;
