import {
  initialCards,
  profilePopupElement,
  profileForm,
  nameInput,
  aboutInput,
  formValidationConfig
} from '../utils/constants.js';
import {
  openPopup,
  closePopup,
  handleOverlayAndCloseButtonMousedown
} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardPopupElement = document.querySelector('.popup_act_add-card');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const cardForm = document.forms['addCard'];
const profileFormInputList = Array.from(profileForm.querySelectorAll('.popup__item'));
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
const cardListSelector = '.gallery__list';
const popupWithImageSelector = '.popup_act_open-img';
const popupWithEditProfileFormSelector = '.popup_act_edit-profile';
const profileElementSelectors = {
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
};

const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);

const userInfo = new UserInfo(profileElementSelectors);

const popupWithEditProfileForm = new PopupWithForm(popupWithEditProfileFormSelector, (data) => {
  userInfo.setUserInfo(data.name, data.about);
  popupWithEditProfileForm.close();
});

popupWithEditProfileForm.setEventListeners();

function openProfilePopup() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  openPopup(profilePopupElement);
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
}

//const popupWithAddCardForm = new PopupWithForm();

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const cardList = new Section({ items: initialCards, renderer: ({ name, link }) => {
  const card = new Card({ name, link }, '#card-template', (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
} }, cardListSelector);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const userCard = new Card({ name: titleInput.value, link: linkInput.value}, '#card-template', (name, link) => {
    popupWithImage.open(name, link);
  });
  const userCardElement = userCard.createCard();
  cardList.addItem(userCardElement);
  cardForm.reset();
  closePopup(cardPopupElement);
}

cardList.renderItems();

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

handleOverlayAndCloseButtonMousedown();

cardForm.addEventListener('submit', handleAddCardFormSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();




