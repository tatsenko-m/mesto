import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputData = {};
    const inputList = Array.from(document.querySelectorAll('.popup__item'));
    inputList.forEach((item) => {
      inputData[`${item.name}`] = `${item.value}`;
    });
    return inputData;

    //const inputList = Array.from(this._form.querySelectorAll('.popup__item'));
    //const inputValues = inputList.map((item) => item.value);
    //const inputValues = inputList.map(item => ({[item.name]: item.value}));
    //return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    //this._values = this._getInputValues();
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
}

export default PopupWithForm;
