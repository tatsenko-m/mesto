import './index.css';
import {
  formValidationConfig,
  profilePopupOpenButtonElement,
  cardPopupOpenButtonElement,
  cardListSelector,
  popupWithImageSelector,
  popupWithEditProfileFormSelector,
  popupWithAddCardFormSelector,
  popupWithUpdateAvatarFormSelector,
  profileElementSelectors,
  formValidators,
  profileAvatar
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

const userId = { id: '' };

let cardList;

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setAvatar(user.avatar);
  userId.id = user._id;

  cardList = new Section({ items: cards, renderer: (item) => {
    const cardElement = createCard({ name: item.name, link: item.link, likesArr: item.likes, cardId: item._id, ownerId: item.owner._id }, popupWithImage, userId.id, api);
    cardList.addItem(cardElement);
  } }, cardListSelector, api);
  cardList.renderItems();
})
.catch((err) => alert(err));

const popupWithEditProfileForm = new PopupWithForm(popupWithEditProfileFormSelector, (data) => {
  api.editUserInfo(data)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
  })
  .catch((err) => alert(err));
  popupWithEditProfileForm.close();
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupWithAddCardForm = new PopupWithForm(popupWithAddCardFormSelector, (data) => {
  api.addCard(data)
  .then((res) => {
    const userCardElement = createCard({ name: res.title, link: res.link, likesArr: res.likes, cardId: res._id, ownerId: res.owner._id }, popupWithImage, userId.id, api);
    cardList.addItem(userCardElement);
    cardList.updateItems();
  })
  .catch((err) => alert(err));
  popupWithAddCardForm.close();
});

const popupWithUpdateAvatarForm = new PopupWithForm(popupWithUpdateAvatarFormSelector, (data) => {
  api.updateAvatar(data)
  .then((res) => {
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => alert(err));
  popupWithUpdateAvatarForm.close();
});

popupWithEditProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithUpdateAvatarForm.setEventListeners();

profilePopupOpenButtonElement.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupWithEditProfileForm.setInputValues(currentUserInfo);
  popupWithEditProfileForm.open();
  formValidators['editProfile'].resetValidation();
});
cardPopupOpenButtonElement.addEventListener('click', () => {
  popupWithAddCardForm.open();
});
profileAvatar.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupWithUpdateAvatarForm.setInputValues(currentUserInfo);
  popupWithUpdateAvatarForm.open();
  formValidators['updateAvatar'].resetValidation();
});

enableValidation(formValidationConfig);




