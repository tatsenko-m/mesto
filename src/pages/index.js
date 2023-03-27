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
import Api from '../components/Api.js';
import { enableValidation, createCard } from '../utils/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '35e162c1-4508-4f6a-859d-022fc5f0438b',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileElementSelectors);

const serverUserInfo = api.getUserInfo();

serverUserInfo
.then((data) => {
  userInfo.setUserInfo(data.name, data.about);
})
.catch((err) => alert(err));

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




