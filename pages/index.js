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
  closePopup
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
const popupWithAddCardFormSelector = '.popup_act_add-card';
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
  popupWithEditProfileForm.open();
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
}

const popupWithImage = new PopupWithImage(popupWithImageSelector);

popupWithImage.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(popupWithAddCardFormSelector, (data) => {
  const userCard = new Card({ name: data.title, link: data.link}, '#card-template', (name, link) => {
    popupWithImage.open(name, link);
  });
  const userCardElement = userCard.createCard();
  cardList.addItem(userCardElement);
  cardForm.reset();
  popupWithAddCardForm.close();
});

popupWithAddCardForm.setEventListeners();

const cardList = new Section({ items: initialCards, renderer: ({ name, link }) => {
  const card = new Card({ name, link }, '#card-template', (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
} }, cardListSelector);

cardList.renderItems();

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();




