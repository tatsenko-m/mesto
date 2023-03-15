import './index.css';
import {
  initialCards,
  formValidationConfig,
  profilePopupOpenButtonElement,
  cardPopupOpenButtonElement,
  cardListSelector,
  popupWithImageSelector,
  popupWithEditProfileFormSelector,
  popupWithAddCardFormSelector,
  profileElementSelectors,
  formValidators
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { enableValidation, createCard } from '../utils/utils.js';

const userInfo = new UserInfo(profileElementSelectors);

const popupWithEditProfileForm = new PopupWithForm(popupWithEditProfileFormSelector, (data) => {
  userInfo.setUserInfo(data.name, data.about);
  popupWithEditProfileForm.close();
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const cardList = new Section({ items: initialCards, renderer: ({ name, link }) => {
  const cardElement = createCard({ name, link }, popupWithImage);
  cardList.addItem(cardElement);
} }, cardListSelector);

const popupWithAddCardForm = new PopupWithForm(popupWithAddCardFormSelector, (data) => {
  const userCardElement = createCard({ name: data.title, link: data.link}, popupWithImage);
  cardList.addItem(userCardElement);
  popupWithAddCardForm.close();
});

popupWithEditProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithAddCardForm.setEventListeners();

cardList.renderItems();

profilePopupOpenButtonElement.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupWithEditProfileForm.setInputValues(currentUserInfo);
  popupWithEditProfileForm.open();
  formValidators['editProfile'].resetValidation();
});
cardPopupOpenButtonElement.addEventListener('click', () => {
  popupWithAddCardForm.open();
});

enableValidation(formValidationConfig);




