class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _handleFormInput(input) {
    if (input.validity.valid) {
      this.hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleSubmitButton() {
    this._buttonSubmit.disabled = !this._formElement.checkValidity();
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
  }

  _setInputListeners() {
    const inputListLocal = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    inputListLocal.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('input', () => {
      this._toggleSubmitButton();
    });
    this._setInputListeners();
    this._toggleSubmitButton();
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleSubmitButton();
      }, 0);
    });
  }
}

export default FormValidator;
