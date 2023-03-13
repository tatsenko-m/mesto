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
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

const cardPopupElement = document.querySelector('.popup_act_add-card');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const cardForm = document.forms['addCard'];
const profileFormInputList = Array.from(profileForm.querySelectorAll('.popup__item'));
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
const cardListSelector = '.gallery__list';
const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
}

const cardList = new Section({ items: initialCards, renderer: ({ name, link }) => {
  const card = new Card({ name, link }, '#card-template');
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
} }, cardListSelector);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const userCard = new Card({ name: titleInput.value, link: linkInput.value}, '#card-template');
  const userCardElement = userCard.createCard();
  cardList.addItem(userCardElement);
  cardForm.reset();
  closePopup(cardPopupElement);
}

cardList.renderItems();

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

handleOverlayAndCloseButtonMousedown();

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();




