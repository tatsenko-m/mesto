const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

function toggleSubmitButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  buttonSubmit.disabled = !form.checkValidity();
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });


  });
}



toggleSubmitButton(cardForm, formValidationConfig);
