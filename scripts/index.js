import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

const profilePopupElement = document.querySelector('.popup_act_edit-profile');
const cardPopupElement = document.querySelector('.popup_act_add-card');
export const imagePopup = document.querySelector('.popup_act_open-img');
export const fullSizeImageFromPopupElement = imagePopup.querySelector('.popup__image');
export const captionFromPopupElement = imagePopup.querySelector('.popup__caption');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const profileForm = document.forms['editProfile'];
const cardForm = document.forms['addCard'];
const nameInput = profileForm.querySelector('.popup__item_type_name');
const aboutInput = profileForm.querySelector('.popup__item_type_about');
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const cardsGallery = document.querySelector('.gallery__list');

function assignValuesToEditProfileFormInputs() {
  nameInput.value = profileTitleElement.textContent;
  aboutInput.value = profileSubtitleElement.textContent;
}

export const openPopup = function (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
};

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
  //hideAllInputErrors(formValidationConfig);
}

const closePopup = function (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
};

function handleOverlayAndCloseButtonMousedown() {
  const popupList = document.querySelectorAll('.popup')

  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    })
  })
}

function closePopupByPressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = aboutInput.value;
  closePopup(profilePopupElement);
}

function renderCard(data) {
  const card = new Card(data, '#card-template');
  const cardElement = card.createCard();

  cardsGallery.prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newData = {
    name: `${titleInput.value}`,
    link: `${linkInput.value}`
  };
  renderCard(newData);
  cardForm.reset();
  closePopup(cardPopupElement);
}

initialCards.forEach((item) => {
  renderCard(item);
  // const card = new Card(item, '#card-template');
  // const cardElement = card.createCard();

  // cardsGallery.prepend(cardElement);
});

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

handleOverlayAndCloseButtonMousedown();

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);

//enableValidation(formValidationConfig);
const profileFormValidator = new FormValidator(formValidationConfig, profileForm);
const cardFormValidator = new FormValidator(formValidationConfig, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();



