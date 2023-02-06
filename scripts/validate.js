const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

function showInputError(input, config) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add(config.popup__item_type_error);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, config) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove(config.popup__item_type_error);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function handleFormInput(event, config) {
  const input = event.target;

  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, config);
  }
}

function toggleSubmitButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  buttonSubmit.disabled = !form.checkValidity();
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function setInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      handleFormInput(event, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener('input', () => {
      toggleSubmitButton(formElement, config);
    });
    setInputListeners(formElement, config);
    toggleSubmitButton(formElement, config);

  });
}

enableValidation(formValidationConfig);



