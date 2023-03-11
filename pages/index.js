import { initialCards } from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// Объект настроек валидации
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

const profilePopupElement = document.querySelector('.popup_act_edit-profile');
const cardPopupElement = document.querySelector('.popup_act_add-card');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const profileForm = document.forms['editProfile'];
const cardForm = document.forms['addCard'];
const profileFormInputList = Array.from(profileForm.querySelectorAll('.popup__item'));
const nameInput = profileForm.querySelector('.popup__item_type_name');
const aboutInput = profileForm.querySelector('.popup__item_type_about');
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const cardsGallery = document.querySelector('.gallery__list');
const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);

function assignValuesToEditProfileFormInputs() {
  nameInput.value = profileTitleElement.textContent;
  aboutInput.value = profileSubtitleElement.textContent;
}

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
}

function handleOverlayAndCloseButtonMousedown() {
  const popupList = document.querySelectorAll('.popup')

  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    })
  })
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = aboutInput.value;
  closePopup(profilePopupElement);
}

function renderCard(data) {
  const card = new Card(data, '#card-template');
  const cardElement = card.createCard();

  cardsGallery.prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const userData = {
    name: `${titleInput.value}`,
    link: `${linkInput.value}`
  };
  renderCard(userData);
  cardForm.reset();
  closePopup(cardPopupElement);
}

initialCards.forEach((item) => {
  renderCard(item);
});

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

handleOverlayAndCloseButtonMousedown();

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();



