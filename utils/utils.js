import {
  profilePopupElement,
  nameInput,
  aboutInput,
  profileTitleElement,
  profileSubtitleElement
 } from './constants.js';

export const openPopup = function (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
};

export const closePopup = function (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
};

export function closePopupByPressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


