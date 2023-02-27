class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _handleFormInput(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleSubmitButton() {
    const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
    buttonSubmit.disabled = !this._formElement.checkValidity();
    buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
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



// function showInputError(input, config) {
//   const errorElement = document.querySelector(`#${input.id}-error`);
//   input.classList.add(config.inputErrorClass);
//   errorElement.textContent = input.validationMessage;
//   errorElement.classList.add(config.errorClass);
// }

// function hideInputError(input, config) {
//   const errorElement = document.querySelector(`#${input.id}-error`);
//   input.classList.remove(config.inputErrorClass);
//   errorElement.textContent = '';
//   errorElement.classList.remove(config.errorClass);
// }

// function hideAllInputErrors(config) {
//   const inputList = Array.from(document.querySelectorAll(config.inputSelector));

//   inputList.forEach((inputElement) => {
//     hideInputError(inputElement, config);
//   });
// }

// function handleFormInput(input, config) {
//   if (input.validity.valid) {
//     hideInputError(input, config);
//   } else {
//     showInputError(input, config);
//   }
// }

// function toggleSubmitButton(form, config) {
//   const buttonSubmit = form.querySelector(config.submitButtonSelector);
//   buttonSubmit.disabled = !form.checkValidity();
//   buttonSubmit.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
// }

// function setInputListeners(form, config) {
//   const inputListLocal = Array.from(form.querySelectorAll(config.inputSelector));

//   inputListLocal.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       handleFormInput(inputElement, config);
//     });
//   });
// }

// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     formElement.addEventListener('input', () => {
//       toggleSubmitButton(formElement, config);
//     });
//     setInputListeners(formElement, config);
//     toggleSubmitButton(formElement, config);
//     formElement.addEventListener('reset', () => {
//       setTimeout(() => {
//         toggleSubmitButton(formElement, config);
//       }, 0);
//     });
//   });
// }
