import {
  initialCards,
  profilePopupElement,
  profileForm,
  formValidationConfig
} from '../utils/constants.js';
import {
  openPopup,
  closePopup,
  assignValuesToEditProfileFormInputs,
  handleOverlayAndCloseButtonMousedown,
  handleEditProfileFormSubmit
} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const cardPopupElement = document.querySelector('.popup_act_add-card');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const cardForm = document.forms['addCard'];
const profileFormInputList = Array.from(profileForm.querySelectorAll('.popup__item'));
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
const cardsGallery = document.querySelector('.gallery__list');
const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
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



