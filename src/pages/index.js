import './index.css';
import {
  initialCards,
  profileForm,
  nameInput,
  aboutInput,
  formValidationConfig,
  profilePopupOpenButtonElement,
  cardPopupOpenButtonElement,
  cardForm,
  profileFormInputList,
  cardListSelector,
  popupWithImageSelector,
  popupWithEditProfileFormSelector,
  popupWithAddCardFormSelector,
  cardTemplateId,
  profileElementSelectors
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);
const userInfo = new UserInfo(profileElementSelectors);
const popupWithEditProfileForm = new PopupWithForm(popupWithEditProfileFormSelector, (data) => {
  userInfo.setUserInfo(data.name, data.about);
  popupWithEditProfileForm.close();
});
const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupWithAddCardForm = new PopupWithForm(popupWithAddCardFormSelector, (data) => {
  const userCard = new Card({ name: data.title, link: data.link}, cardTemplateId, (name, link) => {
    popupWithImage.open(name, link);
  });
  const userCardElement = userCard.createCard();
  cardList.addItem(userCardElement);
  cardForm.reset();
  popupWithAddCardForm.close();
});
const cardList = new Section({ items: initialCards, renderer: ({ name, link }) => {
  const card = new Card({ name, link }, cardTemplateId, (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
} }, cardListSelector);

popupWithEditProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithAddCardForm.setEventListeners();

cardList.renderItems();

profilePopupOpenButtonElement.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  popupWithEditProfileForm.open();
  profileFormInputList.forEach((inputElement) => {
    profileFormValidator.hideInputError(inputElement);
  });
});
cardPopupOpenButtonElement.addEventListener('click', () => {
  popupWithAddCardForm.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();




