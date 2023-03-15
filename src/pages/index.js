import './index.css';
import {
  initialCards,
  nameInput,
  aboutInput,
  formValidationConfig,
  profilePopupOpenButtonElement,
  cardPopupOpenButtonElement,
  cardListSelector,
  popupWithImageSelector,
  popupWithEditProfileFormSelector,
  popupWithAddCardFormSelector,
  cardTemplateId,
  profileElementSelectors,
  formValidators
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { enableValidation } from '../utils/utils.js';

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
  formValidators['editProfile'].resetValidation();
});
cardPopupOpenButtonElement.addEventListener('click', () => {
  popupWithAddCardForm.open();
});

enableValidation(formValidationConfig);




