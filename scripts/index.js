const profilePopupElement = document.querySelector('.popup-edit-profile');
const cardPopupElement = document.querySelector('.popup-add-card');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
const cardPopupCloseButtonElement = cardPopupElement.querySelector('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const editProfileFormElement = profilePopupElement.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__item_el_name');
const aboutInput = editProfileFormElement.querySelector('.popup__item_el_about');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

function assignValuesToEditProfileFormInputs() {
  nameInput.value = profileTitleElement.textContent;
  aboutInput.value = profileSubtitleElement.textContent;
}

const openPopup = function (element) {
  element.classList.add('popup_opened');
  if (element = profilePopupElement) assignValuesToEditProfileFormInputs();
};

const closePopup = function (element) {
  element.classList.remove('popup_opened');
  if (element = profilePopupElement) assignValuesToEditProfileFormInputs();
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = `${nameInput.value}`;
  profileSubtitleElement.textContent = `${aboutInput.value}`;
  closePopup(profilePopupElement);
}

profilePopupOpenButtonElement.addEventListener('click', function(){openPopup(profilePopupElement)});
profilePopupCloseButtonElement.addEventListener('click', function(){closePopup(profilePopupElement)});
editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});
cardPopupCloseButtonElement.addEventListener('click', function(){closePopup(cardPopupElement)});


