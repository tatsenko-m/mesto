export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

export const profileForm = document.forms['editProfile'];
export const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
export const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
export const cardForm = document.forms['addCard'];
export const cardListSelector = '.gallery__list';
export const popupWithImageSelector = '.popup_act_open-img';
export const popupWithEditProfileFormSelector = '.popup_act_edit-profile';
export const popupWithAddCardFormSelector = '.popup_act_add-card';
export const popupWithUpdateAvatarFormSelector = '.popup_act_update-avatar';
export const popupWithConfirmationSelector = '.popup_act_confirm-del';
export const cardTemplateId = '#card-template';
export const profileElementSelectors = {
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
};
export const formValidators = {};
export const profileAvatar = document.querySelector('.profile__avatar');
